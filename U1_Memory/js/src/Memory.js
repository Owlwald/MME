/**
 * A Javascript implementation of Memory
 * @author Alexander Bazo <alexander.bazo@ur.de>
 * @version 1.2
 * @fileOverview Memory (main controller)
 * @license https://opensource.org/licenses/MIT The MIT License (MIT)
 */

/**
 * A Javascript implementation of Memory
 * @namespace Memory
 */
var Memory = Memory || {};


/**
 * Main module for the memory game. Creates and links the submodules. See: Modules/Main
 * @namespace Main
 * @memberOf Memory
 * @requires {@link Memory.MemoryGame}
 * @requires {@link Memory.MemoryController}
 * @requires {@link Memory.MemoryView}
 */
Memory.Main = (function () {/**
     * @public
     * @module Main
     * @description Main module for the memory game. Creates and links the submodules.
     * @see {@link Memory.Main}
     */
    "use strict";
    /* eslint-env browser, jquery  */

    var that = {},
        /**
         * @var {Memory.MemoryGame} memoryGame
         * @memberOf! Memory.Main
         * @description An instance of the game module
         */
        memoryGame,
        /**
         * @var {Memory.MemoryView} memoryView
         * @memberOf! Memory.Main
         * @description An instance of the view module
         */
        memoryView,
        /**
         * @var {Memory.MemoryController} memoryController
         * @memberOf! Memory.Main
         * @description An instance of the controller module
         */
        memoryController;

        /**
         * @public
         * @function init
         * @memberOf! Memory.Main
         * @description Initialises the module and all members with necessary dependencies. Finally calls 'start()' on {@link Main.MemoryController}
         */
    function init() {
        var cardValues = ["clock", "eye", "toolbox", "forkknife", "gear", "planet", "skull", "tshirt"],
            boardView = document.querySelector("#board"),
            successView = document.querySelector("#success");
        memoryGame = new Memory.MemoryGame(cardValues);
        memoryView = new Memory.MemoryView(boardView, successView);
        memoryController = new Memory.MemoryController(memoryGame, memoryView);
        memoryController.start();
    }

    that.init = init;
    return that;
}());
