import { Redirect, Route,Switch } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Student from "./components/Student";
import Detail from "./components/Detail";
import MyForm from "./components/MyForm";
import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [isLogin,setIsLogin]=useState(false)
  return (
    <div className="App">
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  path="/about" component={About} />
        {/* <Route path="/about">
          <About/>
          <Route path='/about/detail'>
            <Detail/>
          </Route>
        </Route> */}
        {/* 
            /student/:id 会匹配到 /studnet/xxx
        */}
        {/* <Route exact path="/student/:id" component={Student}/> */}
        {/* 等价于 */}
        {/* <Route exact path="/student/:id" render={routePros=><Student/>}/> */}

        {/* <Route exact path="/student/:id" children={<Student/>}/> */}
        {/* 等价于 */}
        <Route exact path="/student/:id">
          <Student/>
          {/* {routePros=><Student/>} */}
        </Route>
        <Route path='/login' component={Login}/>
        <Route path='/form'>
          {
            isLogin ? <MyForm/>:
              <Redirect to={'/login'}/>
          }
        </Route>
        <Route path="*">
          <div>路径错误</div>
        </Route>
        <Redirect from='/about' to='/form'/>
      </Switch>
    </div>
  );
}

export default App;
