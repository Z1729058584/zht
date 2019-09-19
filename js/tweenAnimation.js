/**
 * 函数名
 *      tweenAnimation
 *
 * 功能介绍
 *      能够实现自定义动画
 *

 * @example
 *      tweenAnimation(box, 'width', 100, 500, 2000, 10, 'Linear'); //  tween['Linear']
 *      tweenAnimation(box, 'opacity', 0, 1, 1000, 10, 'QuartEaseOut'); // tween['QuartEaseOut']
 *
 * @param node   元素对象
 * @param style  元素的样式   eg: width height left  top  translateX translateY rotate
 * @param init   起始状态值
 * @param end    结束状态值
 * @param time   总的变化时间
 * @param jiange 间隔时间
 * @param type   动画类型
 *          Linear, QuartEaseOut, BackEaseOut
 *
 *      Linear: function(t,b,c,d){ return c*t/d + b; },
 *      QuartEaseOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
 *      BackEaseOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },

 */

function tweenAnimation(node, style, init, end, time, jiange, type) {
    //动画算法集合
    var tween = {
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        },
        QuartEaseOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        BackEaseOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        QuintEaseOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
    };
    //type 默认值的设置
    if (type === undefined || tween[type] === undefined) {
        type = 'Linear';
    }

    //声明参数
    var t = 0;
    var b = init;
    var c = end - init;
    var d = time;

    // node.timer.width =
    // node.timer.height =
    if (node.timer == undefined) {
        node.timer = {};
    }
    if(node.timer[style]) clearInterval(node.timer[style]);
    node.timer[style] = setInterval(function () {
        //1. 时间自增
        t += jiange;
        //2. 计算当前的样式值
        var res = tween[type](t, b, c, d);
        //3. 设置样式
        node.style[style] = res; // 需要加的 width height left top padding margin     不用加的   translateX translateY  opacity  rotate
        switch (style) {
            case 'width':
            case 'height':
            case 'left':
            case 'top':
            case 'bottom':
            case 'right':
            case 'margin':
            case 'padding':
                node.style[style] = res + 'px';
                break;
            case 'translateX':
            case 'translateY':
            case 'translateZ':
            case 'translate':
            case 'rotateX':
            case 'rotateY':
            case 'rotate':
            case 'scale':
            case 'scaleX':
            case 'scaleY':
                transformCSS(node, style, res);
                break;
            case 'opacity':
                node.style[style] = res;
                break;
        }
        //4. 停止定时器
        if (t >= d) {
            clearInterval(node.timer[style]);
        }
    }, jiange);
}

