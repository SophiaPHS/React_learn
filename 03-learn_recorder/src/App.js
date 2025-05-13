import Logs from "./Components/Logs/Logs"
import React from "react"
import LogsForm from "./Components/LogsForm/LogsForm"
import './App.css'
// 函数组件
const App = ()=>{
    return  <div className="app">
                <LogsForm/>
                <Logs/>
            </div>
}

// 导出App
export default App