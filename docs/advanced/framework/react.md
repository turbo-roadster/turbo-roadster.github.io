# React 核心原理

## React 简介

React 是由 Facebook 开发的用于构建用户界面的 JavaScript 库。它采用组件化的开发方式，通过虚拟 DOM 提高性能。

## 核心概念

### 1. 虚拟 DOM (Virtual DOM)

虚拟 DOM 是 React 的核心机制之一：

```javascript
// JSX 会被转换为虚拟 DOM
const element = <h1>Hello, World!</h1>;

// 实际上是
const element = React.createElement(
  'h1',
  null,
  'Hello, World!'
);

// 虚拟 DOM 对象
{
  type: 'h1',
  props: {
    children: 'Hello, World!'
  }
}
```

::: tip 虚拟 DOM 的优势
1. **性能优化**: 减少直接操作真实 DOM
2. **跨平台**: 可以渲染到不同平台（Web、Native）
3. **批量更新**: 合并多次更新，减少重绘
:::

### 2. Diff 算法

React 使用 Diff 算法来比较新旧虚拟 DOM，找出最小的变更：

```javascript
// 旧虚拟 DOM
<ul>
  <li key="1">Item 1</li>
  <li key="2">Item 2</li>
</ul>

// 新虚拟 DOM
<ul>
  <li key="1">Item 1</li>
  <li key="2">Item 2 Updated</li>
  <li key="3">Item 3</li>
</ul>

// Diff 结果：只更新第二个 li 的文本，添加第三个 li
```

**Diff 算法的三个策略**：

1. **Tree Diff**: 只比较同层级节点
2. **Component Diff**: 相同类型的组件才比较
3. **Element Diff**: 使用 key 优化列表比较

::: warning Key 的重要性
在列表渲染中，key 帮助 React 识别哪些元素改变了：

```javascript
// ❌ 不推荐：使用 index 作为 key
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

// ✅ 推荐：使用唯一 ID
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```
:::

### 3. Fiber 架构

React 16 引入了 Fiber 架构，实现了可中断的渲染：

```javascript
// Fiber 节点结构
{
  type: 'div',
  props: { className: 'container' },
  child: FiberNode,      // 第一个子节点
  sibling: FiberNode,    // 下一个兄弟节点
  return: FiberNode,     // 父节点
  alternate: FiberNode,  // 对应的旧 Fiber 节点
  effectTag: 'UPDATE'    // 副作用标记
}
```

**Fiber 的优势**：

- 可中断的渲染过程
- 优先级调度
- 时间切片 (Time Slicing)
- 并发模式 (Concurrent Mode)

### 4. Hooks 原理

Hooks 让函数组件拥有状态和生命周期：

```javascript
// useState 的简化实现
let state = [];
let setters = [];
let cursor = 0;

function useState(initialValue) {
  const currentCursor = cursor;
  
  state[currentCursor] = state[currentCursor] || initialValue;
  
  const setter = (newValue) => {
    state[currentCursor] = newValue;
    render(); // 触发重新渲染
  };
  
  setters[currentCursor] = setter;
  cursor++;
  
  return [state[currentCursor], setter];
}

// 使用
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  return (
    <div>
      <p>{name}: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

::: danger Hooks 规则
1. 只在函数组件顶层调用 Hooks
2. 不要在循环、条件或嵌套函数中调用
3. 只在 React 函数组件或自定义 Hooks 中调用

```javascript
// ❌ 错误：条件调用
function Component({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // 错误！
  }
}

// ✅ 正确
function Component({ condition }) {
  const [state, setState] = useState(0);
  if (condition) {
    // 使用 state
  }
}
```
:::

## 渲染流程

### 1. 初始渲染

```javascript
// 1. JSX 转换
<App /> 
  ↓
React.createElement(App)

// 2. 创建 Fiber 树
Root Fiber
  ↓
App Fiber
  ↓
Child Fibers

// 3. 协调 (Reconciliation)
遍历 Fiber 树，标记副作用

// 4. 提交 (Commit)
将变更应用到真实 DOM
```

### 2. 更新流程

```javascript
// 1. 触发更新
setState(newValue)

// 2. 调度更新
scheduleUpdate()

// 3. 协调阶段 (可中断)
- beginWork: 处理当前 Fiber
- completeWork: 完成当前 Fiber

// 4. 提交阶段 (不可中断)
- before mutation: DOM 变更前
- mutation: 执行 DOM 操作
- layout: DOM 变更后
```

## 性能优化

### 1. React.memo

避免不必要的重新渲染：

```javascript
const MyComponent = React.memo(function MyComponent({ value }) {
  return <div>{value}</div>;
});

// 自定义比较函数
const MyComponent = React.memo(
  function MyComponent({ value }) {
    return <div>{value}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
  }
);
```

### 2. useMemo 和 useCallback

```javascript
function Component({ items }) {
  // 缓存计算结果
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  
  // 缓存函数引用
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  
  return <div>{total}</div>;
}
```

### 3. 代码分割

```javascript
// 动态导入
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

## 总结

React 的核心原理包括：

| 概念 | 作用 | 关键点 |
|------|------|--------|
| 虚拟 DOM | 性能优化 | 减少真实 DOM 操作 |
| Diff 算法 | 高效更新 | 同层比较、key 优化 |
| Fiber | 可中断渲染 | 优先级调度、时间切片 |
| Hooks | 状态管理 | 函数组件的能力增强 |

::: tip 学习建议
1. 理解虚拟 DOM 和 Diff 算法的原理
2. 掌握 Hooks 的使用规则和原理
3. 了解 Fiber 架构的设计思想
4. 学习性能优化的最佳实践
:::
