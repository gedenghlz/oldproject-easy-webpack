# 一、适用的项目





# 二、在旧项目中怎么引入？


# 三、增加一个页面需要修改webpack配置吗？



# 四、怎么使用
## 4.1 需打包的文件夹及文件命名规范
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

1.以上配置的js和html为整个页面的入口文件，_entries只能放入口文件，***其他被其引用的文件或依赖不需要且严禁一同放入***

2.其他文件放置目录可自己合理定义，webpack会根据入口js递归查找这些依赖一起打包，webpack会自动找到以上文件夹和文件进行打包

3.打包后src_entries同级目录下会自动生成一个src_dist目录存放打包后的文件，打包后的文件目录结构不变


## 4.2 模块化的使用
项目采用es6模块进行模块化开发，es6模块使用可以参照：[ES6模块化简介](https://github.com/simplexcspp/JavaScript-Module/issues/2)


## 4.3 模板引擎的使用
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


## 4.4 ajax的使用
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

## 4.5 mokejs模拟接口响应





## 4.6 开发环境下设置代理解决跨域
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
- 更多详细信息可参考[http-proxy-middleware 文档](https://www.npmjs.com/package/http-proxy-middleware)



## 4.7 miniui的嵌入







# 五、目录结构
```shell


├── build  #webpack配置文件夹    
│   ├── filePath.js  #文件路径   
│   ├── tool  #封装的小工具（获取文件，log）    
│   │   ├── getFile.js   
│   │   ├── getDevPath.js   # 获取所有入口文件所在的路径
│   │   └── logger.js 
│   ├──shim-ie #兼容ie的处理文件
│   │   ├── json3.min.js   
│   │   └── polyfill.js 
│   ├── webpack.config.base.js  #  webpack基础配置  
│   ├── webpack.config.dev.js  #  webpack 开发模式基础配置   
│   └── webpack.config.production.js  #  webpack 生产模式基础配置     
├── package.json  
├── setting.js  #  项目设置（端口）     
├── README.md   
├── .gitignore #git提交忽略文件    
└── vendor # 公用js打包地址

```
