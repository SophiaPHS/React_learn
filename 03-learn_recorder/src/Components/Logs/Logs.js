import React, { useState } from "react"
import LogItem from "./LogItem/LogItem"
import './Logs.css'
import Card from "../UI/Card/Card"
import LogFilter from "./LogFilter/LogFilter"

// 函数组件
const Logs = (props)=>{
    /* 
         logsData 用来存储学习的日志
            - 除了当前组件Logs需要使用外，其他组件比如LogsForm也需要使用
            - 当遇到一个数据需要被多个组件使用时，可以将数据放入到这些组件共同的祖先元素中，实现多个组件均可访问这个数据---state提升]
    */
    /* const logsData = [
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
    ] */
    // 存储年份
    const [year,setYear] = useState(2025)     
    // 修改年份
    const changeYearHandler = year =>{
        setYear(year)
    }
    // 过滤数据，只显示某一年的数据
    let filterData = props.logsData.filter(item=>item.date.getFullYear()===year)
    //index只是用于删除数据，没必要向LogItem传递该变量可以写一个必包   onDelLog={()=>props.onDelLog(index)}  ,就不需要传递logIndex={index}了
    // 使用过滤日志时，传入的索引是过滤数组中的index，但是删除日志是依据App原数组的index，导致删除日志不一致，所以还是用id删除缩影
   /*  let logItemData = filterData.map(
        (item,index) => <LogItem 
            key={item.id} 
            logIndex={index} 
            onDelLog={props.onDelLog} 
            {...item}/>)  */
    // 通过id删除日志
    let logItemData = filterData.map(
        item => <LogItem 
            key={item.id} 
            onDelLog={()=>props.onDelLog(item.id)}
            {...item}/>) 
    //针对是否有日志进行判断，没有就提示无日志--方法1
    if(logItemData.length===0){
        logItemData = <p className="no-logs">没有找到日志！</p>
    }
    return <Card className="logs">
        {/* 添加一个年份选择组件 */}
        <LogFilter year={year} onYearChange = {changeYearHandler}/>
        {
            logItemData
            // 方法2
            // logItemData.length!=0 ? logItemData : <p className="no-logs">没有找到日志！</p>
        }   
    </Card>
}

export default Logs