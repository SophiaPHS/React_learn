import React from 'react'
import classes from './Meal.module.css'
import Counter from '../../../UI/Counter/Counter'
/* 
    食物组件
*/
const Meal = (props) => {
  return (
    <div className={classes.Meal}>
        <div className={classes.ImgBox}>
            {/* 不加 alt会警告img elements must have an alt prop, either with meaningful text, or an empty string for decorative images */}
            <img src={props.meal.img} alt=''/>
        </div>
        <div className={classes.DescBox}>
            <h2 className={classes.Title}>{props.meal.title}</h2>
            {props.noDesc?null:<p className={classes.Desc}>{props.meal.desc}</p>}
            <div className={classes.PriceWrap}>
                <span className={classes.Price}>{props.meal.price}</span>
                <Counter 
                    meal={props.meal}
                />
            </div>
        </div>
    </div>
  )
}

export default Meal