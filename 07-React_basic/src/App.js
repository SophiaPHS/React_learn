import React, { useState } from 'react'
import './App.css'
const App = () => {
  /* 
      在React中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染
        -通过state使得变量修改后组件重新渲染
        - state相当于一个变量，在React中进行了注册，React会监控这个变量的变化，即【React创建并管理state】


        - 在函数组件中，通过钩子函数获取state
          - 【使用钩子useState()来声明state并定义初始值】 import  { useState } from 'react'
           - 需要一个参数：state的初始值
           - 函数返回一个数组，有两个元素：
              - 1--初始值(只用来显示数据，直接修改不会触发组件的重新渲染)
              - 2--函数，通常命名为`setXXX`(用来修改state，函数值作为新的state且调触发组件的重新渲染;)
          - 原理:当调用useState()时，React会在组件内部创建一个特殊的存储空间来保存这个state
                 React 会监控 state 的变化，并在 state 更新时自动触发组件的重新渲染

   */
  // const result = useState(1)
  // let count = result[0]
  // let setCount = result[1]
  // 【解构赋值】简化代码
  const [count,setCount]=useState(1)
  const [user,setUser]=useState({name:'张三',age:18})

  const addHandler = ()=>{
    // number++ 改变了number但并没有渲染页面--组件渲染在函数触发前完成
    // count++
    // setCount(count+1)//【count为常量，不能count+=1进行赋值】
    // setCount(count+1) //由于setCount异步，多次调用setCount，会进行合并，执行最后一次的setCount()调用
    /* 
        setState()中回调函数的返回值将会成为新的state值
          回调函数执行时，由于是异步的，所以React会将setCount返回的state值作为下一次setCount中的参数-解决多次点击修改时获取不到最新的值
    */
    setTimeout(()=>{
      //  return setCount(count+1) 用旧state的值时,连续多次修改count可能不是最新值
      setCount((prevCount)=>{
          return prevCount+1
      })
    },1000)

  }
  const lessHandler = ()=>{
    // count -= 1 不会触发组件重新渲染
    setCount(count-1)
  }
  const changeName = ()=>{
    // setUser({name:'李四'}) 会覆盖已有对象

    // 如果直接修改对象里的某个属性，由于对象地址不变，所以不会重新渲染
    // user.name = '李四'
    // setUser(user)

    // 重新创建一个对象进行修改
    const newUser = Object.assign({},user)
    newUser.name='王五'
    setUser(newUser)
    // 等价于
    // setUser({...user,name:'王五'})

  }
  return (
    <div className={'app'}>
        <h1>{count}--{user.name}--{user.age}</h1>
        <button onClick={lessHandler}>-</button>
        <button onClick={addHandler}>+</button>
        <button onClick={changeName}>修改名字</button>
    </div>
  )
}

export default App
