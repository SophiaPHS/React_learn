import React from 'react'
import './Backdrop.css'
import ReactDOM from 'react-dom'

// 获取backdrop的根元素
const backdropRoot = document.getElementById('backdrop-root')
const Backdrop = (props) => {
  // 无论在哪个组件使用遮罩层，最终都渲染到index.html中的backdrop-root
  return ReactDOM.createPortal(
    <div className='backdrop'>
        {props.children}
    </div>,backdropRoot)
     /* return (<div className='backdrop'>
        {props.children}
    </div>) */
}

export default Backdrop