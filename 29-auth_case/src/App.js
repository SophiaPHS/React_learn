import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Layout from './components/Layout'
import AuthPage from './pages/AuthPage'
import NeedAuth from './components/NeedAuth'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from './store/reducer/authSlice'
import useAutoLogout from './hooks/useAutoLogout'
import StudentList from './components/Student/StudentList'
import StudentPage from './pages/StudentPage'



// 处理路由数据
const App = () => {
  /* const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  // 创建一个useEffect 用来处理登录状态
  useEffect(()=>{
    const timeout =auth.expirationTime-Date.now()
    // 判断timeout的值(毫秒),小于一分钟直接登出，如果大于就开启一个定时器过timeout再登出
    if(timeout<6000){
      dispatch(logout())
      return;
    }
    const timer=setTimeout(()=>{
      dispatch(logout())
    },timeout)
    return ()=>{//下一次执行之前关闭前面的定时器，避免开启多个定时器
      clearTimeout(timer)
    }
  },[auth]) */
  useAutoLogout()
  return (
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='profile' element={<NeedAuth><ProfilePage/></NeedAuth>}/>
          <Route path='auth-form' element={<AuthPage/>}/>
          <Route path='student' element={<NeedAuth><StudentPage/></NeedAuth>}/>
        </Routes>
      </Layout>
      
    </div>
  )
}

export default App