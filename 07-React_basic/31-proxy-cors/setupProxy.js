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