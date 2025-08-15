import React, { useCallback, useEffect, useState } from 'react'
import StudenList from './components/StudenList'
import StuContext from './store/StuContext'
import './App.css'
import useFetch from './hooks/useFetch'


const App = () => {
    // stuData--别名
    const {data:stuData,loading,error,fetchData}=useFetch()
    useEffect(()=>{ 
        fetchData()   
    },[]) 
    // 点击按钮刷新数据
    const loadDataHandler=()=>{
        fetchData()
    }
    return (
        <StuContext.Provider value={{fetchData}}>
            <div className='app'>
                <button onClick={loadDataHandler}>加载数据</button>
                {(!loading && !error) &&<StudenList stus={stuData}/>  }
                {loading && <p>数据正在加载中...</p>}
                {/* 有错error是对象，但是转换成true，返回p标签，没错error为false不显示出来 */}
                {error && <p>数据加载异常!</p>}
            </div>
        </StuContext.Provider>
    )
}

export default App