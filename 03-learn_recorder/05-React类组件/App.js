import React from "react"
/* 
    类组件创建--必须要继承React.Component 
*/
class App extends React.Component{
    // 类组件中必须添加一个render()方法，且方法返回值要是一个JSX
    render(){
        return <div>我是一个类组件</div>
    }
}
// 导出App
export default App