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
> 在 JSX 中，布尔值、变量、表达式等需要用大括号 {} 包裹，只有字符串可以直接写。
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
父组件通过props属性向子组件传递数据(`数据可以是函数，对象，数组，字符串，数字等`)
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
const [count,setCount] = useState(0)
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
> - 函数组件中，响应函数直接以函数的形式定义在组件中(有const)
> - 类组件中，响应函数式是类的方法定义(无const)，使用时要加前缀`this`

# React之Ref(获取原生DOM对象)
函数组件
- 使用步骤：
    1. 通过`useRef()`创建一个存储DOM的容器  `const buttonRef = useRef()`
    2. 将容器设置为想要获取DOM对象元素的ref属性 `<button ref={buttonRef}>按钮</button>`
    3. 通过`buttonRef.current.innerText`修改标签中的内容
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
- 作用：把组件渲染到网页中指定位置
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
            {ctx.name}--{ctx.age}
         </div>
    )
}
```
> `注意`:一般不会在context中指定数据，这和创建一个普通js文件并存放数据，其他组件引入没什么区别，所以有个`<Context.Provider>`组件
- Context.Provider组件:数据生产者，通过value指定Context中存储的数据，以对象形式写入；在该组件中所有子组件都可通过Context访问其指定的数据
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

## React之Effect
- 作用：处理副作用操作的机制 (`setTimeout也可实现`)
    - 副作用：部分逻辑直接写在组件函数体中，会影响组件的渲染，比如`直接将修改state的逻辑编写到组件之中，会导致组件不断的循环渲染(死循环)，直至调用次数过多内存溢出`，故而产生副作用，这些逻辑是不能直接写在函数体中
    -在`开发模式`中且开启 `React.StrictMode`，会重复调用(`double-invoking`)一些函数以`使副作用显现`，即这些函数会被`调用两次`
        - 类组件的`constructor`,`render`,`shouldComponentUpdate`方法
        - 类组件的静态方法`getDerivedStateFormProps`
        - 函数组件的函数体
        - 参数为函数的`setState`
        - 参数为函数的`useState`,`useMemo`,`useReduce`
- 使用Effect
    - 前提：每次修改的值都是同样的值，如果是不同的值也会产生死循环
    - 使用钩子函数`useEffect()`,参数为一个函数，`此函数会在组件渲染完毕后执行`
        - 默认情况下，回调函数会在组件渲染完成后调用，并且是每次渲染完成后都会调用
        - useEffect()可传递第二个参数，是一个数组，在数组中可以指定Effect的`依赖项`，只有依赖发生变化时，Effect才会被触发
            - 通常会将Effect中使用的所有变量都设置为依赖项,以确保这些值发生变化时，会触发Effect的执行
                - 特例：setState()是由钩子函数useState()生成的，useState()会确保组件的每次渲染都会获得相同setState()对象，所以`setState可以不设置为依赖项`
                - 如果依赖项设置一个空数组`[]`,Effect只会在组件初始化时触发一次
    - 使用场景：在开发中，会产生副作用的代码写到useEffect的回调函数中，避免影响组件的渲染
               搜索框使用防抖和Effect提升用户体验，减轻后台服务器返回请求结果负担
> 回调函数不能直接写异步函数，如果要异步在里面定义一个异步函数并返回

## React之Reducer
- 背景：使用useState创建state时，所有state修改方法必须使用setState()设置，但是当state过于复杂涉及到增删改功能就需要对其方法进行封装，然后在用setState调用--当方法过多，和其他方法分散在组件的各个地方不便于维护，所以引出了Reducer
- 作用：将state和相关方法进行整合，便于维护
- 使用场景：复杂state
- 使用说明：useReducer(reducers,initialArg,init)
    - 参数： reducers--整合函数，对于当前state的所有操作都应该在函数中定义，该函数的返回值会成为state的新值
                  --reduce在执行时，会受到两个参数(...args)：state-当前最新的state
                                                           action-需要一个对象，在对象中会存储dispatch所发送的指令
            initialArg--state的初始值，作用和useState()中的值是一样
    - 返回值：数组
                第一个参数`xx`，state用来获取state的值
                第二个参数`xxDispatch`，state 修改的派发器，通过派发器可以发送操作state的命令，具体的修改行为将会由另外一个函数(参数里面reducer)执行
> `注意`：在reducer要有一个默认返回(可以是state)--解决dispatch所发送的指令无效的情况(即reducer找不到该指令，没有返回值就为`undefied`),且执行dispatch无需传入参数state，只要action即可；为了避免reducer会重复创建，通常reducer会定义到组件的外部(同时结构更加清晰)

# React之Memo

- 背景：组件发生渲染有两种情况，一是组件自身的state发生变化时；二是组件的父组件重新渲染；第二种被动渲染没有必要所以引用`Memo`
- 作用：对【函数式】组件进行缓存，减少组件渲染次数
- 内涵：React.memo()是一个高阶组件(函数接收的参数或者返回值是一个函数)，接收另一个组件作为参数，并且会返回一个包装过的新组件
        包装过的新组件具有`缓存功能`，`只有其props发生变化`才会触发该组件的重新渲染，否则总是返回缓存的数据
- 适用场景：适用于数据比较复杂或者执行慢的数据

# React之useCallback
- 背景：向在子组件修改父组件数据时，父组件会向子组件传递函数，而子组件是用props接收，但是当`父组件自身修改数据会重新渲染该函数`，使得props接收的函数重新渲染，`memo会受props变化而触发组件渲染`，因此`子组件被动渲染`，所以引入useCallback避免这种情况
- 内涵：一个钩子函数，用来创建React中的回调函数
- 作用：useCallback创建的回调函数不会总在组件重新渲染时重新创建
- `useCallback(回调函数，依赖数组)`
    - 当依赖数组中的变量发生变化时，回调函数才会重新创建
    - 如果不指定依赖数组，回调函数每次都会重新创建
    - 如果只设置为空数组，仅在第一次渲染时创建,所以要将回调函数中使用到的所有变量都设置到依赖数组中，除了(setState)(`但是这样函数每次都要重新渲染，子组件就也会被动渲染`)

# React中向服务器发请求，加载数据并显示数据--以学生信息为例
## React之Strapi
- 内涵：完全使用JavaScript开发，开源`无头内容管理系统`，即一个API工具，`直接以网页形式自定义API、包括设置模型、权限等功能`(省略创建服务器、定义服务器、数据库操作)
- 使用步骤 https://docs.strapi.io/cms/quick-start
```shell
1. 创建项目 
    npm: npm create strapi-app@latest 项目名
     --quickstart  #视频版本是@4.1.11
    yarn: yarn create strapi-app 项目名 --quickstart
# --quickstart表示快速启动，对于服务器\数据库会有默认配置
# 项目创建后会自动启动，浏览器自动打开：http://localhost:1337/admin，该网页即用于添加数据结构，添加数据，设置API访问权限等
# 因为第一次启动，会弹出注册窗口，需要注册一个新的管理员账号
2.项目停止
    首先，在终端ctrl+c
    其次，在任务管理器中结束所有node.js相关的(如果有的话)
3.界面英换中操作(可省略)
    1.找到项目目录->src->admin->app.example.js的文件并复制改成app.js
    2.在app.js中打开locales:['zh-Hans']
    3.项目目录下找到package.json执行`build`(或者终端npm run build)即可生效
4.项目运行
    直接找到package.json中的develop模式并启动
    终端输入：cd 项目名
            npm run develop / yarn develop 
5.部署到 Strapi Cloud
    首先若本地Strapi在运行先用ctrl+c停止
    其次，进入项目目录下执行 npm run strapi deploy / yarn strapi deploy
    最后，会提供https://cloud.strapi.io/projects 链接
6.api测试
    通过id删除，更新，查询数据时用的不是id而是documentId
```

## Fetch API
- 基于promise的，用来向服务器发送请求加载数据，Ajax的升级版
- fetch(请求地址，请求信息).then(()=>{}).then(()=>{}).catch(()=>{})
    - 请求信息包括请求方式以及有没有传输数据，默认GET请求
    - 第一个then是请求成功获取的Response表示响应信息通过`.json()`获取Promise对象
    - 第二个then是获取请求中的数据data(即第一个then返回的res.json())
    - catch是出错时才执行

- 由于then调用过多容易造成回调地狱，所以使用await替换,其返回的是一个promise对象
- 但await仅支持在异步函数中使用，虽然是同步方式执行异步函数，但本质还是异步

## React之hooks
- React中的钩子函数只能在函数组件或自定义钩子中顶层调用，不能在嵌套函数或其他语句(if,switch,while,for等)中使用
- 自定义钩子：当需要将React中钩子函数提取到一个公共区域时，就可以使用自定义钩子，作用是进行封装(数据和方法)
    - 使用：自定义钩子本质是一个普通函数，只是函数名需要使用`use`开头
- React中自带的钩子函数(1~6使用较为频繁)
    - 1.`useState`
    - 2.`useEffect`
    - 3.`useContext`
    - 4.`useReducer`
    - 5.`useCallBack`:用来缓存函数对象，避免重复创建回调函数
    - 6.`useRef`
    - 7.`useMemo`：和5相似，用来缓存函数的执行结果，也可`缓存函数组件`(适用于函数执行逻辑较复杂且页面重新渲染时无需再次执行)
    ```js
    //缓存函数的执行结果
    useMemo(()=>{
        return `函数返回值`
    },[`函数变量依赖项`])
    //缓存组件
    const someEle = useMemo(()=>{
        return <Some a={a} b={b}/> //返回jsx
    }，[a,b])
    <div>
        {someEle}
    </div>
    ```
    - 8.`useImperativeHandle`:指定ref要暴露的对象
        ```js
        /* 无法直接给组件传入ref获取react组件的dom对象，因组件中可能含有多个dom对象，react不确定提供哪个
            可以通过forwardRef指定组件要暴露给外部组件的ref，
        */
        // Other.js
        const btnRef = useRef()
        return <div><Chlid ref={btnRef}/></div>
        // Child.js  将input的ref作为组件的ref向外部暴露
        export const =React.forwardRef(props,ref)=>{//通过参数ref向外部暴露指定对象
            return (
                <div>
                    <input ref={ref} type='text'/>
                    <button>自定义按钮</button>
                </div>
            )
        }
        ```
        > 使用forwardRef，使得其他组件可以控住暴露出去的dom对象，不受暴露组件的控制，通过`useImperativeHandle`解决,使其不受接受ref的组件的控制，控制权在被暴露组件上，降低其他组件误操作的可能性
        ```js
        // Other.js
        const inputRef = useRef()
        useEffect(()=>{
            inputRef.current.changeInpValue(2)
        })
        return <div><Chlid ref={inputRef}/></div>
        // Child.js  
        export const = React.forwardRef(props,ref)=>{
            const inputRef = useRef()
            useImperativeHandle(ref,()=>{
                // 回调函数的返回值成为ref的值
                return {
                    changeInpValue(val){
                        inputRef.currrent.value=val
                    }
                }
            })
             return (
                <div>
                    <input ref={inputRef}  type='text'/>
                    <button>自定义按钮</button>
                </div>
            )
        }
        ```
        >`useImperativeHandle`必须和`React.forwardRef`结合使用
    - 9.`useLayoutEffect`
    - 10.`useDebugValue`(18.0新增):给自定义钩子设置标签以区分不同钩子，用来调试
    - 11.`useDeferredValue`(18.0新增):设置一个延迟的state,需要一个state作为参数，为该state创建一个延迟值
        - 会触发两次渲染，第一次执行是延迟至state的旧值，第二次执行时是延迟值state的新值
        - 延迟值总会比原版state值慢一步
        - 适用于多个组件使用同一个state时，组件可能会相互影响即一个组件卡顿导致所有组件都卡的情况，卡的组件用延迟值
        - 但快组件修改state会重新渲染慢组件，所以需减少慢组件渲染次数，即结合React.memo()或者useMemo()使用才有效
        - 组件卡顿情况的备选方案
    - 12.`useTransition`(18.0新增)：当修改state遇到阻塞时，通过此钩子降低setState优先级
    ```js
    /**
     * useTransition返回一个数组，第一个元素时isPending(变量)用来记录Transition是否在执行(true表示正在执行)
                                第二个元素时startTransition(函数)，将setState在其回调函数中调用
        当setState在startTransition回调函数中调用后被标记为transition并不会立即执行，而是在其他优先级更高的方法执行完毕才执行
     */
    ```
    > 除了`useTransition`，React还提供一个在不需要isPending时，直接使用`startTransition`方法，与`useTransition效果相同
    - 13.`useId`(18.0新增)：生成唯一id，适用于需要唯一id的场景，但不适用于列表的key
    - 14.`useSyncExternalStore`(18.0新增)
    - 15.`useInsertionEffect`(18.0新增):动态插入标签
## 三个effect执行时机不同，方法数组用法都一样
- 3`useEffect`(异步)：组件挂载->state改变->DOM改变->绘制屏幕->useEffect `(在页面渲染后执行useEffect会出现闪烁现状可以使用useLayouEffect)`
- 2`useLayouEffect`(同步)：组件挂载->state改变->DOM改变->useLayouEffect->绘制屏幕
- 1`useInsertionEffect`：组件挂载->state改变->useInsertionEffect->DOM改变->绘制屏幕 `(无法访问ref.因为DOM还没改变)`
> 使用副作用时首选`useEffect`，但修改样式出现闪烁可以用`useLayouEffect`,或者出现其他问题，但想添加图片之类的元素再用`useInsertionEffect`
> `useEffect`和`useLayouEffect`在React18以上版本差异不大，若要明显二者差异可在React17或以下版本执行
```js
//react版本降低
// index.js
import ReactDOM from 'react-dom'
ReactDOM.render(<App/>,document.getElementById('root'))
```
# Redux(A Predictable State Contanier for JS Apps)
- 本质： 为JS应用设计的可预期的状态容器，是一个稳定、安全的状态管理器
    - State(状态):和组件UI关联,state变了UI也发生变化，反过来同理
    - Container(容器)：对state进行管理
    - Predictable(可预测)：Redux对状态的所有操作都封装到了容器内部，外部只能通过调用容器提供的方法来操作state，而不能直接修改state，即外部对state的操作都被容器所限制，对state的操作都在容器的掌控之中。可预测
- 为什么使用Redux：把state放一起集中管理(store)，避免state过于分散在每个组件中且复杂的上下组件传值
    - 当项目复杂时Redux对于state或者Reducer更方便简洁，小项目用state，Reducer就行，context传值
    - 即Redux是reducer和context的结合体，使用场景是大型应用
- 使用
    - 在网页中使用：
        - 1.直接引入`<script src="https://unpkg.com/redux@4.2.0/dist/redux.js"></script>`
        - 2.创建reducer整合函数
        - 3.通过reducer对象创建store--状态管理容器(后续操作都是通过`store实例`去实现)
        - 4.对store中的state进行订阅
        - 5.通过dispatch派发state的操作指令
> 类似`reducer`、`pinia`

- 问题：
    - 1.如果state过于复杂，难以维护;--通过对state分组解决这个问题，即创建多个reducer，并将其合并为一个
    - 2.state每次操作都需要对state进行复制然后再修改；
    - 3.case后面的常量维护比较麻烦

## Redux之Toolkit(RTK)
- 作用：是Redux的工具包，处理Redux中的重复性工作，简化Redux中的各种操作，即解决Redux中存在的问题
- 使用RTK
```shell
# 在文件根目录下安装依赖
npm install react-redux @reduxjs/toolkit -S  || yarn add react-redux @reduxjs/toolkit
# 用RTK管理state
在src下创建store文件夹，并在里面创建index.js文件，用来创建store并暴露出去actions和store
# 在src/index.js中引入文件,同时root渲染的根组件为<Provider store={store}></Provider>
import store from "./store(/index.js)";# 引入时index.js可省略
<Provider store={store}>
    <App/>
</Provider>
# 在组件中使用 
# 回调函数参数state是所有切片整合的state，如果获取里面其中一个切片的state，即state.【RTK创建的store中的reducer里面的关键字】
useSelector(state=>state.student) 
#通过useDispatch()获取派发器对象
const dispatch = useDispatch()
# 通过派发器对象执行不同操作操作，直接传入action就可以无需{type:xx,payload:xx}
dispatch(setName('沙和尚'))
```
> - 整个Redux只有一个store
- 涉及的钩子函数及组件:

    -  createSlice({})--创建切片
    -  configureStore({})--创建store对象
    -  <Provider store={store}></Provider>  -- 将store注入到React项目中
    -  useSelector(state)--获取state(全部切片的state)
    -  useDispatch()--获取派发器对象，可以获取所有切片中的操作指令
> 当有多个切片时，操作方法可能重名，所以可以将每个切片放置不同文件，暴露数据后，将切片引入至store/index.js中即可
- 问题：state数据都在本地,没有和服务器连接,即没和服务器数据加载同步

### RTKQ（Toolkit Query）
- 作用：将state数据和数据库当中数据直接关联，即数据获取和缓存工具，减少请求发送次数,避免发送重复的请求
- 使用：将一组相关功能统一封装到一个Api对象中，即创建Api切片
    ```js
    // 1.使用createApi()创建API对象,RTKQ中所有功能都需要通过此对象来进行
        //从@reduxjs/toolkit/query/react引入，会自动生成所需的钩子函数，老版本是@reduxjs/toolkit/dist/query/react
        createApi({
            reducerPath:'studentApi',//作为Api唯一标识,不能和其他Api或reduecer重复
            baseQuery:fetchBaseQuery({
                baseUrl:'http://localhost:1337/api/'
            }),//指定查询的基础信息，发送请求使用的工具
            endpoints(build){//提供一个参数build，是请求的构建器，通过build来设置请求的相关信息
                return {
                    getStudents:build.query({
                        query(){
                            // 用来指定请求子路径
                            return 'students' //返回值会和baseUrl进行拼接
                        },
                        transformResponse(baseQueryReturnValue){//转换响应数据的格式
                            return baseQueryReturnValue.data
                        },
                        keepUnusedDataFor:0//设置数据未被使用的缓存时间(单位秒) 0--不缓存，默认60s,解决同步同步修改数据而不更新的问题
                    }),
                    getStudentById:build.query({
                        query(id){
                            return `students/${id}`
                        }
                    }),
                    delStudent:build.mutation({
                        query(id){
                            // 如果不是get请求，需要返回一个对象设置请求信息
                            return {
                                url:`students/${id}`,
                                method:'delete'
                            }
                        }
                    }),
                    addStudent:build.mutation({
                        query(stu){
                            return {
                                url:'students',
                                method:'post',
                                body:{data:stu}//RTQK会自动转换成JSON不需要我们设置
                            }
                        }
                    })，
                    updateStudent:build.mutation({
                        query(stu){
                            return {
                                url:`students\${stu.id}`,
                                method:'put',
                                body:{data:stu}//RTQK会自动转换成JSON不需要我们设置
                            }
                        }
                    })
                }
            }//用来指定Api中的各种功能，是一个方法，需要一个对象作为返回值
        })
    // 2.Api对象创建后，对象会根据各种方法自动生成对应钩子函数，通过钩子函数向服务器发送请求
        /**
         *  钩子函数命名规则 getStudents--->useGetStudentsQuery
                            delStudent--->useDelStudentMutation
        */
        //可以直接暴露，比如
        export const {useGetStudentsQuery,useGetStudentByIdQuery}=studentApi 
        //也可以通过Api对象获取
        studentApi.useDelStudentMutation()
    // 3.将API对象暴露出去
         export default studentApi
    // 4.将API对象切片存储在store/index.js中，即存储在store中并将其暴露出去
        const store = configureStore({
            reducer:{
                // 属性名如果是变量要用[]括起来
                [studentApi.reducerPath]:studentApi.reducer //reducer是自动生成的
            },
            // 中间件，具有缓存功能  这里concat是在原来中间件基础上进行扩充
            middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(studentApi.middleware)
        })
    export default store
    //6.在React项目(index.js)中注入
        // 注入store
        import store from "./store";//默认从index.js中找
        import { Provider } from 'react-redux';
        root.render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    ```
- 钩子函数中返回值说明(以useGetStudentsQuery为例)
    - 返回的是一个数组(第一个值是操作的触发器--Promise，第二个是结果集)
    - 结果集如下：
    ```js
        currentData: undefined //当前参数的最新数据,钩子函数可以传入参数，当参数变化时，请求响应还没回来currentData为undefined
        data: undefined // 最新的数据(不考虑参数),当请求没有回来时为旧的数据
        endpointName:"getStudents"
        error:Error() //对象，有错时才存在
        isError:false  //布尔值 是否有错误
        isFetching:true //布尔值 表示数据是否正在加载，true表示正在加载
        isLoading:true  //布尔值 表示第一次数据是否正在加载(即初始化，后续fetch重新渲染，其值一直为false)
        isSuccess:false //布尔值 请求是否成功，ture--成功
        isUninitialized:false //布尔值 请求是否还没有开始发送
        refetch:() => refetchOrErrorIfUnmounted(promiseRef) //一个函数用来重新加载数据
        requestId:"q7nV1SKg58D5ByqonejLL"
        startedTimeStamp:1752824863532
        status:"pending" //字符串，请求的状态 
    ```
- 钩子函数中传参说明(以useGetStudentsQuery为例)--仅对当前使用数据生效
    ```js
    第一个参数请求体:请求子路径；post/put请求数据
    第二个参数对象：对请求进行配置
    useGetStudentsQuery(null,{
       selectFromResult:result=>{//result是useGetStudentsQuery默认返回的结果
            if(result.data){
                result.data=result.data.filter(item=>item.age<18)
            }
            return result
        }, //用来指定useQuery返回结果(个性化）,除了data，还可以决定是否返回默认返回结果中的所有数据，比如isLoading等
        pollingInterval:2000, //设置轮询的间隔(单位毫秒)，这里是指隔一段时间向useGetStudentsQuery发送请求，如果为0表示不轮询；用于时效性比较强的应用
        skip:false,//设置是否跳过当前请求，默认为false表示不跳过
        refetchOnMountOrArgChange:false, //表示是否重新加载数据，false表示不加载即使用缓存数据
        refetchOnFocus:false,//是否重新获取焦点时重载数据,可应用于切换页面，默认值false--表示不重新加载即使用缓存数据，
        refetchOnReconnect:true,//网断了后恢复(重新连接后)是否重新加载数据

    })
    
    ```
> `refetchOnFocus`和`refetchOnReconnect`需要`setupListeners(store.dispatch)`支持，这个在`store/index.js`中配置

- 添加数据/修改数据，没有更新通过打标签实现数据更新`providesTags`,`invalidatesTags`



>  前面涉及的都是SPA--单页面应用(只有一个页面，根据不同操作显示不同的组件--index.html)
# 单页面应用SPA
- 内涵：`只有一个页面`，根据不同操作显示不同的组件--index.html(前面的项目都是)
- 作用：减少请求提升效率和用户体验，因为组件由前端完成，在只有一个页面情况下，组件的跳转无需请求服务器，只有需要数据时才需访问服务器
- 问题：由于只有一个地址，其刷新或者分享都是到初始界面

# React Router(客户端路由)
- 背景：解决SPA存在的问题，通过`虚拟路由`将组件和路径进行映射，这个由浏览器内部js去操作,地址的变化不是真正的向服务器请求，而是通过客户端路由
- 作用:将url地址和组件进行映射，当访问某url时其对应组件会自动挂载
- 安装
```shell
npm install react-router-dom@5 -S # 安装5版本 注意这里加了dom，用于web开发，
```
- 使用步骤
```shell
1. 引入react-router-dom包
2. 在index.js中引入BrowserRouter/HashRouter并作为根标签（可以取别名避免后续多个router命名冲突）
    import {BrowserRouter} from "react-router-dom"
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
3. 通过Route映射地址和组件
    - <Route path="映射的url地址" component={组件名}/> 
        # "/"一般默认是根目录  不足path默认是模糊匹配，前面有一段匹配组件就会挂载
        # 添加exact属性实现路径完整匹配，<Route exact/> <===><Route exact={true} />
        # 若需关闭精确匹配，需显式写为 <Route exact={false} />（或省略 exact，因默认值为 false）
```


## Router之Link、NavLink
- 背景：使用a标签会自动向服务器发送请求重新加载页面，因此引入Link、NavLink对`客户端`发送请求(即不会重新加载)
- Link使用
```js
<Link to="映射url地址"></Link>
```
- NavLink使用
```js
<NavLink exact activeClassName={classes.active} to="映射url地址"></NavLink>
// activeClassName表示指定链接处于激活后的类名(样式)
// 也可以通过activeStyle设置内联样式
<NavLink exact activeStyle={{text-decoration: underline}} to="映射url地址"></NavLink>
```
> NavLink相比于Link就是多了`指定链接激活后`的样式，且需要exact进行强匹配，根据唯一路径进行样式渲染，其他作用与Link相似，且渲染结果是a标签
## BrowserRouter vs HashRouter  (以Nginx服务器部署为例)
-`BrowserRouter`：直接通过url地址进行组件的跳转，使用过程中和普通的url地址没有区别
    - 在该情况下当刷新页面或通过普通链接进行跳转时，会向服务器发送请求加载数据，此时请求并没有经过react router,所以会返回404
        - 原因：网页只有一个地址，服务器获取不到react router设计的地址与组件匹配的网页
    - 解决方法：
        - 1.使用`HashRouter`--原理是服务器不会根据url中的哈希值加载请求，此时使用HashRouter后请求将会由react router处理
        - 2.修改服务器的配置，将所有请求都转发到index.html
            - `nginx服务器-->conf->nginx.conf`下配置`location/{root html;try_files $uri /index.html;}`
                - `try-files $uri /index.html`表示访问任何地址都转到index.html处理，即交给react处理
-`HashRouter`:通过url地址中的hash值来对地址进行匹配，地址栏中多了一个"#/"
- 联系与区别：二者使用过程无异只是项目部署会有区别

## Router之Route标签
- Route标签内的属性说明
```js
<Route exact="true" path="/" component={Home} />
/* 
    component用来指定路由匹配后被挂载的组件
        component需要直接传递组件的函数对象(不需要写jsx即<Home/>)-通过component构建的组件会自动创建组件并且会自动传递参数
            - match:匹配的信息--判断地址
                isExact--检查路径是否完全匹配
                params--请求的参数，字符串类型
                path--路径规则(比如/student/:id),':'后面的为参数名会放入params中
                url--真实路径(对应path--/student/1)
            - location:获取地址信息
                state--可向跳转路径传值
            - history:控制页面跳转(历史信息)
                push()--跳转页面，需要一个loaction作为参数  A->B，B可回退到A
                replace()--替换页面  A->B，B替换了A，回退到A的上一个history

*/
```
## Router之Switch标签
- 作用:路由管理器，只匹配第一个的Route并返回到页面上，`可写可不写`
```js
<Switch>
    <Route exact path="/" component={Home} />
    <Route  path="/about" component={About} />
    <Route exact path="/student/:id">
        <Student/>
    </Route>
    <Route  path="/form" component={MyForm} />
</Switch>
```
> 这里只会显示Home组件

## Route组件挂载方式
- 1.component
    - 不传入jsx，直接传入组件的函数对象，无法自定义组件中的属性
    ```js
        <Route exact="true" path="/" component={Home} />
    ```
- 2.render
    - 一个回调函数作为参数，且回调函数的返回值(这里就可以写jsx，也可以给组件函数对象传值)最终被挂载
    - 不会自动传入match、location和history，需要在回调函数写入参数才可获取(以routePros为例)
    ```js
    <Route exact path="/student/:id" render={(routePros)=>{
        console.log(routePros) // 里面就是match、location和history
        return <Student {...routePros}/>
    }}/>
    ```
- 3.children
    - 用法1：和render类似，传递毁掉函数
        - 弊端：当children设置一个回调函数时，该组件无论路径是否匹配成功都会被挂载
    - 用法2：直接传递jsx
    ```js
    <Route exact path="/student/:id" children={<Student/>}/>
    ```
        - 不足：无法传递自动传入match、location和history
    - children本质是标签体，用法1,2(属性写法)可转换如下所示：
    ```js
        // 用法1 
        <Route exact path="/student/:id">
            {routePros=><Student/>}
        </Route>
        // 用法2 
        <Route exact path="/student/:id">
            <Student/>
        </Route>
    ```
> match、location和history除了通过props传入，还可以通过react的钩子函数获取

## 钩子函数获取Route标签内的属性

- useRouteMatch()
- useLocation()
- useHistory()
- useParams()

## 路由嵌套
- 使用：通过children标签体性质进行嵌套
```js
<Route path="/about">
    <About/>
    <Route path='/about/detail'>
        <Detail/>
    </Route>
</Route>
// 或者直接在About组件返回值内写上
<Route path='/about/detail'>
    <Detail/>
</Route>
```
> `ps`：外层Route不能添加`exact`,否则访问内层路由都显示不出来
- 当嵌套组件过多，path路径过长，可以通过钩子函数获取根路径
```js
// About组件内
const {path}=useRouteMatch()
<Route path={`${path}/detail`}>
    <Detail/>
</Route>
```

## React之Prompt组件
-本质：弹窗
-作用： 避免用户跳转页面时没有提示导致信息丢失
-属性：
    - when：为true是当离开该组件会显示弹窗，false不显示
    - message：弹窗内容 

## React之Redirect组件
- 作用：重定向，自动将页面跳转到指定位置
```js
// Switch中写重定向需要写from属性
<Redirect from='/about' to='/form'> {/* 默认location中的replace() */}
{/* 添加push后由于从from指定的页面A重定向到to指定的页面B，从B回退到A，A又重定向到B，所以push方法下依旧在重定向后的地址 */}
<Redirect push to='/form'> {/* 在组件内重定向可以不写from */}

```

# React Router -V6
- 使用过程
    - 1. index.js中引入(和v5一样)
    - 2.路由组件映射<Route>组件一定要由<Routes>组件包裹
        - v6新增<Routes>，作用和<Switch>类似，都是用于Route的容器，但<Routes>必须写
        - <Routes>中<Route>只有一个会被匹配
        - v6中，Route的component render属性都没了，也不能用children的标签体写(需要通过`element`来指定要挂载的组件-JSX)
        ```js
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='About' element={<About/>}></Route>
        </Routes>
        ```
        >`ps`: `默认严格匹配`,且在写路径时可以不写前面的根路径，v6会自动补全 
- 钩子变化： 
    - useLocation()没区别
    - useRouteMatch()-->`useMatch():用来检查【当前url】是否匹配某个路由`(如果路径匹配返回对象，否则返回null)，需要手动传入路径参数
    - useHistory()-->`useNavigate():获取用于跳转页面的函数,由两个参数第一个是指定要跳转的路径，第二个是配置对象`
    ```js
    const nav = useNavigate()
    const clickHandler=()=>{
        nav('about')//默认使用push,会产生历史记录
        nav('about',{replace:true})//使用replace，不会产生新的记录
    }
    ```
- 路由嵌套
    - 暴力写法
    ```js
    // About组件
    <Routes>
        <Route path='child' element={<Child/>}/> 
    </Routes>
    // App组件
    <Routes>
        <Route path='about/*' element={<About/>}/> 
    </Routes>
    ```
    > v6下默认严格匹配，如果要访问子路由需要取消严格匹配，所以About组件的访问路径改成`about/*`以取消严格匹配
    > 弊端：如果有每个组件都有嵌套路由，要不断的去各处找前面的路由是否是严格模式并取消不便于维护
    - `Outlet`使用 +路由直接嵌套进行统一管理
        - 作用：用来表示嵌套路由中的组件
        ```js
        // About组件
        <Outlet> 
        // App组件
        <Route path='about' element={<About/>}>
          <Route path='child' element={<Child/>}/>
          <Route path='child2' element={<Child2/>}/>
        </Route>
        ```
        > 当嵌套路由中的路径匹配成功了，Outlet则表示相应嵌套路由中的组件
        > 当嵌套路由中的路径匹配失败，Outlet就什么都不是,`此时被嵌套的组件也不会显示，即变为严格模式了`
- Redirect组件-->Navigate组件:用来跳转到指定的位置(`默认使用push()`,可添加replace属性换成replace)
```js
<Navigate to='/studnet/1' replace/>
```
> `注意to属性里面的路径要有根路径前缀'/',useNavigate()也同理`,(其他涉及to的也同理)
- NavLink组件内属性变化
    - activeStyle-->`style`,且该属性需要传入一个回调函数，返回的对象为最终的样式，函数中接受了一个参数isActive表示是否被选中
        ```js
        <NavLink 
        style={
            ({isActive})=>{ //{isActive}需要解构赋值
                return isActive ? {backgroundColor:'yellow'}:null
            }
        }
        to='student/2'>学生</NavLink>
        ```
    - activeClassName-->`className`,用法和`style`一样，只是返回的是类(样式)
> 除以上内容，其余和v5使用一样

# React之权限案例(auth-case)
- 需求：用户权限管理
- 说明：通常在使用router时，由于一个页面可能由多个组件组成，所以该页面组件放在`src/pages`下面，页面组件所包含的组件直接引入该页面组件即可(管理页面所需要的组件)

- 项目框架  【components(组件管理)，pages(页面管理)】
    - App.js 组件入口，路由数据处理和管理
        - Layout.js App页面布局
            - MainMenu.js 导航栏管理
        - NeedAuth.js 判断用户是否登录进行用户信息显示和登录页面跳转
    - HomePage.js 主页页面管理
        - Home.js 主页涉及的组件 
    - ProfilePage.js 用户信息页面管理
        - Profile.js 用户信息涉及的组件
    -AuthPage.js 登录/注册页面管理
        - AuthForm.js 登录/注册表单
    - StudentPage.js 学生页面管理
    - Student文件 涉及学生信息的组件
    
    - store文件  state状态管理
        - index.js state入口，并管理切片和api
        - api文件 管理数据请求
            - authApi.js  注册/登录请求
            - studentApi.js 学生信息增删改请求
        - reducer state数据操作切片
            - authSlice.js 登录状态信息及其修改的state切片
    - hooks文件 自定义钩子管理
        - useAutoLogout.js 自定义自动登出钩子函数
- 项目过程中存在问题
    - `1.在MainMenu.js中通过登录状态显示链接，但是没有登录知道某链接url，也是可以显示，示例如下：`
    ```js
    //在没有登录的情况下，在地址栏中输入profile路径还是可以显示用户信息
    { auth.isLogged &&
        <>
            <li>
                <Link to='profile'>{auth.user.username}</Link>
            </li>
            <li>
                <Link to='/' onClick={()=>dispatch(logout())}>登出</Link>
            </li>
        </>
    }
    ```
        - 解法1：在App中判断登录状态信息，然后进行路由配置和页面跳转
        ```js
        const auth=useSelector(state=>state.auth)
        <Routes>
            <Route path='profile' element={
                auth.isLogged ?
                <ProfilePage/>:
                <Navigate to="/auth-form" replace/>
            }/>
        </Routes>
        ```
        - 解法2：将判断放在一个组件中，然后用该组件包裹此路由

        ```js
        <!-- NeedAuth.js组件 -->
        const auth=useSelector(state=>state.auth)
        return (
            <div>
            auth.isLogged ? NeedAuth.children:<Navigate to="/auth-form" replace/>
            </div>
        )
        <!-- App组件 -->
        <Routes>
            <Route path='profile' element={<NeedAuth><ProfilePage/></NeedAuth>}/>
        </Routes>
        ```
    - 2.每次登录成功都跳回首页，但有时是从其他页面跳转至登录页面，希望登录成功后跳回原先路径而不是直接到首页
        - 解决方法：借助location中的state进行传参先前路径
        ```js
        <!-- NeedAuth.js -->
        const location = useLocation()
        <Navigate to="/auth-form" state={{preLocation:location}} replace/>
        <!-- AuthForm.js -->
        // 判断是否有先前路径,有登录后跳转至原先路径，没有跳转至根路径
        const loaction = useLocation()
        const from = loaction.state?.preLocation?.pathname||'/'
        const nav = useNavigate()
        nav(from,{replace:true})
        ```
    > `?.`：ES6语法中的可选链操作符，用于安全访问嵌套对象的属性，如果中间某个属性不存在（为 null 或 undefined），不会报错，而是直接返回 undefined
    > 这里先判断 loaction.state是否存在，存在接着判断loaction.state.preLocation，以此类推，若一直存在，获取最后的属性值即loaction.state.preLocation.pathname的值
    > 若不存在，直接返回undefined,不会继续向后判读属性，
    >`||`：只要左边为假值(undefined、null、''、0、false 等),就返回右边的

    - 3.页面刷新，登录信息丢失
        - 原因：reducer存储到内存，一刷新就清空了
        - 解决方法：将数据同时存储到`本地存储`中并在初始化通过本地存储加载登录状态,实现`数据持久化`,但`只能存储字符串`
        ```js
        //authSlice.js 
        // 基于本地存储查看是否有登录状态，没有就初始化
        initialState:()=>{
            const token = localStorage.getItem('token')
            if(!token){
                return {
                    isLogged:false,
                    token:null,
                    user:null
                }
            }
            return {
                isLogged:true,
                token,
                user:JSON.parse(localStorage.getItem('user'))
            }
        },
        //login()登录，同时本地存储
        localStorage.setItem('token',state.token)
        localStorage.setItem('user',JSON.stringify(state.user))
        //logout()登出，清空本地存储
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        ```
        > 服务器发送的token默认有效期为1个月(strapi)，但网页还是登录状态，需要设置自动失去登录状态
        - `自动登出`
        ```js
        //1.authSlice.js的login() 设置登录有效期并存储在本地 expirationTime
        // 获取当前时间戳
        const currentTime = Date.now()
        // 设置登录有效时间
        const timeout = 1000*60*60*24*7//一周
        state.expirationTime=currentTime+timeout //设置失效日期
         localStorage.setItem('expirationTime',state.expirationTime+'')
        //App.js内创建一个useEffect处理登录状态(设置一个定时器进行自动登出)  或者自定义钩子进行封装(useAutoLogout.js)，避免App.js中代码臃肿
        export const useAutoLogout=()=>{
            const auth = useSelector(state=>state.auth)
            const dispatch = useDispatch()
            // 创建一个useEffect 用来处理登录状态
            useEffect(()=>{
                const timeout =auth.expirationTime-Date.now()
                // 判断timeout的值(毫秒),小于一分钟直接登出，如果大于就开启一个定时器过timeout再登出
                if(timeout<60000){
                    dispatch(logout())
                    return;
                }
                const timer=setTimeout(()=>{
                    dispatch(logout())
                },timeout)
                return ()=>{//下一次执行之前关闭前面的定时器，避免开启多个定时器
                    clearTimeout(timer)
                }
            },[auth])
        }
        // App.js内直接引入useAutoLogout()
        ```
>上述权限设置仅在前端，后端服务器也需对数据访问进行限制(若没有权限访问返回403),前端需将服务器提供的`token`返回给服务器，以便服务器表示给予相应权限
- token的使用
    在向服务器发送请求的请求头添加：`Authorization：Bearer 服务器提供的token值`
    ```js
    // studentApi.js中设置
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:1337/api/',
        prepareHeaders:(headers,{getState})=>{//第一个参数headers参数是其默认的请求头，第二个参数(对象)存在获取state的方法
            // 获取用户的token
            const token = getState().auth.token
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        } //用来统一设置请求头,返回值成为新的请求头
    }),
    ```

# React项目中axios跨域处理(前端)
1.package.json 实现跨域
- 原理：让本地的请求先在本项目的 `public` 文件夹中找请求的数据，如果找不到，再去 proxy 配置的服务器查找。
    - 步骤1：在package.json配置
    ```js
    "proxy": "请求地址"
    ```
    - 2.在axios中的请求地址的`ip,端口、协议`换成本地
    ```js
    axios.get('https://blog.csdn.net/m0_53159803?spm=1018.2226.3001.5343').then(
        response=>{
            console.log('请求成功',response.data)
        },
        error=>{
            console.log('请求失败',error)
        }
    )
    // 替换成如下内容：
    axios.get('http://localhost:3000/m0_53159803?spm=1000.2115.3001.5343').then(
        response => {
            console.log("请求成功了！", response.data)
        },
        error => {
            console.log("请求失败了！", error)
        }
    )
    ```
    > 配置简单，请求可不加任何前缀；优先匹配前端资源；不能配置多个代理；

2.setupProxy.js文件实现跨域
- 步骤1：src文件下创建setupProxy.js文件
```js
// http-proxy-middleware低版本
// const proxy = require('http-proxy-middleware')
// http-proxy-middleware版本较高情况
const {createProxyMiddleware:proxy} = require('http-proxy-middleware')
module.exports=function(app){
    app.use(
        proxy('/api1',{//拦截请求以api开头的请求并且转到https://blog.csdn.net
            target:'https://blog.csdn.net',//目标服务器
            changeOrigin:true,// 控制服务器收到的响应头中Host字段的值，默认为false(服务端接收到的是与服务端不相同的地址)
            pathRewrite:{
                '^/api1':''// 路径重写（去除/api前缀）
            }
        }),
        proxy('/api2',{//拦截请求以api开头的请求并且转到https://blog.csdn.net
            target:'https://blog.csdn.net',//目标服务器
            changeOrigin:true,// 控制服务器收到的响应头中Host字段的值，默认为false(服务端接收到的是与服务端不相同的地址)
            pathRewrite:{
                '^/api2':''// 路径重写（去除/api前缀）
            }
        })
    )
}
```
- 在axios中的请求地址中添加前缀
```js
// 在target配置baseUrl的省略，http://localhost:3000可写可不写，在路径前面添加 /api 前缀
axios.get('/api1/m0_53159803/article/details/147544022?spm=1001.2014.3001.5501').then(
    response => {
        console.log("请求成功了！", response.data)
    },
    error => {
        console.log("请求失败了！", error)
    }
)
```
> 可以配置多个代理；配置繁琐，请求路径必须加前缀