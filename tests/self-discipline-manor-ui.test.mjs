import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const browserJs = readFileSync(new URL("../app.browser.js", import.meta.url), "utf8");

test("first screen uses app shell layout with central manor focus", () => {
  assert.match(html, /class="[^"]*\bdemo-grid\b[^"]*\bapp-shell\b[^"]*"/);
  assert.match(css, /\.app-shell\s*{[^}]*grid-template-columns:\s*minmax\(260px,\s*0\.72fr\)\s+minmax\(560px,\s*1\.45fr\)\s+minmax\(260px,\s*0\.72fr\)/s);
  assert.match(css, /\.manor-panel\s*{[^}]*grid-column:\s*2/s);
});

test("UI copy highlights direct space interaction", () => {
  assert.match(html, /点击房门进出/);
  assert.match(html, /拖动布置/);
  assert.match(html, /庄园管家/);
});

test("door clicks are the primary indoor and outdoor scene transition", () => {
  assert.match(html, /class="door scene-door"[^>]*data-scene-target="indoor"/);
  assert.match(html, /aria-label="点击房门进入小屋"/);
  assert.match(html, /class="room-door"[^>]*data-scene-target="outdoor"/);
  assert.match(html, /aria-label="点击房门回到庭院"/);
  assert.match(browserJs, /function switchScene\(targetScene\)/);
  assert.match(css, /\.scene-door::before/);
  assert.match(css, /@keyframes\s+doorway-glow/);
});

test("UI includes the public benefit contribution module", () => {
  assert.match(html, /公益项目池/);
  assert.match(html, /公益能量/);
  assert.match(html, /模拟公益闭环/);
});

test("UI exposes onboarding, validation data, and iteration records", () => {
  assert.match(html, /新手引导/);
  assert.match(html, /数据闭环/);
  assert.match(html, /迭代记录/);
});

test("UI imports the warm manor visual language from the Figma prototype", () => {
  assert.match(html, /class="scenic-detail light-rays"/);
  assert.match(html, /class="ground-flora"/);
  assert.match(html, /class="room-motes"/);
  assert.match(css, /--sage:\s*#1aae91/);
  assert.match(css, /@keyframes\s+lantern-sway/);
  assert.match(css, /\.impact-card\[data-project="animal-rescue"\]/);
});

test("portfolio exposes poster and web PPT materials", () => {
  assert.match(html, /展示材料/);
  assert.match(html, /assets\/posters\/self-manor-concept-poster\.png/);
  assert.match(html, /slides\/html-ppt\/index\.html/);
  assert.match(html, /slides\/guizang-ppt\/index\.html/);
  assert.match(html, /slides\/healing-storybook\/index\.html/);
});

test("upload page adopts the Lovable-inspired soft app shell", () => {
  assert.match(html, /class="demo-grid app-shell lovable-shell"/);
  assert.match(html, /class="stat stat-chip"/);
  assert.match(html, /庄园管家/);
  assert.match(browserJs, /icon:\s*"🏋️"/);
  assert.match(browserJs, /icon:\s*"🧘"/);
  assert.match(css, /\.lovable-shell\s*{/);
  assert.match(css, /\.stat-chip\s*{/);
  assert.match(css, /\.manor-scene\s*{[^}]*min-height:\s*540px/s);
});

test("page adopts the light warm blue-green portfolio skin", () => {
  assert.match(css, /Light blue-green warm portfolio skin/);
  assert.match(css, /--lake:\s*#9bdfee/);
  assert.match(css, /--green-dark:\s*#126c68/);
  assert.match(css, /--blush:\s*#f8cfda/);
  assert.match(css, /\.portfolio-assets\s*{/);
});
