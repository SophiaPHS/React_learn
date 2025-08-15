import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// 创建Api对象

const studentApi = createApi({
    reducerPath:'studentApi',//作为Api唯一标识,不能和其他Api或reduecer重复
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1337/api/'
    }),//指定查询的基础信息，发送请求使用的工具
    endpoints(build){//端点，提供一个参数build，是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents:build.query({
                query(){
                    // 用来指定请求子路径
                    return 'students' //返回值会和baseUrl进行拼接
                }
            })
            // getStudentById:build.query(),
            // updateStudent:build.mutaion()
        }
    }//用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
})
// 2.Api对象创建后，对象会根据各种方法自动生成对应钩子函数，通过钩子函数向服务器发送请求
export const {useGetStudentsQuery}=studentApi  //这个方法相当于是执行getStudents

export default studentApi