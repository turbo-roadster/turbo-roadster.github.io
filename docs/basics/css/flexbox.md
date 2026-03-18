# Flexbox 布局

## 什么是 Flexbox

Flexbox（弹性盒子布局）是 CSS3 引入的一种一维布局模型，用于在容器中分配空间和对齐项目。

## 基本概念

### 容器和项目

- **Flex 容器**: 设置了 `display: flex` 或 `display: inline-flex` 的元素
- **Flex 项目**: Flex 容器的直接子元素

### 主轴和交叉轴

- **主轴 (main axis)**: Flex 项目排列的方向
- **交叉轴 (cross axis)**: 垂直于主轴的方向

## 容器属性

### flex-direction

定义主轴的方向：

```css
.container {
  display: flex;
  flex-direction: row; /* 默认值，水平方向 */
  /* flex-direction: row-reverse; 水平反向 */
  /* flex-direction: column; 垂直方向 */
  /* flex-direction: column-reverse; 垂直反向 */
}
```

### justify-content

定义项目在主轴上的对齐方式：

```css
.container {
  justify-content: flex-start; /* 默认值，左对齐 */
  /* justify-content: flex-end; 右对齐 */
  /* justify-content: center; 居中 */
  /* justify-content: space-between; 两端对齐 */
  /* justify-content: space-around; 均匀分布 */
  /* justify-content: space-evenly; 完全均匀分布 */
}
```

### align-items

定义项目在交叉轴上的对齐方式：

```css
.container {
  align-items: stretch; /* 默认值，拉伸填充 */
  /* align-items: flex-start; 顶部对齐 */
  /* align-items: flex-end; 底部对齐 */
  /* align-items: center; 居中对齐 */
  /* align-items: baseline; 基线对齐 */
}
```

## 项目属性

### flex-grow

定义项目的放大比例：

```css
.item {
  flex-grow: 0; /* 默认值，不放大 */
  /* flex-grow: 1; 平均分配剩余空间 */
}
```

### flex-shrink

定义项目的缩小比例：

```css
.item {
  flex-shrink: 1; /* 默认值，空间不足时缩小 */
  /* flex-shrink: 0; 不缩小 */
}
```

### flex-basis

定义项目的初始大小：

```css
.item {
  flex-basis: auto; /* 默认值 */
  /* flex-basis: 200px; 固定宽度 */
  /* flex-basis: 50%; 百分比 */
}
```

## 实战示例

### 水平居中布局

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

### 三栏布局

```css
.container {
  display: flex;
}

.sidebar {
  flex: 0 0 200px; /* 固定宽度 */
}

.main {
  flex: 1; /* 占据剩余空间 */
}

.aside {
  flex: 0 0 300px; /* 固定宽度 */
}
```

### 响应式导航

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
  }
}
```

## 常见应用场景

::: tip 适用场景
1. 导航栏布局
2. 卡片列表
3. 垂直居中
4. 等高布局
5. 响应式布局
:::

## 浏览器兼容性

现代浏览器都支持 Flexbox，但需要注意：

- IE 10-11 需要 `-ms-` 前缀
- 旧版 Safari 需要 `-webkit-` 前缀

::: warning 兼容性提示
如果需要支持 IE 9 及以下版本，建议使用传统布局方式。
:::
