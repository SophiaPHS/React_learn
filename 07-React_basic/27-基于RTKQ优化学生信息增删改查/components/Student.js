import React, { useCallback, useContext, useState } from 'react'
import StudentForm from './StudentForm'
import studentApi from '../store/studentApi'

const Student = (props) => {
  const [isEdit,setIsEdit]=useState(false)
  // 获取删除的钩子，useDelStudentMutation()返回的是一个数组(第一个值是操作的触发器，第二个是结果集有isError，isSuccess等等可以进行解构获取想要的值)
  const [delStudent,{isSuccess}] = studentApi.useDelStudentMutation()
  const deleteHandler=()=>{
    // 删除学生
    delStudent(props.student.documentId)
  }
  // 取消修改学生的编辑状态传入StudentForm
  const cancelEdit=()=>{
    setIsEdit(false)
  }
  return (
    <>
      {(!isEdit && !isSuccess) &&
        <tr>
            <td>{props.student.name}</td>
            <td>{props.student.gender}</td>
            <td>{props.student.age}</td>
            <td>{props.student.address}</td>
            <td>
              <button onClick={deleteHandler}>删除</button>
              <button onClick={()=>setIsEdit(true)}>修改</button>
            </td>
        </tr>
      }
      {
        isSuccess && <tr>
          <td colSpan={5}>
            数据已删除
          </td>
        </tr>
      }
      {isEdit &&<StudentForm stuId={props.student.documentId} onCancel={cancelEdit}/>}
      {/* {loading && <tr><td colSpan={5}>正在删除数据...</td></tr>}
      {error && <tr><td colSpan={5}>删除失败...</td></tr>} */}
    </>
  )
}

export default Student