import {show} from "../../components/a";
import left from "../../components/left";
show();
console.log(left)


left("#test");


$.ajax({
    type: "GET",
    url: "/sjgl/getYwyList.spring",
    data: {
    },
    dataType: "json",
    success: function (data) {
        console.log(data,999)

    }
});

