import React from 'react'
import Meal from './Meal/Meal'
import classes from './Meals.module.css'
/* 
    食物列表
*/
const Meals = (props) => {
  return (
    // 将滚动条基于body的溢出设置给了Meals组件
    <div className={classes.Meals}>
        {
            props.mealsData.map(item => 
              <Meal 
                key={item.id}
                meal={item}
                />)
        }
    </div>
  )
}

export default Meals