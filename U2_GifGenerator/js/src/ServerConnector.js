var MemeGenerator = MemeGenerator || {};
MemeGenerator.ServerConnector = (function () {
    "use strict";
    /* eslint-env browser */
	/* global EventPublisher,Ajax */
    var that = new EventPublisher(),
        url = "http://132.199.139.24/~baa56852/data/meme-generator/api/memes/";

    function getImages(){
        getData(createList);
    }
    
    function getData(callback){
        Ajax.call({
            url: url,
            type: "GET",
            contentType: "text/javascript",
            dataType: "jsonp",
            success: callback
        });
    }
    
    function createList(data){
        var menu = document.querySelector("#menu"),
            list = JSON.parse(data),
            i,
            listElement,
            image;
        
        for (i = 0; i <list.memes.length;i++){
            listElement = document.createElement("li");
            image = document.createElement("img");
            image.setAttribute("src",list["base-url"]+list.memes[i].url);
            image.setAttribute("crossOrigin","anonymous");
            image.setAttribute("class","thumbnail");
            image.addEventListener("click",onClick);
            listElement.appendChild(image);
            menu.appendChild(listElement);
        }
    }
    
    function onClick(event){
        var url = event.target.getAttribute("src");
        that.notifyAll("imageClicked",url);
    }
    
    that.getImages=getImages;
    return that;
}());