import "./left.css";
import 'art-template/lib/template-web';

import render from "./left.art";
import data from "./leftData.js"

export default function(container){
    console.log(container,7878)
    const html = render(data);
    $(container).html(html);
}
