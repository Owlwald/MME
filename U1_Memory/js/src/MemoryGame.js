/**
 * A Javascript implementation of Memory
 * @author Alexander Bazo <alexander.bazo@ur.de>
 * @version 1.2
 * @fileOverview MemoryGame (logic module)
 * @license https://opensource.org/licenses/MIT The MIT License (MIT)
 * */

var Memory = Memory || {};

/**
 * A namespace/module used to play memory. When created, a set of card values is passed to the module. The module allows access to a deck of cards,
 * used in the game. Each card is linked internally to the module itself. Actions on the cards trigger callbacks in the module which are processed and
 * broadcasted through a set of events. See: Modules/MemoryGame
 * @namespace MemoryGame
 * @memberOf Memory
 * @requires {@link Memory.MemoryCard}
 */
Memory.MemoryGame = function (cardValues) {
    /**
     * @public
     * @module MemoryGame
     * @description A module used to play memory. When created, a set of card values is passed to the module. The module allows access to a deck of cards,
     * used in the game. Each card is linked internally to the module itself. Actions on the cards trigger callbacks in the module which are processed and
     * broadcasted through a set of events. Public methods are listed in the corresponding namespace.
     * @see {@link Memory.MemoryGame}
     * @fires gamewon Fired when game is won (No parameters).
     * @fires cardopened Fired when a card is revealed (Sends the card as a parameter to the callbacks).
     * @fires cardclosed Fired when a card is turned facedown (Sends the card as a parameter to the callbacks).
     * @fires cardsolved Fired when a card is matched to another (Sends the card as a parameter to the callbacks).
     * @param {Array} cardValues A set of string values for the memory cards. Each value represents one identifier used to match one pair of cards.
     * @extends EventPublisher
     */
    "use strict";
    /* global EventPublisher */

    var that = new EventPublisher(),
        deck = [],
        openCards = [];


    /**
     * @public
     * @function getDeck
     * @memberOf! Memory.MemoryGame
     * @description  Returns an array memory cards. Each card has a unique id and a certain value shared by another card in the deck (pairs). Each card is internally linked to the MemoryGame and can be opened, closed and solved.
     * Related events are published through the MemoryGame module.
     * @return Array Returns an array of {@link Memory.MemoryCard}
     */
    function getDeck() {
        return deck;
    }

    function setCardValues(values) {
        deck = (function (cardValues) {
            var id, valueIndex, card, array = [];
            for (valueIndex = 0, id = 0; valueIndex < cardValues.length; id++) {
                card = new Memory.MemoryCard(id, cardValues[valueIndex]);
                card.addEventListener("open", onCardOpened);
                card.addEventListener("close", onCardClosed);
                card.addEventListener("solve", onCardSolved);
                array.push(card);
                if (id % 2 === 1) {
                    valueIndex++;
                }
            }
            return array;
        }(values));
    }

    function areAllCardsSolved() {
        var index, solvedCards = 0;
        for (index = 0; index < deck.length; index++) {
            if (deck[index].getStatus() === "solved") {
                solvedCards++;
            }
        }
        return (solvedCards === deck.length);
    }


    function checkCards() {
        if (openCards.length < 2) {
            return;
        } else {
            if (openCards[0].isMatchTo(openCards[1])) {
                openCards[0].solve();
                openCards[1].solve();
            } else {
                openCards[0].close();
                openCards[1].close();
            }
            openCards = [];
        }
        if (areAllCardsSolved() === true) {
            that.notifyAll("gamewon", null);
        }
    }

    function onCardOpened(event) {
        var card = event.data;
        that.notifyAll("cardopened", card);
        openCards.push(card);
        checkCards();
    }

    function onCardClosed(event) {
        var card = event.data;
        that.notifyAll("cardclosed", card);
    }

    function onCardSolved(event) {
        var card = event.data;
        that.notifyAll("cardsolved", card);
    }

    setCardValues(cardValues);
    that.getDeck = getDeck;
    return that;
};
