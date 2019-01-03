import {
    show
} from "@root/src/components/a";
import left from "@root/src/components/left";

import '@mock/mock.js';
import './test.scss';

$.ajax({
    type: "get",
    url: "https://sug.so.360.cn/suggest",
    data: {word:'c'},
    dataType: "jsonp",
    contentType:'application/json;charset=utf-8',
    success: function (data) {
        $("#test").html(data)
        console.log(data,777)
    }   
});






show();
console.log(9889)


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