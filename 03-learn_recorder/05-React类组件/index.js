import ReactDom from "react-dom/client";
import App  from "./App";

const root = ReactDom.createRoot(document.getElementById('root'))
// React组件可以直接通过JSX渲染 <App/>===App()
root.render(<App/>)