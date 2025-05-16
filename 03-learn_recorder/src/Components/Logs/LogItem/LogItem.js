import React, { useState } from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'
import Card from '../../UI/Card/Card'
import ConfirmModal from '../../UI/ConfirmModal/ConfirmModal'

// 函数组件
const LogItem = (props) => {
    // 添加一个state，记录是否显示确认窗口
    const [showConfirm,setshowConfirm]=useState(false)
    // 删除item的响应函数
    const deleteItemHandler = ()=>{
        // 显示自定义确认窗口
        setshowConfirm(true)
        /* //直接写confirm()报错因为严格模式下this被清空，成undefined了
        // confirm()方法用于显示一个带有指定消息和确认及取消按钮的对话框。
        // 如果访问者点击"确定"，此方法返回true，否则返回false。
        const isDel = window.confirm('该操作不可恢复，确认吗')//不建议使用，而是React自定义弹框
        if(isDel){
            // 删除当前item，即从数据的state移除指定的数据
            // 弊端：如果在前面添加日志，删除后面的日志会出现问题，不建议用index
            props.onDelLog(props.index)
        } */
    }
    // 取消函数
    const cancelHandler = ()=>{
        setshowConfirm(false)
    }
    // 确认函数
    const okHandler = ()=>{
        // props.onDelLog(props.index)
        props.onDelLog()
        setshowConfirm(false)//不设置也能关闭弹窗--因为组件删除后数据变化触发 DOM 更新，实现重新渲染，
    }
    return   (
    <Card className='item'>
            {/* 运用&&的短路思想 */}
            {showConfirm  && <ConfirmModal 
                confirmText={`该操作不可恢复！是否删除${props.desc}日志`}
                onCancel = {cancelHandler}
                onOk = {okHandler}
            />}
            <MyDate date={props.date}/>
            <div className="content">
                <h2 className="desc">{props.desc}</h2>
                <div className="time">{props.time}</div>
            </div>
            {/* 删除日志--添加一个删除按钮 */}
            <div>
                <div className='delete' onClick={deleteItemHandler}>×</div>
            </div>
        </Card> 
        )
}





export default LogItem