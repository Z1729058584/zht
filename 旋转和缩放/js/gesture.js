function gesture(node, callback) {
    //创建检测变量
    var isToggleGesturestart = false;

    node.addEventListener('touchstart', function (e) {
        if (e.targetTouches.length >= 2) {
            //获取起始时两个触点的间距
            this.dis1 = getDistance(e.targetTouches[0], e.targetTouches[1]);
            //获取手势开始状态的夹角
            this.jiaodu1 = getDegree(e.targetTouches[0], e.targetTouches[1]);
            //执行对应的事件处理程序  gesturestart 事件
            if (callback && typeof callback.start === 'function') {
                callback.start(e);
            }
            //修改状态变量的值为真
            isToggleGesturestart = true;
        }
    });

    node.addEventListener('touchmove', function (e) {
        if (e.targetTouches.length >= 2) {
            //执行对应的事件处理程序  gesturechange 事件
            if (callback && typeof callback.change === 'function') {
                //触摸之后的间距
                this.dis2 = getDistance(e.targetTouches[0], e.targetTouches[1]);
                //设置 e 的 scale 属性
                var scale = this.dis2 / this.dis1;
                e.scale = scale;
                //设置 e 的 rotation 属性
                this.jiaodu2 = getDegree(e.targetTouches[0], e.targetTouches[1]);
                //计算角度差
                var disJiaodu = this.jiaodu2 - this.jiaodu1;
                e.rotation = disJiaodu;
                callback.change(e);
            }
        }
    });

    node.addEventListener('touchend', function (e) {
        if (e.targetTouches.length < 2 && isToggleGesturestart) {
            //执行对应的事件处理程序  gestureend 事件
            if (callback && typeof callback.end === 'function') {
                callback.end();
            }
            isToggleGesturestart = false;
        }
    });
}

//获取两个触点之间的距离
function getDistance(p1, p2) {
    var disX = p1.clientX - p2.clientX;
    var disY = p1.clientY - p2.clientY;

    //计算两点的距离
    return Math.sqrt(disX * disX + disY * disY);
}

//获取两个触点的夹角
function getDegree(p1, p2) {
    //计算两个手指形成的夹角
    var disX = p2.clientX - p1.clientX;
    var disY = p2.clientY - p1.clientY;
    var hudu = Math.atan2(disY, disX); // 弧度  ->  角度       2πR = 周长   2π弧度  == 360度    1弧度 = 180/π
    return hudu * 180 / Math.PI;
}