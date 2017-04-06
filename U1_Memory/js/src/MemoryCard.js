/**
 * A Javascript implementation of Memory
 * @author Alexander Bazo <alexander.bazo@ur.de>
 * @version 1.2
 * @fileOverview MemoryCard (representation of a single card)
 * @license https://opensource.org/licenses/MIT The MIT License (MIT)
 * */

var Memory = Memory || {};

/**
 * A namespace/module representing a single card in a game of memory.
 * @namespace MemoryCard
 * @memberOf Memory
 */
Memory.MemoryCard = function (id, value) {
    /**
     * @public
     * @module MemoryCard
     * @description A module representing a single card in a game of memory. Public methods are listed in the corresponding namespace.
     * @see {@link Memory.MemoryCard}
     * @fires solve Fired when the card is solved (Sends the card itself as a parameter to the callbacks).
     * @fires open Fired when the card is opened (Sends the card itself as a parameter to the callbacks).
     * @fires close Fired when the card is closed (Sends the card itself as a parameter to the callbacks).
     * @param {Number} id Numeric identifier for this card.
     * @param {String} value String value for this card.
     * @extends EventPublisher
     */
    "use strict";
    /* global EventPublisher */

    var that = new EventPublisher(),
        status = "closed";


    /**
     * @public
     * @function solve
     * @memberOf! Memory.MemoryCard
     * @description Sets the card status to 'solved'. Informs subsribed observers.
     * @throws {"Card already solved"} If the current card status is 'solved'.
     */
    function solve() {
        if (status === "solved") {
            throw "Card already solved";
        }
        status = "solved";
        that.notifyAll("solve", that);
    }

    /**
     * @public
     * @function open
     * @memberOf! Memory.MemoryCard
     * @description Sets the card status to 'open'. Informs subsribed observers.
     * @throws {"Card already solved"} If the current card status is 'solved'.
     * @throws {"Card already opened"} If the current card status is 'open'.
     */
    function open() {
        if (status === "solved") {
            throw "Card already solved";
        }
        if (status === "open") {
            throw "Card already opened";
        }
        status = "open";
        that.notifyAll("open", that);
    }

    /**
     * @public
     * @function close
     * @memberOf! Memory.MemoryCard
     * @description Sets the card status to 'close'. Informs subsribed observers.
     * @throws {"Card already solved"} If the current card status is 'solved'.
     * @throws {"Card already closed"} If the current card status is 'closed'.
     */
    function close() {
        if (status === "solved") {
            throw "Card already closed";
        }
        if (status === "close") {
            throw "Card already closed";
        }
        status = "close";
        that.notifyAll("close", that);
    }

    /**
     * @public
     * @function getId
     * @memberOf! Memory.MemoryCard
     * @description Returns this card's id.
     * @returns {Number} Numeric identifier of this card.
     */
    function getId() {
        return id;
    }

    /**
     * @public
     * @function getValue
     * @memberOf! Memory.MemoryCard
     * @description Returns this card's value.
     * @returns {Number} String value of this card.
     */
    function getValue() {
        return value;
    }

    /**
     * @public
     * @function getStatus
     * @memberOf! Memory.MemoryCard
     * @description Returns this card's status.
     * @returns {String} String representation of this card's status [open|closed|solved].
     */
    function getStatus() {
        return status;
    }

    /**
     * @public
     * @function isMatchTo
     * @memberOf! Memory.MemoryCard
     * @description Checks if this card is a match to another card by comparing both cards' values.
     * @returns {Boolean} True if both cards share the same value, false if not.
     */
    function isMatchTo(anotherCard) {
        return (value === anotherCard.getValue());
    }

    that.solve = solve;
    that.open = open;
    that.close = close;
    that.getId = getId;
    that.getValue = getValue;
    that.getStatus = getStatus;
    that.isMatchTo = isMatchTo;
    return that;
};
