/**
 * 演示例子请勿删除 
 * */
//当传入的数据不要经过处理，直接书写,mock会原样输出：
let page1=[{
	url: '/news/test',
	data: {
		"key1": [1, 2, 3, 4],
		"key2": "我不需要处理",
		"key3": '我是个数字',
	},
	method: 'get'
}]

//mock返回的数据：
/*
{
	"success": true,
	"message": "成功",
	"data": {
		"key1": [1, 2, 3, 4],
		"key2": "我不需要处理",
		"key3": "我是个数字"
	}
}
*/



//使用joinData通过传入mockNum来快速生成数据
page1.push({
	url: '/news/index',
	data: {
		"key1": "string",
		"key2": "csentence",
		"key3": 'integer/0/3',
		mockNum: 3
	},
	defaultObj: {
		success: true,
		message: '操作成功',
		total: 0,
		pageSize: 0,
		pageIndex: 0

	},
	method: 'get'
})


// 返回结果：
/*
{
	"success": true,
	"message": "操作成功",
	"total": 0,
	"pageSize": 0,
	"pageIndex": 0,
	"data": [{
		"key1": "fxfmsuj",
		"key2": "一系使联年。",
		"key3": 0
	}, {
		"key1": "mwetbqc",
		"key2": "今须没南条解法。",
		"key3": 1
	}, {
		"key1": "ursrvmy",
		"key2": "效青出压时面。",
		"key3": 2
	}]
}
*/





//传入的数据要使用Math.random 只支持两层嵌套，需要多层嵌套可以单独引用util.js中的joinData方法:

import {
	joinData
} from './util'
page1.push({
	url: '/news/about',
	data: {
		"key1": {
			"title": "csentence",
			"num": 'pick/[7,8,9]',
			"nameList": joinData({ //超过两层调用joinData
				"name1": "cname",
				"name2": 'cname',
				mockNum: 2
			})
		},
		"key2": "string",
		"key3": 'string',
		mockNum: 3
	},
	method: 'get'
})




export {
	page1
}