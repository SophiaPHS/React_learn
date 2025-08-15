import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import classes from './Menu.module.css'

const Menu = () => {
  return (
    <div>
        <ul>
            <li>
                <Link to='/'>主页</Link>
            </li>
            <li>
                <Link to='about'>关于</Link>
            </li>
            <li>
                {/* <NavLink 
                  style={
                    ({isActive})=>{
                      return isActive ? {backgroundColor:'yellow'}:null
                    }
                  }
                  to='student/2'>学生</NavLink> */}
                  <NavLink 
                  className={({isActive})=>{
                    return isActive ?classes.Active:null
                  }}
                  to='student/2'>学生</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Menu