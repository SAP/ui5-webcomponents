import DataType from "./DataType.js";
/**
 * Different types of PopupStates.
 * @lends sap.ui.webcomponents.base.types.PopupState.prototype
 * @public
 */
var PopupStates;
(function (PopupStates) {
    /**
     * Open and currently not changing states.
     * @public
     * @type {OPEN}
     */
    PopupStates["OPEN"] = "OPEN";
    /**
     * Closed and currently not changing states.
     * @public
     * @type {CLOSED}
     */
    PopupStates["CLOSED"] = "CLOSED";
    /**
     * Already left the CLOSED state, is not OPEN yet, but in the process of getting OPEN.
     * @public
     * @type {OPENING}
     */
    PopupStates["OPENING"] = "OPENING";
    /**
     * Still open, but in the process of going to the CLOSED state.
     * @public
     * @type {CLOSING}
     */
    PopupStates["CLOSING"] = "CLOSING";
})(PopupStates || (PopupStates = {}));
/**
 * @class
 * Different types of PopupState.
 *
 * @extends sap.ui.webcomponents.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.PopupState
 * @public
 * @enum {string}
 */
class PopupState extends DataType {
/**
     * Open and currently not changing states.
     * @public
     * @type {OPEN}
     */
 get OPEN() { return "OPEN" }
/**
     * Closed and currently not changing states.
     * @public
     * @type {CLOSED}
     */
 get CLOSED() { return "CLOSED" }
/**
     * Already left the CLOSED state, is not OPEN yet, but in the process of getting OPEN.
     * @public
     * @type {OPENING}
     */
 get OPENING() { return "OPENING" }
/**
     * Still open, but in the process of going to the CLOSED state.
     * @public
     * @type {CLOSING}
     */
 get CLOSING() { return "CLOSING" }

    static isValid(value) {
        return !!PopupStates[value];
    }
}
PopupState.generateTypeAccessors(PopupStates);
export default PopupState;
//# sourceMappingURL=PopupState.js.map