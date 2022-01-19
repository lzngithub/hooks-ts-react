# react hook ts

## 创建项目

```shell
npx create-react-app hook-ts-demo --template typescript
```

## 选择样式语言

[css-in-js(emotionjs)](https://emotion.sh/docs/introduction)

```shell
npm i @emotion/css
```

## 选择ui组件库

选择：antd 4.18.3

参考：[https://ant.design/docs/react/use-in-typescript-cn](https://ant.design/docs/react/use-in-typescript-cn)

注意：

* 定制主题的时候，@craco/craco和react-script 版本可能对不上，根据安装@craco/craco的报错信息去调整版本，如果不想调整版本，可以调换依赖安装的先后顺序，可以解决问题

## 配置不同的开发打包环境

react通过不同的配置文件和dotenv进行不同环境的控制

参考：[https://zhuanlan.zhihu.com/p/95855648](https://zhuanlan.zhihu.com/p/95855648)

安装dotenv

```shell
npm install -g dotenv-cli
```

新建不同环境的配置文件.env.development .env.production .env.test，文件里面的变量必须以REACT_APP开头

修改启动命令

```json
"start": "craco start",
"start:pro": "dotenv -e .env.production craco start",
"start:pre": "dotenv -e .env.test craco start",
"build:dev": "dotenv -e .env.development craco build",
"build:pre": "dotenv -e .env.test craco build",
"build": "craco build",
```

## 配置接口配置

选择fetch

用大的工具库： qs

安装qs的时候要同时安装@types/qs的

```shell
npm i --save-dev @types/qs
```

### qs

