import React, { useState } from 'react'

const B = (props) => {
    console.log('B渲染')
    const [count,setCount]=useState(1)
    const clickHandler=()=>{
        setCount(prevState=>prevState+1)
    }
    return (
        <div>
            <h2>B -- {count}</h2>
            <button onClick={clickHandler}>增加</button>
            {props.test && '偶数'}
        </div>
    )
}

export default React.memo(B)