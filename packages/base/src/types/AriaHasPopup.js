import DataType from "./DataType.js";

const AriaHasPopupTypes = {
	/**
	 * None - the aria-haspopup attribute will not be rendered.
	 * @public
	 */
	None: "None",

	/**
	 * Menu popup type.
	 * @public
	 */
	Menu: "Menu",

	/**
	 * ListBox popup type.
	 * @public
	 */
	ListBox: "ListBox",

	/**
	 * Tree popup type.
	 * @public
	 */
	Tree: "Tree",

	/**
	 * Grid popup type.
	 * @public
	 */
	Grid: "Grid",

	/**
	 * Dialog popup type.
	 * @public
	 */
	Dialog: "Dialog",

};

/**
 * @class
 * Different values for AriaHasPopup.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.AriaHasPopup
 * @public
 * @enum {string}
 */
class AriaHasPopup extends DataType {
	static isValid(value) {
		return !!AriaHasPopupTypes[value];
	}
}

AriaHasPopup.generateTypeAccessors(AriaHasPopupTypes);

export default AriaHasPopup;
