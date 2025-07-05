import React, { useEffect, useState } from 'react'
import Child from './components/Child'

const App = () => {
    console.log('App组件重新渲染')
    const [count,setCount]=useState(0)
    // setTimeout(() => {
    //     setCount(0)
    // }, 0);
    
    useEffect(()=>{
        setCount(1)
    })
    const clickHandler=()=>{
        console.log('点击按钮')
        setCount(1)
    }
    return (
        <div>
            {count}
            <Child/>
            <button onClick={clickHandler}>修改count</button>
        </div>
    )
}

export default App