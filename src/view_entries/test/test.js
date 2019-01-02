import {
    show
} from "@root/src/components/a";
import left from "@root/src/components/left";

import '@mock/mock.js';
import './test.scss';

$.ajax({
    type: "GET",
    url: "/news/index",
    data: {},
    dataType: "json",
    success: function (data) {
        // $("#test").html(data)
    }
});






show();
console.log($,$.ajax)
console.log(8889889)


left("#test");


$.ajax({
    type: "GET",
    url: "/sjgl/getYwyList.spring",
    data: {},
    dataType: "json",
    success: function (data) {
        alert(data)
    }
});