var Memory = Memory || {};
Memory.MemoryView = function (board, successView) {
    "use strict";
    /* global EventPublisher,document */
    var that = new EventPublisher(),
        cards = [];
    /*
     * Function that is called after the player clicks on a card.
     * Notifies the observers (here:MemoryController) of the ID of the card thats being clicked.
     */
    function onClicked(event){
        that.notifyAll("cardclicked", event.target.getAttribute("id"));
    }
    /*
     * function that is first called, that sets up the board and the cards of the game.
     * needs the deck of memoryGame to link the ids of it with the cards
     */
    function setupBoard(deck) {
        var i, newCard;
        board.style.backgroundImage = "url(img/bg.png)";
        for (i = 0; i < 16; i++) {
            newCard = document.createElement("span");
            newCard.setAttribute("id", deck[i].getId());
            newCard.setAttribute("class", "card");
            newCard.style.backgroundImage = "url(img/" + deck[i].getValue() + ".png)";
            newCard.addEventListener("click", onClicked);
            board.appendChild(newCard);
            cards.push(newCard);
        }
        return that;
    }

    /*
     * Function that is called when the player wins the game. Shows a successdialog
     */
    function showSuccessView(){
        successView.removeAttribute("class", "hidden");
        successView.addEventListener("click", function(){
            that.notifyAll("restartClicked");
        });
    }
    /*
     * Function that is called after the card is being opened.
     * Finds the right card and changes the class of it to 'card open'.
     */
    function openCard(id){
        for (var i = 0;i < cards.length;i++) {
            if(cards[i].id == id){
                    cards[i].setAttribute("class", "card open");
            }
        }
    }
    /*
     * Function that is called after the card is being closed.
     * Finds the right card and changes the class of it to 'card closed'.
     */
    function closeCard(id){
        for (var i = 0;i < cards.length;i++) {
            if(cards[i].id == id){
                cards[i].setAttribute("class", "card closed");
            }
        }
    }
    /*
     * Function that is called after the card is being solved.
     * Finds the right card and changes the class of it to 'card solved'.
     */
    function solveCard(id){
        for (var i = 0;i < cards.length;i++) {
            if(cards[i].id == id){
                cards[i].setAttribute("class", "card solved");
            }
        }
    }
    that.openCard = openCard;
    that.closeCard = closeCard;
    that.solveCard = solveCard;
    that.showSuccessView = showSuccessView;
    that.setupBoard = setupBoard;
    return that;
};
