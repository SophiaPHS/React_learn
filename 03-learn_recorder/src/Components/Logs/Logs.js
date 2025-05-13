import React from "react"
import LogItem from "./LogItem/LogItem"
import './Logs.css'
import Card from "../UI/Card/Card"


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
    return <Card className="logs">
        {
            logItemDate
        }   
    </Card>
}

export default Logs