import { useCallback, useState} from 'react'

/* reqObj--用来存储请求参数
    {
        url 请求地址
        method 请求方法
        body 请求体 (有问题)不应该在这传因为组件初始化就执行，不会获取最新数据，应该在fetchData函数中传入
    }
    cb 回调函数，请求发送成功后执行
*/
export default function useFetch(reqObj,cb){
    const [data,setData]=useState([])
    // 添加一个state记录数据是否正在加载,false表示没有加载
    const [loading,setLoading]=useState(false)
    // 添加一个state记录记录错误信息
    const [error,setError]=useState(null)
      
    const fetchData =useCallback(async(body)=>{
        try{
            // 重置上一次错误信息
            setLoading(true)
            setError(null)
            const res =await fetch("http://localhost:1337/api/"+reqObj.url,{
                method:reqObj.method || 'get', //短路求值特性
                headers:{
                    "Content-type":"application/json"
                },
                body:body?JSON.stringify({data:body}):null
            })
            // 判断请求是否加载成功
            if(res.ok){
                // 删除数据没有json
                if(reqObj.method!=='delete'){
                    const data=await res.json() //不加await，数据一直是pending
                    setData(data.data)
                }
                cb && cb()
            }else{
                throw new Error("数据加载失败！")
            }
        }catch(e){
            setError(e)
        }finally{
            setLoading(false)
        } 
    },[])
    return {
        loading,//loading:loading
        error,
        data,
        fetchData
    }
}