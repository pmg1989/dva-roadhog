## newband APP内嵌HTML5项目(论坛/专题/练习/分享页)

### 目录结构

```bash
├── /mock/           # 数据mock的接口文件
├── /dist/           # 项目输出目录
├── /public/         # 项目公共目录，编译时会自动拷贝至public文件夹
├── /src/            # 项目源码目录
│ ├── /components/   # 项目组件
│ ├── /lib/          # 非React公共库
│ ├── /svg/          # svg目录
│ ├── /routes/       # 路由组件
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /utils/        # 工具函数
│ ├── /themes/       # 项目主样式目录
│ ├── route-dynamic.js # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息

```

### 快速开始

克隆项目文件:

```
git clone git@git.coding.net:newband-dev/app_bbs.git
```

进入目录安装依赖:

```
npm i 或者 yarn install
```

开发：

```bash
npm start    # 使用mock拦截请求，数据存储在localStroge里

打开 http://localhost:8001
```


构建：

```bash
npm run build

npm run build-staging

npm run build-release

发布文件将会生成到dist目录
```

### 注意事项

- 开发环境中，如再mock目录新增文件，请在`src/utils/mock.js`第二行的`mockData`数组中添加
- 如需重写antd-mobile样式配置，请修改`src/theme.js`
- 项目配置文件在`src/utils/config.js`
