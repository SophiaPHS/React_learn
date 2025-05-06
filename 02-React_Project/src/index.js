// src/index.js 是js的入口文件 webpack编译文件时，以index.js为入口，导入相应依赖项(比如index.html)并打包成一个完整的js文件
// 引入ReactDOM
import ReactDom from 'react-dom/client' //react18以后需要加/client表示在浏览器渲染，如果是服务器则是/server

// 创建一个JSX
const App = <div>
    <h1>这是一个React项目</h1>
    <span>第一个React项目！</span>
</div>

// 获取根容器
const root = ReactDom.createRoot(document.getElementById('root'))
// 将App渲染进根容器
root.render(App)