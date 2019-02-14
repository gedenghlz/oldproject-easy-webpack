/**
 * 封装Random
 * */

// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

const getData = function (curItem) {
    if (typeof curItem !== 'string') return curItem;
    let arr = curItem.split('/');
    let fn = Random[arr[0]];
    if (Object.prototype.toString.call(fn) !== "[object Function]") return curItem;
    let argu
    if (arr.length > 1) {
        argu = arr.slice(1, arr.length).map(item => {
            return JSON.parse(item)
        });
    } else {
        argu = (arr[0] == 'string' ? ['lower', 5, 10] : [5, 10]);
    }
    return fn.apply(Random, argu);
}

const getRadom = function (obj) {
    let data = {};
    let objType = Object.prototype.toString.call(obj);
    if (objType == '[object Object]') {
        for (let key in obj) {
            if (key !== 'mockNum') {
                let object = obj[key];
                let type = Object.prototype.toString.call(object)
                if (type == '[object Object]') {
                    let num = object.mockNum;
                    if (num) {
                        let arr = [];
                        for (let i = 0; i < num; i++) {
                            let curObject = {};
                            for (let k in object) {
                                if (k !== 'mockNum') {
                                    curObject[k] = getData(object[k])
                                }
                            }
                            arr.push(curObject)
                        }
                        data[key] = arr;
                    } else {
                        let curObject = {};

                        for (let k in object) {
                            curObject[k] = getData(object[k])
                        }
                        data[key] = curObject;
                    }

                } else if (type == "[object Array]") {
                    for (let k = 0; k < object.length; k++) {
                        let item = object[k]
                        if (Object.prototype.toString.call(item) == '[object Object]') {
                            let curItem = {};
                            for (let key in item) {
                                curItem[key] = getData(item[key])
                            }
                            object[k] = curItem;
                        } else {
                            object[k] = getData(item)
                        }
                    }
                    data[key] = object
                } else {
                    data[key] = getData(obj[key])
                }
            }
        }

    } else if(objType == "[object Array]"){
        for (let k = 0; k < obj.length; k++) {
            let item = obj[k]
            if (Object.prototype.toString.call(item) == '[object Object]') {
                let curItem = {};
                for (let key in item) {
                    curItem[key] = getData(item[key])
                }
                obj[k] = curItem;
            } else {
                obj[k] = getData(item)
            }
        }
        data = obj
    }else{
        data = obj
    }

    return data;
}


export const joinData = function (obj) {

    let data
    let num = obj.mockNum;
    if (num) {
        data = [];
        for (let i = 0; i < num; i++) {
            data.push(getRadom(obj))
        }
    } else {
        data = getRadom(obj)
    }
    return data
}