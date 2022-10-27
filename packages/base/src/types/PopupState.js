import DataType from "./DataType.js";

/**
 * Different types of PopupStates.
 * @lends sap.ui.webcomponents.base.types.PopupState.prototype
 * @public
 */
const PopupStates = {
	/**
	 * Open and currently not changing states.
	 * @public
	 * @type {OPEN}
	 */
	OPEN: "OPEN",

	/**
	 * Closed and currently not changing states.
	 * @public
	 * @type {CLOSED}
	 */
	CLOSED: "CLOSED",

	/**
	 * Already left the CLOSED state, is not OPEN yet, but in the process of getting OPEN.
	 * @public
	 * @type {OPENING}
	 */
	OPENING: "OPENING",

	/**
	 * Still open, but in the process of going to the CLOSED state.
	 * @public
	 * @type {CLOSING}
	 */
	CLOSING: "CLOSING",
};

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
	static isValid(value) {
		return !!PopupStates[value];
	}
}

PopupState.generateTypeAccessors(PopupStates);

export default PopupState;
