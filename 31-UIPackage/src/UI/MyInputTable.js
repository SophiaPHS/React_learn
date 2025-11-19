import React, { forwardRef,useState,useEffect, useCallback,useRef,useImperativeHandle } from 'react'
import { Input,Button, Card, Space,Table, List} from "antd";
import styles from './MyInputTable.module.css'


const MyInputTable = forwardRef(({msg,data,...rest},ref) => {//第一个参数props,第二个参数ref
    const { Search } = Input
    const inputRef=useRef(null)
    const [filterData,setFilterData]=useState(data)
    const onSearch = useCallback((value) => {//value搜索框的值
        if(value===""){
            setFilterData(data) 
        }else{
            setFilterData(data.filter(item=>item.name.includes(value)))
        }
    },[data])//data变化时重新创建函数
    useImperativeHandle(ref, () => ({//暴露指定的方法给父组件，回调函数返回值赋值给父组件的ref.current
        focus() {
            inputRef.current?.focus();
        },
        name: 'myInputTableRef'
    }));
    useEffect(() =>{//针对搜索框为空时，显示全部数据
        if(msg===""){
            setFilterData(data) 
        }
    },[msg])
    return (
        <Card>
            <Space orientation="vertical" size="large" style={{width:'100%'}}>
                <Space className={`${styles.flexCenter} ${styles.className}`}>
                    {/* onChange实现同步状态更新,父组件传入修改msg方法 */}
                    <Search  
                        enterButton 
                        ref={inputRef} 
                        value={msg} 
                        onChange={(e) => rest.onChange?.(e.target.value)} 
                        onSearch={onSearch}/>
                    {/* <Input 
                        placeholder="Basic usage" 
                        value={msg} 
                        ref={inputRef}
                        /> */}
                    <Button type="primary" onClick={rest.msgHandler}>clean msg</Button>
                    <Button type="primary" onClick={rest.handleFocus} >focus input</Button>
                </Space> 
                <Table columns={rest.columns} dataSource={filterData}/>
            </Space>
        </Card>  
    )
})

export default MyInputTable