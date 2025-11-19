import React,{useRef, useState} from "react";
import MyInputTable from "./UI/MyInputTable";
import { Space } from "antd";
import MyList from "./UI/MyList";


const App=()=>{
    const [msg,setMsg]=useState("");
    const inputRef=useRef(null);
    const handleFocus = () => {
        inputRef.current?.focus();
    };
    const msgHandler=()=>{
        setMsg(prev=>prev="");
    }
    const columns= [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data= [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
        }
    ];
    return (
        <Space orientation="vertical" style={{width:'100%'}}>
            <MyInputTable
                msg={msg} 
                msgHandler={msgHandler}
                columns={columns}
                data={data}
                ref={inputRef}
                handleFocus={handleFocus}
                onChange={setMsg}
            />
            {/* <MyList>
                {({title,author,content})=>(
                    <div key={id}>
                        <p>title:{title}</p>
                        <p>author:{author}</p>
                        <p>content:{content}</p>
                    </div>
                )}
            </MyList> */}
            <MyList data={data}
                render={(item)=>(
                    <span>
                        {item.name} - {item.age} - {item.address}
                    </span> 
                )}
            />

        </Space>
        
    )
}
export default App;