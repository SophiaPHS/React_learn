import React, { useCallback, useContext, useState } from 'react'
import StuContext from '../store/StuContext'
import StudentForm from './StudentForm'


const Student = ({student:{name,age,gender,address,documentId}}) => {
  //这里props进行了多层解构赋值，首先从props中解构student，再从student解构name,age,gender,address
  // 所以这里获取不到student，是获取到student里面的name,age,gender,address
  // let {name,age,gender,address}=props.student

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const [isEdit,setIsEdit]=useState(false)
  const ctx = useContext(StuContext)

  const delStu = useCallback(async ()=>{
    try{
      setLoading(true)
      setError(null)
      const res =await fetch(`http://localhost:1337/api/students/${documentId}`,{
        method:'delete'
      })
      // 判断是否成功
      if(!res.ok){
        throw new Error('删除失败！')
      }
      // const data = (await res).json() 可以获取被删除的数据
      // 修改成功后，需要触发列表刷新
      ctx.fetchData()
    }catch (e){
      setError(e)
    }finally{
      setLoading(false)
    }
  },[])
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