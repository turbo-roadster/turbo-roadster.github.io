# HTML 语义化标签

## 什么是语义化标签

语义化标签是指使用有明确含义的 HTML 标签来构建网页结构，让标签本身就能表达内容的含义。

## 常见的语义化标签

### 结构标签

- `<header>`: 页面或区域的头部
- `<nav>`: 导航链接区域
- `<main>`: 文档的主要内容
- `<article>`: 独立的文章内容
- `<section>`: 文档中的节或区域
- `<aside>`: 侧边栏内容
- `<footer>`: 页面或区域的底部

### 内容标签

- `<h1>` - `<h6>`: 标题
- `<p>`: 段落
- `<figure>`: 图片、图表等内容
- `<figcaption>`: 图片说明
- `<time>`: 时间
- `<mark>`: 高亮文本

## 示例代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>语义化示例</title>
</head>
<body>
  <header>
    <h1>网站标题</h1>
    <nav>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/about">关于</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>文章标题</h2>
      <p>文章内容...</p>
      <time datetime="2024-01-01">2024年1月1日</time>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2024 版权所有</p>
  </footer>
</body>
</html>
```

## 语义化的优势

::: tip 优势
1. **可读性更好**: 代码结构清晰，易于理解和维护
2. **SEO 友好**: 搜索引擎更容易理解页面结构和内容
3. **可访问性**: 屏幕阅读器等辅助工具能更好地解析内容
4. **团队协作**: 统一的语义化标准便于团队开发
:::

## 最佳实践

1. 使用 `<header>` 而不是 `<div class="header">`
2. 使用 `<nav>` 包裹导航链接
3. 主要内容使用 `<main>` 标签
4. 独立的内容块使用 `<article>`
5. 相关内容分组使用 `<section>`

::: warning 注意
不要过度使用语义化标签，在不确定的情况下，使用 `<div>` 和 `<span>` 也是可以的。
:::
