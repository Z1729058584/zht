+function (){
document.addEventListener("touchstart",function (e) {
    e.preventDefault();
},{passive:false});
var link=document.querySelectorAll('a');
link.forEach(function(item,index,array){
    item.addEventListener('touchstart',function (e) {
        var href=item.getAttribute('href');
        location.href=href;
    })
});
// 设置font-size的值
// document.documentElement.style.fontSize=document.documentElement.clientWidth / 10 + 'px';
}();
~function (){
    var ostyleNode=document.createElement('style');
    var WW=document.documentElement.clientWidth/16;
    ostyleNode.innerHTML=`html{
    font-size:${WW}px!important;
    }`;
    document.head.appendChild(ostyleNode);
}();

