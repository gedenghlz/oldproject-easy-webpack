import {show} from "@root/src/components/a";
import left from "@root/src/components/left";

import './test.scss';

$.ajax({
    type: "GET",
    url: "/news/index",
    data: {
    },
    dataType: "json",
    success: function (data) {
        console.log(data,77777)
    }
});






show();
// console.log(left)


left("#test");


$.ajax({
    type: "GET",
    url: "/sjgl/getYwyList.spring",
    data: {
    },
    dataType: "json",
    success: function (data) {
        console.log(data)
    }
});




