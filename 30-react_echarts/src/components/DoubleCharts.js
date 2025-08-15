import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

// 进行图表合并
const DoubleCharts = () => {
    const chart = useRef()
    let myChart=null
    useEffect(()=>{
        if(chart.current){
            if(myChart){
                myChart.dispose()
            }
            myChart =echarts.init(chart.current)
            myChart.resize({//设置图表大小
                width: 500,
                height: 300
            });
            myChart.setOption({
                title: {
                    text: '柱形图和折线图合并'
                },
                legend: {//若图例没显示说明图表过大将图例被挤出可视区
                    // 图例位置：bottom 表示在底部，还可设置 'top'/'left'/'right' 等
                    left: 'center', 
                    bottom: '10px', // 微调底部距离 
                    // 图例项数据，和 series 里的 name 对应
                    data:['销售量','销售增长率'],
                    // 图例图标样式（可选，可自定义形状、颜色等）
                    icon: 'roundRect'  //圆角矩形
                },
                tooltip: {//用于定义图表的提示框行为和样式，当用户鼠标悬停在图表元素上时，会显示相关数据信息
                    trigger: 'axis',//按坐标轴触发提示框
                    axisPointer: { type: 'cross' } //鼠标悬停时显示的辅助线,这里同时显示水平和垂直两条辅助线，交叉于鼠标所在位置
                },
                xAxis: {
                    type: 'category',
                    axisTick: {//配置坐标轴上的刻度线
                        alignWithLabel: true //让刻度线与坐标轴标签对齐
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月','7月']
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '销售量',
                        position: 'left',
                        axisLabel: {//设置坐标轴上显示的标签
                            formatter: '{value} 万件' //对标签内容进行格式化
                        }
                    },
                    {
                        type: 'value',
                        name: '销售增长率',
                        position: 'right',
                        axisLine:{
                            lineStyle:{
                                color:'skyblue'
                            }
                        },
                        axisLabel: {//设置坐标轴上显示的标签
                            formatter: '{value} %' //对标签内容进行格式化
                        }
                    },
                ],
                series: [
                    {
                        name: '销售量',
                        type: 'bar',
                        //索引表示决定鼠标悬停时，提示框显示哪一个 Y 轴对应的数据
                        // yAxisIndex: 0,
                        data: [100, 210, 136, 150, 180, 250,200]
                    },
                    {
                        name: '销售增长率',
                        type: 'line',
                        yAxisIndex: 1,
                        // smooth: true,//设置曲线平滑
                        data: [10, 20, 16, 18, 30, 25,15]
                    },
                ]
            });
        }
    })
    return (
        <div ref={chart} style={{width:500,height:500}}></div>
    )
}

export default DoubleCharts