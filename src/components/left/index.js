import 'art-template/lib/template-web';

import "./left.scss";
import render from "./left.art";
import data from "./leftData.js"

function menu(container){
  var html = render({list:data});
  $(container).html(html);
}
export default menu