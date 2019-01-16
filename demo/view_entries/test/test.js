import {
    show
} from "@root/demo/components/a";
import left from "@root/demo/components/left";

import './test.scss';

$.ajax({
    type: "get",
    url: "https://sug.so.360.cn/suggest",
    data: {
        word: 'c'
    },
    dataType: "jsonp",
    contentType: 'application/json;charset=utf-8',
    success: function (data) {
        console.log(data, '发送ajax示例')
    }
});

const a = {
    key: 'd'
}
const b = {
    value: 898
}
const c = { ...a,
    ...b
};


show();

left("#test");


$.ajax({
    type: "GET",
    url: "/news/index",
    data: {},
    dataType: "json",
    success: function (data) {
        console.log(data, 'mock数据示例二')
    }
});

$.ajax({
    type: "GET",
    url: "/news/test",
    data: {},
    dataType: "json",
    success: function (data) {
        console.log(JSON.stringify(data), 'mock数据示例一')
    }
});

$.ajax({
    type: "GET",
    url: "/news/about",
    data: {},
    dataType: "json",
    success: function (data) {
        console.log(data, 'mock数据示例三')
    }
});

