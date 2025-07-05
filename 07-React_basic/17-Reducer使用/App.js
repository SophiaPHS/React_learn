import React, { useReducer, useState } from 'react'


// 为了避免reducer会重复创建，通常reducer会定义到组件的外部
const countReducer= ((state,action)=>{
    // console.log('reducer执行了',state,action.type)
    // 根据action中不同type来执行不同操作
    switch (action.type){
        case 'ADD':
            return state+1
        case "SUB":
            return state-1
        default:
            return state
    }
})
   
const App = () => {
    // const [count,setCount]=useState(1)
    // const addHandler=()=>{
    //     setCount(prevState=>prevState+1)
    // }
    // const subHandler=()=>{
    //     setCount(prevState=>prevState-1)
    // }
    /*  useReducer(reducer,initialArg,init)
        参数： reducer--整合函数，对于当前state的所有操作都应该在函数中定义，该函数的返回值会成为state的新值
                     --reduce在执行时，会受到两个参数(...args)：state-当前最新的state
                                                              action-需要一个对象，在对象中会存储dispatch所发送的指令
              initialArg--state的初始值，作用和useState()中的值是一样
        返回值：数组
                第一个参数，state用来获取state的值
                第二个参数，state 修改的派发器，通过派发器可以发送操作state的命令，具体的修改行为将会由另外一个函数(参数里面的reducer)执行
    
    */
    const [count,countDispatch] = useReducer(countReducer,1)
    const addHandler=()=>{
        countDispatch({type:'ADD'})
    }
    const subHandler=()=>{
        countDispatch({type:'SUB'})
    }
    return (
        <div style={{fontSize:30,width:200,height:200,backgroundColor:'#bfa',margin:'100px auto',textAlign:"center"}}>
            <button onClick={subHandler}>减少</button>
                {count}
            <button onClick={addHandler}>增加</button>
        </div>
    )
}

export default App