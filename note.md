# React项目结构
根目录
- public    供外部直接访问的文件(静态图片、css、js等，无需webpack打包文件，静态目录)
- index.html(添加标签<div id='root'></div>) 首页模板，且必须要有
- src 源码目录，放置js源代码
    - App.js
    - index.js 脚本入口文件(webpack以这个入口文件编译关联到index.html)，必须要有

# 项目配置
```shell
npm init -y    --->package.json (初始化操作)
# 添加依赖项（react-scripts提供react开发环境，以及一些依赖包括Webpack，测试等工具）
npm -i add react react-dom react-scripts -S  
# --->node_modules;package-lock.json;package.json中配置这三个依赖库
```

# 项目运行
npm管理的项目无法在网页中直接运行，需通过webpack打包，打包之后才能在浏览器中正常运行(也可以用其他打包工具比如vite)
```shell
# 项目开发完成使用build 因为每次修改内容需要重新build打包，然后访问路径修改
npx react-scripts build # 自动对react项目进行webpack打包
# 项目开发过程中使用start，一直运行 ctrl+c停止运行
npx react-scripts start # 通过webpack启动内置测试服务器，根据修改实时更新页面 (和build命令执行创建的build文件无关)
```
> 初次执行弹出Would you like to add the defaults to your package.json? » 是否添加默认配置比如浏览器兼容性配置 Y就无需手动配置

--->    package.json--->browserslist:production/development

--->    如果执行build命令还会生成build文件
- static
    - js
    - asset-mainfest.json
    - index.html
      
## 命令执行优化
在package.json中添加scripts配置(运行脚本命令)
```json
"scripts":{
    "start":"react-scripts start",
    "build":"react-scripts build"
}
```
在终端执行`npm start` / `npm run build` 即可

# 项目访问
build/index.html
> 报错：Failed to load resource: net::ERR_FILE_NOT_FOUND

> 原因：index.html直接访问通过vscode的内置浏览器，无服务器，是通过本地文件协议（file://）打开 build/index.html，会尝试从文件系统根目录（如 C:/）寻找,所以要写成相对路径

> 所以访问路径出错 src="/static/js/main.83d15c7f.js"表示部署到服务器根目录上，但现在没有部署到根目录，所以路径'/'删除或前面加'.'表示相对路径

# React语法检查(提示)配置
package.json中写入如下代码：
```json
"eslintConfig": {
    "extends":[
      "react-app"
    ]
}
```
# React组件
 - 定义组件：
    - 基于函数的组件(推荐)：返回一个JSX的函数；组件首字母必须大写
    - 基于类的组件:必须要继承React.Component(Component)、添加一个`render()`方法，且方法返回值要是一个JSX
    - 相比于函数组件，类组件编写过于复杂，但二者功能大部分一致
    - 可以重复写多个组件

        ```html
        <div className="logs">
            <LogItem/>
            <LogItem/>
            <LogItem/>
        </div>
        ```
    - 关于return返回值JSX,如果return行没有写JSX，而是换行写要用`()`包裹，两种写法如下
  
        ```jsx
        return  <div>
                    <Logs/>
                </div>

        <!-- 等价于 return和 ( 在同一行 -->
         return (
            <div>
                <Logs/>
            </div>
         )
        ```

# 样式编写
- 直接写在index.html
    不建议使用，这个是对应全局的，且和js分隔开，若样式太多不便于维护管理
- 在src创建css文件，且和相应js文件名一致(index.css)
    写完样式需在对应js文件引入：`import './index.css'`  ---引入样式需以`./`开头
- 写在组件内,以App.js为例
```js
const App = () => {
  return (
        <div
            style={{width:200,height:200,margin:'100px auto',backgroundColor:'#bfa'}}
        >
        </div>
    )
}
```
> 如果数字可直接写，如果是字符串比如200px、#bfa或者属性值有多个用引号包裹


# 组件管理
- 当组件过多时，在src文件下难以管理，所以除了`App.js,index.js`文件,其余组件放入`src/Components`中，
- 相关组件还可在Components创建一个文件进行存放，以此类推进而方便管理组件相关css文件和js文件放一块，且文件同名

# 原生事件 vs react事件
原生事件的三种写法
```html
<!-- 写法1 -->
<button id='btn' onclick = 'alert(123)'>点我一下</button>
<!-- 写法2 DOM0级-->
document.getElementById('btn').onclick=function(){};
<!-- 写法3 DOM2级 事件名，回调函数，指定事件是否在捕获或冒泡阶段执行，true为捕获阶段，false为冒泡阶段(默认值) -->
 document.getElementById('btn').addEventListener('click',function(){},false)
```
> 写法2和写法3的区别：前者不能向元素绑定多个事件，若绑定多个后定义事件会覆盖前面定义的事件；后者可以为元素添加多个事件处理程序，且会按照添加顺序依次调用，也可删除指定事件(removeEventListener不能移除匿名添加的函数)

react事件通过元素属性添加，写法2和3是直接操作真实dom，脱离react管理，故不建议使用
```js
/* 注意：事件属性名需要使用小驼峰命名；onclick -> onClick
        属性值不能直接执行代码，需要回调函数  onclick = 'alert(123)'->onclick={{}=>{alert(123)}}
*/
// 优化写法
const clickHandler = ()=>{alert(123)}
// 注意这里是clickHandler即事件触发调用，如果是clickHandler()初始化时就调用了，一般情况不写`()`
<button onClick={clickHandler}>点我一下</button>
```
```js
/* 
    事件对象：
        - react事件中同样会传递事件对象，可以在响应函数中定义参数来接收事件对象
        - react中事件对象不是原生事件对象，是经过react包装后的事件对象
        - 由于对象进行包装，所以使用过程中不需要考虑兼容性问题
    事件默认行为：
        - 原生事件中return false 可以取消默认行为，比如链接跳转
        - react中，return false 不可以取消默认行为，但可通过event.preventDefault()取消默认行为
    冒泡：react使用event.stopPropagation()取消事件冒泡
    
*/
const clickHandler = (event)=>{
    alert(123)
    event.preventDefault() //取消默认行为
    event.stopPropagation()//取消事件冒泡
    // return false 
}
<button onClick={clickHandler}>点我一下</button>
<a href='...' onClick={clickHandler}>链接</a>
```
## DOM事件流
1. 事件捕获阶段(外层元素->目标元素传播)
2. 处于目标阶段(触发目标元素自身的事件)
3. 事件冒泡阶段(目标元素->外层元素传播)
> - DOM0级默认使用事件冒泡，DOM2级默认使用事件冒泡
> - 事件捕获优于事件冒泡
```html
<div class="grandma">
    grandma奶奶
    <div class="mother">
        mother妈妈
        <div class="daughter">
            daughter女儿
            <div class="baby">
                baby婴儿
            </div>
        </div>
    </div>
</div>
```
```js
var grandma = document.getElementById('grandma')[0]
var mother = document.getElementById('mother')[0]
var daughter = document.getElementById('daughter')[0]
var baby= document.getElementById('baby')[0]
function theName(){
    console.log('我是'+this.className)
}
grandma.onclick=theName //冒泡
mother.addEventListerner('click',theName,true)//捕获 
daughter.addEventListerner('click',theName,true)//捕获
baby.addEventListerner('click',theName,false)//冒泡
```
点击baby执行顺序：

1. 捕获阶段(从外到内):
- 外层元素检查是否有捕获阶段的事件

    - mother有捕获事件 →执行mother

    - daughter有捕获事件 →执行daughter
2. 目标阶段
- baby自身事件在冒泡阶段触发 →执行baby

3. 冒泡阶段(从内到外)
- 外层元素检查是否有冒泡阶段的事件
    - grandma有冒泡事件 →执行grandma


# React之props传参
父组件通过props属性向子组件传递数据(数据可以是函数，对象，数组，字符串，数字等)
```js
const parent =()=>{
    return (
        <div>
            <Child date={new Date()} name={"张三"} fn={()=>{}}/>
            <Child date={new Date(2021,5,22,5,30,0)} name={"李四"} fn={()=>{}}/>
        </div>
    )
}
```
> 在函数组件中，属性就相当于函数的参数,可在函数组件的形参定义一个`props`,指向的是一个对象，包含父组件传递的所有参数
```js
const child =(props)=>{
    console.log(props) {/* {data:..,name:'张三'，fn：f} */}
    return (
        <div>
            子组件,我的名字是{props.name}
            <GrandChild date={props.date}/>
        </div>
    )
}
const GrandChild =(props)=>{
    console.log(props) {/* {data:..} */}
    return (
        <div>
            孙组件，当前时间为{props.date}
        </div>
    )
}
```
>`注意`： 
> - props可以实现父->子->孙传递数据
> - props只读不能修改，子组件`props.name='王五'`报错
## 组件优化
对于重复组件参入较多参数，在JSX中比较臃肿，可通过map简化
```js
// 直接组件传值
const Logs = ()=>{
    return <div className="logs">
        <LogItem date={new Date()} desc={"学习Vue"} time={"50"}/>
        <LogItem date={new Date(2022,11,1,21,30,0)} desc={"学习React"} time={"30"}/>
        <LogItem date={new Date(2021,5,22,5,30,0)} desc={"学习JS"} time={"40"}/>
    </div>
}
// 优化1：将传入数据提取到JSX外
const Logs = ()=>{
    const logsData = [
        {
            id:'001',
            date:new Date(),
            desc:'学习React',
            time:50
        },
        {
            id:'002',
            date:new Date(2022,11,1,21,30,0),
            desc:'学习Vue',
            time:30
        },
        {
            id:'003',
            date:new Date(2021,5,22,5,30,0),
            desc:'学习JS',
            time:40
        }
    ]
    return <div className="logs">
        {
            logsData.map(item => <LogItem key={item.id} date={item.date} desc={item.desc} time={item.time} />)
        }   
    </div>
}
// 优化2：虽然map函数简化了JSX，但JSX中还是有数据操作，可以将相应操作再次提出，使得JSX只显示数据
const logItemDate = logsData.map(item => <LogItem key={item.id} date={item.date} desc={item.desc} time={item.time}/>) 
return <div className="logs">
        {logItemDate} 
    </div>
```
> 如果属性和数组中对象属性名一致，可以简写为`{...item}` === `date={item.date} desc={item.desc} time={item.time}`

# React之State状态
`state`和`props`类似，都是一种存储属性的方式，但state只属于当前组件，其他组件无法访问，且`state`可变，当其发生变化后相关组件会重新渲染
```
    State
        -本质：是一个被React创建并管理的变量,通过useState()声明(import { useState } from 'react')
            通过`setState()`修改变量的值时，会触发组件的重新渲染(触发render()，前提是state值变化)
        - 原理:当调用useState()时，React会在组件内部创建一个特殊的存储空间来保存这个state
                 React 会监控 state 的变化，并在 state 更新时自动触发组件的重新渲染
        - useState():参数---state初始值
                     返回值---数组：1--初始值(直接修改不会触发组件的重新渲染)
                                   2--函数setState()，修改state
        -注意事项：
            - 当state的值是一个对象时： 
                - 如果直接setState({...}):覆盖原有对象，触发组件重新渲染
                - 若需改对象中的某个属性，`user.name = '李四';setUser(user)`，对象地址不变，不会触发组件重新渲染
                - 重新创建一个对象并修改某一属性，会触发组件重新渲染
                    方法1：const newUser = Object.assign({},user)
                           newUser.name='王五'
                           setUser(newUser)
                    方法2：setUser({...user,name:'王五'})
            - 【当通过setState去修改一个state时，并不表示修改当前的state,修改的是组件下一次渲染时state值】
            - setState()会触发组件的重新渲染，它是异步的(比如设置多个setState()--仅渲染最后一次的修改)
                所以当调用setState()需要用旧state的值时，可能出现计算错误的情况--通过向setState()传递回调函数的形式来修改state
```

