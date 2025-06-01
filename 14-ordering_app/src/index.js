import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

// 设置移动端适配(px->rem) 实现不同窗口大小的动态适配
// 除以几视口宽度就是多少rem，设置视口总宽度为750rem即占满整个视口
document.documentElement.style.fontSize =100 / 750+'vw'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


