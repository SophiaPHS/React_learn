import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import classes from './FilterMeals.module.css'

// 用于搜索框检索
const FilterMeals = props => {
  const [keyword,setKeyword]=useState('')
  useEffect(()=>{
    // 降低数据过滤次数，提高用户体验---用户输入完了再过滤，用户输入过程中不要过滤(发送请求)
    // 当用户停止输入动作1s后，我们才做查询
    // 在开启一个定时器的同时，应该关掉上一次---防抖(规定时间内只发送最后一次请求-延迟执行，在指定时间内不再触发事件才会执行。)
    // 注意：节流是限制执行频率，每隔一定时间执行一次。按照固定的时间间隔执行
    const timer = setTimeout(()=>{
      console.log("Effect触发了!")
      props.onFilter(keyword)
    },1000)
    // 在Effect的回调函数中，可以制定一个函数作为返回值
    // 这个函数可以称其为清理函数，会在下次Effect执行前调用
    // 可以在这个函数中，做一些工作比如清除上次Effect执行所带来的影响
    return ()=>{
      clearTimeout(timer) // 清除上一次effect创建的定时器，即当前作用域创建的定时器，这样每次只有一个定时器，当时间到了就执行
    }
  },[keyword])
  
  const inputChangeHandler=(e)=>{
    // trim()去除空格，如果不受控是去除不了空格的判断不了
    // const keyword = e.target.value.trim()
    // props.onFilter(keyword)
    // 使得input受控,这里输入空格是判断得了的，这里是双向绑定
    setKeyword(e.target.value.trim())
  }
  return (
    <div className={classes.FilterMeals}>
        <div className={classes.InputOuter}>
            <input 
              type='text' 
              className={classes.SearchInput} 
              placeholder={"请输入关键字"}
              value={keyword}
              onChange={inputChangeHandler}
              />
            <FontAwesomeIcon className={classes.SearchIcon} icon={faSearch}/>
        </div>
        
    </div>
  )
}


export default FilterMeals