# JavaScript 异步编程

## 什么是异步编程

异步编程是指程序在等待某个操作完成时，可以继续执行其他任务，而不是阻塞等待。

## 为什么需要异步

JavaScript 是单线程语言，如果所有操作都是同步的，会导致：

- 页面卡顿
- 用户体验差
- 资源利用率低

## 异步编程方式

### 1. 回调函数 (Callback)

最基础的异步处理方式：

```javascript
// 定时器回调
setTimeout(() => {
  console.log('1秒后执行');
}, 1000);

// Ajax 回调
function getData(callback) {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => callback(data));
}

getData((data) => {
  console.log(data);
});
```

::: warning 回调地狱
多层嵌套的回调会导致代码难以维护：

```javascript
getData1((data1) => {
  getData2(data1, (data2) => {
    getData3(data2, (data3) => {
      // 回调地狱...
    });
  });
});
```
:::

### 2. Promise

Promise 是 ES6 引入的异步解决方案：

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('成功');
    } else {
      reject('失败');
    }
  }, 1000);
});

// 使用 Promise
promise
  .then(result => {
    console.log(result); // '成功'
    return '下一步';
  })
  .then(result => {
    console.log(result); // '下一步'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('完成');
  });
```

### 3. Async/Await

ES2017 引入的语法糖，让异步代码看起来像同步代码：

```javascript
// 定义异步函数
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 使用异步函数
async function main() {
  const data = await fetchData();
  console.log(data);
}

main();
```

## Promise 常用方法

### Promise.all()

并行执行多个 Promise，全部成功才成功：

```javascript
const promise1 = fetch('/api/user');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([user, posts, comments]) => {
    console.log('全部请求完成');
  })
  .catch(error => {
    console.error('有请求失败:', error);
  });
```

### Promise.race()

返回最快完成的 Promise：

```javascript
const timeout = new Promise((_, reject) => {
  setTimeout(() => reject('超时'), 5000);
});

const request = fetch('/api/data');

Promise.race([request, timeout])
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Promise.allSettled()

等待所有 Promise 完成（无论成功或失败）：

```javascript
const promises = [
  fetch('/api/user'),
  fetch('/api/invalid'), // 可能失败
  fetch('/api/posts')
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('成功:', result.value);
      } else {
        console.log('失败:', result.reason);
      }
    });
  });
```

## 实战示例

### 顺序执行异步任务

```javascript
async function sequential() {
  const result1 = await task1();
  const result2 = await task2(result1);
  const result3 = await task3(result2);
  return result3;
}
```

### 并行执行异步任务

```javascript
async function parallel() {
  const [result1, result2, result3] = await Promise.all([
    task1(),
    task2(),
    task3()
  ]);
  return { result1, result2, result3 };
}
```

### 错误处理

```javascript
async function handleErrors() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('请求失败:', error);
    // 返回默认值或重试
    return null;
  }
}
```

## 最佳实践

::: tip 建议
1. 优先使用 `async/await`，代码更清晰
2. 使用 `try/catch` 处理错误
3. 避免在循环中使用 `await`（除非需要顺序执行）
4. 合理使用 `Promise.all()` 提高性能
5. 注意 Promise 的错误处理，避免未捕获的 rejection
:::

## 常见陷阱

### 忘记 await

```javascript
// ❌ 错误：忘记 await
async function wrong() {
  const data = fetchData(); // 返回 Promise，不是数据
  console.log(data); // Promise { <pending> }
}

// ✅ 正确
async function correct() {
  const data = await fetchData();
  console.log(data); // 实际数据
}
```

### 循环中的异步

```javascript
// ❌ 错误：并行执行，但看起来像顺序
async function wrong() {
  const items = [1, 2, 3];
  items.forEach(async (item) => {
    await processItem(item); // 不会等待
  });
}

// ✅ 正确：顺序执行
async function correct() {
  const items = [1, 2, 3];
  for (const item of items) {
    await processItem(item);
  }
}

// ✅ 正确：并行执行
async function parallel() {
  const items = [1, 2, 3];
  await Promise.all(items.map(item => processItem(item)));
}
```

## 总结

异步编程是 JavaScript 的核心特性，掌握 Promise 和 async/await 是现代前端开发的必备技能。
