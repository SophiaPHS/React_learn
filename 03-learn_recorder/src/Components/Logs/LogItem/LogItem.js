import React from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'
import Card from '../../UI/Card/Card'

// 函数组件
const LogItem = (props) => {
  return   (
   <Card className='item'>
        <MyDate date={props.date}/>
        <div className="content">
            <h2 className="desc">{props.desc}</h2>
            <div className="time">{props.time}</div>
        </div>
    </Card> 
    )
}





export default LogItem