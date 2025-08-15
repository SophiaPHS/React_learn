import { useCallback, useState} from 'react'
// 该组件封装的函数不具有通用性
export default function useFetch(){
    const [data,setData]=useState([])
    // 添加一个state记录数据是否正在加载,false表示没有加载
    const [loading,setLoading]=useState(false)
    // 添加一个state记录记录错误信息
    const [error,setError]=useState(null)
      
    const fetchData =useCallback(async()=>{
        try{
            // 重置上一次错误信息
            setError(null)
            setLoading(true)
            const res =await fetch("http://localhost:1337/api/students")
            // 判断请求是否加载成功
            if(res.ok){
                const data=await res.json() //不加await，数据一直是pending
                setData(data.data)
                setLoading(false)
            }else{
                throw new Error("数据加载失败！")
            }
        }catch(e){
            setError(e)
        }finally{
            // 无论有无错加载都要完毕
            setLoading(false)
        } 
    },[])
    // 需要自定义钩子函数中的数据以返回值暴露出去，使得其他组件调用能获取相应值
    // 这里本质是对数据和方法进行封装
    return {
        loading,//loading:loading
        error,
        data,
        fetchData
    }
}