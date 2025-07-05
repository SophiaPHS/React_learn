import React, { useContext } from 'react'
import classes from './Counter.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../store/cart-context'
/* 
    引入FontAwesome(fontawesome.com)
        - 安装依赖
            npm i --save @fortawesome/fontawesome-svg-core
            npm i --save @fortawesome/free-solid-svg-icons
            npm i --save @fortawesome/free-regular-svg-icons
            npm i --save @fortawesome/free-brands-svg-icons
            npm i --save @fortawesome/react-fontawesome@latest
          或者直接yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome@latest
        - 引入组件 import {FontAwesomeIcon} from " @fortawesome/react-fontawesome@latest"
        - 引入图标 import {faPlus} from '@fortawesome/free-solid-svg-icons' (从官网查询所需图标)
        - 使用组件 <FontAwesomeIcon icon={faPlus}/>
*/
// 计数器的组件
const Counter = (props) => {
    // 获取card-context存放的数据
    const ctx = useContext(CartContext)
    // 添加购物车的函数
    const addButtonHandler =()=>{
        ctx.cartDispatch({type:'ADD',meal:props.meal})
    }
    // 商品移除购物车的函数
    const subButtonHandler = ()=>{
        ctx.cartDispatch({type:'REMOVE',meal:props.meal})
    }
    return (
        <div className={classes.Counter}>
            {
                (props.meal.amount && props.meal.amount!==0) ? (
                    <>
                        <button className={classes.Sub} onClick={subButtonHandler}><FontAwesomeIcon icon={faMinus}/></button>
                        <span className={classes.count}>{props.meal.amount}</span>
                    </>
                ):null
            }
            
            <button 
                onClick={addButtonHandler}
                className={classes.Add}>
                <FontAwesomeIcon icon={faPlus}/>
            </button>
        </div>
    )
}

export default Counter