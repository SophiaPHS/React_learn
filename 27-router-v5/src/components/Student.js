import React from 'react'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'

const Stu_Data=[
    {
        id:1,
        name:"学生1",
    },
    {
        id:2,
        name:"学生2",
    },
    {
        id:3,
        name:"学生3",
    },
    {
        id:4,
        name:"学生4",
    }
]
const Student = (props) => {
    const match=useRouteMatch()
    const location = useLocation()
    const history=useHistory()
    const {id}=useParams()
    const stu = Stu_Data.find(item=>item.id===+id)
    // const stu= Stu_Data.find(item=>item.id===1)
    return (
        <div>
            {stu.id}--{stu.name}
        </div>
    )
}

export default Student