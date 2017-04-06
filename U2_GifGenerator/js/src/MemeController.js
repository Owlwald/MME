var MemeGenerator = MemeGenerator || {};
MemeGenerator.MemeController = (function () {
    "use strict";
    /* eslint-env browser  */
    var that = {},
        canvas,
        context,
        canvas_height = 500,
        canvas_width = 600,
        margin = 40,
        image,
        workarea,
        title;

    function init() {
        initUI();
        addEventlisteners();
    }

    function initUI() {
        title = document.querySelector("#meme-title");
        workarea = document.querySelector(".workarea-title");
        canvas = document.querySelector("#meme");
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        context = canvas.getContext("2d");
        image = new Image();
        image.setAttribute("src", "");
        image.setAttribute("crossOrigin", "anonymous");
    }

    function addEventlisteners() {
        document.body.addEventListener("drop", onDrop, false);
        document.body.addEventListener("dragover", onDragOver, false);
    }

    function resetCanvas() {
        context.clearRect(0, 0, canvas_width, canvas_height);
    }

    function resetAll() {
        resetCanvas();
        image.src = "";
        workarea.innerHTML = "Drop Image here or chose template from menu";
        title.innerHTML = "Create a new meme";
    }

    /*
     *  on dropping an image over the canvas, it loads that image into the canvas, sets a new title and removes the text of the canvas-background
     */
    function onDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        image.src = URL.createObjectURL(event.dataTransfer.files[0]);
        image.onload = function () {
            drawImage();
        };
        workarea.innerHTML = "";
        title.innerHTML = "New Title";
    }
    
    function drawImage() {
        context.drawImage(image, 0, 0, canvas_width, canvas_height);
    }

    function onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    /*
     *  function to change the text of the meme. also checks if the text should be outlines or in caps
     */
    function changeText(text, options) {
        var texttop = text.top,
            textbottom = text.bottom;

        resetCanvas();
        drawImage();

        context.font = "20pt " + options.font;
        context.textAlign = "center";
        if (options.caps == true) {
            texttop = text.top.toUpperCase();
            textbottom = text.bottom.toUpperCase();
        }
        if (options.outline == true) {
            context.strokeStyle = "black";
            context.lineWidth = 5;
            context.strokeText(texttop, canvas_width / 2, margin);
            context.strokeText(textbottom, canvas_width / 2, canvas_height - margin);
        }
        context.fillStyle = "white";
        context.fillText(texttop, canvas_width / 2, margin);
        context.fillText(textbottom, canvas_width / 2, canvas_height - margin);
        if (text.title != "") {
            title.innerHTML = text.title;
        }
    }

    /*
     *  function that opens a new tab with the image of the canvas
     */
    function createMeme() {
        window.open(canvas.toDataURL());
    }

    /*
     *  function for changing the image, whenever the menu is used
     */
    function changeImage(value) {
        resetAll();
        image.src = value.data;
        image.onload = function () {
            drawImage();
        };
        title.innerHTML = "New Title";
        workarea.innerHTML = "";
    }

    that.changeImage = changeImage;
    that.createMeme = createMeme;
    that.resetAll = resetAll;
    that.changeText = changeText;
    that.init = init;
    return that;
}());