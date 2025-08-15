import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const studentApi = createApi({
    reducerPath:'studentApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1337/api/',
        prepareHeaders:(headers,{getState})=>{//第一个参数headers参数是其默认的请求头，第二个参数(对象)存在获取state的方法
            // 获取用户的token
            const token = getState().auth.token
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        } //用来统一设置请求头,返回值成为新的请求头
    }),
    tagTypes:['student'], 
    endpoints(build){
        return {
            getStudents:build.query({
                query(){
                    return {
                        url:'students',
                    }
                },
                transformResponse(baseQueryReturnValue){
                    return baseQueryReturnValue.data
                },
                providesTags:[{type:'student',id:'LIST'}] 
            }),
            getStudentById:build.query({
                query(id){
                    return `students/${id}`
                },
                transformResponse(baseQueryReturnValue){
                    return baseQueryReturnValue.data
                },
                keepUnusedDataFor:60,
                providesTags:(result,error,id)=>[{type:'studnet',id}]
            }),
            delStudent:build.mutation({
                query(id){
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
                        body:{data:stu}
                    }
                },
                invalidatesTags:[{type:'student',id:'LIST'}] 
            }),
            updateStudent:build.mutation({
                query(stu){
                    return {
                        url:`students/${stu.id}`,
                        method:'put',
                        body:{data:stu.inputData}
                    }
                },

                invalidatesTags:(result,error,stu)=>[{type:'studnet',id:stu.id},{type:'student',id:'LIST'}] 
            })
        }
    }
})

export const {useGetStudentsQuery,useGetStudentByIdQuery,useAddStudentMutation,useUpdateStudentMutation}=studentApi  

export default studentApi