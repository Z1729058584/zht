~function (w) {
    w.my={};//声明一个window对象
    //获取滚动条横向和纵向的距离
    w.my.getWinScroll = function(){
        return {
            left: document.documentElement.scrollLeft|| window.pageXOffset || document.body.scrollLeft,
            top: document.documentElement.scrollTop|| window.pageYOffset || document.body.scrollTop

        }
    }
    // 设置滚动条横向滚动的距离
    w.my.setWinXScroll=function(num) {
        window.pageXOffset = num;
        document.documentElement.scrollLeft = num;
        document.body.scrollLeft = num;
    }
    // 设置滚动条纵向滚动的距离
    w.my.setWinYScroll=function(num) {
        window.pageYOffset = num;
        document.documentElement.scrollTop = num;
        document.body.scrollTop = num;
    }
    /*
    getScreen()是获取浏览器可视化区域的宽度和高度
    可以直接调用返回对象的 width 和height 来获取
    */
    w.my.getScreen = function () {
        return {
            width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
            height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
        }
    }

    /*
        getPreSibling(obj)获取 元素的上一个兄弟元素节点

     */
    w.my.getPreSibling = function(obj){
        return obj.previousElementSibling||obj.previousSibling;
    }

    /*
        getNextSibling(obj)获取 元素的下一个兄弟元素节点

     */
    w.my.getNextSibling = function(obj){
        return obj.nextElementSibling||obj.nextSibling;
    }

    /*
        getFirChild(obj)获取 元素第一个子元素节点
firstChild: IE6、7、8 第一个元素节点; 非IE6、7、8：返回第一个元素节点或文本节点

firstElementChild： IE6、7、8不支持；非IE6、7、8，获取第一个元素节点
     */
    w.my.getFirChild = function(obj){
        return obj.firstElementChild||obj.firstChild;
    }

    /*
        getLastChild(obj)获取 元素的最后一个子元素节点

     */
    w.my.getLastChild = function(obj){
        return obj.lastElementChild||obj.lastChild;
    }
    /*
    beforeChild(newEle,parentEle) 将新元素插入到某个元素的最前边
    */
    w.my.beforeChild = function (newEle,parentEle) {
        if (w.my.getFirChild(parentEle)) {
            parentEle.insertBefore(newEle,w.my.getFirChild(parentEle));
        }else{
            parentEle.appendChild(newEle)
        }
    }

    /*
        insertAfter (parentEle,newEle,targetEle)  将newEle 插入到targetEle的下边（兄弟关系）
        parentEle是父元素
     */
    w.my.insertAfter = function(parentEle,newEle,targetEle){
        parentEle.insertBefore(newEle,w.my.getNextSibling(targetEle));
    }
    /*
           getID(id)函数 用来通过id获取元素
        */
    w.my.getID = function (id) {
        return document.getElementById(id);
    }

    /*
        getEleToDoc(ele)  获取一个元素 距离 文档的边缘的长度
     */
    w.my.getEleToDoc = function (ele) {
        // console.log(oBox.offsetLeft);
        //在这里用oTarget保存 oBox的值， oTarget在每次循环后会改变
        var obj = {
            left: 0,
            top:0
        };
        var oTarget = ele;
        // while循环
        while(oTarget){
            // 当oTarget就是oBox的时候   是不用获取边框的
            if (oTarget == ele){
                obj.left += oTarget.offsetLeft;
                obj.top += oTarget.offsetTop;
            }else{
                obj.left += oTarget.offsetLeft + oTarget.clientLeft;
                obj.top += oTarget.offsetTop + oTarget.clientTop;
            }
            oTarget = oTarget.offsetParent
        }
        return obj;
    }

    /*
        getPage(ev):获取event事件的 pageX和pageY的兼容性
     */
    w.my.getPage = function (ev) {
        return {
            x: ev.pageX || ev.clientX + my.getWinScroll().left,
            y: ev.pageY || ev.clientY + my.getWinScroll().top
        }
    };

    /*
        getOffset(ev,Ele)  获取ev.offsetX的兼容
     */
    w.my.getOffset = function (Ele,ev) {
        return {
            left:ev.clientX - w.my.getEleToDoc(Ele).left||ev.offsetX ,
            top:ev.clientY - w.my.getEleToDoc(Ele).top||ev.offsetY
        }
    }
    /*鼠标移动到父元素后，子元素模板以动画形式移上来，鼠标离开后，移下去*/
    w.my.amttb = function (ele) {
        [].forEach.call(ele, function (item, index, array) {
            var timer=null;
            var margintop=item.clientHeight;
            item.onmouseleave = function () {
                clearInterval(timer);
                timer = setInterval(function () {
                    margintop ++;
                    if (margintop >= item.clientHeight) {
                        margintop = item.clientHeight;
                        clearInterval(timer);
                    }
                    item.children[0].style.marginTop = margintop + "px";
                }, 1)
            }
            item.onmouseenter = function () {
                clearInterval(timer);
                timer = setInterval(function () {
                    margintop --;
                    if (margintop <= 0) {
                        margintop = 0;
                        clearInterval(timer);
                    }
                    item.children[0].style.marginTop = margintop + "px";
                }, 1)

            }
        });
    }
    /*
        addEvent(ele,type,fn,boo):绑定DOM2级事件兼容性写法
            参数  元素、事件名、事件函数、控制冒泡捕获的布尔值（可选）
     */
    w.my.addEvent = function (ele,type,fn,boo) {
        if (ele.addEventListener){
            ele.addEventListener(type,fn,boo||false);
        }else if (ele.attachEvent){
            ele.attachEvent("on"+type,fn)
        }else{
            ele["on"+type] = fn;
        }
    }

    /*
        removeEvent(ele,type,fn):移除DOM2级事件兼容性写法
            参数  元素、事件名、事件函数
     */
    w.my.removeEvent = function (ele,type,fn) {
        if (ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,fn)
        }else{
            ele["on" + type] = null;
        }
    }
    // 轮播图点击切换简洁版(选择可以时元素，也可以是图片)
    w.my.ConvenienceSeleImg=function(bigimg,select) {
        for (var i = 0; i < select.length; i++) {
            select[i].index = i;
            select[i].onclick = function () {
                this.className = "selected";
                $(this).siblings().attr("class", "");
                bigimg[this.index].className = "active";
                $(bigimg[this.index]).siblings().attr("class", "");
            }
        }
    }
     /*
        getStyle（obj,attr） 获取元素的样式
        元素名称   样式名称

     */
    w.my.getStyle = function (obj,attr) {
        if (obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj,null)[attr];
        }
    }


    /*
        transform(node,type,val)  给元素设置或获取css3变形样式

        node 元素  type是变形的类型  val是值（如果是获取 可以不传递）

     */
    w.my.transform = function (node,type,val) {
        if(typeof node ==="object" && typeof node["transform"] === "undefined"){
            node["transform"] = {};
        }
        // 如果传递的参数是3个，那么就是设置
        if (arguments.length >= 3) {
            //设置
            node["transform"][type] = val;
            var text = "";

            for(var item in node["transform"]){
                switch (item) {
                    case "translateY":
                    case "translateX":
                        text += item+"("+ node["transform"][item] +"px) ";
                        break;
                    case "rotate":
                    case "rotateX":
                    case "rotateY":
                    case "skewX":
                    case "skewY":
                        text += item+"("+ node["transform"][item] +"deg) ";
                        break;
                    case "scaleX":
                    case "scaleY":
                        text += item+"("+ node["transform"][item] +") ";
                        break;
                }
            }

            node.style.transform = text;
        }else if(arguments.length == 2){
            //读取
            val = node["transform"][type];
            if(typeof val === "undefined"){
                switch (type) {
                    case "translateX":
                    case "translateY":
                    case "skewX":
                    case "skewY":
                    case "roateX":
                    case "roateY":
                    case "roate":
                        val = 0;
                        break;
                    case "scaleX":
                    case "scaleY":
                        val = 1;
                        break;
                }
            }
            return val;
        }

    }



   /*
        copyEleText(obj)  复制obj的内容到剪切板
    */
    w.my.copyEleText = function (obj) {
        //1、复制依赖表单，为了不影响结构，动态创建input
        var newInput = document.createElement("input");
        ///2、把新创建的input插入到页面中  插入到obj的父级即可 不影响复制
        obj.parentNode.appendChild(newInput);
        ///3、将要复制的内容 给到 input的value中
        newInput.value = obj.innerHTML;
        // 4、选中当前表单的内容
        newInput.select();
        //5、调用document 的 execCommand方法的复制功能，就复制到剪切板了
        document.execCommand("copy")
        //6、用完input 就直接给删除就可以
        obj.parentNode.removeChild(newInput);
        alert("复制成功");
    }


    /*
        getExploreName() 返回当前浏览器类型
     */
    w.my.getExploreName = function() {
        var exploreCode = window.navigator.userAgent;
        if (exploreCode.indexOf("Opera") != -1 || exploreCode.indexOf("OPR") != -1){
            return "Opera";
        }else if (exploreCode.indexOf("compatible") != -1 && exploreCode.indexOf("MSIE") != -1) {
            return "IE10-";
        }else if (exploreCode.indexOf("Edge") != -1) {
            return "Edge";
        }else if (exploreCode.indexOf("Firefox") != -1) {
            return "Firefox"
        }else if (exploreCode.indexOf("Safari") != -1 && exploreCode.indexOf("Chrome") == -1) {
            return "Safari";
        }else if(exploreCode.indexOf("Chrome") != -1 && exploreCode.indexOf("Safari") != -1){
            return "Chrome";
        }else if(window.ActiveXObject){
            return "ie11"
        }else{
            return "换吧"
        }
    }
    /*
    * @param node  元素对象
    * @param prop  样式名称
    * @param value 样式的值 不带单位
    *
    * @example setting   transformCSS(box, 'translateX', 300);
    * @example setting   transformCSS(box, 'rotate', 90);
    * @example setting   transformCSS(box, 'scale', 3);
    * @example reading   transformCSS(box, 'translateX');
    * @returns {number|*}
    */
   function transformCSS(node, prop, value) {
       //判断创建一个数据仓库
       if (node.store === undefined) {
           node.store = {};
       }

       //如果是三个参数
       if (arguments.length == 3) {
           //设置
           // node.style.transform = prop + '('+value+'px)';
           // px   deg
           node.store[prop] = value;
           //初始化字符串
           var cssStr = '';
           for (var i in node.store) {
               // i    translate   rotate   scale
               switch (i) {
                   case 'translate':
                   case 'translateX':
                   case 'translateY':
                       cssStr += i + '(' + node.store[i] + 'px) ';
                       break;
                   case 'rotate':
                   case 'rotateX':
                   case 'rotateY':
                   case 'rotateZ':
                       cssStr += i + '(' + node.store[i] + 'deg) ';
                       break;
                   case 'scale':
                   case 'scaleX':
                   case 'scaleY':
                       cssStr += i + '(' + node.store[i] + ') ';
                       break;
               }
           }
           node.style.transform = cssStr;
       }
       //如果是两个参数
       if (arguments.length == 2) {
           //获取  translateX
           //如果有
           if (node.store[prop]) {
               return node.store[prop];
           } else {
               //如果没有   translate 0  rotate 0  scale scaleX scaleY  1
               if (prop.substr(0, 5) == 'scale') {
                   return 1;
               } else {
                   return 0;
               }
           }
       }
   }
   //赋值
   w.transformCSS = transformCSS;

}(window);






