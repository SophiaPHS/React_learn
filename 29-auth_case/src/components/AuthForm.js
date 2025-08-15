import React, {  useRef, useState } from 'react'
import { useLoginMutation, useRegisterMutation } from '../store/api/authApi'
import { useDispatch } from 'react-redux'
import { login } from '../store/reducer/authSlice'
import {useLocation, useNavigate} from 'react-router-dom'


const AuthForm = () => {
    const [isLoginForm,setIsLoginForm]=useState(true)
    const [regFn,{error:regError}] = useRegisterMutation()
    const [loginFn,{error:loginError}]=useLoginMutation()
    // 判断是否有先前路径,有登录后跳转至原先路径，没有跳转至根路径
    const loaction = useLocation()
    const from = loaction.state?.preLocation?.pathname||'/'
    // 获取登录状态派发器
    const dispatch = useDispatch()
    // 获取页面跳转方法
    const nav = useNavigate()
    const usernameInp = useRef()
    const emailInp = useRef()
    const pwdInp = useRef()
    const submitHandler=(e)=>{
        e.preventDefault()// 阻止表单默认的提交行为

        // 通过ref获取原生对象-非受控
        const username = usernameInp.current.value
        const password = pwdInp.current.value
        // 处理登录、注册功能
        if(isLoginForm){
            // console.log('登录--->',username,password)
            loginFn({
                identifier:username,
                password
            }).then(res=>{
                // 1.登录成功后，向系统添加一个标记，用于标记用户的登录状态
                // 2.以redux为例存储登录状态(布尔值，token(jwt)，用户信息)--（一般存储到本地存储，避免刷新页面登录状态缺失）
                if(!res.errror){
                    dispatch(login({
                        token:res.data.jwt,
                        user:res.data.user
                    }))
                    // 3.跳转页面到根目录
                    nav(from,{replace:true})
                }
            })
        }else{
            const email = emailInp.current.value
            regFn({
                username,
                email,
                password
            }).then(
                res=>{
                    if(!res.error){
                        // 注册成功，回到登录页面
                        setIsLoginForm(true)
                        // 清空input输入框
                        usernameInp.current.value=''
                        pwdInp.current.value=''
                    }
                }
            )
        }
    }
    // 登录注册表单切换
    const formChange=(e)=>{
        e.preventDefault()
        setIsLoginForm(prevState=>!prevState)
    }
    return (
        <div>
            <p style={{color:'red'}}>
                {regError && '用户名或邮箱已注册'}
            </p>
            <p style={{color:'red'}}>
               {loginError && '用户名或密码错误'}
            </p>
             
            <h2>{isLoginForm ? '登录':'注册'}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type='text' placeholder='用户名'/>
                </div>
                {!isLoginForm  &&
                    <div>
                        <input ref={emailInp} type='email' placeholder='邮箱'/>
                    </div>
                }
                <div>
                    <input ref={pwdInp} type='password' placeholder='密码'/>
                </div>
                <div>
                    <button>{isLoginForm ? '登录':'注册'}</button>
                    <a href='#' onClick={formChange}>
                        {
                            isLoginForm ?
                            '没有账号？点击注册':
                            '已有账号？点击登录'
                        }
                    </a>
                </div>
            </form>
        </div>
    )
}

export default AuthForm