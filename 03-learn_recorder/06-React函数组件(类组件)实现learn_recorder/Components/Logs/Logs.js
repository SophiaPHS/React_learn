import React from "react"
import LogItem from "./LogItem/LogItem"
import './Logs.css'


// 函数组件
const Logs = ()=>{
    return <div className="logs">
        {/* 可以重复写多个组件 */}
        <LogItem/>
        <LogItem/>
        <LogItem/>
    </div>
}

// 类组件
/* class Logs extends React.Component{
    render(){
        return <div className='logs'>
                  <LogItem/>
                  <LogItem/>
                  <LogItem/>
               </div>
    } 
} */
export default Logs