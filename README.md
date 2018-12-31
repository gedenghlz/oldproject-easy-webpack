

# 需打包的文件夹及文件命名规范
下面是一个例子：
```shell
├── src_entries  #需要打包的文件夹需要以'_entries'结尾命名，且建议一个项目或者一个子系统中只定义一个
    └── home #接下来是页面的文件夹
    │    ├── home.js   #页面home的入口js
    │    └── home.html #页面home的html,将自动将打包的后的js添加到页面 
    └── about 
         ├── about.js   
         └── about.html 
```
经过以上配置的js为整个页面的入口js文件，其他被其引用的文件不需要且严禁一同放入此目录，其他文件放置目录可自己合理定义，不影响打包，webpack会自动找到以上文件夹和文件进行打包，打包后src_entries同级目录下会自动生成一个src_dist目录，打包后的文件目录结构不变。


# 模块化的使用
项目采用es6模块进行模块化开发，es6模块使用可以参照：https://github.com/simplexcspp/JavaScript-Module/issues/2


#模板引擎的使用




#ajax的使用



#开发环境下设置代理解决跨域




#miniui的嵌入







# 目录结构
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
