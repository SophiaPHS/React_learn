import React from "react";
import ReactDom from "react-dom/client"
import App from './App'
import { Provider } from "react-redux";
// 注入store
import store from "./store";//默认从index.js中找

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)