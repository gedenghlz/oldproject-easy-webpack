var Mock = require('mockjs');
import {page1} from "./page1.js";
import page2 from "./page2.js";

var arr = [].concat(page1,page2);

for(var i=0; i<arr.length ; i++){ 
    var item = arr[i];
    Mock.mock(RegExp('.*' + item.url + '.*'), item.method, item.data);
}


console.log('mock被加载')