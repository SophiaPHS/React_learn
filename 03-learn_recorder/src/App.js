import Logs from "./Components/Logs/Logs"
import React, { useState } from "react"
import LogsForm from "./Components/LogsForm/LogsForm"
import './App.css'
// 函数组件
const App = ()=>{
    // state提升
    const [logsData,setLogsData] = useState([
        {
            id:'001',
            date:new Date(),
            desc:'学习React',
            time:50
        },
        {
            id:'002',
            date:new Date(2024,11,1,21,30,0),
            desc:'学习Vue',
            time:30
        },
        {
            id:'003',
            date:new Date(2023,5,22,5,30,0),
            desc:'学习JS',
            time:40
        }
    ]) 
    /* 
        将LogsForm中的数据传递给App组件，然后App组件将新的日志添加到数组中
            - 1.App给LogsForm传递一个回调函数
            - 2.LogsForm添加日志时，调用该函数并将新的日志数据作为参数传递
            - 3.App通过回调函数接收数据并可进行相应操作
            - 此方法只适用于简单场景(父子组件，不涉及祖孙或多层嵌套组件)
    */
   const saveLogHandler = (newLog)=>{
        // 向新的日志中添加id
        newLog.id = Date.now()+''//设置为时间戳转字符串，但可能存在并发问题，即同一时刻创建了两个
        // 将新的数据添加到数组中，newLog的顺序会影响其在数组中的位置，这里是末尾添加
        setLogsData([...logsData,newLog])
   }
    //从数据中删除一条日志(按索引删除)
    /* const delLogByIndex = (index)=>{
        // logsData.splice(index,1) 直接这样写会破坏原数组
        setLogsData(prevState =>{
            // [...prevState].splice(index,1) 这个是返回删除的数据
            const newLogs = [...prevState]
            // 添加或删除数组中的元素，如果删除一个元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。splice(元素起始位置,删除个数,[..添加的项])
            newLogs.splice(index,1)
            return newLogs
        })
    }     */
    // 按id删除日志
    const delLogById = (id)=>{

        setLogsData(prevState =>{
            return prevState.filter(item =>item.id!==id)
        })
    }    
    return  <div className="app">
                <LogsForm onSaveLog={saveLogHandler}/>
                <Logs logsData={logsData} onDelLog={delLogById}/>
            </div>
}

// 导出App
export default App