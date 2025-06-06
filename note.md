# React项目结构
根目录
- public    供外部直接访问的文件(静态图片、css、js等，无需webpack打包文件，静态目录)
- index.html(添加标签<div id='root'></div>) 首页模板，且必须要有
- src 源码目录，放置js源代码
    - asset 存放静态资源，比如在项目中固定不变的图像
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
- 类组件使用`props`
    - 类组件的props是存储到类的实例对象中，直接通过实例对象访问(`this.props`)
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
> 如果给子组件传递一个`属性且未赋值`，会自动设置为`true`传入子组件中,如`<LogItem isDate/>`
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
## props.children 
- 含义：组件标签体
- 用法：
```js
// 父组件
cosnt Parent = ()=>{
    return {
        <Child className="parent">
            <h1>父组件内容</h1>
        </Child>
}
// 子组件
cosnt Child = ()=>{
    return {
        <div className=`child ${props.className}`>
            {props.children} {/**<h1>父组件内容</h1> */}
        </div>
}
```
> 通过模板字符串设置多个className,每个className空格隔开，变量用`${}`接收

# React之State状态
`state`和`props`类似，都是一种存储属性的方式，但state只属于当前组件，其他组件无法访问，且`state`可变，当其发生变化后相关组件会重新渲染
- 本质：是一个被React创建并管理的变量
    - 通过useState()声明(import { useState } from 'react')
    - 通过`setState()`修改变量的值时，会触发组件的重新渲染(触发render()，前提是state值变化)
- 原理:当调用useState()时，React会在组件内部创建一个特殊的存储空间来保存这个state
    - React 会监控 state 的变化，并在 state 更新时自动触发组件的重新渲染
    - useState()：参数---state初始值<br/>
                     返回值---数组：<br/>
                     1--初始值(直接修改不会触发组件的重新渲染)<br/>
                     2--函数setState()，修改state
    - 注意事项：
        - 当state的值是一个对象时： 
            - 如果直接setState({...}):覆盖原有对象，触发组件重新渲染
            - 若需改对象中的某个属性，`user.name = '李四';setUser(user)`，对象地址不变，不会触发组件重新渲染
            - 重新创建一个对象并修改某一属性，会触发组件重新渲染
                - 方法1：const newUser = Object.assign({}，user);<br/>
                        newUser.name='王五'<br/>
                        setUser(newUser)
                - 方法2：setUser({...user,name:'王五'})
        - `当通过setState去修改一个state时，并不表示修改当前的state,修改的是组件下一次渲染时state值` <br/>
            即`const newCount=setCount(count+1) console.log(count===newCount)`结果为false
        - setState()会触发组件的重新渲染，它是异步的(比如设置多个setState()--仅渲染最后一次的修改)
            - 所以当调用setState()需要用旧state的值时，可能出现计算错误的情况(通过向setState()传递回调函数的形式来修改state)
- 函数组件使用`State`
```js
const [count,useCount] = useState(0)
const [user,setUser]=useState({name:'张三',age:18})
const changeState = ()=>{
    setTimeout(()=>{
      //  return setCount(count+1) 用旧state的值时,连续多次修改count可能不是最新值
      setCount((prevCount)=>{
          return prevCount+1
      })
    },1000)
    setUser({...user,name:'王五'})
}
```
- 类组件使用`State`
    - state统一存储到实例对象的state属性中
        - this.state访问属性
        - this.setState()修改属性：对于直接定义在state中属性不修改会保留，嵌套属性修改是整个替换
```js
// 存储该组件的所有state值
state = {
    title:类组件
    count:0,
    obj:{name:'王五',age:18}
}
changeState = ()=>{
    this.setState(prevState=>{
        return {
            count:prevState.count+1 //title和obj没修改会保留
        }
    })
    this.setState({
        // obj:{name:'李四'}替换原先obj，会丢失age
        obj:{...this.state.obj,name:'李四'} // 创建一个含有name,age属性的对象并替换name的值
    })
}
<button onClick={changeState}>修改state</button>
```
> 函数组件  VS 类组件使用state
> - 二者在定义和使用state时方法有偏差，但原理一致
> - 函数组件中，响应函数直接以函数的形式定义在组件中(有const)，使用时要加前缀`this`
> - 类组件中，响应函数式是类的方法定义(无const)

# React之Ref(获取原生DOM对象)
函数组件
- 使用步骤：
    1. 通过`useRef()`创建一个存储DOM的容器  `const buttonRef = useRef()`
    2. 将容器设置为想要获取DOM对象元素的ref属性 `<button ref={buttonRef}>按钮</button>`
    3. 通过`buttonRefRef.current.innerText`修改标签中的内容
- 原理：
    1. 步骤2实现React自动将当前元素的DOM对象，设置为容器的current属性，`组件重新渲染获取到的都是同一个对象`
    2. 类似于直接创建含有current属性的对象并绑定到想要获取DOM对象元素的ref属性上，`组件重新渲染都会创建一个新对象`
- `useRef()(钩子函数)`注意事项：React中的钩子函数只能用于函数组件或自定义钩子，不能在函数组件内嵌套的函数中调用

类组件
- 类组件通过`React.createRef()`创建容器,并通过`{this.buttonRef}`设置ref属性，其他操作和函数组件一致

>`注意`： 不建议获取原生DOM对象进行操作，这样会脱离React控制，因为我们是操作React元素，虚拟DOM会将其映射为真实DOM

# 03-learn_recorder/src 12-日志添加删除过滤
## 公共样式的组件创建
在设计组件时，多个组件可能存在相同样式，如果单独创建css文件，当修改其公共样式时需要修改多个css文件，所以将公共样式提取出来并创建一个组件，便于后期修改维护
```js
// Common.js--放置了公共样式组件(子组件)
import './Common.css'
const Common = (props) => {
  return (
    <div className={`common ${props.className}`}>
        {props.children}
    </div>
  )
}
// Other.js---需要用到公共样式(父组件)
const Other = (props) => {
  return (
    <Commond className="other">
        <div>涵盖自身样式和公共样式</div>
    </Common>
  )
}
// 上述写法及功能类似于vue的插槽
```
> - `props.className`,从Other组件传递过来的className
> - 当标签属性涉及到字符串和变量/表达式的混合使用时，可以用模板字符串，即`${}`插入变量/表达式，字符串无需引号括起来，且二者需用空格隔开
> - `props.children`获得组件标签体，这里是`<div>涵盖自身样式和公共样式</div>`

## 表单组件添加(这里以input为例)

- 当表单项发生变化时，可通过event.target.value获取用户输入内容,即【表单数据获取】
    - event:事件对象中保存了当前事件触发的所有信息
    - event.target:指向触发事件的对象(DDM对象)
    - 具体操作： 
        1. 给`<input/>`标签绑定`onChange`事件,变量为一个`响应函数`
        2. 创建一个响应函数，用于监听input输入框内容的变化
    
            ```js
            const dateChangeHandler=(e)=>{
                console.log(e.target.value)//获取了输入框的内容
            } 
            ```
- 表单数据存储
    - 方法1：通过`let`创建变量进行存储(不推荐)，因为在 React 中，`普通变量的修改不会触发组件的重新渲染`，因此输入框无响应,即它是一个不受控组件

        ```js
        const Form = ()=> {
            let age = '';
            const inputChange =(e)=>{
                age = e.target.value
            }
            return (
                <form>
                    <input value={age} onChange={inputChange} /> {/* 这里不会有任何响应性 */}
                </form>
            );
        }
        ```
    - 方法2：通过`state`存储数据。React开发表单时，其表单数据一般存放至state中，同时表单`value绑定state中数据`，实现`state和表单双向绑定`---【受控组件】
        - 每个数据`单独设置useState`,`弊端`：当表单数据过多，要设置多个useState
       
            ```js
            const Form = ()=> {
                const [inputName,setInputName]=useState('')
                const [inputAge,setInputAge]=useState('')
                //创建响应函数，监听输入框内容变化
                const nameChange =(e)=>{
                    setInputName(e.target.value)
                }
                const ageChange =(e)=>{
                    setInputAge(e.target.value)
                }
                return (
                    <form>
                        姓名：<input value={inputName} onChange={nameChange} /><br/> 
                        年龄：<input value={inputAge} onChange={ageChange} /> 
                    </form>
                );
            }
            ```
        - 所有数据`用一个state进行存储`,`弊端`：每次访问里面数据要前缀`formData`，并且修改其中某一数据，需要`浅复制`，不然会覆盖原先数据

            ```js
            const Form = ()=> {
                const [formData,setFormData]=useState({
                    inputName:'',
                    inputAge:''
                })
                const nameChange =(e)=>{
                    setFormData({
                        ...formData,
                        inputName:e.target.value
                    })
                }
                const ageChange =(e)=>{
                    setFormData({
                        ...formData,
                        inputAge:e.target.value
                    })
                }
                return (
                    <form>
                        姓名：<input value={formData.inputName} onChange={nameChange} /><br/> 
                        年龄：<input value={formData.inputAge} onChange={ageChange} /> 
                    </form>
                );
            }
            ```
- 提交表单并处理数据(以单独创建useState存储数据为例)
    ```js
    const Form = ()=> {
        const [inputName,setInputName]=useState('')
        const [inputAge,setInputAge]=useState('')
        const nameChange =(e)=>{
            setInputName(e.target.value)
        }
        const ageChange =(e)=>{
            setInputAge(e.target.value)
        }
        const formSubmitHandler = (e)=>{
            // 取消表单默认行为，提交时页面跳转
            e.preventDefault();
            // 获取表单项中的数据整合至一个对象中
            const newLog = {
                name:inputName
                age:+inputAge // `+`实现非数字类型转换成number类型(隐式转换)
            }
            //  清空表单项  
            setInputName('')
            setInputAge('')
            /*一个state统一管理数据的清空示例：
            setFormData({
                inputName:'',
                inputAge:'',
            }) */
        }
        return (
            <form  onSubmit={formSubmitHandler}>
                <label htmlFor='name'>姓名</label>
                <input value={inputName} onChange={nameChange} /><br/> 
                <label htmlFor='age'>年龄</label>
                <input value={inputAge} onChange={ageChange} /> <br/> 
                <button>添加</button>
            </form>
        );
    }
    ```
    > `拓展`:
    > - 表单中button没有设置type，默认`type="submit"`，被视为触发表单提交的按钮,`点击按钮会触发form的onSubmit事件`
    > - `label标签`:在React`htmlFor属性`和在HTML`for属性`用法一致，即将label标签与表单控件(如input)绑定,其值`需与目标元素的id完全匹配`，实现点击label时聚焦到input输入框
    > - React中，通常表单不需要自行提交(即不出现跳转的情况)，而是通过React提交，所以通过`e.preventDefault()`取消默认行为(表单跳转)
    > - 对于number类型数据，因input传入过来的是字符串，在其前面加`+`实现非数字类型转换成number类型(`隐式转换`)
    > - 当表单提交时，输入框内容应为空，所以将存储相应数据的变量设置为空，因为input绑定了该变量，所以表单提交后也会渲染为空
- input防抖节流

## state提升
- 内涵：在一个组件中存放的数据，需要被其他组件操作时，可以将数据放入到这些组件共同的祖先元素中(`最近的`)，实现多个组件均可访问这个数据
- 以App.js存放state数据为例
```js
const App = ()=>{
    // state提升
    const [logsData,setLogsData] = useState([
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
    ]) 
    /* 
        将LogsForm中的数据传递给App组件，然后App组件将新的日志添加到数组中
            - 1.App给LogsForm传递一个回调函数
            - 2.LogsForm添加日志时，调用该函数并将新的日志数据作为参数传递
            - 3.App通过回调函数接收数据并可进行相应操作
            - 此方法只适用于简单场景(父子组件，不涉及祖孙或多层嵌套组件)
    */
   const saveLogHandler = (newLog)=>{
        // 向新的日志中添加id
        newLog.id = Date.now()+''//设置为时间戳转字符串，但可能存在并发问题，即同一时刻创建了两个
        // 将新的数据添加到数组中，newLog的顺序会影响其在数组中的位置，这里是末尾添加
        setLogsData([newLog,...logsData])
   }
    return  <div className="app">
                <LogsForm onSaveLog={saveLogHandler}/>
                <Logs logsData={logsData}/>
            </div>
}
```
> `拓展`：
> - 子组件向父组件传值(`子→父`)
>  1. 父组件向子组件传递一个回调函数
>  2. 子组件通过`props.函数名`调用该函数并将数据以参数形式传入
>  3. 父组件在回调函数中接收参数，即可进行相应数据修改
> - 向嵌套对象的数组传入对象，可通过解构赋值，示例:<br/> 
      const person = [{name:'张三',gender:'男'}]<br/>
      const age = {age:10}<br/>
      const newPerson = [age,...person] --结果为 [{age:10,name:'张三',gender:'男'}]

## 日志删除
- splice删除数组元素使用,通过index删除
- 祖孙数据传递props(App->LogItem)
- 针对无日志的判断
- window.confirm弹窗(不推荐，样式和位置不符合用户使用)-`用自定义Modal组件代替`
- 遮罩层设置(出现弹窗，无法点击弹窗以外的元素)

## Portal
- 使用背景：在有些场景下`子组件直接渲染为父组件的后代，在网页显示时会出现一些问题`。比如，在LogItem组件中添加Bockdrop组件，
           Bockdrop作为后代元素，在页面显示会把所有元素都覆盖(依赖定位)，若当前元素后边的兄弟元素中有开启定位的情况出现，
           且层级不低于当前元素，便会出现盖住遮罩层的情况(`父组件position:relative,以及z-index层级`)
- 作用：把组件渲染到网页中制定位置
- 使用方法：1.在index.html添加一个新的元素
           2.修改组件的渲染方式
                - 通过`ReactDOM.createPortal()`作为返回值的创建元素  `import ReactDOM from 'react-dom'`
                - 参数：
                    - 1.jsx(传入目标位置的内容)
                    - 2.目标位置(DOM元素)
## 过滤日志
- 功能：依据不同年份显示不同的学习日志
- 注意：如果涉及删除日志，通过id删除；
- 功能实现：设计LogFilter组件，一个下拉框选择年份，年份和Logs组件实现双向绑定;年份过滤在Logs中实现

# Create React App(自动创建React项目)
- 作用：快速创建一个React项目的目录结构，并且会自动安装React中所有依赖(除了react,react-dom,react-scripts,还包括test测试单元，web-vitals网页性能测试)
- 使用步骤：TERMINAL中进入项目所在目录，执行`npx create-react-app 项目名`命令即可
## React中css样式
以下举例是以class设计样式
- `1.内联样式`
```js
// 内联样式示例
<p style={{color:'red',backgroundColor:'#bfa',border:'blue solid 1px'}}>这是一个段落</p>

{/* 样式过多可以提取出来存储在一个对象中 */}
const pStyle = {color:'red',backgroundColor:'#bfa',border:'blue solid 1px'}

<p style={pStyle}>段落</p>

// 结合state动态设置样式
const [redBorder,setRedBorder] = useState(true)
const clickHandler = ()=>{
    setRedBorder(!redBorder)
}

<p style={{border:redBorder?'red solid 1px':'blue solid 1px'}}>段落</p>
<button onClick={clickHandler}>修改border颜色</button>
```
>- 样式用{}包裹而非`""`,并以`{}对象形式写入`，css样式中`-`改成`小驼峰形式`，比如这里`background-color`应写为`backgroundColor`
>- 不适用于过多/复杂样式，难以维护

- `2.外部样式表`
    - 使用步骤：
        1. 创建`xxx.css`文件 
        2. 通过`import './`引入到组件中
        3. 通过className绑定样式
```css
/* App.css */
.p1{
    color:red;
    background-color:#bfa;
    border: 1px red solid;
}
.blueBorder{
    border: 1px blue solid;
}
```
```js
import React, { useState } from 'react'
import './App.css'
const App = () => {
    // 结合state动态设置样式
    const [redBorder,setRedBorder] = useState(true)
    const clickHandler = ()=>{
        setRedBorder(!redBorder)
    }
    return (
        <div>
            <p className={`p1 ${redBorder?'':'blueBorder'}`}>段落</p>
            <button onClick={clickHandler}>按钮</button>
        </div>
  )
}
```
> - 引入外部样式表属于全局作用域，若存在重复类名容易出现样式冲突
> - 适用于通用样式，不适用于大范围使用，因为可能存在不同样式表有相同类名使得组件使用该类名造成样式冲突

- `3.CSS Module`
    - 使用步骤：
        1. 创建`xxx.module.css` (区别于外部样式表加了.module后缀)
        2. 在组件中引入css
            `import classes from './App.module.css'`  (classes--别名)
        3. 通过classes设置className(以对象属性传值)
            `className={classes.p1}`  此时设置该属性标签的class为`App_p1__2Rx6u`具有唯一性
    - 特点：动态设置唯一class值，避免类名重复(不同module，生成的class名不同；相同module，class名一致)
```css
/* App.module.css */
.p1{
    color:red;
    background-color: #bfa;
}
.Border{
    border: 1px red solid;
}
```
```js
import React, { useState } from 'react'
// 引入CSS moudle需要给该module设置别名
import classes from './App.module.css'
const App = () => {
    // 结合state动态修改样式
    const [showBorder,setShowBorder]=useState(true)
    const clickHandler=()=>{
        setShowBorder(!showBorder)
    }
    return (
        <div>
            {/* 样式以对象属性设置 */}
            <p className={`${classes.p1} ${showBorder?classes.Border:''}`}>这是一个段落</p>
            <button onClick={clickHandler}>按钮</button>
        </div>
  )
}

export default App
```

## React之Fragment
- React.Fragment作为父容器的组件，只会将其子元素返回，不会将其本身作为元素显示在页面中中
```js
// 问题：react中所有元素要包裹在一个根元素下，但是不想要这个根元素(div)显示在页面中，即产生多余结构
return <div>
            <div>...</div>
            <div>...</div>
            <div>...</div>
        </div>
// 解决方法1 创建一个组件只返回其子元素
import React from 'react'

const Out = (props) => {
  return props.children
}

export default Out
// App组件中返回值
return <Out>
            <div>...</div>
            <div>...</div>
        </Out>

// 解决方法2 使用React.Fragment实现
import React from 'react'

return <React.Fragment>
            <div>...</div>
        </React.Fragment>

// 等价于
import {Fragment} from 'react'
return <Fragment>
            <div>...</div>
        </Fragment>
// 等价于 语法糖
return <>
            <div>...</div>
        </>
```

# 订餐App
- 项目整体架构<br/>
                       订餐App<br/>
            搜索框      食物列表            购物车 <br/>
                         食物       购物详情         结账页    <br/>
                        数量按钮    购车车列表   购物清单 支付按钮 <br/>
                                                购物项目
- 目录结构：图片暂置在`public/img/meals`(不建议，因为访问量过大会增加服务器性能负担，像这种外部资源一般放置在cdn服务器/对象存储中)，访问图片无需写public,直接`/img/meals/xxx.png`

- 功能设计难点：添加商品后，商品购物车展示(点击底部购物车)与隐藏(分别点击商品`-`直至商品数量为0或者点击遮罩层`Backdrop`或者底部购物车)
           清空购物车弹窗的取消(直接点击弹窗取消按钮或外部遮罩层)与确认功能,当点击确认`Meals.js`中商品数量也应实时改为0，需要在App.js中添加 clearCart方法修改cart-context中数据
           - 问题及解决：购物车详情和弹窗遮罩层覆盖面不同涉及z-index,弹窗隐藏的点击事件涉及到购物车详情隐藏需要阻止冒泡

## App容器适配
- 不同移动端宽度是不一致的，为了适应任何移动端可以采取以下操作
```js
// index.js
// 除以几视口宽度就是多少rem，设置视口总宽度为750rem即占满整个视口 px->rem, 实现不同窗口大小的动态适配
document.documentElement.style.fontSize =100/750+'vw'

// App.js
return (
        <div style={{width:'750rem',height:200,backgroundColor:'#fba'}}>
        </div>
  )
```
> `问题`：在设置移动端大小适配时字体变小了是因为继承了Html设置的字体大小---通过在index.css中body设置font-size去覆盖

- 切换不同尺寸时`字体大小适配`：将`font-size`的单位有`px->rem`

## React之Context
- 背景：A组件传递数据给C组件，通过A→B→C，但B不需要使用该数据只是作为一个桥梁，没有必要通过B传递，所以引入context
- 作用：实现不同组件间的数据共享和交互，一个公共存储空间，类似于全局作用域，不再是基于props自上向下(父→子)逐层传递数据
- 使用步骤：
    1. 创建context--`React.createContext()`，参数(默认值，虽然不用可为空,但建议写数据结构)---多组件访问的数据，存放公共数据
    2. 在使用公共数据的组件中引入Context,
        - 方法1：通过`<Context.Consumer>`组件创建jsx元素，里面需要写一个回调函数，`传入的参数即存储在context中的数据`，在回调函数中即可访问context中存储的数据
        - 方法2：使用`useContext()`,参数为Context，`只适用于函数组件`
```js
// ContextTest.js  --定义并存储公共数据
import React from 'react'
const ContextTest = React.createContext({
    name:'张三',
    age:18
})
export default ContextTest

// Test.js 使用/消费公共数据
// 使用方式1：ContextTest.Consumer
// 1.引入context
import ContextTest from '../../ContextTest'
const TestOne = ()=>{
    return (
        {/**2.通过ContextTest.Consumer组件中回调函数的参数访问context的数据 */}
        <ContextTest.Consumer>
            {
                (ct)=>{
                    return <div>{ct.name}--{ct.age}</div>
                }
            }
        </ContextTest.Consumer>
    )
}
// 使用方法2：钩子函数useContext(),参数为Context，获取其中数据作为返回值
// 1.引入context
import ContextTest from '../../ContextTest'
const TestTwo = ()=>{
    // 使用钩子函数获取context
    const ctx = useContext(ContextTest)
    return (
         <div>
            {ct.name}--{ct.age}
         </div>
    )
}
```
> `注意`:一般不会在context中指定数据，这和创建一个普通js文件并存放数据，其他组件引入没什么区别，所以有个`<Context.Provider>`组件
- Context.Provider组件:数据生产者，通过value指定Context中存储的数据，在该组件中所有子组件都可通过Context访问其指定的数据
    - 一般传入的数据为useState，可以实现动态修改、渲染
```js
import ContextTest from '../../ContextTest'
const App = ()=>{
    return (
         <div>
            <TestOne/> {/**结果为ContextTest中数据name:'张三',age:18 */}
            <TestContext.Provider value={{name:'王五',age:20}}>
                <TestTwo/>{/**结果为TestContext.Provider的value值 name:'王五',age:20 */}
                <TestContext.Provider value={{name:'李四',age:26}}>
                    <TestThree/>{/**结果为TestContext.Provider的value值 name:'李四',age:26 */}
                </TestContext.Provider>
            </TestContext.Provider>
         </div>
    )
}
```
> 若`Context.Provider组件嵌套`，通过Context访问数据服从`就近原则`，比如示例中的TestThree组件结果，如果`没有Provider读取context的默认数据(初始化设置)`



