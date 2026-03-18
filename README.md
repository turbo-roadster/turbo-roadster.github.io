# AI全栈之路

> 系统化的AI全栈学习网站，从基础到进阶，助力AI全栈开发者成长

## 项目简介

AI全栈之路是一个基于 VitePress 构建的AI全栈学习平台，提供系统化的前端知识内容和AI技术学习路径，包括基础知识、进阶技术、面试题库和算法训练。

## 特性

- 📚 **系统化知识体系**: 从基础到进阶，完整的学习路径
- 🎯 **实战导向**: 每个知识点都配有实用的代码示例
- 🔍 **全文搜索**: 快速查找所需内容
- 🌓 **主题切换**: 支持亮色和暗色主题
- 📱 **响应式设计**: 完美适配各种设备
- 🚀 **性能优化**: 快速加载，流畅体验

## 内容模块

### 📖 基础篇

- HTML 语义化标签、表单元素、HTML5 新特性
- CSS 盒模型、Flexbox、Grid、响应式设计
- JavaScript 基础语法、数据类型、函数、异步编程

### 🚀 进阶篇

- 框架原理：React、Vue、虚拟 DOM、状态管理
- 工程化：Webpack、Vite、模块化、自动化测试
- 性能优化：加载优化、运行时优化、网络优化

### 💼 面试篇

- JavaScript 面试题：闭包、原型、异步、ES6+
- CSS 面试题：布局、选择器、BFC
- 框架面试题：React、Vue、状态管理

### 🧮 算法篇

- 数据结构：数组、链表、栈、队列、树、图
- 算法思想：排序、查找、动态规划、贪心、回溯

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [GitHub Pages](https://pages.github.com/) - 静态网站托管

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看网站

### 构建生产版本

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

## 项目结构

```
frontend-vitepress/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts           # VitePress 配置
│   │   ├── theme/              # 自定义主题
│   │   │   ├── index.ts        # 主题入口
│   │   │   └── style/
│   │   │       └── custom.css  # 自定义样式
│   │   └── dist/               # 构建输出（自动生成）
│   ├── public/                 # 静态资源
│   ├── basics/                 # 基础篇
│   ├── advanced/               # 进阶篇
│   ├── interview/              # 面试篇
│   ├── algorithms/             # 算法篇
│   ├── about.md                # 关于页面
│   └── index.md                # 首页
├── scripts/                    # 验证脚本
│   ├── verify-structure.js     # 验证项目结构
│   ├── verify-config.js        # 验证配置
│   ├── verify-content.js       # 验证内容文件
│   ├── verify-build.js         # 验证构建输出
│   └── verify-deployment.js    # 验证部署配置
├── .gitignore                  # Git 忽略文件
├── package.json                # 项目配置
├── BUILD_NOTES.md              # 构建说明
├── DEPLOYMENT.md               # 部署指南
└── README.md                   # 项目说明
```

## 部署

本项目支持自动部署到 GitHub Pages。详细步骤请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)。

### 快速部署

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages (Source: GitHub Actions)
3. 推送代码到 main 分支会自动触发部署

## 贡献指南

欢迎贡献内容和改进建议！

### 添加新内容

1. Fork 本仓库
2. 创建新的 Markdown 文件
3. 在 `docs/.vitepress/config.ts` 中添加导航配置
4. 提交 Pull Request

### 内容规范

- 使用 Markdown 格式编写
- 代码示例要完整可运行
- 添加适当的代码注释
- 使用自定义容器（tip、warning、danger）突出重点

## 验证脚本

项目提供了多个验证脚本，确保代码质量：

```bash
# 验证项目结构
node scripts/verify-structure.js

# 验证配置完整性
node scripts/verify-config.js

# 验证内容文件格式
node scripts/verify-content.js

# 验证构建输出（需要先构建）
node scripts/verify-build.js

# 验证部署配置
node scripts/verify-deployment.js
```

## 常见问题

### Node.js 版本问题

如果遇到构建错误，请确保 Node.js 版本 >= 18.0.0：

```bash
node --version
```

如果版本过低，请升级 Node.js 或使用 nvm 管理版本。详见 [BUILD_NOTES.md](./BUILD_NOTES.md)。

### 样式或资源加载失败

检查 `docs/.vitepress/config.ts` 中的 `base` 配置是否正确：

- 部署到 `https://<USERNAME>.github.io/`: `base: '/'`
- 部署到 `https://<USERNAME>.github.io/<REPO>/`: `base: '/<REPO>/'`

## 许可证

MIT License

## 联系方式

- GitHub Issues: 提交问题和建议
- Email: 邮件反馈

---

**让我们一起在AI全栈之路中不断成长！** 🚀
