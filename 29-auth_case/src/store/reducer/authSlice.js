import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    // initialState:{
    //     isLogged:false,
    //     token:null,
    //     user:null
    // },
    // 基于本地存储查看是否有登录状态，没有就初始化
    initialState:()=>{
        const token = localStorage.getItem('token')
        if(!token){
            return {
                isLogged:false,
                token:null,
                user:null,
                expirationTime:0 //登录状态失效时间
            }
        }
        return {
            isLogged:true,
            token,
            // 将本地存储字符串转换成对象
            user:JSON.parse(localStorage.getItem('user')),
            expirationTime:+localStorage.getItem('expirationTime')
        }
    },
    reducers:{//对state数据的操作
        login(state,action){
            state.isLogged = true
            state.token=action.payload.token
            state.user=action.payload.user
            // 获取当前时间戳
            const currentTime = Date.now()
            // 设置登录有效时间
            const timeout = 1000*60*60*24*7//一周
            state.expirationTime=currentTime+timeout //设置失效日期
            // 将数据同时存储到本地存储中
            localStorage.setItem('token',state.token)
            localStorage.setItem('user',JSON.stringify(state.user))
            localStorage.setItem('expirationTime',state.expirationTime+'')
        },
        logout(state){
            state.isLogged = false
            state.token=null
            state.user=null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('expirationTime')
        }
    }
})
// 注意这里方法暴露用的是actions，虽然配置对象是reducers
export const {login,logout}=authSlice.actions