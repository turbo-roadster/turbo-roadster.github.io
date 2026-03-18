# GitHub Pages 部署指南

## 前置要求

1. 拥有 GitHub 账号
2. 创建一个 GitHub 仓库
3. 将代码推送到仓库

## 部署步骤

### 1. 配置 base 路径

根据你的部署方式，修改 `docs/.vitepress/config.ts` 中的 `base` 配置：

#### 方式 A: 部署到用户/组织站点

如果部署到 `https://<USERNAME>.github.io/`：

```typescript
export default defineConfig({
  base: '/',
  // ...其他配置
})
```

#### 方式 B: 部署到项目站点

如果部署到 `https://<USERNAME>.github.io/<REPO>/`：

```typescript
export default defineConfig({
  base: '/<REPO>/',  // 例如: '/frontend-vitepress/'
  // ...其他配置
})
```

### 2. 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/<USERNAME>/<REPO>.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到 main 分支
git push -u origin main
```

### 3. 配置 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 `Settings` (设置)
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 下选择 `GitHub Actions`

### 4. 触发部署

部署会在以下情况自动触发：

- 推送代码到 `main` 分支
- 手动触发工作流

#### 手动触发部署

1. 进入仓库的 `Actions` 标签页
2. 选择 `Deploy to GitHub Pages` 工作流
3. 点击 `Run workflow` 按钮
4. 选择 `main` 分支
5. 点击 `Run workflow` 确认

### 5. 查看部署状态

1. 在 `Actions` 标签页可以看到工作流的运行状态
2. 点击具体的工作流运行可以查看详细日志
3. 部署成功后，可以通过以下地址访问：
   - 用户站点: `https://<USERNAME>.github.io/`
   - 项目站点: `https://<USERNAME>.github.io/<REPO>/`

## 工作流说明

`.github/workflows/deploy.yml` 文件定义了自动部署流程：

1. **触发条件**: 推送到 main 分支或手动触发
2. **构建步骤**:
   - 检出代码
   - 设置 Node.js 18 环境
   - 安装依赖
   - 构建 VitePress 站点
   - 上传构建产物
3. **部署步骤**:
   - 将构建产物部署到 GitHub Pages

## 常见问题

### Q: 部署后页面显示 404

**A**: 检查以下几点：

1. 确认 `base` 配置是否正确
2. 确认 GitHub Pages 设置中的 Source 是否选择了 `GitHub Actions`
3. 查看 Actions 日志，确认构建和部署是否成功

### Q: 样式或资源加载失败

**A**: 这通常是 `base` 路径配置不正确导致的：

- 如果部署到 `https://<USERNAME>.github.io/<REPO>/`，确保 `base` 设置为 `'/<REPO>/'`
- 如果部署到 `https://<USERNAME>.github.io/`，确保 `base` 设置为 `'/'`

### Q: 如何更新网站内容

**A**: 只需要：

1. 修改 Markdown 文件或配置
2. 提交并推送到 main 分支
3. GitHub Actions 会自动重新构建和部署

### Q: 构建失败

**A**: 查看 Actions 日志，常见原因：

1. Node.js 版本不兼容（需要 >= 18）
2. 依赖安装失败
3. Markdown 文件语法错误
4. 配置文件错误

## 本地预览

在推送到 GitHub 之前，建议先本地预览：

```bash
# 开发模式（热更新）
npm run docs:dev

# 构建并预览
npm run docs:build
npm run docs:preview
```

## 自定义域名（可选）

如果你有自己的域名：

1. 在仓库根目录创建 `docs/public/CNAME` 文件
2. 文件内容为你的域名，例如: `example.com`
3. 在域名提供商处配置 DNS 记录：
   - 类型: `CNAME`
   - 名称: `www` 或 `@`
   - 值: `<USERNAME>.github.io`
4. 推送代码，等待 DNS 生效（可能需要几分钟到几小时）

## 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [GitHub Pages 文档](https://docs.github.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)
