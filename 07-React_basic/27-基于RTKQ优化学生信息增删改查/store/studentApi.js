import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// 创建Api对象

const studentApi = createApi({
    reducerPath:'studentApi',//作为Api唯一标识,不能和其他Api或reduecer重复
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1337/api/'
    }),//指定查询的基础信息，发送请求使用的工具
    tagTypes:['student'], //用来指定Api中的标签类型
    endpoints(build){//端点，提供一个参数build，是请求的构建器，通过build来设置请求的相关信息
        return {
            getStudents:build.query({
                query(){
                    // 用来指定请求子路径
                    return 'students' //返回值会和baseUrl进行拼接
                },
                transformResponse(baseQueryReturnValue){//转换响应数据的格式
                    return baseQueryReturnValue.data
                },
                providesTags:[{type:'student',id:'LIST'}] //打标签，标签失效就会重新触发，可以有多个标签，判断是或
            }),
            getStudentById:build.query({
                query(id){
                    return `students/${id}`
                },
                transformResponse(baseQueryReturnValue){//转换响应数据的格式，直接获取data.data
                    return baseQueryReturnValue.data
                },
                // keepUnusedDataFor:60//设置数据未被使用的缓存时间(单位秒) 0--不缓存，默认60s
                // 基于id打标签，表示只有对应id失效才会重新触发该请求；如果设置全局'student'，
                // 当其他数据修改时，所有数据都会再次触发该函数(但其他数据不修改的情况适用缓存即可)
                providesTags:(result,error,id)=>[{type:'studnet',id}]
            }),
            delStudent:build.mutation({
                query(id){
                    // 如果不是get请求，需要返回一个对象设置请求信息
                    return {
                        url:`students/${id}`,
                        method:'delete'
                    }
                }
            }),
            addStudent:build.mutation({
                query(stu){
                    return {
                        url:'students',
                        method:'post',
                        body:{data:stu}//RTQK会自动转换成JSON不需要我们设置
                    }
                },
                invalidatesTags:[{type:'student',id:'LIST'}] //使带'student'的标签数据的失效，
            }),
            updateStudent:build.mutation({
                query(stu){
                    return {
                        url:`students/${stu.id}`,
                        method:'put',
                        body:{data:stu.inputData}//RTQK会自动转换成JSON不需要我们设置
                    }
                },
                // 加了全局的student才会更新数据，相当于重新触发getStudents，然后就重新渲染App
                // 设置基于id的标签只是让修改数据时是获取最新数据，但是修改后页面显示的还是旧数据
                invalidatesTags:(result,error,stu)=>[{type:'studnet',id:stu.id},{type:'student',id:'LIST'}] //使带'student'的标签数据的失效，
            })
        }
    }//用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
})
// 2.Api对象创建后，对象会根据各种方法自动生成对应钩子函数，通过钩子函数向服务器发送请求 useDelStudentMutation
export const {useGetStudentsQuery,useGetStudentByIdQuery,useAddStudentMutation,useUpdateStudentMutation}=studentApi  //这个方法相当于是执行getStudents

export default studentApi