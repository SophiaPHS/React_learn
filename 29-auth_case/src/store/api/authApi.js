import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1337/api/'
    }),
    endpoints(build){
        return {
            // 注册请求
            register:build.mutation({
                query(user){ 
                    return {
                        url:'auth/local/register',
                        method:'post',
                        body:user //username,email,password
                    }
                }
            }),
            // 登录请求
            login:build.mutation({
                query(user){
                    return {
                        url:'auth/local',
                        method:'post',
                        body:user //unsername-->identifier,表示输入邮箱或用户名都可
                    }
                }
            })
        }
    }
})
export const {useRegisterMutation,useLoginMutation}=authApi