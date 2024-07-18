## Brick

<h1 align="center">Welcome to brick 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="http://101.42.26.70:3000/doc" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/brick-family/brick/graphs/community" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/brick-family/brick/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/jiechud/fast-image-editor" />
  </a>
</p>

> brick 是一个无代码开发平台，采用 React+Typescript+Lowcode-engine 开发。

### 🏠 [Homepage](https://github.com/brick-family/brick#readme)

### ✨ [演示地址](http://101.42.26.70)

![示例图]()

## 安装

```sh
git clone https://github.com/brick-family/brick.git

pnpm i
```

## 开发

- 本地开发(使用本地物料库)

```sh
  1. pnpm i
  2. pnpm run watch  开启监听
  3. pnpm run dev:ui:local 启动低代码平台
  4. pnpm run dev:lc 启动物料组件
  5. 访问 http://localhost:8000

```

## 运行测试

```sh
pnpm run test
```

## 环境

- pnpm 8.x

- node 16.x

## 项目目录

### packages

包名称规则

- `b-`开头的 package 是基础包，都是提供基础服务
- `c-`开头的包，是大型业务组件或者模块
- `lowcode-`开头的项目，是 web 页面

```
├── b-biz-component    提供业务组件
├── b-component        提供基础组件
├── b-core             核心模块，提供通用的Processor，请求等
├── b-processor        各模块通用的Processor
├── b-services         提供接口请求
├── b-types            通用TS类型
├── b-utils            工具类
├── c-lowcode-editor   低代码引擎编辑器
├── c-ui-material      物料库（供低代码引擎使用）
├── c-workflow         工作流模块
├── lowcode-admin      无代码后台管理系统
├── lowcode-h5         无代码h5平台
└── lowcode-platform   无代码平台
```

## 项目启动

- 第一次运行，需要执行

  1. pnpm run pkg 编译下依赖包

- 本地开发(使用本地物料库)
  1. pnpm i
  2. pnpm run watch
  3. pnpm run dev:ui 启动低代码平台
  4. pnpm run dev:lc 启动物料组件
  5. 访问 http://localhost:8000

## 功能特性

本平台支持多租户， 主要功能包含表单管理，工作流，仪表盘大屏等。

### 功能列表

#### 多租户

- [x] 租户管理
- [x] 应用管理
- [x] 权限管理
  - [x] 租户权限
  - [x] 应用权限

#### 表单管理

- [x] 表单设计
- [ ] 各类型字段
  - [x] 单行文本
  - [x] 多行文本
  - [x] 数字
  - [x] 日期
  - [x] 单选按钮组
  - [x] 复选框组
  - [x] 下拉框
  - [x] 下拉复选
  - [x] 关联数据
  - [x] 富文本
  - [x] 子表单
  - [x] 用户选择器
  - [x] 图片
  - [x] 附件
  - [x] 布局
- [ ] 流程表单

#### 工作流

- [ ] 工作流的设计
- [ ] 工作流节点内容
  - [ ] 创建数据
  - [ ] 修改数据
  - [ ] 删除数据
  - [ ] 审批
  - [ ] 抄送
  - [ ] 跳转
  - [ ] 条件
  - [ ] 子流程
  - [ ] xxxx

#### 仪表盘大屏

- [ ] 大屏设计
- [ ] 图表组件类型
  - [ ] 柱状图
  - [ ] 折线图
  - [ ] xxxx

#### 集成第三方

- [ ] 企业微信
- [ ] 钉钉
- [ ] 飞书

## 系列文章

## 项目架构

项目用 React umi 开发框架，采用 typescript 编写，对各模块功能做了详细拆分，低代码搭建使用的是`lowcode-engine`,提供基础能力。

技术栈和依赖项

| 技术                       | 说明                                                                                          | 官网                                              |
| -------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| typescript                 | JavaScript 的一个超集,支持 ECMAScript 6                                                       | https://www.tslang.cn/                            |
| umi                        | 插件化的企业级前端应用框架。                                                                  | https://umijs.org/zh-CN                           |
| immer                      | 创建不可变数据                                                                                | https://immerjs.github.io/immer/docs/introduction |
| @legendapp/state           | Legend-State 是一个超快速且强大的 JavaScript 应用状态库                                       | https://github.com/LegendApp/legend-state         |
| ahooks                     | 提供了大量自应用的高级 Hooks                                                                  | https://github.com/alibaba/hooks                  |
| @antv/x6                   | 提供简单易用的节点定制能力和开箱即用的交互组件，方便我们快速搭建流程图、DAG 图、ER 图等图应用 | https://github.com/antvis/x6                      |
| @ant-design/pro-components | 基于 antd，对组件最了封装，简单易用                                                           | https://procomponents.ant.design/                 |
| xxxx                       | xxxxx                                                                                         | xxxx                                              |

## 联系我

建立了一个微信交流群，请添加微信号`brickmaster1`,备注`brick`,我会拉你进群

## 项目地址

- [github](https://github.com/brick-family/brick)
- [gitee](https://gitee.com/brick-family/brick)

## 📝 License

Copyright © 2024 [brick](https://github.com/brick-family/brick).<br />
This project is [GPL3](https://github.com/brick-family/brick/blob/master/LICENSE) licensed.
