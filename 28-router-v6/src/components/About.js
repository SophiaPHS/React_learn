import React from 'react'
import { Navigate, Outlet, Route, Routes, useMatch} from 'react-router-dom'
import Child from './Child'


const About = (props) => {
  return (
    <div>
      {/*
      Navigate跳转时push(),因为about路由不断跳转至about/studnet/1路由
      所以回退不了*/}
      <Navigate to='/student/1'/> 
      {/* 通过子路由对Child进行映射，当访问/about/hello，才会挂载Child组件  */}
      {/* <Routes>
        <Route path='child' element={<Child/>}/> 
      </Routes> */}
      <Outlet/>
    </div>
  )
}

export default About