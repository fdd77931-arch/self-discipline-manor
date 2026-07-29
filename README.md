# 自律庄园｜自律成长 × 公益贡献作品集

这是一个可以直接上传到 GitHub Pages 的产品作品集 Demo。用户通过完成每日自律任务获得金币、经验和公益能量：金币用于装扮自己的庄园，公益能量可投入综合公益项目池，形成“自律行为 - 即时奖励 - 庄园建设 - 公益贡献 - 再行动”的产品闭环。

## 在线展示方式

上传到 GitHub 后，可以在仓库设置里开启 GitHub Pages：

1. 进入仓库 `Settings`
2. 打开 `Pages`
3. `Source` 选择 `Deploy from a branch`
4. `Branch` 选择 `main`，目录选择 `/root`
5. 保存后等待生成链接

因为本文件夹根目录已经包含 `index.html`，所以不需要额外构建。

## 本地打开

直接用浏览器打开：

```text
index.html
```

页面数据会保存在浏览器本地。可以点击页面里的“重置今日”重新演示当天打卡，也可以点击“清空演示”回到初始状态。

## 展示材料

页面底部的“展示材料”模块包含三类补充内容：

- `assets/posters/self-manor-concept-poster.png`：蓝绿色概念海报，可作为简历作品集截图或项目封面。
- `slides/html-ppt/index.html`：科技感作品集答辩网页 PPT，适合产品面试讲述。
- `slides/guizang-ppt/index.html`：瑞士风横向网页 PPT，适合快速展示项目价值和闭环结构。

## Demo 功能

- 今日打卡：健身、冥想、阅读、学习、早睡、日记。
- 成长反馈：金币、等级、经验、连续天数、公益能量和今日进度。
- 庄园画布：庭院和小屋双场景，点击房门进出。
- 自由装扮：购买后的物品可以拖动摆放，位置保存在本地。
- 房屋升级：用金币升级房子，强化长期成长感。
- 公益项目池：动物救助、困境助学、灾区援助、环保植树、医疗援助。
- 新手引导：引导体验者走完打卡、公益投入、购买、摆放的核心路径。
- 数据闭环：展示核心路径完成率、打卡次数、公益投入、购买、摆放和房屋升级等本地演示指标。
- AI 管家反馈：用自然语言解释结果、鼓励行动、提示下一步。
- 作品说明：页面下方展示用户痛点、产品机制、MVP 取舍、指标意识和迭代记录。

## 文件结构

```text
.
├── index.html
├── styles.css
├── app.browser.js
├── app.js
├── package.json
├── README.md
├── assets
│   └── posters
│       └── self-manor-concept-poster.png
├── docs
│   ├── PRD.md
│   ├── portfolio-case.md
│   └── demo-readme.md
├── slides
│   ├── html-ppt
│   │   └── index.html
│   └── guizang-ppt
│       └── index.html
└── tests
    ├── self-discipline-manor-state.test.mjs
    └── self-discipline-manor-ui.test.mjs
```

## 验证方式

如果本机安装了 Node.js，可以运行：

```bash
npm test
```

测试覆盖产品状态逻辑、公益能量闭环、商店购买、物品摆放、房屋升级、新手引导、数据闭环和 UI 关键内容。

## 作品集定位

这个项目适合作为产品经理/AI 产品方向作品集，重点展示：

- 从用户痛点出发定义产品机会。
- 将 AI Agent 能力产品化，而不是只做聊天入口。
- 用游戏化反馈提升自律行为的即时奖励。
- 用公益能量设计社会价值闭环。
- 用本地行为指标表达数据意识和迭代意识。

公益模块当前是作品集模拟闭环，不涉及真实支付或真实捐赠承诺。真实落地版本需要接入合规公益机构、品牌配捐、公开凭证和捐赠记录追踪。
