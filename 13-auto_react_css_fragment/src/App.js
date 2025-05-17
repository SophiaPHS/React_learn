import React, { useState } from 'react'
import classes from './App.module.css'
import './App.css' 
import Out from './Out'
const App = () => {
    const [showBorder,setShowBorder]=useState(true)
    const clickHandler=()=>{
        setShowBorder(!showBorder)
    }
    return (
        <Out>
            <p className={`${classes.p1} ${showBorder?classes.Border:''}`}>App组件段落</p>
            <button onClick={clickHandler} className='Button'>App按钮</button>
        </Out>
        
  )
}

export default App