import React, { useCallback, useState } from 'react'
import A from './components/A'
const App = () => {
    console.log('App渲染')
    const [count,setCount]=useState(1)
    
    // const clickHandler=()=>{
    //     setCount(prevState=>prevState+1)
    // }
    /* 回调函数依赖其他变量，需要设置依赖项，但这样每次数据变化函数都重新创建，进而使得接收该函数的子组件也重新渲染
    这种一般不会这样写，只是说明下这个依赖数组的使用
    const [num,setNum]=useState(1)
    const clickHandler=useCallback(()=>{
        setCount(prevState=>prevState+num)
        setNum(prevState=>prevState+1)
    },[num])
     */
    const clickHandler=useCallback(()=>{
        setCount(prevState=>prevState+1)
    },[])

    return (
        <div>
            <h2>App -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            {/**App向A组件传递了一个函数，但App执行该函数会触发state修改也就重新渲染该函数，
             * 因此A组件props接收的函数会重新更新也就触发了A的渲染，尽管A设置了memo */}
            <A onAdd={clickHandler}/>
        </div>
    )
}

export default App