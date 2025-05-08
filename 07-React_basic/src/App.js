import React from 'react'
const clickHandler = (event)=>{
    alert(123)
    event.preventDefault()//取消默认行为
    event.stopPropagation()//取消冒泡
}
const App = () => {
  return (
        <div
            onClick={()=>{alert('div')}}
            style={{width:200,height:200,margin:'100px auto',backgroundColor:'#bfa'}}
        >
            <button onClick={clickHandler}>点我一下</button>
            <br/>
            <a href='https://www.baidu.com/s?wd=%E7%99%BE%E5%BA%A6' onClick={clickHandler}>链接</a>
        </div>
    )
}

export default App