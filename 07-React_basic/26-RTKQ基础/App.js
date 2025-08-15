import React from 'react'
// 导入要使用的钩子函数
import { useGetStudentsQuery } from './store/studentApi'

const App = () => {
  // 调用Api查询数据
  //调用Api中的钩子查询数据，会返回一个独享作为返回值，请求过程中相关数据都在该对象中存储
  // const obj= useGetStudentsQuery()
  // console.log(obj) // 当执行该Api时会有请求状态从pending到full,所以要判断状态是否请求成功，如果还没成功获取的数据是空的
  const {data,isSuccess,isLoading} = useGetStudentsQuery()
  return (
    <div>
        {isLoading && <p>数据加载中...</p>}
        {isSuccess && data.data.map(item=><p key={item.documentId}>
          {item.name}---
          {item.age}---
          {item.gender}
          </p>)}
    </div>
  )
}

export default App