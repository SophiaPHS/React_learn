import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import classes from './FilterMeals.module.css'

// 用于搜索框检索
const FilterMeals = props => {
  const inputChangeHandler=(e)=>{
    // trim()去除空格，在App.js中就不需要判断
    const keyword = e.target.value.trim()
    props.onFilter(keyword)
  }
  return (
    <div className={classes.FilterMeals}>
        <div className={classes.InputOuter}>
            <input 
              type='text' 
              className={classes.SearchInput} 
              placeholder={"请输入关键字"}
              onChange={inputChangeHandler}/>
            <FontAwesomeIcon className={classes.SearchIcon} icon={faSearch}/>
        </div>
        
    </div>
  )
}


export default FilterMeals