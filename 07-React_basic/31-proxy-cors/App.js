import React from 'react'
import axios from 'axios'

const App = () => {
    /* 通过直接在package.json文件中配置"proxy": "https://blog.csdn.net"
    const clickHandlerOne=()=>{
        axios.get('http://localhost:3000/m0_53159803?spm=1000.2115.3001.5343').then(
            response => {
                console.log("请求成功了！", response.data)
            },
            error => {
                console.log("请求失败了！", error)
            }
        )
    }*/
    const clickHandlerTwo=()=>{
        // 在target配置baseUrl的省略，http://localhost:3000可写可不写，在路径前面添加 /api 前缀
        axios.get('/api1/m0_53159803/article/details/147544022?spm=1001.2014.3001.5501').then(
            response => {
                console.log("请求成功了！", response.data)
            },
            error => {
                console.log("请求失败了！", error)
            }
        )
    }
     const clickHandlerThree=()=>{
        axios.get('/api2/m0_53159803?spm=1000.2115.3001.5343').then(
            response => {
                console.log("请求成功了！", response.data)
            },
            error => {
                console.log("请求失败了！", error)
            }
        )
    }
    return (
        <div>
            {/* <button onClick={clickHandlerOne}>请求button数据--package</button> */}
            <button onClick={clickHandlerTwo}>请求button数据1--setupProxy</button>
            <button onClick={clickHandlerThree}>请求button数据2--setupProxy</button>
        </div>
    )
}

export default App