# 构建说明

## Node.js 版本要求

VitePress 1.x 要求 Node.js 版本 >= 18.0.0

当前系统 Node.js 版本: v16.19.0

## 解决方案

### 方案 1: 升级 Node.js（推荐）

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载并安装 Node.js 18.x 或更高版本
3. 重新运行构建命令

### 方案 2: 使用 nvm 管理 Node.js 版本

```bash
# 安装 nvm (Windows 使用 nvm-windows)
# https://github.com/coreybutler/nvm-windows

# 安装 Node.js 18
nvm install 18

# 使用 Node.js 18
nvm use 18

# 重新安装依赖
npm install

# 运行构建
npm run docs:build
```

## 构建命令

```bash
# 开发模式
npm run docs:dev

# 生产构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 验证构建

构建成功后，运行验证脚本：

```bash
node scripts/verify-build.js
```

## 项目结构

```
frontend-vitepress/
├── docs/                    # 文档源文件
│   ├── .vitepress/         # VitePress 配置
│   │   ├── config.ts       # 站点配置
│   │   ├── theme/          # 自定义主题
│   │   └── dist/           # 构建输出（生成）
│   ├── basics/             # 基础篇
│   ├── advanced/           # 进阶篇
│   ├── interview/          # 面试篇
│   ├── algorithms/         # 算法篇
│   └── index.md            # 首页
├── scripts/                # 验证脚本
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 注意事项

1. 确保 Node.js 版本 >= 18.0.0
2. 首次运行需要执行 `npm install` 安装依赖
3. 开发时使用 `npm run docs:dev`，会自动热更新
4. 部署前使用 `npm run docs:build` 生成静态文件
