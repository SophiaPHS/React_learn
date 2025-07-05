import React, { useContext, useEffect, useState } from 'react'
import classes from './Cart.module.css'
import iconImg from '../../asset/bag.png'
import CartContext from '../../store/cart-context'
import CartDetails from './CartDetails/CartDetails'
import Checkout from './Checkout/Checkout'
const Cart= () => {
  const ctx = useContext(CartContext)
  // 添加state设置详情是否显示
  const [showDetails,setShowDetails] =useState(false)
  // 添加一个state设置结账页的显示与隐藏
  const [showCheckout,setShowCheckout]=useState(false)
  // 添加显示详情页的函数
  const toggleDetailsHandler=()=>{
    if(ctx.totalAmount!==0){
      // 购物车显示与隐藏
      setShowDetails(prevDetails=>!prevDetails)
    }
  }
  
  const showCheckoutHandler=()=>{
    if(ctx.totalAmount===0) return;//排除无商品数量点击去结算不会到结算页面
    setShowCheckout(true)
  }
  const hideCheckoutHandler=()=>{
    setShowCheckout(false)
  }
  useEffect(()=>{
    console.log('effect执行')
    if(ctx.totalAmount===0){
      // 购物车被清空
      // setShowDetails(false) 
      // 支付详情商品情空后支付详情页隐藏
      setShowCheckout(false)
    }
  },[ctx,setShowCheckout])
  return (
    <div className={classes.Cart} onClick={toggleDetailsHandler}>
      {/* 结账页面的显示与隐藏 */}
      { showCheckout && <Checkout onHide={hideCheckoutHandler}/> }
      {/* 引入购物车详情 当删除购物车详情数据，购物车详情并不会隐藏  加上ctx.totalAmount确保清空商品后不会显示购物车详情页,或者使用useEffect实现 */}
      { showDetails && ctx.totalAmount && <CartDetails/>}
      <div className={classes.Icon}>
        <img src={iconImg} alt=''/>
        {ctx.totalAmount===0? null : <span className={classes.TotalAmount}>{ctx.totalAmount}</span>}
      </div>
      {ctx.totalAmount===0? <p className={classes.noMeal}>未选购商品</p>:<p className={classes.Price}>{ctx.totalPrice}</p>}
      <button 
        onClick={showCheckoutHandler}
        className={`${classes.Button} ${ctx.totalAmount===0?classes.Disable:''}`}>去结算</button>
    </div>
  )
}
export default Cart