(function (w) {
    /**
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
})(window);