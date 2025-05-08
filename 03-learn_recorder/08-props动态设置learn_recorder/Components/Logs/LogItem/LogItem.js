import React from 'react'
import MyDate from './MyDate/MyDate'
import './LogItem.css'

// 函数组件
const LogItem = (props) => {
  // console.log(props)
  // props.desc = '学习CSS' //会报错,因为props只读
  return   (
   <div className='item'>
        <MyDate date={props.date}/>
        <div className="content">
            <h2 className="desc">{props.desc}</h2>
            <div className="time">{props.time}</div>
        </div>
    </div> 
    )
}


// 类组件
/* class LogItem extends React.Component {
  render() {
    return (
      <div className='item'>
        <MyDate/>
        <div className="content">
            <h2 className="desc">学习React</h2>
            <div className="time">40分钟</div>
        </div>
      </div>
    )
  }
} */


export default LogItem