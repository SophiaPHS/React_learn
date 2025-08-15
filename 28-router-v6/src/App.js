import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Menu from './components/Menu'
import Student from './components/Student'
import Child from './components/Child'
import Child2 from './components/Child2'

const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Menu/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='about' element={<About/>}>
          <Route path='child' element={<Child/>}/>
          <Route path='child2' element={<Child2/>}/>
        </Route>
        <Route path='student/:id' element={<Student/>}></Route>
      </Routes>
    </div>
  )
}

export default App