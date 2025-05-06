import ReactDom from "react-dom/client";
import App  from "./App";
/* 
    组件
        - React中组件有两种创建方式
        - 函数式组件
            - 函数组件就是一个返回JSX的函数
            - 组件的首字母必须大写
        - 类组件

*/

/* 
若组件过多都放在index.js中不便于维护，所以可以在src创建对应组件.js文件，然后在引入到index.js中
function App(){
    return <div>Hello React!</div>
}
 */
const root = ReactDom.createRoot(document.getElementById('root'))
// React组件可以直接通过JSX渲染 <App/>===App()
root.render(<App/>)