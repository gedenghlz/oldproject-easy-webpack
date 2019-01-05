var Mock = require('mockjs');
import {
    page1
} from "./page1.js";
import page2 from "./page2.js";

var mockConfig = [].concat(page1, page2);

mockConfig.forEach(item => {
    Mock.mock(RegExp('.*' + item.url + '.*'), item.method, item.data);
})

console.log('mock被加载')