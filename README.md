## 介绍

模版可用于此基础上二次快速开发，基础配置已经配好，新增的插件功能可以随心添加。

- Uniapp + Vue3 + Pinia2 + Typescript + Vite2 基础模版
- 基于Vue3 `<script setup>`语法
- 目前暂测试了 H5 和 微信小程序 平台各功能正常

## 特色

- **格式规范：**使用 Eslint 和 Prettier 规范代码格式。
- **请求拦截：**使用 [luch-request](https://github.com/lei-mu/luch-request) 库，支持多平台，支持请求和响应拦截。
- **路由拦截：**基于Uniapp提供的`uni.addInterceptor`进行路由拦截。
- **本地缓存加密：**封装localStorage操作，使用 [crypto](https://github.com/brix/crypto-js) 库，对其生产模式使用AES加密处理。

## 说明

### 路由拦截

> 其实更推荐用的一个插件是 [uni-simple-router](https://github.com/SilurianYang/uni-simple-router) 。
>
> 功能更全面并且 Vue-Router 的方式，而且没有 <u>首次拦截</u> 的问题。
>
> 目前不使用是因为插件暂不支持 Vue3。

路由拦截因为基于 `uni.addInterceptor` 实现的。所以弊端就是，**<u>首次进行页面是无法进行路由拦截的！</u>**只能是需要拦截的页面在 onShow 上手动处理一下。

### 配置

配置目录在 src/config

目前提供了 4个配置文件

`errorMsgConfig`：错误信息提醒配置

`requestConfig`：请求配置

`routerConfig`：路由配置

`storageConfig`：本地缓存配置

### 本地缓存加密

建议加密的 `iv` 和 `key` 写在 `.env.production` 里面，防止公开在代码管理上留有记录。

## 目录结构
```shell
├─ src
│  ├─ App.vue
│  ├─ config # 配置文件
│  │  ├─ errorMsgConfig.ts
│  │  ├─ requestConfig.ts
│  │  ├─ routerConfig.ts
│  │  └─ storageConfig.ts
│  ├─ enums # 枚举
│  │  ├─ cacheEnum.ts
│  │  └─ routerEnum.ts
│  ├─ pages # 页面
│  │  ├─ exception
│  │  │  └─ 404.vue
│  │  ├─ index
│  │  │  └─ index.vue
│  │  ├─ list
│  │  │  └─ index.vue
│  │  ├─ login
│  │  │  └─ index.vue
│  │  └─ user
│  │     └─ index.vue
│  ├─ services # 服务
│  │  ├─ api # 具体API请求文件
│  │  │  └─ auth.ts
│  │  └─ model # API请求文件描述
│  │     ├─ authModel.d.ts
│  │     └─ baseModel.d.ts
│  ├─ state # pinia 目录
│  │  ├─ index.ts
│  │  └─ modules
│  │     ├─ auth.ts
│  │     └─ user.ts
│  ├─ static # 静态资源
│  │  ├─ images
│  │  │  └─ tarbar
│  │  │     ├─ discover.png
│  │  │     ├─ discover_active.png
│  │  │     ├─ home.png
│  │  │     ├─ home_active.png
│  │  │     ├─ me.png
│  │  │     └─ me_active.png
│  │  └─ logo.png
│  │─ style # 样式文件
│  └─ utils # 工具类
│     ├─ common.ts # 公共方法
│     ├─ crypto.ts
│     ├─ env.ts
│     ├─ is.ts
│     ├─ log.ts # warn error 方法
│     ├─ request # luch-request 封装、拦截器
│     │  └─ index.ts
│     ├─ router # 路由封装、拦截器
│     │  ├─ index.ts
│     │  ├─ interceptor.ts
│     │  └─ navigates.ts
│     ├─ storage # 本地缓存封装
│     │  ├─ createStorage.ts
│     │  └─ index.ts
│     └─ util.ts # 工具
│  ├─ uni.scss
│  ├─ pages.json
│  ├─ env.d.ts
│  ├─ main.ts
│  ├─ manifest.json
├─ tsconfig.json
├─ vite.config.ts
├─ yarn-error.log
├─ yarn.lock
├─ .env
├─ .env.development
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ README.md
├─ index.html
├─ package.json

```

## 安装方法

下载依赖

```shell
# node 版本需要 16 以上
yarn run install
```

运行H5

```shell
yarn run dev:h5
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中