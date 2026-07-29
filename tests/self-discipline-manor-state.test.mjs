import test from "node:test";
import assert from "node:assert/strict";
import {
  createInitialState,
  checkInHabit,
  buyShopItem,
  donateImpactEnergy,
  getOwnedItemsByPlacement,
  getOnboardingSteps,
  getProductValidationMetrics,
  getShopItemAction,
  moveOwnedItem,
  upgradeHouse,
  resetToday,
  HABITS,
  IMPACT_PROJECTS,
  HOUSE_LEVELS,
  SHOP_ITEMS,
} from "../app.js";

test("initial state exposes six habits and starting manor stats", () => {
  const state = createInitialState();
  assert.equal(HABITS.length, 6);
  assert.equal(state.gold, 0);
  assert.equal(state.impactEnergy, 0);
  assert.equal(state.level, 1);
  assert.equal(state.houseLevel, 1);
  assert.equal(state.exp, 0);
  assert.deepEqual(state.completedHabitIds, []);
  assert.deepEqual(state.ownedItemIds, []);
  assert.deepEqual(state.demoMetrics, {
    checkIns: 0,
    purchases: 0,
    impactInvestments: 0,
    placements: 0,
    houseUpgrades: 0,
  });
});

test("checking in a habit grants gold and exp only once", () => {
  const state = createInitialState();
  const first = checkInHabit(state, "fitness");
  assert.equal(first.success, true);
  assert.equal(first.state.gold, 10);
  assert.equal(first.state.impactEnergy, 10);
  assert.equal(first.state.exp, 10);
  assert.equal(first.state.demoMetrics.checkIns, 1);
  assert.deepEqual(first.state.completedHabitIds, ["fitness"]);

  const second = checkInHabit(first.state, "fitness");
  assert.equal(second.success, false);
  assert.equal(second.state.gold, 10);
  assert.equal(second.state.impactEnergy, 10);
  assert.equal(second.state.exp, 10);
  assert.equal(second.state.demoMetrics.checkIns, 1);
});

test("impact project catalog covers the comprehensive charity pool", () => {
  assert.deepEqual(
    IMPACT_PROJECTS.map((project) => project.id),
    ["animal-rescue", "education-aid", "disaster-relief", "green-action", "medical-aid"],
  );
});

test("donating impact energy records project progress", () => {
  const state = {
    ...createInitialState(),
    impactEnergy: 30,
  };

  const result = donateImpactEnergy(state, "education-aid", 20);

  assert.equal(result.success, true);
  assert.equal(result.state.impactEnergy, 10);
  assert.equal(result.state.impactDonations["education-aid"], 20);
  assert.equal(result.state.demoMetrics.impactInvestments, 1);
  assert.match(result.message, /困境助学/);
});

test("donating impact energy is blocked when balance is insufficient", () => {
  const result = donateImpactEnergy(createInitialState(), "animal-rescue", 10);

  assert.equal(result.success, false);
  assert.equal(result.state.impactEnergy, 0);
  assert.equal(result.state.impactDonations["animal-rescue"] || 0, 0);
  assert.match(result.message, /公益能量还不够/);
});

test("experience rolls over into levels at one hundred exp", () => {
  let state = createInitialState();
  for (const habit of HABITS) {
    state = checkInHabit(state, habit.id).state;
  }
  state = { ...state, exp: 90 };
  const result = checkInHabit(resetToday(state), "fitness");
  assert.equal(result.state.level, 2);
  assert.equal(result.state.exp, 0);
});

test("buying an affordable item deducts gold and adds it to the manor", () => {
  const state = { ...createInitialState(), gold: 60 };
  const result = buyShopItem(state, "yoga-mat");
  assert.equal(result.success, true);
  assert.equal(result.state.gold, 10);
  assert.deepEqual(result.state.ownedItemIds, ["yoga-mat"]);
  assert.deepEqual(result.state.itemPositions["yoga-mat"], { x: 24, y: 72 });
  assert.equal(result.state.demoMetrics.purchases, 1);
});

test("buying an unaffordable item keeps state unchanged", () => {
  const state = createInitialState();
  const result = buyShopItem(state, "fountain");
  assert.equal(result.success, false);
  assert.equal(result.state.gold, 0);
  assert.deepEqual(result.state.ownedItemIds, []);
  assert.match(result.message, /还差 200 金币/);
});

test("catalog keeps PRD shop items available", () => {
  assert.equal(SHOP_ITEMS.length, 10);
  assert.ok(SHOP_ITEMS.some((item) => item.id === "journal" && item.price === 30));
  assert.ok(SHOP_ITEMS.some((item) => item.id === "fountain" && item.price === 200));
});

test("owned shop items can be grouped into indoor and outdoor manor scenes", () => {
  const state = {
    ...createInitialState(),
    ownedItemIds: ["journal", "yoga-mat", "solar-light", "fountain"],
  };

  const indoor = getOwnedItemsByPlacement(state, "indoor").map((item) => item.id);
  const outdoor = getOwnedItemsByPlacement(state, "outdoor").map((item) => item.id);

  assert.deepEqual(indoor, ["journal", "yoga-mat"]);
  assert.deepEqual(outdoor, ["solar-light", "fountain"]);
  assert.equal(SHOP_ITEMS.every((item) => item.placement === "indoor" || item.placement === "outdoor"), true);
});

test("owned item positions can be moved and are clamped to the scene", () => {
  const state = {
    ...createInitialState(),
    ownedItemIds: ["journal"],
    itemPositions: {
      journal: { x: 20, y: 30 },
    },
  };

  const moved = moveOwnedItem(state, "journal", 67.4, 42.1);
  assert.equal(moved.success, true);
  assert.deepEqual(moved.state.itemPositions.journal, { x: 67.4, y: 42.1 });
  assert.equal(moved.state.demoMetrics.placements, 1);

  const clamped = moveOwnedItem(moved.state, "journal", -20, 140);
  assert.equal(clamped.success, true);
  assert.deepEqual(clamped.state.itemPositions.journal, { x: 6, y: 94 });
});

test("unowned items cannot be positioned", () => {
  const result = moveOwnedItem(createInitialState(), "journal", 50, 50);
  assert.equal(result.success, false);
  assert.deepEqual(result.state.ownedItemIds, []);
  assert.deepEqual(result.state.itemPositions, {});
});

test("house can be upgraded with enough gold", () => {
  const state = { ...createInitialState(), gold: 120 };
  const result = upgradeHouse(state);

  assert.equal(result.success, true);
  assert.equal(result.state.houseLevel, 2);
  assert.equal(result.state.gold, 40);
  assert.equal(result.state.demoMetrics.houseUpgrades, 1);
  assert.match(result.message, /升级到 2 级/);
});

test("onboarding and validation metrics summarize the product loop", () => {
  const state = {
    ...createInitialState(),
    completedHabitIds: ["fitness"],
    ownedItemIds: ["journal"],
    impactDonations: { "animal-rescue": 10 },
    demoMetrics: {
      checkIns: 1,
      purchases: 1,
      impactInvestments: 1,
      placements: 0,
      houseUpgrades: 0,
    },
  };

  const steps = getOnboardingSteps(state);
  assert.deepEqual(
    steps.map((step) => [step.id, step.completed]),
    [
      ["check-in", true],
      ["impact", true],
      ["buy", true],
      ["place", false],
    ],
  );

  assert.deepEqual(getProductValidationMetrics(state), {
    completedSteps: 3,
    totalSteps: 4,
    loopCompletionRate: 75,
    checkIns: 1,
    purchases: 1,
    impactInvestments: 1,
    placements: 0,
    houseUpgrades: 0,
  });
});

test("house upgrade is blocked without enough gold or at max level", () => {
  const poor = upgradeHouse(createInitialState());
  assert.equal(poor.success, false);
  assert.equal(poor.state.houseLevel, 1);
  assert.match(poor.message, /还差 80 金币/);

  const maxed = upgradeHouse({ ...createInitialState(), gold: 999, houseLevel: HOUSE_LEVELS.length });
  assert.equal(maxed.success, false);
  assert.equal(maxed.state.houseLevel, HOUSE_LEVELS.length);
  assert.match(maxed.message, /已经是最高等级/);
});

test("shop action guides owned items to placement instead of disabling them", () => {
  const owned = {
    ...createInitialState(),
    gold: 100,
    ownedItemIds: ["journal"],
  };

  assert.deepEqual(getShopItemAction(owned, "journal"), {
    label: "去摆放",
    disabled: false,
    mode: "place",
  });
  assert.deepEqual(getShopItemAction(owned, "yoga-mat"), {
    label: "50 金币",
    disabled: false,
    mode: "buy",
  });
  assert.deepEqual(getShopItemAction(createInitialState(), "fountain"), {
    label: "200 金币",
    disabled: true,
    mode: "locked",
  });
});
