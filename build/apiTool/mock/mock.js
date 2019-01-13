var Mock = require('mockjs');
import {
    page1
} from "./page1.js";
import page2 from "./page2.js";
import joinData from "./util";

let defaultObj = {
    success: true,
    message: '成功',
}


let mockConfig = [
    ...page1,
    ...page2
]
mockConfig.forEach(item => {
    let url = item.url;
    let data = joinData(Object.assign(defaultObj, item.defaultObj), item.data);
    Mock.mock(RegExp('.*' + url + '.*'), item.method, data);

})

console.log('mock被加载')