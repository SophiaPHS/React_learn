import React from 'react'
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'

const Stu_Data=[
    {
        id:1,
        name:'学生1'
    },
    {
        id:2,
        name:'学生2'
    },
    {
        id:3,
        name:'学生3'
    },
    {
        id:4,
        name:'学生4'
    }
]
const Student = () => {
    const {id} = useParams()
    const stu = Stu_Data.find(item=>item.id===+id)
    console.log(useMatch('student/:id'))//匹配当前url是否为about,匹配成功返回对象，反之返回null
    const nav = useNavigate()
    console.log(nav)
    const clickHandler=()=>{
        // nav('about')
        nav('/about',{replace:true})
    }
    return (
        <div>
            <button onClick={clickHandler}>页面跳转</button>
            <h2>{stu.id}--{stu.name}</h2>
        </div>
    )
}

export default Student