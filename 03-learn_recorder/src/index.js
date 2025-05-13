import ReactDom from "react-dom/client";
import App  from "./App";
import './index.css'
// 通过函数/类组件重新设计learn_recorder
const root = ReactDom.createRoot(document.getElementById('root'))
// React组件可以直接通过JSX渲染 <App/>===App()
root.render(<App/>)