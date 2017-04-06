var MemeGenerator = MemeGenerator || {};

MemeGenerator.Toolbox = (function () {
    "use strict";
    /* eslint-env browser  */
    /* global EventPublisher */
    
    var that = new EventPublisher(),
        topField,
        bottomField,
        titleField,
        capsBox,
        outlineBox,
        fontSelector,
        createButton,
        resetButton;
    
    function init(){
        initUI();
        eventListeners();
    }
    
    function initUI(){
        topField= document.querySelector("#input-top");
        bottomField = document.querySelector("#input-bottom");
        titleField = document.querySelector("#input-title");
        capsBox= document.querySelector("#input-caps");
        outlineBox= document.querySelector("#input-outline");
        capsBox.checked=true;
        outlineBox.checked=true;
        fontSelector = document.querySelector("#input-font");
        createButton = document.querySelector("#button-create");
        resetButton=document.querySelector("#button-reset");        
    }
    
    function eventListeners(){
        topField.addEventListener("keyup",textChanged);
        bottomField.addEventListener("keyup",textChanged);
        titleField.addEventListener("keyup",textChanged);
        capsBox.onchange=function(){
            optionsChanged();
        };
        outlineBox.onchange=function(){
            optionsChanged();
        };
        fontSelector.onchange=function(){
            optionsChanged();
        };
        createButton.addEventListener("click",onCreate);
        resetButton.addEventListener("click",onReset);
    }
    
    function onCreate(){
        that.notifyAll("onCreate");
    }
    
    function onReset(){
        that.notifyAll("onReset");
    }
    
    function optionsChanged(){
        var options={
            font:fontSelector.options[fontSelector.selectedIndex].value,
            caps:capsBox.checked,
            outline:outlineBox.checked
        };
        that.notifyAll("optionsChanged",options);
    }
    
    function textChanged(){
        var text={
            top:topField.value,
            bottom:bottomField.value,
            title:titleField.value
        };
        that.notifyAll("textChanged",text);
    }
    
    function reset(){
        topField.value ="";
        bottomField.value="";
        titleField.value="";
    }
    
    
    that.reset = reset;
    that.init = init;
    return that;
}());