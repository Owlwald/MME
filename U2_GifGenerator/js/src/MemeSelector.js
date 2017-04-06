var MemeGenerator = MemeGenerator || {};
MemeGenerator.MemeSelector = (function () {
    "use strict";
    /* eslint-env browser  */
    var that = {},
        menu,
        icon,
        server;

    function init(connector){
        menu= document.querySelector("#menu");
        menu.addEventListener("click",onclick);
        icon = document.querySelector(".drop-down-handle");
        server = connector;
        server.getImages();
    }
    
    function onclick(){
        if(menu.getAttribute("class")=="menu"){
            menu.setAttribute("class","menu expanded");
            icon.setAttribute("class","drop-down-handle fa fa-chevron-circle-up");
        }
        else{
            menu.setAttribute("class","menu");
            icon.setAttribute("class","drop-down-handle fa fa-chevron-circle-down");
        }
    }
    
    function changeImage(source){
        var thumbnail= document.querySelector(".thumbnail");
        thumbnail.setAttribute("src",source.data);    
    }
    
    that.changeImage = changeImage;
    that.init = init;
    return that;
}());