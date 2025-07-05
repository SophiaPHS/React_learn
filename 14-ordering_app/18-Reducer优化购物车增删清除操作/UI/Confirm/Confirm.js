import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Confirm.module.css'

const Confirm = (props) => {
  return (
    // 遮罩层添加点击时间，使得点击弹窗外的遮罩层不会把弹窗和购物车详情信息都隐藏
    <Backdrop className={classes.ConfirmOuter}  onClick={(e)=>{props.onCancel(e)}}>
        <div className={classes.Confirm}>
            <p className={classes.ConfirmText}>{props.confirmText}</p>
            <div>
                <button  onClick={(e)=>{props.onCancel(e)}} className={classes.Cancel}>取消</button>
                <button  onClick={()=>{props.onOk()}} className={classes.Ok}>确认</button>
            </div>
        </div>
    </Backdrop>
  )
}

export default Confirm