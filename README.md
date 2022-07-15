## 介绍

模版可用于此基础上二次快速开发，基础配置已经配好，新增的插件功能可以随心添加。

- Uniapp + Vue3 + Pinia2 + Typescript + Vite2 基础模版
- 基于Vue3 `<script setup>`语法
- 目前暂测试了 H5 和 微信小程序 平台各功能正常

## 特色

- 格式规范：使用 Eslint 和 Prettier 规范代码格式。
- 请求拦截：使用 [luch-request](https://github.com/lei-mu/luch-request) 库，支持多平台，支持请求和响应拦截。
- 路由拦截：基于Uniapp提供的`uni.addInterceptor`进行路由拦截。
- 本地缓存加密：封装localStorage操作，使用 [crypto](https://github.com/brix/crypto-js) 库，对其生产模式使用AES加密处理。
- 暗黑模式主题：适配H5和小程序暗黑模式，自动监听暗黑模式而切换主题。

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

### 暗黑模式使用方式

暗黑模式适配主要是靠CSS`媒体查询`监听模式切换和`CSSVar变量`实现的适配；

即页面上主要的色块都在 文件src/style/common.scss `:root` 上定义，其他页面使用这里面的变量；监听`prefers-color-scheme: dark`，当变成dark的时候用另外一套暗黑主题变量覆盖，从而达到适配暗黑主题的目的。



其中微信小程序的适配可以前往[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/darkmode.html#%E5%BC%80%E5%90%AF-DarkMode)了解，项目内已经配置，过多详情就不再赘述了。

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
│  ├─ theme.json # 微信暗黑模式文件
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
yarn install
```

运行H5

```shell
yarn run dev:h5
```

运行微信小程序

```shell
yarn run dev:mp-weixin
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