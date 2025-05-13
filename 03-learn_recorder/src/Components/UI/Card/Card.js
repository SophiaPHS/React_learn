import React from 'react'
import './Card.css'

const Card = (props) => {
    /* 
        Card组件作用：将容器公共样式提取出来，便于后期修改维护,这里以border-radius和box-shadow为例
        props.children :组件标签体
        
    */
  return (
    <div className={`card ${props.className}`}>
        {props.children}
    </div>
  )
}

export default Card