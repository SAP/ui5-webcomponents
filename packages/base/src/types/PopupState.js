import DataType from "./DataType.js";

const PopupStates = {
	/**
	 * Open and currently not changing states.
	 * @public
	 */
	OPEN: "OPEN",

	/**
	 * Closed and currently not changing states.
	 * @public
	 */
	CLOSED: "CLOSED",

	/**
	 * Already left the CLOSED state, is not OPEN yet, but in the process of getting OPEN.
	 * @public
	 */
	OPENING: "OPENING",

	/**
	 * Still open, but in the process of going to the CLOSED state.
	 * @public
	 */
	CLOSING: "CLOSING",
};

class PopupState extends DataType {
	static isValid(value) {
		return !!PopupStates[value];
	}
}

PopupState.generateTypeAccessors(PopupStates);

export default PopupState;
