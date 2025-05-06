# React项目结构
根目录
    - public    供外部直接访问的文件(静态图片、css、js等，无需webpack打包文件，静态目录)
        - index.html(添加标签<div id='root'></div>) 首页模板，且必须要有
    - src 源码目录，放置js源代码
        - App.js
        - index.js 脚本入口文件(webpack以这个入口文件编译关联到index.html)，必须要有

# 项目配置
```shell
npm init -y    --->package.json (初始化操作)
# 添加依赖项（react-scripts提供react开发环境，以及一些依赖包括Webpack，测试等工具）
npm -i add react react-dom react-scripts -S  --->node_modules;package-lock.json;package.json中配置这三个依赖库
```

# 项目运行
npm管理的项目无法在网页中直接运行，需通过webpack打包，打包之后才能在浏览器中正常运行(也可以用其他打包工具比如vite)
```shell
# 项目开发完成使用build 因为每次修改内容需要重新build打包，然后访问路径修改
npx react-scripts build # 自动对react项目进行webpack打包
# 项目开发过程中使用start，一直运行 ctrl+c停止运行
npx react-scripts start # 通过webpack启动内置测试服务器，根据修改实时更新页面 (和build命令执行创建的build文件无关)
```
> build执行弹出Would you like to add the defaults to your package.json? » 是否添加默认配置比如浏览器兼容性配置 Y就无需手动配置
--->    package.json--->browserslist:production/development
--->    生成build文件
            - static
                - js
            - asset-mainfest.json
            - index.html
## 命令执行优化
在package.json中添加scripts配置(运行脚本命令)
```json
"scripts":{
    "start":"react-scripts start",
    "build":"react-scripts build"
}
```
在终端执行`npm start` / `npm run build` 即可

# 项目访问
build/index.html
> 报错：Failed to load resource: net::ERR_FILE_NOT_FOUND

> 原因：index.html直接访问通过vscode的内置浏览器，无服务器，是通过本地文件协议（file://）打开 build/index.html，会尝试从文件系统根目录（如 C:/）寻找,所以要写成相对路径

> 所以访问路径出错 src="/static/js/main.83d15c7f.js"表示部署到服务器根目录上，但现在没有部署到根目录，所以路径'/'删除或前面加'.'表示相对路径


