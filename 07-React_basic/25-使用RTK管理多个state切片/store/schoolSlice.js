import {createSlice } from "@reduxjs/toolkit";
// 创建学校的slice
const schoolSlice = createSlice({
    name:'school',
    initialState:{
        name:'前湖一中',
        address:'前湖666号'
    },
    reducers:{
        setName(state,action){
            state.name=action.payload
        },
        setAddress(state,action){
            state.address=action.payload
        }
    }
})
export const {setName,setAddress}=schoolSlice.actions
export const {reducer:schoolReducer}=schoolSlice