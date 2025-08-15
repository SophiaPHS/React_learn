import React, { useCallback, useState,useContext, useEffect } from 'react'
import './StudentForm.css'
import { useAddStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation } from '../../store/api/studentApi'
// 此组件即可以实现添加功能，也可实现修改功能
const StudentForm = (props) => {
    const [inputData,setInputData]=useState({
        name:'',
        gender:'男',
        age:'',
        address:''
    })
    const [addStudent,{isSuccess:isAddSuccess}] = useAddStudentMutation()
    const [updateStudent,{isSuccess:isUpdateSuccess}] = useUpdateStudentMutation()
    const {data:stuData,isSuccess}=useGetStudentByIdQuery(props.stuId,{
        skip:!props.stuId, 
        // refetchOnMountOrArgChange:2 //表示是否重新加载数据，false表示不加载即使用缓存数据
    })

    // 当isSuccess发生变化再更新表单中的数据,避免在修改其他人已修改但获取不到最新数据的情况
    useEffect(()=>{
        if(isSuccess){
            setInputData(stuData)
        }
    },[isSuccess])
    // 姓名输入框
    const nameChangeHandler=(e)=>{
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
        addStudent(inputData)
        // 重置数据
        setInputData({
            name:'',
            gender:'男',
            age:'',
            address:''
        })
    }
    // 修改确认按钮
    const updateHandle=()=>{
        // 注意这里inputData是通过请求id获取到的，如果更新只需要获取初始inputData数据即可
        updateStudent({
            id:props.stuId,
            inputData:{
                name:inputData.name,
                age:inputData.age,
                gender:inputData.gender,
                address:inputData.address
            }
        })
        props.onCancel()
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
                {props.stuId && <>
                    <button onClick={()=>props.onCancel()}>取消</button>
                    <button onClick={updateHandle}>确认</button>
                </>}
                {!props.stuId && <button onClick={submitHandler}>添加</button>}
                
            </td>
        </tr>
        {/* {loading && <tr><td colSpan={5}>添加中</td></tr>}
        {error && <tr><td colSpan={5}>添加失败...</td></tr>} */}
        </>
    )
}

export default StudentForm