import React from 'react'
import MainMenu from './MainMenu'

// App.js的页面布局管理
const Layout = (props) => {
  return (
        <>
        <MainMenu/>
        <hr/>
        {props.children}
        </>
  )
}

export default Layout