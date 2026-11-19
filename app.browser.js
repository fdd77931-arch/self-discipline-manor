const HABITS = [
  { id: "fitness", name: "健身", rewardGold: 10, rewardExp: 10, icon: "🏋️", note: "20 分钟身体唤醒" },
  { id: "meditation", name: "冥想", rewardGold: 10, rewardExp: 10, icon: "🧘", note: "10 分钟深呼吸" },
  { id: "reading", name: "阅读", rewardGold: 10, rewardExp: 10, icon: "📖", note: "读 20 页好书" },
  { id: "study", name: "学习", rewardGold: 10, rewardExp: 10, icon: "✍️", note: "专注学习 30 分钟" },
  { id: "sleep", name: "早睡", rewardGold: 10, rewardExp: 10, icon: "🌙", note: "23:00 前入睡" },
  { id: "journal", name: "日记", rewardGold: 10, rewardExp: 10, icon: "📓", note: "记录今天的三件小事" },
];

const IMPACT_PROJECTS = [
  { id: "animal-rescue", name: "动物救助", target: 120, unit: "份口粮", description: "为流浪动物救助点积累食物、驱虫和临时安置资源。" },
  { id: "education-aid", name: "困境助学", target: 160, unit: "本读物", description: "支持困境学生获得学习用品、阅读材料和课后陪伴。" },
  { id: "disaster-relief", name: "灾区援助", target: 200, unit: "件物资", description: "为突发灾害场景预留应急包、保暖用品和基础生活物资。" },
  { id: "green-action", name: "环保植树", target: 140, unit: "棵树苗", description: "把长期坚持转化为植树、社区清洁等环境友好行动。" },
  { id: "medical-aid", name: "医疗援助", target: 180, unit: "次支持", description: "为需要帮助的人群模拟积累基础药品、义诊和健康科普资源。" },
];

const SHOP_ITEMS = [
  { id: "journal", name: "日记本", price: 30, zone: "书桌", placement: "indoor", glyph: "📔", defaultPosition: { x: 32, y: 64 }, effect: "小屋窗边多了一本摊开的日记本。" },
  { id: "yoga-mat", name: "瑜伽垫", price: 50, zone: "室内地垫", placement: "indoor", glyph: "▰", defaultPosition: { x: 24, y: 72 }, effect: "室内铺上了柔软的瑜伽垫。" },
  { id: "meditation-cushion", name: "冥想坐垫", price: 60, zone: "静心角", placement: "indoor", glyph: "🧘", defaultPosition: { x: 42, y: 68 }, effect: "静心角多了一个安稳的坐垫。" },
  { id: "solar-light", name: "太阳能灯", price: 70, zone: "小路", placement: "outdoor", glyph: "🏮", defaultPosition: { x: 42, y: 72 }, effect: "小路旁亮起了暖色灯光。" },
  { id: "bookshelf", name: "书架", price: 80, zone: "小屋", placement: "indoor", glyph: "📚", defaultPosition: { x: 72, y: 44 }, effect: "小屋里立起了一面整齐的书架。" },
  { id: "treadmill", name: "跑步机", price: 100, zone: "健身房", placement: "indoor", glyph: "🏋", defaultPosition: { x: 58, y: 72 }, effect: "健身房终于有了第一台跑步机。" },
  { id: "swing", name: "秋千椅", price: 120, zone: "花园", placement: "outdoor", glyph: "🪑", defaultPosition: { x: 76, y: 58 }, effect: "花园里挂起了一把可以放空的秋千椅。" },
  { id: "garden-decor", name: "花园装饰", price: 150, zone: "花园", placement: "outdoor", glyph: "🌸", defaultPosition: { x: 70, y: 78 }, effect: "花园边缘添上了漂亮的装饰牌。" },
  { id: "greenhouse", name: "温室花房", price: 180, zone: "后院", placement: "outdoor", glyph: "🪴", defaultPosition: { x: 26, y: 66 }, effect: "后院出现了一间明亮的温室花房。" },
  { id: "fountain", name: "小喷泉", price: 200, zone: "中央庭院", placement: "outdoor", glyph: "⛲", defaultPosition: { x: 54, y: 76 }, effect: "中央庭院响起了清亮的水声。" },
];

const HOUSE_LEVELS = [
  { level: 1, name: "温馨小屋", upgradeCost: 80, description: "一间刚开始生长的小屋。" },
  { level: 2, name: "舒展小屋", upgradeCost: 180, description: "房间更宽敞，能摆下更多装饰。" },
  { level: 3, name: "自律庄园宅", upgradeCost: null, description: "完整庄园宅，外观更成熟。" },
];

const ONBOARDING_STEPS = [
  { id: "check-in", label: "完成一次打卡", hint: "点击左侧任意习惯，获得金币和公益能量。" },
  { id: "impact", label: "投入公益能量", hint: "在公益项目池里选择一个方向，完成一次模拟投入。" },
  { id: "buy", label: "购买第一件装饰", hint: "累计金币后，在商店购买一件庄园物品。" },
  { id: "place", label: "拖动摆放物品", hint: "把已拥有的装饰拖到你喜欢的位置并保存。" },
];

const STORAGE_KEY = "self-discipline-manor-state-v1";
const EXP_PER_LEVEL = 100;
const INITIAL_DEMO_METRICS = {
  checkIns: 0,
  purchases: 0,
  impactInvestments: 0,
  placements: 0,
  houseUpgrades: 0,
};

function createInitialState() {
  return {
    gold: 0,
    impactEnergy: 0,
    level: 1,
    houseLevel: 1,
    exp: 0,
    streakDays: 1,
    completedHabitIds: [],
    ownedItemIds: [],
    impactDonations: {},
    demoMetrics: { ...INITIAL_DEMO_METRICS },
    itemPositions: {},
    lastAction: "欢迎来到自律庄园。先完成一个今日习惯，让庄园开始生长。",
  };
}

function normalizeState(state) {
  return {
    ...createInitialState(),
    ...state,
    houseLevel: Number.isInteger(state?.houseLevel) ? Math.min(HOUSE_LEVELS.length, Math.max(1, state.houseLevel)) : 1,
    completedHabitIds: Array.isArray(state?.completedHabitIds) ? state.completedHabitIds : [],
    ownedItemIds: Array.isArray(state?.ownedItemIds) ? state.ownedItemIds : [],
    impactEnergy: Number.isFinite(state?.impactEnergy) ? Math.max(0, state.impactEnergy) : 0,
    impactDonations: state?.impactDonations && typeof state.impactDonations === "object" ? state.impactDonations : {},
    demoMetrics: {
      ...INITIAL_DEMO_METRICS,
      ...(state?.demoMetrics && typeof state.demoMetrics === "object" ? state.demoMetrics : {}),
    },
    itemPositions: state?.itemPositions && typeof state.itemPositions === "object" ? state.itemPositions : {},
  };
}

function incrementDemoMetric(state, metricKey) {
  return {
    ...state,
    demoMetrics: {
      ...INITIAL_DEMO_METRICS,
      ...state.demoMetrics,
      [metricKey]: (Number(state.demoMetrics?.[metricKey]) || 0) + 1,
    },
  };
}

function clampPosition(value) {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return 50;
  }
  return Math.min(94, Math.max(6, Math.round(number * 10) / 10));
}

function addExperience(state, expToAdd) {
  let nextExp = state.exp + expToAdd;
  let nextLevel = state.level;
  while (nextExp >= EXP_PER_LEVEL) {
    nextExp -= EXP_PER_LEVEL;
    nextLevel += 1;
  }
  return { ...state, exp: nextExp, level: nextLevel };
}

function checkInHabit(state, habitId) {
  const current = normalizeState(state);
  const habit = HABITS.find((item) => item.id === habitId);
  if (!habit) {
    return {
      success: false,
      state: current,
      message: "没有找到这个习惯。可以先从健身、冥想、阅读、学习、早睡、日记里选一个。",
    };
  }
  if (current.completedHabitIds.includes(habitId)) {
    return {
      success: false,
      state: current,
      message: `${habit.name}今天已经完成啦。每项习惯每天只奖励一次，留一点期待给明天。`,
    };
  }

  const withReward = addExperience(
    {
      ...current,
      gold: current.gold + habit.rewardGold,
      impactEnergy: current.impactEnergy + habit.rewardGold,
      completedHabitIds: [...current.completedHabitIds, habitId],
    },
    habit.rewardExp,
  );
  const completedCount = withReward.completedHabitIds.length;
  return {
    success: true,
    state: incrementDemoMetric({
      ...withReward,
      lastAction: `${habit.name}打卡成功，金币 +${habit.rewardGold}，经验 +${habit.rewardExp}。`,
    }, "checkIns"),
    message: `${habit.name}打卡成功，金币 +${habit.rewardGold}，公益能量 +${habit.rewardGold}。今天完成 ${completedCount}/${HABITS.length} 项，庄园又多了一点生活气。`,
  };
}

function buyShopItem(state, itemId) {
  const current = normalizeState(state);
  const item = SHOP_ITEMS.find((entry) => entry.id === itemId);
  if (!item) {
    return {
      success: false,
      state: current,
      message: "商店里暂时没有这个物品。",
    };
  }
  if (current.ownedItemIds.includes(itemId)) {
    return {
      success: false,
      state: current,
      message: `你已经拥有「${item.name}」了，可以把金币留给下一件装饰。`,
    };
  }
  if (current.gold < item.price) {
    return {
      success: false,
      state: current,
      message: `金币还不够，「${item.name}」需要 ${item.price} 金币，你还差 ${item.price - current.gold} 金币。`,
    };
  }
  const nextState = incrementDemoMetric({
    ...current,
    gold: current.gold - item.price,
    ownedItemIds: [...current.ownedItemIds, itemId],
    itemPositions: {
      ...current.itemPositions,
      [itemId]: current.itemPositions[itemId] || item.defaultPosition,
    },
    lastAction: `购买了${item.name}，${item.effect}`,
  }, "purchases");
  return {
    success: true,
    state: nextState,
    message: `购买成功：${item.name}。${item.effect}`,
  };
}

function resetToday(state) {
  return {
    ...normalizeState(state),
    completedHabitIds: [],
    lastAction: "今日打卡已重置，可以重新演示完整闭环。",
  };
}

function getShopItemAction(state, itemId) {
  const current = normalizeState(state);
  const item = SHOP_ITEMS.find((entry) => entry.id === itemId);
  if (!item) {
    return { label: "不可用", disabled: true, mode: "locked" };
  }
  if (current.ownedItemIds.includes(itemId)) {
    return { label: "去摆放", disabled: false, mode: "place" };
  }
  return {
    label: `${item.price} 金币`,
    disabled: current.gold < item.price,
    mode: current.gold >= item.price ? "buy" : "locked",
  };
}

function donateImpactEnergy(state, projectId, amount = 10) {
  const current = normalizeState(state);
  const project = IMPACT_PROJECTS.find((entry) => entry.id === projectId);
  const donationAmount = Number(amount);
  if (!project || !Number.isFinite(donationAmount) || donationAmount <= 0) {
    return {
      success: false,
      state: current,
      message: "没有找到这个公益项目，先换一个方向支持吧。",
    };
  }
  if (current.impactEnergy < donationAmount) {
    return {
      success: false,
      state: current,
      message: `公益能量还不够，支持「${project.name}」需要 ${donationAmount} 点。先完成一个习惯再来点亮它。`,
    };
  }
  const previousDonation = Number(current.impactDonations[projectId]) || 0;
  const nextDonation = previousDonation + donationAmount;
  return {
    success: true,
    state: incrementDemoMetric({
      ...current,
      impactEnergy: current.impactEnergy - donationAmount,
      impactDonations: {
        ...current.impactDonations,
        [projectId]: nextDonation,
      },
      lastAction: `向${project.name}投入 ${donationAmount} 点公益能量。`,
    }, "impactInvestments"),
    message: `已为「${project.name}」投入 ${donationAmount} 点公益能量。你的坚持不只装扮庄园，也在点亮现实世界的善意。`,
  };
}

function upgradeHouse(state) {
  const current = normalizeState(state);
  const currentLevel = HOUSE_LEVELS[current.houseLevel - 1];
  if (!currentLevel || currentLevel.upgradeCost === null) {
    return {
      success: false,
      state: current,
      message: "房子已经是最高等级啦，可以继续购买装饰来丰富空间。",
    };
  }
  if (current.gold < currentLevel.upgradeCost) {
    return {
      success: false,
      state: current,
      message: `升级到 ${current.houseLevel + 1} 级需要 ${currentLevel.upgradeCost} 金币，你还差 ${currentLevel.upgradeCost - current.gold} 金币。`,
    };
  }
  const nextHouseLevel = current.houseLevel + 1;
  const nextLevelMeta = HOUSE_LEVELS[nextHouseLevel - 1];
  return {
    success: true,
    state: incrementDemoMetric({
      ...current,
      gold: current.gold - currentLevel.upgradeCost,
      houseLevel: nextHouseLevel,
      lastAction: `房子升级到 ${nextHouseLevel} 级：${nextLevelMeta.name}`,
    }, "houseUpgrades"),
    message: `房子升级到 ${nextHouseLevel} 级：${nextLevelMeta.name}。${nextLevelMeta.description}`,
  };
}

function loadState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeState(JSON.parse(saved)) : createInitialState();
  } catch {
    return createInitialState();
  }
}

function saveState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeState(state)));
}

function completedCount(state) {
  return normalizeState(state).completedHabitIds.length;
}

function progressPercent(state) {
  return Math.round((completedCount(state) / HABITS.length) * 100);
}

function byId(id) {
  return document.getElementById(id);
}

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

let appState = createInitialState();
let currentScene = "outdoor";
let activeDrag = null;

function getOwnedItemsByPlacement(state, placement) {
  const current = normalizeState(state);
  return SHOP_ITEMS.filter((item) => item.placement === placement && current.ownedItemIds.includes(item.id));
}

function moveOwnedItem(state, itemId, x, y) {
  const current = normalizeState(state);
  if (!current.ownedItemIds.includes(itemId)) {
    return {
      success: false,
      state: current,
      message: "还没有拥有这个物品，购买后才能摆放。",
    };
  }
  return {
    success: true,
    state: incrementDemoMetric({
      ...current,
      itemPositions: {
        ...current.itemPositions,
        [itemId]: { x: clampPosition(x), y: clampPosition(y) },
      },
      lastAction: "物品位置已保存。",
    }, "placements"),
    message: "摆放位置已保存。这个角落现在更像你的庄园了。",
  };
}

function getOnboardingSteps(state) {
  const current = normalizeState(state);
  const hasImpactDonation = Object.values(current.impactDonations).some((value) => Number(value) > 0);
  return ONBOARDING_STEPS.map((step) => {
    const completedByStep = {
      "check-in": current.completedHabitIds.length > 0,
      impact: hasImpactDonation,
      buy: current.ownedItemIds.length > 0,
      place: current.demoMetrics.placements > 0,
    };
    return {
      ...step,
      completed: Boolean(completedByStep[step.id]),
    };
  });
}

function getProductValidationMetrics(state) {
  const current = normalizeState(state);
  const steps = getOnboardingSteps(current);
  const completedSteps = steps.filter((step) => step.completed).length;
  return {
    completedSteps,
    totalSteps: steps.length,
    loopCompletionRate: Math.round((completedSteps / steps.length) * 100),
    checkIns: current.demoMetrics.checkIns,
    purchases: current.demoMetrics.purchases,
    impactInvestments: current.demoMetrics.impactInvestments,
    placements: current.demoMetrics.placements,
    houseUpgrades: current.demoMetrics.houseUpgrades,
  };
}

function setButlerMessage(message) {
  const messageNode = byId("butler-message");
  if (messageNode) {
    messageNode.textContent = message;
  }
}

function renderStats(state) {
  const stats = [
    ["gold-value", state.gold],
    ["level-value", `Lv.${state.level}`],
    ["house-level-value", `Lv.${state.houseLevel}`],
    ["exp-value", `${state.exp}/${EXP_PER_LEVEL}`],
    ["streak-value", `${state.streakDays} 天`],
    ["impact-energy-value", state.impactEnergy],
    ["progress-value", `${completedCount(state)}/${HABITS.length}`],
  ];
  for (const [id, value] of stats) {
    const node = byId(id);
    if (node) {
      node.textContent = value;
    }
  }
  const bar = byId("progress-bar");
  if (bar) {
    bar.style.width = `${progressPercent(state)}%`;
  }
  const houseMeta = HOUSE_LEVELS[state.houseLevel - 1];
  const nextCost = houseMeta?.upgradeCost;
  const houseName = byId("house-name");
  const houseCost = byId("house-upgrade-cost");
  const upgradeButton = byId("upgrade-house");
  if (houseName) {
    houseName.textContent = houseMeta?.name || "温馨小屋";
  }
  if (houseCost) {
    houseCost.textContent = nextCost === null ? "已满级" : `${nextCost} 金币升级`;
  }
  if (upgradeButton) {
    upgradeButton.disabled = nextCost === null || state.gold < nextCost;
    upgradeButton.textContent = nextCost === null ? "已满级" : "升级房子";
  }
}

function renderHabits(state) {
  const container = byId("habit-list");
  if (!container) {
    return;
  }
  container.innerHTML = "";
  for (const habit of HABITS) {
    const isDone = state.completedHabitIds.includes(habit.id);
    const button = createElement("button", `habit-button${isDone ? " is-done" : ""}`);
    button.type = "button";
    button.dataset.habitId = habit.id;
    button.innerHTML = `
      <span class="habit-icon">${habit.icon}</span>
      <span class="habit-main">
        <strong>${habit.name}</strong>
        <small>${habit.note}</small>
      </span>
      <span class="habit-reward">${isDone ? "已完成" : "+10"}</span>
    `;
    container.appendChild(button);
  }
}

function renderManor(state) {
  const outdoorLayer = byId("outdoor-decoration-layer");
  const indoorLayer = byId("indoor-decoration-layer");
  const emptyState = byId("manor-empty-state");
  const sceneShell = byId("manor-scene");
  if (!outdoorLayer || !indoorLayer || !emptyState || !sceneShell) {
    return;
  }
  outdoorLayer.innerHTML = "";
  indoorLayer.innerHTML = "";
  const outdoorItems = getOwnedItemsByPlacement(state, "outdoor");
  const indoorItems = getOwnedItemsByPlacement(state, "indoor");
  const visibleItems = currentScene === "outdoor" ? outdoorItems : indoorItems;
  emptyState.hidden = visibleItems.length > 0;
  sceneShell.dataset.scene = currentScene;
  sceneShell.dataset.houseLevel = String(state.houseLevel);
  const sceneBadge = byId("scene-badge");
  if (sceneBadge) {
    sceneBadge.textContent = currentScene === "outdoor" ? "庭院" : "小屋";
  }

  for (const item of outdoorItems) {
    outdoorLayer.appendChild(createPlacedItem(state, item));
  }
  for (const item of indoorItems) {
    indoorLayer.appendChild(createPlacedItem(state, item));
  }

  document.querySelectorAll("[data-scene-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sceneTarget === currentScene);
  });
}

function createPlacedItem(state, item) {
  const position = state.itemPositions[item.id] || item.defaultPosition;
  const button = createElement("button", `placed-item item-${item.id}`);
  button.type = "button";
  button.dataset.draggableItemId = item.id;
  button.style.left = `${position.x}%`;
  button.style.top = `${position.y}%`;
  button.setAttribute("aria-label", `拖动摆放${item.name}`);
  button.innerHTML = `
    <img src="./assets/objects/${item.id}.webp" alt="" draggable="false">
  `;
  return button;
}

function renderShop(state) {
  const container = byId("shop-list");
  if (!container) {
    return;
  }
  container.innerHTML = "";
  for (const item of SHOP_ITEMS) {
    const owned = state.ownedItemIds.includes(item.id);
    const action = getShopItemAction(state, item.id);
    const actionAttribute = action.mode === "place" ? `data-place-item-id="${item.id}"` : `data-item-id="${item.id}"`;
    const card = createElement("article", `shop-item${owned ? " is-owned" : ""}`);
    card.innerHTML = `
      <div>
        <img class="shop-art" src="./assets/objects/${item.id}.webp" alt="" loading="lazy"><strong>${item.name}</strong>
        <span>${item.placement === "indoor" ? "室内" : "室外"} · ${item.zone}</span>
      </div>
      <p>${item.effect}</p>
      <button type="button" ${actionAttribute} ${action.disabled ? "disabled" : ""}>
        ${action.label}
      </button>
    `;
    container.appendChild(card);
  }
}

function renderImpactProjects(state) {
  const container = byId("impact-list");
  if (!container) {
    return;
  }
  container.innerHTML = "";
  const current = normalizeState(state);
  for (const project of IMPACT_PROJECTS) {
    const donated = Number(current.impactDonations[project.id]) || 0;
    const progress = Math.min(100, Math.round((donated / project.target) * 100));
    const canDonate = current.impactEnergy >= 10;
    const card = createElement("article", "impact-card");
    card.dataset.project = project.id;
    card.innerHTML = `
      <img class="impact-art" src="./assets/objects/${project.id}.webp" alt="" loading="lazy">
      <div class="impact-card-head">
        <div>
          <strong>${project.name}</strong>
          <span>${project.description}</span>
        </div>
        <b>${donated}/${project.target}</b>
      </div>
      <div class="impact-track" aria-label="${project.name}进度">
        <span style="width: ${progress}%"></span>
      </div>
      <div class="impact-card-foot">
        <small>目标：${project.target} ${project.unit}</small>
        <button type="button" data-impact-project-id="${project.id}" ${canDonate ? "" : "disabled"}>投入 10 能量</button>
      </div>
    `;
    container.appendChild(card);
  }
}

function renderOnboarding(state) {
  const container = byId("onboarding-list");
  const progress = byId("onboarding-progress");
  if (!container) {
    return;
  }
  const steps = getOnboardingSteps(state);
  const completedSteps = steps.filter((step) => step.completed).length;
  if (progress) {
    progress.textContent = `${completedSteps}/${steps.length}`;
  }
  container.innerHTML = "";
  for (const [index, step] of steps.entries()) {
    const item = createElement("li", `onboarding-step${step.completed ? " is-complete" : ""}`);
    item.innerHTML = `
      <span>${step.completed ? "✓" : index + 1}</span>
      <div>
        <strong>${step.label}</strong>
        <small>${step.hint}</small>
      </div>
    `;
    container.appendChild(item);
  }
}

function renderValidationMetrics(state) {
  const container = byId("validation-metrics");
  if (!container) {
    return;
  }
  const metrics = getProductValidationMetrics(state);
  const metricItems = [
    ["核心路径完成率", `${metrics.loopCompletionRate}%`],
    ["打卡次数", metrics.checkIns],
    ["公益投入", metrics.impactInvestments],
    ["商店购买", metrics.purchases],
    ["摆放保存", metrics.placements],
    ["房屋升级", metrics.houseUpgrades],
  ];
  container.innerHTML = "";
  for (const [label, value] of metricItems) {
    const item = createElement("div", "validation-metric");
    item.innerHTML = `
      <span>${label}</span>
      <strong>${value}</strong>
    `;
    container.appendChild(item);
  }
}

function renderApp(message = appState.lastAction) {
  renderStats(appState);
  renderHabits(appState);
  renderManor(appState);
  renderOnboarding(appState);
  renderValidationMetrics(appState);
  renderImpactProjects(appState);
  renderShop(appState);
  setButlerMessage(message);
  saveState(appState);
}

function handleHabitClick(event) {
  const button = event.target.closest("[data-habit-id]");
  if (!button) {
    return;
  }
  const result = checkInHabit(appState, button.dataset.habitId);
  appState = result.state;
  renderApp(result.message);
}

function handleShopClick(event) {
  const placementButton = event.target.closest("[data-place-item-id]");
  if (placementButton) {
    const item = SHOP_ITEMS.find((entry) => entry.id === placementButton.dataset.placeItemId);
    if (item) {
      currentScene = item.placement;
      renderApp(`已切到${item.placement === "indoor" ? "小屋" : "庭院"}，可以拖动「${item.name}」重新摆放。`);
    }
    return;
  }

  const button = event.target.closest("[data-item-id]");
  if (!button) {
    return;
  }
  const result = buyShopItem(appState, button.dataset.itemId);
  const item = SHOP_ITEMS.find((entry) => entry.id === button.dataset.itemId);
  if (result.success && item) {
    currentScene = item.placement;
  }
  appState = result.state;
  renderApp(result.message);
}

function handleImpactClick(event) {
  const button = event.target.closest("[data-impact-project-id]");
  if (!button) {
    return;
  }
  const result = donateImpactEnergy(appState, button.dataset.impactProjectId, 10);
  appState = result.state;
  renderApp(result.message);
}

function handleHouseUpgrade() {
  const result = upgradeHouse(appState);
  appState = result.state;
  renderApp(result.message);
}

function switchScene(targetScene) {
  const nextScene = targetScene === "indoor" ? "indoor" : "outdoor";
  const sceneShell = byId("manor-scene");
  const transitionClass = nextScene === "indoor" ? "is-entering-door" : "is-leaving-door";
  sceneShell?.classList.remove("is-entering-door", "is-leaving-door");
  if (sceneShell) {
    void sceneShell.offsetWidth;
    sceneShell.classList.add(transitionClass);
  }
  currentScene = nextScene;
  renderApp(nextScene === "indoor" ? "你点开房门，已经进入小屋。室内装饰可以在这里摆放。" : "你推开房门，已经回到庭院。室外装饰会在这里展示。");
  window.setTimeout(() => {
    sceneShell?.classList.remove(transitionClass);
  }, 520);
}

function positionFromPointer(event, sceneShell) {
  const rect = sceneShell.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  return { x, y };
}

function handleDragStart(event) {
  if (event.target.closest("[data-scene-target]")) {
    return;
  }
  const item = event.target.closest("[data-draggable-item-id]");
  const sceneShell = byId("manor-scene");
  if (!item || !sceneShell) {
    return;
  }
  event.preventDefault();
  activeDrag = {
    itemId: item.dataset.draggableItemId,
    pointerId: event.pointerId,
  };
  item.setPointerCapture?.(event.pointerId);
  item.classList.add("is-dragging");
  setButlerMessage("正在布置庄园。拖到你喜欢的位置后松开，就会自动保存。");
}

function handleDragMove(event) {
  if (!activeDrag) {
    return;
  }
  const sceneShell = byId("manor-scene");
  const itemNode = document.querySelector(`[data-draggable-item-id="${activeDrag.itemId}"]`);
  if (!sceneShell || !itemNode) {
    return;
  }
  const nextPosition = positionFromPointer(event, sceneShell);
  const result = moveOwnedItem(appState, activeDrag.itemId, nextPosition.x, nextPosition.y);
  appState = result.state;
  const position = appState.itemPositions[activeDrag.itemId];
  itemNode.style.left = `${position.x}%`;
  itemNode.style.top = `${position.y}%`;
  saveState(appState);
}

function handleDragEnd(event) {
  if (!activeDrag) {
    return;
  }
  const itemNode = document.querySelector(`[data-draggable-item-id="${activeDrag.itemId}"]`);
  itemNode?.classList.remove("is-dragging");
  activeDrag = null;
  renderApp("摆放位置已保存。这个角落现在更像你的庄园了。");
}

function openInventory() {
  const list = byId("bag-items");
  list.replaceChildren();
  const owned = SHOP_ITEMS.filter(item => appState.ownedItemIds.includes(item.id));
  for (const item of owned) {
    const row = createElement("div", "bag-row");
    const picture = document.createElement("img");
    picture.src = "./assets/objects/" + item.id + ".webp";
    picture.alt = "";
    row.append(picture, createElement("strong", "", item.name),
      createElement("small", "", item.placement === "indoor" ? "小屋" : "庭院"));
    list.append(row);
  }
  if (!owned.length) list.textContent = "背包还是空的。打卡攒金币，在庄园商店买下第一件物品吧。";
  byId("inventory").showModal();
}

function bindEvents() {
  byId("open-bag").addEventListener("click", openInventory);
  byId("habit-list")?.addEventListener("click", handleHabitClick);
  byId("shop-list")?.addEventListener("click", handleShopClick);
  byId("impact-list")?.addEventListener("click", handleImpactClick);
  byId("upgrade-house")?.addEventListener("click", handleHouseUpgrade);
  document.querySelectorAll("[data-scene-target]").forEach((button) => {
    button.addEventListener("click", () => {
      switchScene(button.dataset.sceneTarget);
    });
  });
  byId("manor-scene")?.addEventListener("pointerdown", handleDragStart);
  window.addEventListener("pointermove", handleDragMove);
  window.addEventListener("pointerup", handleDragEnd);
  window.addEventListener("pointercancel", handleDragEnd);
  byId("reset-demo")?.addEventListener("click", () => {
    appState = resetToday(appState);
    renderApp(appState.lastAction);
  });
  byId("clear-demo")?.addEventListener("click", () => {
    appState = createInitialState();
    currentScene = "outdoor";
    renderApp("演示数据已清空。你可以从第一次打卡重新开始。");
  });
}

if (typeof document !== "undefined") {
  appState = loadState();
  bindEvents();
  renderApp();
}
