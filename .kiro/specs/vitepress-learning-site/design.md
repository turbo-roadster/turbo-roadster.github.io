# 设计文档

## 概述

本设计文档描述了基于 VitePress 的前端学习网站的技术架构和实现方案。该网站将提供系统化的前端知识内容，具有清晰的导航结构、优雅的界面设计，并支持自动化部署到 GitHub Pages。

设计参考了 https://interview.poetries.top/ 的界面风格，采用现代化的卡片式布局、清晰的模块分类和友好的用户交互体验。

## 架构

### 技术栈

- **VitePress**: 静态站点生成器（基于 Vite 和 Vue 3）
- **Vue 3**: 用于自定义组件和主题
- **TypeScript**: 类型安全的配置和组件开发
- **GitHub Actions**: 自动化部署流程
- **GitHub Pages**: 静态网站托管

### 项目结构

```
vitepress-learning-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts           # VitePress 配置文件
│   │   ├── theme/
│   │   │   ├── index.ts        # 自定义主题入口
│   │   │   ├── style/
│   │   │   │   └── custom.css  # 自定义样式
│   │   │   └── components/     # 自定义 Vue 组件
│   │   │       ├── HomeHero.vue
│   │   │       ├── FeatureCard.vue
│   │   │       └── CategoryGrid.vue
│   ├── public/                 # 静态资源
│   ├── index.md                # 首页
│   ├── basics/                 # 基础篇
│   │   └── index.md
│   ├── advanced/               # 进阶篇
│   │   └── index.md
│   ├── interview/              # 面试篇
│   │   └── index.md
│   └── algorithms/             # 算法篇
│       └── index.md
├── package.json
└── README.md
```

### 架构层次

1. **内容层**: Markdown 文件组织的学习内容
2. **构建层**: VitePress 静态站点生成
3. **主题层**: 自定义 Vue 组件和样式
4. **部署层**: GitHub Actions 自动化部署

## 组件和接口

### VitePress 配置接口

```typescript
// .vitepress/config.ts
interface SiteConfig {
  title: string;
  description: string;
  base: string;
  themeConfig: ThemeConfig;
  head: HeadConfig[];
}

interface ThemeConfig {
  nav: NavItem[];
  sidebar: SidebarConfig;
  socialLinks: SocialLink[];
  footer: FooterConfig;
  search: SearchConfig;
}

interface NavItem {
  text: string;
  link?: string;
  items?: NavItem[];
}

interface SidebarConfig {
  [path: string]: SidebarItem[];
}

interface SidebarItem {
  text: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}
```

### 自定义组件

#### HomeHero 组件
首页英雄区域，展示网站标题、描述和主要行动按钮。

```typescript
interface HeroProps {
  title: string;
  tagline: string;
  actions: ActionButton[];
}

interface ActionButton {
  text: string;
  link: string;
  theme: 'brand' | 'alt';
}
```

#### FeatureCard 组件
功能特性卡片，用于展示网站的主要功能模块。

```typescript
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}
```

#### CategoryGrid 组件
分类网格布局，展示学习内容的不同分类。

```typescript
interface CategoryGridProps {
  categories: Category[];
  columns: number;
}

interface Category {
  title: string;
  description: string;
  icon: string;
  link: string;
  badge?: string;
}
```

### 导航配置

```typescript
const navConfig: NavItem[] = [
  { text: '首页', link: '/' },
  { text: '基础篇', link: '/basics/' },
  { text: '进阶篇', link: '/advanced/' },
  { text: '面试篇', link: '/interview/' },
  { text: '算法篇', link: '/algorithms/' },
  {
    text: '更多',
    items: [
      { text: '关于', link: '/about' },
      { text: 'GitHub', link: 'https://github.com/...' }
    ]
  }
];
```

### 侧边栏配置

```typescript
const sidebarConfig: SidebarConfig = {
  '/basics/': [
    {
      text: 'HTML',
      collapsed: false,
      items: [
        { text: '语义化标签', link: '/basics/html/semantic' },
        { text: '表单元素', link: '/basics/html/forms' }
      ]
    },
    {
      text: 'CSS',
      collapsed: false,
      items: [
        { text: '盒模型', link: '/basics/css/box-model' },
        { text: 'Flexbox', link: '/basics/css/flexbox' }
      ]
    }
  ],
  '/advanced/': [
    // 进阶内容侧边栏配置
  ]
};
```

## 数据模型

### 内容组织模型

```typescript
interface ContentStructure {
  categories: ContentCategory[];
}

interface ContentCategory {
  id: string;
  name: string;
  path: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  articles: Article[];
}

interface Article {
  title: string;
  path: string;
  description?: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}
```

### 配置模型

```typescript
interface DeploymentConfig {
  repository: string;
  branch: string;
  basePath: string;
  buildCommand: string;
  outputDir: string;
}

interface BuildConfig {
  outDir: string;
  assetsDir: string;
  minify: boolean;
  sourcemap: boolean;
}
```

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的形式化陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*


### 属性 1: 所有内容文件使用 Markdown 格式

*对于任何*内容文件，其文件扩展名应该是 `.md`，确保内容以 Markdown 格式组织。

**验证: 需求 3.1**

### 属性 2: 项目结构完整性

*对于任何*成功初始化的项目，应该包含以下关键文件和目录：
- `package.json` 包含 VitePress 依赖
- `.vitepress/config.ts` 配置文件
- 内容目录结构（basics/, advanced/, interview/, algorithms/）
- GitHub Actions 工作流文件

**验证: 需求 1.1, 1.2, 1.3, 3.5, 5.1**

### 属性 3: 配置完整性

*对于任何*有效的 VitePress 配置，应该包含：
- 站点元数据（title, description）
- 导航配置（nav）
- 侧边栏配置（sidebar）
- 搜索配置（search）

**验证: 需求 8.1, 8.2, 8.3, 8.4**

### 属性 4: 构建输出有效性

*对于任何*成功的生产构建，输出目录应该包含：
- 静态 HTML 文件
- 优化的 CSS 和 JavaScript 资源
- 所有必需的静态资源

**验证: 需求 7.1, 7.5**

### 属性 5: 部署配置正确性

*对于任何*GitHub Pages 部署配置，应该：
- 包含正确的 base 路径设置
- 指定正确的输出目录
- 配置自动化构建和部署流程

**验证: 需求 5.3, 5.4**

## 错误处理

### 配置错误

- **无效的配置文件**: 如果 config.ts 包含语法错误，VitePress 将在启动时报错并提供错误信息
- **缺失的必需字段**: 配置验证将检查必需字段，缺失时提供清晰的错误消息
- **无效的路径**: 导航或侧边栏中的无效链接将在构建时生成警告

### 内容错误

- **Markdown 语法错误**: VitePress 将尝试解析并在可能的情况下渲染，严重错误会在构建时报告
- **断开的链接**: 构建过程将检测内部链接的有效性，报告 404 链接
- **缺失的资源**: 引用的图片或文件不存在时，构建将发出警告

### 构建错误

- **依赖问题**: 缺失或版本不兼容的依赖将在安装或构建时报错
- **内存不足**: 大型站点构建可能遇到内存限制，需要调整 Node.js 内存设置
- **文件系统错误**: 权限问题或磁盘空间不足将导致构建失败

### 部署错误

- **GitHub Actions 失败**: 工作流配置错误或权限问题将导致部署失败，可在 Actions 日志中查看详情
- **Base 路径错误**: 错误的 base 配置将导致资源加载失败，需要检查 GitHub Pages 设置
- **分支保护**: 如果目标分支有保护规则，可能需要调整工作流权限

## 测试策略

### 单元测试

虽然 VitePress 项目主要是配置和内容，但我们可以对以下方面进行测试：

1. **配置验证测试**
   - 验证配置文件的结构和必需字段
   - 测试导航和侧边栏配置的有效性
   - 检查路径和链接的正确性

2. **文件结构测试**
   - 验证必需的目录和文件存在
   - 检查内容文件的格式（.md 扩展名）
   - 验证静态资源的组织

3. **构建测试**
   - 测试构建命令能够成功执行
   - 验证输出目录包含预期的文件
   - 检查生成的 HTML 文件的有效性

### 属性测试

由于这是一个配置驱动的静态站点项目，属性测试主要关注配置和文件结构的不变性：

1. **配置属性测试**
   - **属性 3**: 对于任何有效配置，必须包含所有必需字段
   - 测试框架: 使用 Node.js 的 assert 或 Vitest
   - 最小迭代次数: 不适用（配置是确定性的）

2. **文件结构属性测试**
   - **属性 1**: 对于任何内容文件，扩展名必须是 .md
   - **属性 2**: 对于任何初始化的项目，必须包含关键文件
   - 测试框架: 使用文件系统检查
   - 最小迭代次数: 不适用（文件结构是确定性的）

3. **构建输出属性测试**
   - **属性 4**: 对于任何成功构建，输出必须包含有效的静态文件
   - 测试框架: 使用构建后的文件系统验证
   - 最小迭代次数: 不适用（构建输出是确定性的）

### 集成测试

1. **开发服务器测试**
   - 启动开发服务器并验证可访问性
   - 测试热模块替换功能
   - 验证路由导航

2. **构建流程测试**
   - 执行完整的生产构建
   - 验证所有页面正确生成
   - 检查资源优化和压缩

3. **部署流程测试**
   - 在测试环境中模拟 GitHub Actions 工作流
   - 验证部署脚本的正确性
   - 测试 GitHub Pages 配置

### 手动测试

1. **UI/UX 测试**
   - 验证主题样式和响应式设计
   - 测试导航和搜索功能
   - 检查不同设备和浏览器的兼容性

2. **内容测试**
   - 验证 Markdown 渲染效果
   - 检查代码高亮和自定义容器
   - 测试图片和链接的正确性

3. **性能测试**
   - 测量页面加载时间
   - 检查资源大小和优化效果
   - 验证搜索性能

### 测试工具

- **Vitest**: 用于单元测试和配置验证
- **Playwright**: 用于端到端测试（可选）
- **Lighthouse**: 用于性能和 SEO 测试
- **GitHub Actions**: 用于 CI/CD 自动化测试

### 测试覆盖目标

由于这是一个配置驱动的项目，测试重点在于：
- 100% 的配置文件验证
- 100% 的关键文件结构检查
- 成功的构建和部署流程验证
- 主要用户路径的端到端测试

## 实现注意事项

### VitePress 版本

使用 VitePress 1.x 最新稳定版本，确保获得最新功能和性能优化。

### 自定义主题

虽然使用 VitePress 默认主题作为基础，但需要通过自定义 CSS 和组件来实现参考网站的设计风格：
- 卡片式布局
- 渐变色彩方案
- 图标和徽章
- 动画效果

### 内容组织

采用清晰的目录结构，每个主要分类一个目录，使用 index.md 作为分类首页。

### SEO 优化

- 配置适当的 meta 标签
- 生成 sitemap.xml
- 使用语义化的 HTML 结构
- 优化页面标题和描述

### 性能优化

- 启用代码分割和懒加载
- 优化图片资源（使用 WebP 格式）
- 配置适当的缓存策略
- 最小化 CSS 和 JavaScript

### 可访问性

- 使用语义化的 HTML 标签
- 提供适当的 ARIA 标签
- 确保键盘导航支持
- 保持良好的颜色对比度
