var Memory = Memory || {};
Memory.MemoryController = function (game, view) {
    "use strict";
    /* global location, setTimeout */
    var that = {},
        deck;
    /*
     * function that informs the Game that the player has clicked a card
     */
    function cardOpened(card) {
        view.openCard(card.data.getId());
    }
    /*
     * function that is called after the MemoryCard has been clicked
     */
    function cardClicked(id)
    {
        for (var i = 0;i < deck.length;i++){
            var check = deck[i].getId();
            if(check == id.data){
                deck[i].open();
            }
        }
    }
    /*
     * function that is called after the MemoryCard has been closed
     */
    function cardClosed(id){
        view.closeCard(id);
    }
    /*
     * function that waits for a second before closing the MemoryCard
     */
    function waitForClose(card) {
        var id = card.data.getId();
        setTimeout(cardClosed, 1000, id);
    }
    /*
     * function that is called after the MemoryCard has been solved
     */
    function cardSolved(card) {
        view.solveCard(card.data.getId());
    }
    function gameWon(){
        view.showSuccessView();
    }
    /*
     * function that is called after the player clicks the restart button
     */
    function restart(){
        location.reload();
    }
    /*
     * function to set up the eventlisteners broadcasted by the event publishers of the game and the view
     */
    function setupListeners(){
        game.addEventListener("cardopened", cardOpened);
        game.addEventListener("cardclosed", waitForClose);
        game.addEventListener("cardsolved", cardSolved);
        game.addEventListener("gamewon", gameWon);
        view.addEventListener("cardclicked", cardClicked);
        view.addEventListener("restartClicked", restart);
    }
    function start() {
        setupListeners();
        deck = game.getDeck();
        deck.shuffle();
        view.setupBoard(deck);
    }
    function init(){
        start();
    }
    that.init = init;
    that.start = start;
    return that;
};
