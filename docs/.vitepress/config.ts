import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI全栈之路",
  description: "系统化的AI全栈学习网站，从基础到进阶，助力AI全栈开发者成长",
  lang: 'zh-CN',
  
  // GitHub Pages 部署配置
  // 如果部署到 https://<USERNAME>.github.io/<REPO>/，则设置 base 为 '/<REPO>/'
  // 如果部署到 https://<USERNAME>.github.io/，则设置 base 为 '/'
  // 请根据你的实际仓库名修改下面的配置
  base: '/',
  
  // Head 配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '前端,学习,面试,算法,JavaScript,Vue,React,HTML,CSS,AI,全栈,人工智能' }],
    ['meta', { name: 'author', content: 'AI全栈之路' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AI全栈之路' }],
    ['meta', { property: 'og:description', content: '系统化的AI全栈学习网站，从基础到进阶，助力AI全栈开发者成长' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],
  
  // 构建配置
  build: {
    outDir: '.vitepress/dist',
    assetsDir: 'assets',
    minify: 'terser',
    chunkSizeWarningLimit: 1000
  },
  
  // 主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '基础篇', link: '/basics/' },
      { text: '进阶篇', link: '/advanced/' },
      { text: '面试篇', link: '/interview/' },
      { text: '算法篇', link: '/algorithms/' },
      {
        text: '更多',
        items: [
          { text: '关于本站', link: '/about' },
          { text: 'GitHub', link: 'https://github.com' }
        ]
      }
    ],

    sidebar: {
      '/basics/': [
        {
          text: '基础篇',
          items: [
            { text: '概述', link: '/basics/' }
          ]
        },
        {
          text: 'HTML',
          collapsed: false,
          items: [
            { text: '语义化标签', link: '/basics/html/semantic' },
            { text: '表单元素', link: '/basics/html/forms' },
            { text: 'HTML5 新特性', link: '/basics/html/html5' }
          ]
        },
        {
          text: 'CSS',
          collapsed: false,
          items: [
            { text: '盒模型', link: '/basics/css/box-model' },
            { text: 'Flexbox 布局', link: '/basics/css/flexbox' },
            { text: 'Grid 布局', link: '/basics/css/grid' },
            { text: '响应式设计', link: '/basics/css/responsive' }
          ]
        },
        {
          text: 'JavaScript',
          collapsed: false,
          items: [
            { text: '基础语法', link: '/basics/javascript/syntax' },
            { text: '数据类型', link: '/basics/javascript/types' },
            { text: '函数与作用域', link: '/basics/javascript/functions' },
            { text: '异步编程', link: '/basics/javascript/async' }
          ]
        }
      ],
      '/advanced/': [
        {
          text: '进阶篇',
          items: [
            { text: '概述', link: '/advanced/' }
          ]
        },
        {
          text: '框架原理',
          collapsed: false,
          items: [
            { text: 'React 核心原理', link: '/advanced/framework/react' },
            { text: 'Vue 响应式系统', link: '/advanced/framework/vue' },
            { text: '虚拟 DOM', link: '/advanced/framework/vdom' },
            { text: '状态管理', link: '/advanced/framework/state' }
          ]
        },
        {
          text: '工程化',
          collapsed: false,
          items: [
            { text: 'Webpack 原理', link: '/advanced/engineering/webpack' },
            { text: 'Vite 原理', link: '/advanced/engineering/vite' },
            { text: '模块化方案', link: '/advanced/engineering/modules' },
            { text: '自动化测试', link: '/advanced/engineering/testing' }
          ]
        },
        {
          text: '性能优化',
          collapsed: false,
          items: [
            { text: '加载性能', link: '/advanced/performance/loading' },
            { text: '运行时性能', link: '/advanced/performance/runtime' },
            { text: '网络优化', link: '/advanced/performance/network' }
          ]
        }
      ],
      '/interview/': [
        {
          text: '面试篇',
          items: [
            { text: '概述', link: '/interview/' }
          ]
        },
        {
          text: 'JavaScript 面试题',
          collapsed: false,
          items: [
            { text: '闭包与作用域', link: '/interview/javascript/closure' },
            { text: '原型与继承', link: '/interview/javascript/prototype' },
            { text: '异步编程', link: '/interview/javascript/async' },
            { text: 'ES6+ 新特性', link: '/interview/javascript/es6' }
          ]
        },
        {
          text: 'CSS 面试题',
          collapsed: false,
          items: [
            { text: '布局实现', link: '/interview/css/layout' },
            { text: '选择器优先级', link: '/interview/css/selector' },
            { text: 'BFC 与 IFC', link: '/interview/css/bfc' }
          ]
        },
        {
          text: '框架面试题',
          collapsed: false,
          items: [
            { text: 'React 面试题', link: '/interview/framework/react' },
            { text: 'Vue 面试题', link: '/interview/framework/vue' },
            { text: '状态管理', link: '/interview/framework/state' }
          ]
        }
      ],
      '/algorithms/': [
        {
          text: '算法篇',
          items: [
            { text: '概述', link: '/algorithms/' }
          ]
        },
        {
          text: '数据结构',
          collapsed: false,
          items: [
            { text: '数组', link: '/algorithms/data-structure/array' },
            { text: '链表', link: '/algorithms/data-structure/linked-list' },
            { text: '栈和队列', link: '/algorithms/data-structure/stack-queue' },
            { text: '树', link: '/algorithms/data-structure/tree' },
            { text: '图', link: '/algorithms/data-structure/graph' }
          ]
        },
        {
          text: '算法思想',
          collapsed: false,
          items: [
            { text: '排序算法', link: '/algorithms/algorithm/sorting' },
            { text: '查找算法', link: '/algorithms/algorithm/searching' },
            { text: '动态规划', link: '/algorithms/algorithm/dp' },
            { text: '贪心算法', link: '/algorithms/algorithm/greedy' },
            { text: '回溯算法', link: '/algorithms/algorithm/backtracking' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024'
    },

    // 搜索配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲配置
    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})
