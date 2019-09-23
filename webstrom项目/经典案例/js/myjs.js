~function (w) {
    w.my={};//声明一个window对象
    //获取滚动条横向和纵向的距离
    w.my.getWinScroll = function(){
        return {
            left: document.documentElement.scrollLeft|| window.pageXOffset  || document.body.scrollLeft,
            top: document.documentElement.scrollTop|| window.pageYOffset  || document.body.scrollTop

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

}(window);






