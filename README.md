## 一、适用的项目
不是全新的项目，且之前的开发没有采用任何工程化架构，想要在新加的页面上使用webpack的一系列功能

## 二、在旧项目中怎么引入？
- 直接将包下载到项目的根目录，并且按照4.1的规则来新建页面和入口js
- 如果项目本身是用git来管理的，会与改脚手架的git管理相冲突，需要单独下载该脚手架后和原项目进行相关的合并

## 三、增加一个页面需要修改webpack配置吗？
除了使用mock和代理时需要去项目的**build/apiTool**下参照4.6和4.7说明进行配置，其他不需要额外配置。

## 四、怎么使用
### 4.1 需打包的文件夹及文件命名规范
- 下面是一个例子：
```shell
├── src_entries  #需要打包的文件夹需要以'_entries'结尾命名，且建议一个项目或者一个子系统中只定义一个
    └── home #接下来是页面的文件夹
    │    ├── home.js   #页面home的入口js
    │    └── home.html #页面home的html,将自动将打包的后的js添加到页面 
    └── about 
         ├── about.js   
         └── about.html 
```
- 需要注意的点

   - 以上配置的js和html为整个页面的入口文件，_entries只能放入口文件，***其他被其引用的文件或依赖不需要且严禁一同放入***

   - 其他文件放置目录可自己合理定义，webpack会根据入口js递归查找这些依赖一起打包，webpack会自动找到以上文件夹和文件进行打包

   - 打包后src_entries同级目录下会自动生成一个src_dist目录存放打包后的文件，打包后的文件目录结构不变


### 4.2 模块化的使用
项目采用es6模块进行模块化开发，es6模块使用可以参照：[ES6模块化简介](https://github.com/simplexcspp/JavaScript-Module/issues/2)

### 4.3 项目路径简化
- 在js中，需要引入build中的mock,可以使用路径别名来简化路径:
```javascript
require ('@mock/mock.js')
```
- 在js中需要路径从build文件夹开始，只需路径以‘@build’开始即可

- 在js中需要路径从根目录（package.json所在的目录）开始，只需路径以‘@root’开始即可



### 4.4 模板引擎的使用
工程中已引入art-template，项目中统一使用此模板，以下是art-template在模块化开发时的使用示例：

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


### 4.5 ajax的使用
该工程已全局注入jquery,直接使用$.ajax即可发送请求,使用举例
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

### 4.6 mokejs模拟接口响应
- 步骤1：在**build/apiTool/mock**文件下，为需要使用mock的页面新建一个js文件，文件的具体配置，可参照**build/apiTool/mock/page1.js**
```javascript
// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
	let articles = [];
	for (let i = 0; i < 100; i++) {
		let newArticleObject = {
			title: Random.csentence(5, 30)
		}
		articles.push(newArticleObject)
	}
	return {
		articles: articles
	}
}
export default[{
  url: '/news/index',//要拦截的一个请求路径
	data: produceNewsData,
	method: 'get'
}]
```

- 步骤2：开发环境下，mockjs已经打包加入页面，可以直接在js中使用mockjs:
```javascript
$.ajax({
    type: "GET",
    url: "/news/index",
    data: {
    },
    dataType: "json",
    success: function (data) {
        console.log(data)
    }
});
```

### 4.7 开发环境下设置代理解决跨域
- 代理配置可在proxy.js中进行更改
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


### 4.8其他功能
- css中的样式会自动加浏览器兼容前缀
- jquery全局注入，项目不需要引用jquery即可使用
- 兼容ie8

## 五、目录结构
```shell


├── build  #webpack配置文件夹    
│   ├── filePath.js  #文件路径   
│   ├── portConfig.js  #项目启动端口配置
│   ├── tool  #封装的小工具（获取文件，log）    
│   │   ├── getFile.js   
│   │   ├── getDevPath.js   # 获取所有入口文件所在的路径
│   │   └── logger.js 
│   ├──shim-ie #兼容ie的处理文件
│   │   └── polyfill.js 
│   ├──apiTool #兼容ie的处理文件
│   │   ├── mock  # 接口模拟响应
│   │   │   ├── mock.js   #入口
│   │   │   ├── page1.js   # 使用demo
│   │   │   └── page2.js #使用demo
│   │   └── proxy.js #设置代理解决跨域
│   ├── webpack.config.base.js  #  webpack基础配置  
│   ├── webpack.config.dev.js  #  webpack 开发模式基础配置   
│   └── webpack.config.production.js  #  webpack 生产模式基础配置     
├── package.json  
├── README.md   
├── .gitignore #git提交忽略文件    
└── vendor # 公用js打包地址

```

## 六、脚手架更新方法
需要用脚本工具分析下载更新（防止覆盖mock下的文件和proxy）

