import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/reducer/authSlice'

// 导航管理
const MainMenu = () => {
    // 获取登录状态信息
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch() //用于退出登录
    return (
        <div>
            <ul>
                <li>
                    <Link to='/'>首页</Link>
                </li>
                { !auth.isLogged &&
                    <li>
                        <Link to='/auth-form'>登录/注册</Link>
                    </li>
                }
                {/* 但这样只是界面隐藏，如果知道该页面url，即使没有登录也能访问 */}
                { auth.isLogged &&
                    <>
                        <li>
                            <Link to='/profile'>{auth.user.username}</Link>
                        </li>
                        <li>
                            <Link to='/student'>学生信息</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={()=>dispatch(logout())}>登出</Link>
                        </li>
                    </>
                }
                
            </ul>
        </div>
    )
}

export default MainMenu