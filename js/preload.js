var res = document.createElement("link");
res.rel = "preload";
var elements = document.getElementsByTagName("a");
for (var i = 0; i < elements.length; i++){
    elements[i].addEventListener('mouseenter',function(e){
        res.as = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(e.target.href) ? "image" : "";
        res.href = e.target.href;
        document.head.appendChild(res);
    });
    elements[i].addEventListener('mouseleave',function(){
        document.head.removeChild(res);
    });
}
