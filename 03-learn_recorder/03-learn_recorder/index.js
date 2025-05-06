import ReactDom from "react-dom/client";
import './index.css'

const App = <div className="logs">
    {/* 日志项容器 */}
    <div className="item">
        {/* 日期容器 */}
        <div className="date">
            <div className="month">
                四月
            </div>
            <div className="day">
                19
            </div>
        </div>
        {/* 日志内容 */}
        <div className="content">
            <h2 className="desc">学习React</h2>
            <div className="time">40分钟</div>
        </div>
    </div>
</div>
const root = ReactDom.createRoot(document.getElementById('root'))
root.render(App)