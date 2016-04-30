/**
 * Created by Administrator on 2016/4/28 0028.
 */
//    rem是相对于根元素的字体大小,em是相对于父元素的字体大小
//    640px  --- > 100px  其他设备 640/100 = 6.4
//    750px  ----> 100px   其他设备 750/100 = 7.5
    
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var oDiv = document.querySelector(".main");
var aLis = document.querySelectorAll(".main>ul>li");
var desW = 640;
 var desH = 960;

 if (winW > 640) {
     winW = 640;
 }
if (winW / winH < desW / desH) {
    oDiv.style.webkitTransform = "scale(" + winH / desH + ")"
    oDiv.styletransform = "scale(" + winH / desH + ")"
} else {
    oDiv.style.webkitTransform = "scale(" + winW / desW + ")";
    oDiv.style.transform = "scale(" + winW / desW + ")";
}
[].forEach.call(aLis, function () {
    var oli = arguments[0];
    oli.index = arguments[1];
    oli.addEventListener("touchstart", start, false);
    oli.addEventListener("touchmove", move, false);
    oli.addEventListener("touchend",end,false);
});
function start(e) {
    this.touchstart = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    this.flag = true;
    var touchMove =e.changedTouches[0].pageY; 
    var pos = touchMove-this.touchstart;
    var index = this.index;
    [].forEach.call(aLis,function () {
        arguments[0].className = "";
        if(arguments[1]!= index){
            arguments[0].style.display = "none";
        }
        arguments[0].firstElementChild.id = "";
    })
    if(pos>0){
       this.prevsIndex = index == 0 ? aLis.length-1 : index-1;
        var duration = -winH + pos;
    }else if(pos<0){
        this.prevsIndex = index == aLis.length-1 ? 0 : index + 1;
        var duration = winH + pos;
    }
    aLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(pos) / winH * 1 / 2) + ") translate(0," + pos + "px)";
    aLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    aLis[this.prevsIndex].style.display = "block";
    aLis[this.prevsIndex].className = "zIndex";
}
function end(e) {
   if(this.flag){
       aLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
       aLis[this.prevsIndex].style.webkitTransition = "0.5s";
       aLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function () {
           this.style.webkitTransition = "";
           this.firstElementChild.id = "a" + (this.index + 1)
       },false)
   }
}
document.addEventListener("touchMove",function () {},false);

