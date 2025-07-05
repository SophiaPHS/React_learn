import React from "react";

// 存放多组件访问的公共数据
const  CartContext = React.createContext({
    items:[],
    totalAmount:0,
    totalPrice:0,
    cartDispatch:()=>{}
})

export default CartContext