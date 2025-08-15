import {configureStore} from '@reduxjs/toolkit'
import studentApi from './studentApi'
import { setupListeners } from '@reduxjs/toolkit/query'
// store仓库入口文件
const store = configureStore({
    reducer:{
        // 属性名如果是变量要用[]括起来
        [studentApi.reducerPath]:studentApi.reducer //reducer是自动生成的
    },
    // 中间件，具有缓存功能
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(studentApi.middleware)
})
setupListeners(store.dispatch) //设置后将会支持refetchOnFocus,refetchOnReconnect
export default store