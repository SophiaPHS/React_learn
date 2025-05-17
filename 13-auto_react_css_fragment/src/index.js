import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import classes from './App.module.css'
import indexClass from './index.module.css'
import './index.css' //App.css中.Button在App组件中失效，App组件中button样式由index.css中的Button决定


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <hr/>
    <p className={classes.p1}>Index组件段落(使用app module)</p>
    <p className={indexClass.p1}>Index组件段落</p>
    <button className='Button'>Index按钮</button>
  </React.StrictMode>
);


