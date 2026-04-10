# 特朗普模拟器 (Trump Simulator)

🎮 **在线试玩**: https://[你的用户名].github.io/trump-game/

一个讽刺风格的文字冒险游戏，扮演唐纳德·特朗普，体验总统生涯中的道德困境。

## 游戏简介

恭喜你，唐纳德·J·特朗普！你再次赢得了美国总统大选。现在，你拥有世界上最强大的权力——以及最庞大的内幕信息来源。

### 游戏目标（二选一）

1. **💰 贪婪总统**: 任期内通过内幕交易赚取 **1 万亿美元**
2. **🕊️ 人民总统**: 卸任时获得 **80%+ 民众支持率**（且从未进行内幕交易）

## 游戏特色

- 🎭 **7个剧情关卡**: 关税炸弹、加密货币、美联储、马斯克、战争边缘、美元危机、最后的大单
- 🗳️ **2次中期选举**: 威望检查影响游戏进程
- 🏆 **6种结局**: 华尔街之狼、人民总统、铁窗泪、碌碌无为、被弹劾、双面人（隐藏结局）
- 🎨 **Q版特朗普形象**: 金毛+西装+红领带
- 🌐 **中英双语**: 支持中文/英文切换
- 📸 **分享卡片**: 结局生成分享图片，带二维码
- 💾 **本地存档**: 自动保存游戏进度

## 技术栈

- **框架**: Next.js 16 + React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **状态管理**: Zustand + Persist
- **图表**: Recharts

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 构建输出在 dist/ 目录
```

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 GitHub 创建名为 `trump-game` 的仓库。

### 2. 推送代码

```bash
cd trump-game
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[你的用户名]/trump-game.git
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "main"，文件夹选择 "/dist"
4. 点击 Save

或使用 GitHub Actions 自动部署 (已配置在 `.github/workflows/deploy.yml`)

## 项目结构

```
trump-game/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React 组件
│   ├── TrumpAvatar.tsx    # 特朗普Q版头像
│   ├── IntroScreen.tsx    # 开场界面
│   ├── CharacterCreation.tsx  # 角色创建
│   ├── StoryScreen.tsx    # 剧情界面
│   ├── ElectionScreen.tsx # 选举检查
│   ├── EndingScreen.tsx   # 结局界面
│   └── StockChart.tsx     # 股市图表
├── store/                 # 状态管理
│   └── gameStore.ts       # Zustand store
├── data/                  # 游戏数据
│   ├── gameData.ts        # 关卡数据
│   └── endings.ts         # 结局数据
├── types/                 # TypeScript 类型
│   └── game.ts
└── dist/                  # 构建输出
```

## 游戏机制

### 初始加点系统

可用100点政治资本兑换：
- 📺 媒体掌控 (20点): 消息传播效果 +20%
- 💰 商业直觉 (25点): 投资成功率 +25%
- 🏛️ 政治人脉 (20点): 解锁特殊选项
- 🎭 演讲天赋 (15点): 民众支持率 +15%
- 🔒 保密能力 (20点): 被发现概率 -30%
- 💵 启动资金 (15点): 起始资金 +300万

### 胜利条件

**贪婪路线**: 资产 ≥ $1万亿 + 好总统积分 ≤ 2

**好总统路线**: 威望 ≥ 80% + 好总统积分 ≥ 4 + 内幕交易次数 = 0

**隐藏结局**: 资产 ≥ $5000亿 + 好总统积分 ≥ 2 + 从未被发现

### 失败条件

- 被发现次数 ≥ 3 或 调查进度 = 100% → **被捕结局**
- 威望 ≤ 0% → **被弹劾结局**
- 连续两次中期选举威望不足 → **提前结束**

## 免责声明

本游戏纯属虚构，仅供娱乐。如有雷同，纯属巧合。

游戏中的人物、事件均为艺术创作，不代表真实情况。

## License

MIT License
