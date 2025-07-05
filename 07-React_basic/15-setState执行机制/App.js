import React, { useState } from 'react'
import Child from './components/Child'

const App = () => {
    console.log('App组件重新渲染')
    const [count,setCount]=useState(0)
    /* 
        Too many re-renders. React limits the number of renders to prevent an infinite loop.  
            - 当直接在函数体中调用setState时，会触发Too many re-renders
            - 当新的state值和旧值相同不会触发组件重新渲染，为什么调用setState会触发渲染呢
            - 就要说明setState()的执行机制了(函数组件中)
                使用setState()会触发dispatchSetDate()
                    -->会先判断组件当前处于什么阶段
                        - 如果是渲染阶段-->不会检查state值是否相同；比如这里直接在函数体写setCount(0)就是处于渲染阶段，会不断地重新渲染App组件
                        - 如果不是渲染阶段-->会检查state的值是否相同
                            - 如果值不相同，则对组件进行重新渲染
                            - 如果值相同，则不对组件进行重新渲染
                                - `ps`:如果值相同，React在一些情况下会继续执行当前组件的渲染，但是这个渲染不会触发其子组件的渲染，这次渲染不会产生实际的效果（通常发生在值第一次相同时）
    */
    // setCount(0)
    /* 
        count 0 
            'App组件重新渲染' 
            '子组件重新渲染'
            第一次点击按钮 count-->1
                'App组件重新渲染' 
                '子组件重新渲染'
            第二次点击按钮 count-->1
                'App组件重新渲染'
            第三次点击按钮 count-->1
    */
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