import React, { useCallback, useState,useContext } from 'react'
import StuContext from '../store/StuContext'
import './StudentForm.css'
import useFetch from '../hooks/useFetch'
// 此组件即可以实现添加功能，也可实现修改功能
const StudentForm = (props) => {
    // 通过Student是否传入数据判断修改还是添加
    const [inputData,setInputData]=useState({
        name:props.stu?props.stu.name:'',
        gender:props.stu?props.stu.gender:'男',
        age:props.stu?props.stu.age:'',//props.stu.age是number，如果没有传值那就是添加不输入数据无法触发ageChangeHandler，使得年龄为字符串就会添加失败
        address:props.stu?props.stu.address:''
    })

    const ctx = useContext(StuContext)
    // 创建一个添加/更新学生的方法
    /* useFetch是组件一加载就执行，所以数据是空的
     */
    const {loading,error,fetchData:updateStudent}=useFetch({
        url:props.stu?`students/${props.stu.documentId}`:'students',
        method:props.stu?'put':'post'
    },ctx.fetchData) //传入ctx.fetchData表示重新渲染页面，这个fetchData是useFetch的默认请求
   
    // 姓名输入框
    const nameChangeHandler=(e)=>{
        // 在箭头函数中，如果你使用大括号`{}`，它会被解释为函数体的开始，而不是直接返回一个对象。
        // 因此，我们需要用圆括号`()`包裹对象字面量，以区分函数体和直接返回的对象
        // 如果用{},需要返回值return
        setInputData(prevState=>{ return {...prevState,name:e.target.value}}) //页面中输入数据联动到React
    }
    // 性别选择框
    const genderChangeHandler=(e)=>{
        setInputData(prevState=>({...prevState,gender:e.target.value}))
    }
    // 年龄输入框
    const ageChangeHandler=(e)=>{
        setInputData(prevState=>({...prevState,age:+e.target.value})) //年龄要转换成number
    }
    // 地址输入框
    const addressChangeHandler=(e)=>{
        setInputData(prevState=>({...prevState,address:e.target.value}))
    }
    // 添加确认按钮
    const submitHandler=(e)=>{
        updateStudent(inputData)
        setInputData(prevState=>({...prevState,name:'',age:'',gender:'',address:''}))
    }
    // 修改确认按钮
    const updateHandle=()=>{
        updateStudent(inputData)
    }
    return (
        <>
        <tr className='student-form'>
            <td><input 
                onChange={nameChangeHandler}
                value={inputData.name} //这里进value实现react修改数据可以联动到页面
                type='text'/></td>
            <td>
                <select 
                    onChange={genderChangeHandler}
                    value={inputData.gender}
                    >
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </td>
            <td><input 
                onChange={ageChangeHandler}
                value={inputData.age}
                type='text'/></td>
            <td><input 
                onChange={addressChangeHandler}
                value={inputData.address}
                type='text'/></td>
            <td>
                {/* 根据Student是否传入数据判断显示修改还是添加 */}
                {props.stu && <>
                    <button onClick={()=>props.onCancel()}>取消</button>
                    <button onClick={updateHandle}>确认</button>
                </>}
                {!props.stu && <button onClick={submitHandler}>添加</button>}
                
            </td>
        </tr>
        {loading && <tr><td colSpan={5}>添加中</td></tr>}
        {error && <tr><td colSpan={5}>添加失败...</td></tr>}
        </>
    )
}

export default StudentForm