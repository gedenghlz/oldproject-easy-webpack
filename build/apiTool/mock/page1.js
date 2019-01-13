/**
 * 演示例子请勿删除 
 * */

const page1 = [{
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
}]


// 返回结果
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

export {
	page1
}