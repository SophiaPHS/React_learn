import React from 'react'
import './MyDate.css'

// 函数组件
const MyDate = (props) => {
  // console.log(props.date)
  const month =props.date.toLocaleString('zh-CN',{month:'long'}) //复杂代码尽量不要写在JSX里面
  const date = props.date.getDate()
  return (
    <div>
        <div className="date">
            <div className="month">
                {/* 获取月份值从0开始所以要加1 
                  方法1：{props.date.getMonth()+1}月 
                  方法2：toLocaleString()--时间转换成本地格式时间
                            参数说明：1-日期格式 比如'zh-CN'以中国格式显示
                                     2-对象(指定日期里面要显示哪些数据) {数据：'格式'} 
                */}
                {/* {props.date.toLocaleString('zh-CN',{month:'long'})} */}
                {month}
            </div>
            <div className="day">
                {date}
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