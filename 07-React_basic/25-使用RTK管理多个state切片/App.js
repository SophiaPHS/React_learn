import React from 'react'
import './store/index.js'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAge, setName } from './store/stuSlice.js'
import { setName as setSchoolName,setAddress } from './store/schoolSlice.js'
const App = () => {
  // useSelector()用来加载state中的数据
  /* const student = useSelector(state=>state.student)
  const school = useSelector(state=>state.school) */
  const {student,school}=useSelector(state=>state)
  // 通过useDispatch()获取派发器对象,可以获取所有切片中的操作指令
  const dispatch = useDispatch()
  const setNameHandler=()=>{
    // 获取action的构建器
    dispatch(setName('沙和尚'))
  }
  const setAgeHandler=()=>{
    // 获取action的构建器
    dispatch(setAge(30))
  }
  return (
    <div>
        <p>
          {student.name}---
          {student.age}---
          {student.gender}---
          {student.address}
        </p>
        <button onClick={setNameHandler}>修改学生name</button>
        <button onClick={setAgeHandler}>修改学生age</button>
        <hr/>
        <p>
          {school.name}---
          {school.address}
        </p>
        <button onClick={()=>dispatch(setSchoolName('二中'))}>修改学校name</button>
        <button onClick={()=>dispatch(setAddress('55号'))}>修改学校address</button>
    </div>
  )
}

export default App