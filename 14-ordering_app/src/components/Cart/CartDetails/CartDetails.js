import React, { useContext, useState } from 'react'
import Backdrop from '../../../UI/Backdrop/Backdrop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import classes from './CartDetails.module.css'
import CartContext from '../../../store/cart-context'
import Meal from '../../Meals/Meal/Meal'
import Confirm from '../../../UI/Confirm/Confirm'
const CartDetails = () => {
  const ctx = useContext(CartContext)
  //  设置state控制确认框的显示
  const [showConfirm,setShowConfirm]=useState(false)
  // 添加函数显示清空购物车的确认窗口
  const showConfirmHandler=()=>{
    setShowConfirm(true)
  }
  const cancelHandler=(e)=>{
    // 停止冒泡以防点击弹窗的取消按钮导致整个购物车详情隐藏
    e.stopPropagation()
    setShowConfirm(false)
  }
  const okHandler=()=>{
    // 使用CartContext中的清空购物车函数
    ctx.clearCart()
  }
  return (
    <Backdrop>
        {showConfirm && <Confirm 
          onCancel={cancelHandler}
          onOk={okHandler}
          confirmText={"确认清空购物车吗？"}/>}
        {/* 停止事件冒泡,阻止事件继续向上（向父元素）传播,避免点击购物车详情隐藏购物车详情 
            逻辑：在购物车详情容器（`classes.CartDetails`）上阻止事件冒泡。当点击购物车内部时，事件不会冒泡到外层，
            即不会触发外层元素的点击事件（关闭购物车），而点击购物车外部（比如Backdrop）则没有阻止冒泡，会触发Cart.js的toggleDetailsHandler事件
        */}
        <div className={classes.CartDetails} onClick={e=>e.stopPropagation()} >
          <header className={classes.Header}>
            <h2 className={classes.Title}>餐品详情</h2>
            <div onClick={showConfirmHandler} className={classes.Clear}>
              <FontAwesomeIcon icon={faTrash}/>
              <span>清空购物车</span>
            </div>
          </header>
          <div className={classes.MealList}>
            {
              ctx.items.map(item => 
                <Meal 
                  noDesc
                  key={item.id}
                  meal={item}
                  />)
            }
          </div>
        </div>
        
    </Backdrop>
  )
}

export default CartDetails