import React from 'react'
import classes from './Backdrop.module.css'
import ReactDOM from 'react-dom'

const backdropRoot = document.getElementById('backdrop-root')
const Backdrop = (props) => {

  return ReactDOM.createPortal(
    <div 
      // {...props}当属性名一致时，可批量传入多个属性，简化代码
       {...props}
       className={`${classes.Backdrop} ${props.className}`}>
        {props.children}
    </div>,backdropRoot)
}

export default Backdrop