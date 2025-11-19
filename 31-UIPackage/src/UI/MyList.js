import { Card, List } from 'antd'
import React from 'react'

// const MyList = ({children}) => {
//     const internalData={
//         title:'新闻标题',
//         author:'作者',
//         content:'新闻内容',
//     }
//     return children(internalData)
// }
const MyList = ({data,render}) => {
    return (
        <Card title='用户信息'>
            <ul style={{fontSize:'16px'}}>
                {data.map(item=>(
                    <li key={item.key}>
                        {render(item)}
                    </li>
                ))}
            </ul>
        </Card> 
    )
}
export default MyList