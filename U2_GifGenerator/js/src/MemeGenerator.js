var MemeGenerator = MemeGenerator || {};
MemeGenerator = (function () {
    "use strict";
    /* eslint-env browser  */
    var that = {},
        toolbox,
        selector,
        server,
        controller,
        options={
            font:"Impact",
            caps:true,
            outline:true
        },
        text={
            top:"",
            bottom:"",
            title:""
        };

    
    function init() {
        controller = MemeGenerator.MemeController;
        controller.init();
        toolbox = MemeGenerator.Toolbox;
        toolbox.addEventListener("optionsChanged",onOptionsChanged);
        toolbox.addEventListener("textChanged",onTextChanged);
        toolbox.addEventListener("onCreate",onCreateMeme);
        toolbox.addEventListener("onReset",onReset);
        toolbox.init();
        server = MemeGenerator.ServerConnector;
        server.addEventListener("imageClicked",onImageClicked);
        selector = MemeGenerator.MemeSelector;
        selector.init(server);
    }
    
    function onOptionsChanged(value){
        options=value.data;   
        controller.changeText(text,options);
    }
    
    function onTextChanged(value){
        text=value.data;
        controller.changeText(text,options);
    }
    
    function onCreateMeme(){
        controller.createMeme();
    }
    
    function onReset(){
        controller.resetAll();
        toolbox.reset();
    }
    
    function onImageClicked(value){
        selector.changeImage(value); 
        controller.changeImage(value);
    }
    
    that.init = init;
    return that;
}());
