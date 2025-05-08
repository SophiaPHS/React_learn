import Logs from "./Components/Logs/Logs"
import React from "react"
// 为什么用箭头函数--省略function关键字，语法简洁
// 函数组件
const App = ()=>{
    return  <div>
                <Logs/>
            </div>
}

// 类组件
/* class App extends React.Component{
    // 类组件中必须添加一个render()方法，且方法返回值要是一个JSX
    render(){
        return <div>
            <Logs/>
        </div>
    }
} */
// 导出App
export default App