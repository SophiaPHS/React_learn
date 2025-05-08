import React from "react"
import LogItem from "./LogItem/LogItem"
import './Logs.css'


// 函数组件
const Logs = ()=>{
    const logsData = [
        {
            id:'001',
            date:new Date(),
            desc:'学习React',
            time:50
        },
        {
            id:'002',
            date:new Date(2022,11,1,21,30,0),
            desc:'学习Vue',
            time:30
        },
        {
            id:'003',
            date:new Date(2021,5,22,5,30,0),
            desc:'学习JS',
            time:40
        }
    ]
    const logItemDate = logsData.map(item => <LogItem key={item.id} {...item}/>) 
    return <div className="logs">
        {/* 可以重复写多个组件 */}
        {/* <LogItem date={new Date()} desc={"学习Vue"} time={"50"}/>
        <LogItem date={new Date()} desc={"学习React"} time={"30"}/>
        new Date(2021,5,22,5,30,0)这里是6月，月份从0开始计算 
        <LogItem date={new Date(2021,5,22,5,30,0)} desc={"学习JS"} time={"40"}/> */}
        {
            logItemDate
        }   
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