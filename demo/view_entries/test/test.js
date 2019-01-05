import {
    show
} from "@root/demo/components/a";
import left from "@root/demo/components/left";

import './test.scss';

$.ajax({
    type: "get",
    url: "https://sug.so.360.cn/suggest",
    data: {word:'c'},
    dataType: "jsonp",
    contentType:'application/json;charset=utf-8',
    success: function (data) {
        // $("#test").html(data)
        console.log(data,777)
    }   
});






show();
console.log(988933)


left("#test");


$.ajax({
    type: "GET",
    url: "/sjgl/getYwyList.spring",
    data: {},
    dataType: "json",
    success: function (data) {
        // alert(data)
    }
});

$.ajax({
    type: "GET",
    url: "/news/index",
    data: {},
    dataType: "json",
    success: function (data) {
        console.log(data,2222)
    }
});