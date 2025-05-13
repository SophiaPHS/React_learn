import React, { Component} from 'react'

class User extends Component {
    /* 
        类组件的props是存储到类的实例对象中，可以直接通过实例对象访问(this.props)

        类组件中state统一存储到实例对象的state属性中(this.state获取；this.setState()修改)
        当通过this.setState()修改state时，不修改的的属性会保留，但是仅限于直接存储于state中的属性，
            嵌套属性则会替换比如state = {obj:{name:'张三',age:'李四'}} --修改obj:{name:'李四'}会替换原先的obj:{name:'张三',age:'李四'}
        函数组件中，响应函数直接以函数的形式定义在组件中，但是在类组件中，响应函数式是类的方法定义

        获取DOM对象：CreatRef()
            1.创建一个属性，用来存储DOM对象 divRef = React.createRef()
            2.将这个属性设置为指定元素的ref值
        
        类组件使用props、state、ref与函数组件最大区别是，在访问属性或者方法时要加前缀【this】
    */

    
    // 创建属性存储DOM对象
    divRef = React.createRef()
    // 包含所有state的值   
    state = {
        count:0,
        obj:{name:'王五',age:18}
    }
    // 类组件中响应函数以箭头函数形式定义(避免this问题)
    clickHandler = ()=>{
        // this.setState({count:this.state.count+1})
        this.setState(prevState=>{
            return {
                count:prevState.count+1,
            }
        })
        this.setState({
            // obj:{name:'李四'}覆盖原先obj
            obj:{...this.state.obj,name:'李四'}
        })
        // 获取div原生对象
        console.log(this.divRef.current)
    }
    render() {
        console.log(this.props)
        return (
            <div ref={this.divRef}>
                <h1>{this.state.count}</h1>
                <h1>{this.state.obj.name}-{this.state.obj.age}</h1>
                <button onClick={this.clickHandler}>state数据修改</button>
                <ul>
                    <li>姓名：{this.props.name}</li>
                    <li>性别：{this.props.gender}</li>
                    <li>年龄：{this.props.age}</li>
                </ul>
            </div>
        
        )
    }
}
export default User
