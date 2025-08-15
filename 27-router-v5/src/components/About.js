import React from 'react'
import { Redirect, Route, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import Detail from "./Detail";

const About = (props) => {
  const {path}=useRouteMatch()
  const clickHandler=()=>{
    // push()需要一个location作为参数
    // 可回退到about页面
    /* props.history.push({
      pathname:"/student/2",
      state:{name:'学生2'}
    }) */
    // 替换了about页面
    props.history.replace({
      pathname:"/student/2",
      state:{name:'学生2'}
    })
  }
  return (
    <>
      <Redirect push to='/form'/>
      <div>About</div>
      <button onClick={clickHandler}>页面切换</button>
      <Route path={`${path}/detail`}>
        <Detail/>
      </Route>
    </>
  )
}

export default About