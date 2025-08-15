import React from 'react'
// 导入要使用的钩子函数
import { useGetStudentsQuery } from './store/studentApi'
import StudentList from './components/StudentList'

const App = () => {
  // 调用Api查询数据
  //调用Api中的钩子查询数据，会返回一个独享作为返回值，请求过程中相关数据都在该对象中存储
  // const obj= useGetStudentsQuery()
  // console.log(obj) // 当执行该Api时会有请求状态从pending到full,所以要判断状态是否请求成功，如果还没成功获取的数据是空的
  const {data:stus,isSuccess,isLoading,refetch} = useGetStudentsQuery(null,{
    // selectFromResult:result=>{
    //   if(result.data){
    //     result.data=result.data.filter(item=>item.age<18)
    //   }
    //   return result
    // },//用来指定useQuery返回结果
    // pollingInterval:2000, //设置轮询的间隔(单位毫秒),即隔一段时间发送请求
    // skip:false,//设置是否跳过当前请求，默认为false表示不跳过
    // refetchOnMountOrArgChange:false, //表示是否重新加载数据，false表示不加载即使用缓存数据
    // refetchOnFocus:false,//是否重新获取焦点时重载数据,可应用于切换页面
    // refetchOnReconnect:true,//网断了后恢复是否重连
  })
  
  return (
    <div>
        <button onClick={()=>refetch()}>重新从服务器请求数据(刷新数据)</button>
        {isLoading && <p>数据加载中...</p>}
        {isSuccess && <StudentList stus={stus}/>}
    </div>
  )
}

export default App