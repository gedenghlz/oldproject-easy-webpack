## 使用前注意事项

1、`node`版本必须`>=7.0.0`

2、新建页面，需重新`npm start`才可以正常访问新建的页面。

## 使用步骤

1、 将`oldproject-easy-webpack`中所有文件及文件夹拷贝到项目根目录。

2、 `npm install`

3、 在项目任意新建一个或多个需要打包的目录

下面是一个目录的示例：

```shell
├── src_entries  #需要打包的文件夹需要以'_entries'结尾命名，且建议一个项目或者一个子系统中只定义一个
    └── home #接下来是页面的文件夹
    │    ├── home.js   #页面home的入口js
    │    └── home.html #页面home的html,将自动将打包的后的js添加到页面 
    └── about 
         ├── about.js   
         └── about.html 
``` 

此处需要注意的点：

  -` _entries`只能放入口文件的`html`和`js`和被引用的`css`或`scss`文件，***其他被其引用的js、html或图片等严禁一同放入***

  - 其他文件放置目录可自己合理定义，`webpack`会根据入口`js`递归查找这些依赖一起打包，`webpack`会自动找到以上文件夹和文件进行打包

  - 打包后`src_entrie`s同级目录下会自动生成一个`src_dist`目录存放打包后的文件，打包后的文件目录结构不变

4、 `npm start` 启动调试环境

5、 `npm run build` 启动生产环境 build for production with minification


## 模块化的使用

项目采用es6模块进行模块化开发，es6模块使用可以参照：[ES6模块化简介](https://github.com/simplexcspp/JavaScript-Module/issues/2)


## 模板引擎的使用

工程中已引入`art-template`，项目中统一使用此模板，以下是`art-template`在模块化开发时的使用示例：

- demo目录结构

```shell
├── components  #组件存放文件夹
     └── menu  #一个带有模板引擎的菜单组件    
         ├── menu.js   
         ├── menu.art   # 模板
         ├── data.js   # 渲染模板的数据，此处是静态写死，项目中是通过发送ajax请求来获取
         └── menu.scss
```

- menu.art

```html
<div class="menu-box">
  <ul>
    {{each list}}
    <li>{{$value.title}}</li>
    {{/each}}
  </ul>
</div>
```

- data.js

```javascript
export default [
  {title: '菜单1'},
  {title: '菜单2'},
  {title: '菜单3'},
  {title: '菜单4'} 
]
```

- menu.scss,***项目中统一使用scss预处理语言***

```scss 
.menu-box{
  ul{
    li{
      color:hotpink;
    }
  }
}
```

- memu.js

```javascript
import 'art-template/lib/template-web';

import "./menu.scss";
import render from "./menu.art";
import data from "./data.js"

function menu(container){
  var html = render({list:data});
  $(container).html(html);
}
export default menu
```

- 在入口js中的调用

```javascript
import menu from '../../***.../components/menu/menu.js' //此处路径省略，实际开发中引用路径要写对
menu("#test");
```
- html中结果：

```html
<div id="test">
  <div class="menu-box">
    <ul>  
      <li>菜单1</li>
      <li>菜单2</li>
      <li>菜单3</li>  
      <li>菜单4</li>  
    </ul>
  </div>
</div>
```


## ajax的使用
该工程已全局注入`jquery`,直接使用`$.ajax`即可发送请求,使用举例

```javascript
$.ajax({
    type: "GET",
    url: "test.json",
    data: {
        username: $("#username").val(),
        content: $("#content").val()
    },
    dataType: "json",
    success: function (data) {

    }
});
```

## mokejs模拟接口响应

- 步骤1：在`build/apiTool/mock`文件下，为需要使用mock的页面新建一个`js`文件，文件的具体配置，可参照`build/apiTool/mock/page1.js`


- 步骤2：开发环境下，mockjs已经打包加入页面，在上述文件中配置过的请求url都将被拦截:


## 开发环境下设置代理解决跨域

- 代理配置可在`build/apiTool/proxy.js`中进行更改

- 代码示例

```javascript
const proxyConfig = {
    "/sjgl": // 代理解析路径,只要请求的接口是以/sjgl开头都会被代理
    {
        target: "http://192.168.150.99:8800", //实际需要发送请求的服务器
        changeOrigin: true, //是否跨域
        logLevel:'debug' //在控制台显示代理日志
    }
}
```
- 使用代理发送请求

```javascript
$.ajax({
    type: "GET",
    url: "/sjgl/getYwyList.spring",//以代理的路径‘/sjgl’开头，所以这个请求会被代理
    data: {
    },
    dataType: "json",
    success: function (data) {
        console.log(data)
    }
});
```

- 更多详细信息可参考[http-proxy-middleware 文档](https://www.npmjs.com/package/http-proxy-middleware)


## 目录结构

```shell

├── build                            #webpack配置文件夹    
│   ├── filePath.js                  #文件路径   
│   ├── portConfig.js                #项目启动端口配置
│   ├── tool                         #封装的小工具（获取文件，log）    
│   │   ├── getFile.js   
│   │   ├── getDevPath.js            #获取所有入口文件所在的路径
│   │   └── logger.js 
│   ├──shim-ie                       #兼容ie的处理文件
│   │   └── polyfill.js 
│   ├──apiTool                       #兼容ie的处理文件
│   │   ├── mock                     #接口模拟响应
│   │   │   ├── mock.js              #入口
│   │   │   ├── page1.js             #使用demo
│   │   │   └── page2.js             #使用demo
│   │   └── proxy.js                 #设置代理解决跨域
│   ├── webpack.config.base.js       #webpack基础配置  
│   ├── webpack.config.dev.js        #webpack 开发模式基础配置   
│   └── webpack.config.production.js #webpack 生产模式基础配置     
├── package.json  
├── README.md                        #使用说明
├── .gitignore                       #git提交忽略文件    
└── vendor                           #公用js打包存放

```

## 其他功能

- `css`中的样式会自动加浏览器兼容前缀
- `jquery`全局注入，项目不需要引用`jquery`即可使用
- 兼容ie8
