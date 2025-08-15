import React, { useCallback, useContext, useState } from 'react'
import StuContext from '../store/StuContext'
import StudentForm from './StudentForm'
import useFetch from '../hooks/useFetch'


  const Student = ({student:{name,age,gender,address,documentId}}) => {
  const [isEdit,setIsEdit]=useState(false)
  const ctx = useContext(StuContext)

  const {loading,error,fetchData:delStu}=useFetch({
    url:`students/${documentId}`,
    method:'delete'
  },ctx.fetchData)
  const deleteHandler=()=>{
    // 删除学生
    delStu()
  }
  // 取消修改学生的编辑状态传入StudentForm
  const cancelEdit=()=>{
    setIsEdit(false)
  }
  return (
    <>
      {!isEdit &&
        <tr>
            <td>{name}</td>
            <td>{gender}</td>
            <td>{age}</td>
            <td>{address}</td>
            <td>
              <button onClick={deleteHandler}>删除</button>
              <button onClick={()=>setIsEdit(true)}>修改</button>
            </td>
        </tr>
      }
      {isEdit &&<StudentForm stu={{name,age,gender,address,documentId}} onCancel={cancelEdit}/>}
      {loading && <tr><td colSpan={5}>正在删除数据...</td></tr>}
      {error && <tr><td colSpan={5}>删除失败...</td></tr>}
    </>
  )
}

export default Student