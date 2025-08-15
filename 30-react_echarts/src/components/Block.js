import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

const Block = () => {
    // 创建一个容器
    const chart = useRef(null)
    let myChart = null
    // 基于准备好的dom，初始化echarts实例,这里需要用useEffect，直接组件刚渲染就获取可能获取不到
    useEffect(()=>{
        if(chart.current){
            // 先判断是否已有实例，有则销毁，否则警告不允许echarts重复初始化
            if(myChart){
                myChart.dispose()
            }
            myChart =echarts.init(chart.current)
            myChart.setOption({
                title: {
                    text: '柱形图渲染'
                },
                tooltip: {},//不写配置默认基础提示框
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},//即使y轴不配置，但是有数据也要写上该字段yAxis "0" not found
                series: [
                    // 一个数据默认是 yAxisIndex: 0
                    {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        }
    },[chart])
    
    return (
        <div ref={chart} style={{width:500,height:400}}></div>
    )
}

export default Block