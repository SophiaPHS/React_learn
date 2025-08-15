// 使用RTK来构建store
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { stuReducer } from "./stuSlice";
import { schoolReducer } from "./schoolSlice";


// configureStore创建store对象，需要一个配置对象作为参数
const store = configureStore({
    reducer:{
        student:stuReducer,
        school:schoolReducer
    }
})

export default store