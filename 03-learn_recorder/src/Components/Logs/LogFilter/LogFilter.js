import React from 'react'

const LogFilter = (props) => {
    const changeHandler = e=>{
        props.onYearChange(+e.target.value)//前缀`+`让字符串转变为number
    }
  return (
    <div>
        年份：<select onChange={changeHandler} value={props.year}>{/* 不写value，默认第一个option，且传入的value必须在option中存在否在默认显示第一个option */}
                <option value={2025}>2025</option>
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
    </div>
    
  )
}

export default LogFilter