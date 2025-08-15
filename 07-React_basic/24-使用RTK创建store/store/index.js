// 使用RTK来构建store
import { configureStore, createSlice } from "@reduxjs/toolkit";


// createSlice  创建reducer切片
// 需要一个配置对象作为参数，通过对象的额不同属性来指定它的位置
// 当切片创建完会自动生成reducer和actions，
const stuSlice = createSlice({
    name:'stu', //切片名字,最好不要和其他切片名重复,用来自动生成action中的type
    initialState:{//当前切片的state的初始值
        name:'孙悟空',
        age:18,
        gender:'男',
        address:'花果山'
    },
    reducers:{//指定state的各种操作,直接在对象中添加方法
        setName(state,action){
            //可以通过不同方法来指定对state的不同操作
            // 两个参数：state是代理对象，可以直接修改不用解构赋值再修改
            state.name=action.payload
        },
        setAge(state,action){
            state.age=action.payload
        }

    }
})
//  切片对象会自动的帮助我们生成action
// actions中存储的是slice自动生成action创建器(函数)--即存储各种操作，调用action函数后会自动创建action对象
// action对象的结构{type:name/函数名,payload:函数的参数}
export const {setName,setAge}=stuSlice.actions //方法要向外暴露
/* const nameAction = setName('哈哈')
const ageAction = setName(30)
console.log(nameAction)//{type: 'stu/setName', payload: '哈哈'}
console.log(ageAction)//{type: 'stu/setName', payload: 30} */

// configureStore创建store对象，需要一个配置对象作为参数
const store = configureStore({
    reducer:{
        student:stuSlice.reducer //注意这里是reducer而不是reducers
    }
})

export default store