import React from 'react'
import './MyDate.css'

// 函数组件
const MyDate = () => {
  return (
    <div>
        <div className="date">
            <div className="month">
                四月
            </div>
            <div className="day">
                19
            </div>
        </div>
    </div>
  )
}

// 类组件
/* class MyDate extends React.Component {
  render() {
    return (
      <div>
        <div className="date">
            <div className="month">
                四月
            </div>
            <div className="day">
                19
            </div>
        </div>
      </div>
    )
  }
} */

export default MyDate