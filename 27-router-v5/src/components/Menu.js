import React from 'react'
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import classes from './Menu.module.css'
const Menu = () => {
  return (
    <div>
        <ul>
            <li>
                {/* <a href='/'>主页(a标签)</a><br/>
                <Link to='/'>主页(Link)</Link><br/> */}
                <NavLink exact activeStyle={{color:"red",textDecoration: "underline"}} to='/'>主页(NavLink)</NavLink>
            </li>
            <li>
                {/* <a href='/about'>关于(a标签)</a><br/>
                <Link to='/about'>关于(Link)</Link><br/> */}
                <NavLink exact activeClassName={classes.active} to='/about'>关于(NavLink)</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Menu