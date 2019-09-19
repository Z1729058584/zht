/**
    函数名
        Touchscroll

    使用示例
        var touchscroll = new Touchscroll('#app', '#content');

        var touchscroll = new Touchscroll('#app', '#content', {
            start: function(){}, //手指在元素上按下时的回调
            move: function(){}, // 元素滚动过程中的回调
            end: function(){} //手指在元素上抬起时的回调
        });

    参数
         *
         * @param outer  string   外层的容器元素
         * @param inner  string  内层的包裹元素
         * @constructor
    说明:
        scroll-bar 需要手动创建
        .scroll-bar{
            width:4px;
            height: 50px;
            background:rgba(0,0,0,0.7);
            position:absolute;
            right:0;
            top: 0;
            border-radius: 2px;
        }
    @dependence  依赖
        transformCSS.js
        tweenAnimation.js
 */
function Touchscroll(outer, inner, callback){
    var app = document.querySelector(outer);
    if(!app){
        return console.error('容器不能为空');
    }

    var content = app.querySelector(inner);
    var scrollBar = app.querySelector('.scroll-bar');

    //计算滚动条的高度
    function setScrollBarHeight() {
        var h = app.offsetHeight * app.offsetHeight / content.offsetHeight;
        scrollBar.style.height = h + 'px';
    }

    //对外暴露函数
    this.setScrollBarHeight = setScrollBarHeight;

    //初始化
    function init(){
        //计算滚动条的高度  Math.pow(3, 3)  sqrt
        window.addEventListener('load', function(){
            setScrollBarHeight();
            //设置容器元素为相对定位
            app.style.position = 'relative';
        });
    }
    init();

    //绑定事件
    app.addEventListener('touchstart', function (e) {
        this.y = e.changedTouches[0].clientY;
        this.top = transformCSS(content, 'translateY');
        this.startTime = Date.now();
        content.style.transition  = 'none';
        //停止定时器
        if(content.timer){
            clearInterval(content.timer.translateY);
        }
        if(scrollBar.timer){
            clearInterval(scrollBar.timer.top);
        }
        //按下时的动作
        if(callback && typeof callback.start === 'function'){
            callback.start();
        }
    });

    //滑动
    app.addEventListener('touchmove', function (e) {
        this._y = e.changedTouches[0].clientY;
        var translateY = this._y - this.y + this.top;
        var maxTranslateY = 0;
        var minTranslateY = -(content.offsetHeight - app.offsetHeight);

        if(translateY >= maxTranslateY){
            translateY *= 1/2;
        }

        if(translateY <= minTranslateY){
            var disY = this._y - this.y;
            var distance = disY / 2;
            translateY = minTranslateY + distance;
        }

        //设置
        transformCSS(content, 'translateY', translateY);
        //设置 滚动条的 Y 轴的位置  见图
        var size1 = translateY;
        var size2 = content.offsetHeight;
        var size4 = app.offsetHeight;
        var size3 = size1/size2 * size4;
        scrollBar.style.top = -size3 + 'px';

        if(callback && typeof callback.move === 'function'){
            callback.move();
        }
    });

    //
    app.addEventListener('touchend', function (e) {
        if(callback && typeof callback.end === 'function'){
            callback.end();
        }
        var initY,translateY;
        initY = translateY = transformCSS(content, 'translateY');
        var isOutBounding = false;//是否越界
        //
        this._y = e.changedTouches[0].clientY;
        this.endTime = Date.now();

        //计算差值
        var disY = this._y - this.y;
        var disTime = this.endTime - this.startTime;


        var speed = disY / disTime;
        var distance = speed * 100;

        translateY += distance;

        var maxTranslateY = 0;
        var minTranslateY = -(content.offsetHeight - app.offsetHeight);
        var type = 'QuartEaseOut';
        //越界检测
        if(translateY >= maxTranslateY){
            translateY = maxTranslateY;
            type = 'BackEaseOut';
            isOutBounding = true;
        }

        if(translateY <= minTranslateY){
            translateY = minTranslateY;
            type = 'BackEaseOut';
            isOutBounding = true;
        }

        if(isOutBounding){
            //动画切换
            tweenAnimation(content, 'translateY', initY, translateY, 500, 10, type);

            //对滚动条进行动画控制  见图
            var size_1 = translateY;
            var size2 = content.offsetHeight;
            var size4 = app.offsetHeight;
            var size_3  = -size_1 / size2 * size4;
            var initTop = scrollBar.offsetTop;
            tweenAnimation(scrollBar, 'top', initTop, size_3, 500, 10, 'QuartEaseOut');
        }else{
            if(Math.abs(disTime) >= 300){
                return;
            }
            //动画切换
            tweenAnimation(content, 'translateY', initY, translateY, 500, 10, type);

            //对滚动条进行动画控制  见图
            var size_1 = translateY;
            var size2 = content.offsetHeight;
            var size4 = app.offsetHeight;
            var size_3  = -size_1 / size2 * size4;
            var initTop = scrollBar.offsetTop;
            tweenAnimation(scrollBar, 'top', initTop, size_3, 500, 10, 'QuartEaseOut');
        }


    });
}