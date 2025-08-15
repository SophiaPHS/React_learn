import React, { useCallback, useEffect, useState } from 'react'
import StudenList from './components/StudenList'
import StuContext from './store/StuContext'
import './App.css'


const App = () => {
    const [stuData,setStuData]=useState([])
    // 添加一个state记录数据是否正在加载,模拟网速慢的情况
    /*问题与解答： 【一开始loading设置为true，都可以执行
        但当修改数据并确认时还是显示修改状态
        将loading设置为false以及fetchData函数初始loading为true就可以了
        或者loading还是设置为true,在StudentForm -> updateHandle回调函数中添加Student传入的方法props.onCancel()】
    */
    const [loading,setLoading]=useState(false)
    // 记录错误信息
    const [error,setError]=useState(null)
    /* 
        将写死的数据替换为从接口http://localhost:1337/api/students 中加载的数据

        组件初始化时需要向服务器发送请求加载数据
    */
    // 采用await以同步方式使用异步函数，本质还是异步，语法糖
    // 从useEffect中提取出来并使用useCallback避免重复创建
    const fetchData =useCallback(async()=>{
        try{
            // 重置上一次错误信息
            setError(null)
            setLoading(true)
            const res =await fetch("http://localhost:1337/api/students")
            // 判断请求是否加载成功
            if(res.ok){
                const data=await res.json() //不加await，数据一直是pending
                setStuData(data.data)
                console.log(loading)
                setLoading(false)
                console.log("请求成功后"+loading)
            }else{
                throw new Error("数据加载失败！")
            }
        }catch(e){
            setError(e)
        }finally{
            // 无论有无错加载都要完毕
            setLoading(false)
            console.log("finally"+false)
        } 
    },[])
    useEffect(()=>{ //useEffect回调函数不支持异步，所以需要在里面再写一个异步函数并执行
        // 在effect中加载数据
        /* 此方法一直then过于繁琐，造成回调地狱
        fetch('http://localhost:1337/api/students')
            .then((res)=>{//请求发送成功调用 res(Response)表示响应信息
                // 判断是否正常返回响应信息,因为尽管请求不到还是会执行完这个fetch，不会到catch,导致报错在StudenList中获取不到数据
                if(res.ok){
                    return res.json() // 该方法可以将响应的json直接转换为js对象,promise对象
                }
                // 抛出一个错误
                throw new Error("数据加载失败！") //这个才进入到catch中
            }).then(data=>{ //这里的data就是res.json()
                console.log(data.data)
                // 将加载到的数据设置到state中
                setStuData(data.data)
                // 数据加载完毕设置loading为false
                setLoading(false)
            })
            .catch((e)=>{//用来统一处理错误,参数就是接收错误信息
                console.log(e)
                // 代码运行到这，说明没有成功加载到数据
                setLoading(false)
                // 设置错误状态
                setError(e)
            })*/
        fetchData()   
    },[])//空数组表示只调用一次 
    // 点击按钮刷新数据
    const loadDataHandler=()=>{
        fetchData()
    }
    return (
        <StuContext.Provider value={{fetchData}}>
            <div className='app'>
                <button onClick={loadDataHandler}>加载数据</button>
                {(!loading && !error) &&<StudenList stus={stuData}/>  }
                {loading && <p>数据正在加载中...</p>}
                {/* 有错error是对象，但是转换成true，返回p标签，没错error为false不显示出来 */}
                {error && <p>数据加载异常!</p>}
            </div>
        </StuContext.Provider>
    )
}

export default App