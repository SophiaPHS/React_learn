import React, { useState } from 'react'
import Card from '../UI/Card/Card'
import './LogsForm.css'

const LogsForm = () => {
    /* 
        LogsForm组件--添加表单

        当表单项发生变化时，获取用户输入的内容(通过event.target.value实现)
        - event:事件对象中保存了当前事件触发的所有信息
            - event.target:指向触发事件的对象(DDM对象)
        
        React开发表单时，其表单数据一般存放至state中，同时表单value绑定state中数据，实现state和表单双向绑定
            - 方法1：每个数据单独设置useState
                    const [inputDate,setInputDate]=useState('')
                    const [inputDesc,setInputDesc]=useState('')
                    const [inputTime,setInputTime]=useState('')
            - 方法2：所有数据用一个state进行管理
                    const [formData,setFormData]=useState({
                        inputDate:'',
                        inputDesc:'',
                        inputTime:''
                    })
            
    */
    //  创建三个变量用来存储日期、内容、时长，直接let 变量不受React控制
    /* let inputDate = '';
    let inputDesc = '';
    let inputTime = 0; */
    // 用State存储变量，便于操作 ,弊端：当表单数据过多，单独创建每一个state过于繁杂
    /* const [inputDate,setInputDate]=useState('')
    const [inputDesc,setInputDesc]=useState('')
    const [inputTime,setInputTime]=useState('') */

    // 将表单数据统一到一个state中,弊端：每次访问里面数据要前缀`formData`，并且修改其中某一数据，需要浅复制，不然会覆盖原先数据
    const [formData,setFormData]=useState({
        inputDate:'',
        inputDesc:'',
        inputTime:''
    })
    //  创建一个响应函数，监听日期的变化
    const dateChangeHandler=(e)=>{
        // inputDate = e.target.value;

        // setInputDate(e.target.value)

        setFormData({
            ...formData,
            inputDate:e.target.value
        })
    } 
    //  创建一个响应函数，监听内容的变化
    const descChangeHandler=(e)=>{
        // inputDesc = e.target.value;

        // setInputDesc(e.target.value)

        setFormData({
            ...formData,
            inputDesc:e.target.value
        })
    } 
    //  创建一个响应函数，监听时长的变化
    const timeChangeHandler=(e)=>{
        // inputTime = e.target.value;

        // setInputTime(e.target.value)

        setFormData({
            ...formData,
            inputTime:e.target.value
        })
    } 
    // 添加表单时，汇总表单中的数据
    /* 
        React中，通常表单不需要自行提交(即不出现跳转的情况)，而是通过React提交
    */
    const formSubmitHandler = (e)=>{
        // 取消表单默认行为，提交时页面跳转
        e.preventDefault();
        // 获取表单项中的数据：日期、内容、时长
        const newLog = {
            date:new Date(formData.inputDate),
            desc:formData.inputDesc,
            time:+formData.inputTime // `+`实现非数字类型转换成number类型(隐式转换)
        }
        console.log(newLog)

        /* 
            提交表单后如何情况表单中的数据
                通过let定义并存储表单数据进行修改时，该表单为非受控组件

                通过以下操作使得表单称为一个受控组件:
                    - 将表单中数据存储到state中
                    - 然后将state设置为表单项value值
                    - 当表单向发生变化，state会随之变化；state变化，表单项也会跟着变化---这种操作称为【双向绑定】
        */
        //  清空表单项  
        /* setInputDate('')
        setInputDesc('')
        setInputTime('') */
        setFormData({
            inputDate:'',
            inputDesc:'',
            inputTime:''
        })
    }
    return (
        <Card className='logs-form'>
            <form onSubmit={formSubmitHandler}>
                <div className='form-item'>
                    <label htmlFor='date'>日期</label>
                    <input id='date' type='date' value={formData.inputDate} onChange={dateChangeHandler}/>
                </div>
                <div className='form-item'>
                    <label htmlFor='desc'>内容</label>
                    <input id='desc' type='text' value={formData.inputDesc} onChange={descChangeHandler}/>
                </div>
                <div className='form-item'>
                    <label htmlFor='time'>时长</label>
                    <input id='time' type='number' value={formData.inputTime} onChange={timeChangeHandler}/>
                </div>
                {/* 
                    表单中button没有设置type，默认type="submit"，被视为触发表单提交的按钮,点击按钮会触发form的onSubmit事件
                */}
                <div className='form-btn'>
                    <button>添加</button>
                </div>
            </form>
            
        </Card>
    )
}

export default LogsForm