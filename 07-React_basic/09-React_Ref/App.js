import React, { useRef } from 'react'
import './App.css'
let temp ={}
const App = () => {
  /* 
        获取原生的DOM对象(不建议，脱离React控制，容易出现性能问题)
          1.可以使用传统document来对DOM进行操作，但查询效率比较低
          2.直接从React处获取DOM对象
              1.创建一个存储DOM对象的容器-使用useRef()钩子函数
                  钩子函数注意事项：React中的钩子函数只能用于函数组件或自定义钩子；
                                  钩子函数只能直接在函数组件中调用,不能在函数组件内嵌套的函数中调用
              2.将容器设置为想要获取DOM对象元素的ref属性
                  <h1 ref={xxx}>...</h1>
                  - React会自动将当前元素的DOM对象，设置为容器的current属性(通过该属性可获取原生DOM对象)
        useRef()
          - 返回的就是一个普通的JS对象
          - {current:undefined}
          - 所以我们直接创建一个js对象({current:null})，也可以代替useRef()
          - 【区别:直接创建的对象，组件每次重新渲染都会创建一个新对象
                 useRef()创建的对象，使得每次渲染获取到的都是同一个对象】
          - 当需要一个对象不会因组件的重新渲染而改变，可以使用useRef()

          innerHTML(推荐) vs innerText:
            - innerHTML是从对象的起始位置到终止位置的全部内容,包括Html标签  <h1>hello</h1>
            - innerText从起始位置到终止位置的内容, 但它去除Html标签         hello
  */
  const h1Ref = useRef() //创建一个容器
  // const h1Ref = {current:null}
  console.log(temp===h1Ref)
  temp = h1Ref
  const clickHandler=()=>{
    const title=document.getElementById('header')
    // title.innerHTML = '哈哈'
    alert(h1Ref.current===title)//true
    h1Ref.current.innerText='哈哈' //不建议直接操作DOM，脱离了React的操作
  }
  return (
    <div className={'app'} >
        <h1 id='header' ref={h1Ref}>我是标题</h1>
        <button onClick={clickHandler}>1</button>
        <button>2</button>

    </div>
  )
}

export default App
