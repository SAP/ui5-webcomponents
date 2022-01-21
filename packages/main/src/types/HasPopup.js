import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Different types of HasPopup.
 * @lends sap.ui.webcomponents.main.types.HasPopup.prototype
 * @public
 */
const PopupTypes = {
	/**
	 * Dialog popup type.
	 * @public
	 * @type {Dialog}
	 */
	Dialog: "Dialog",

	/**
	 * Grid popup type.
	 * @public
	 * @type {Grid}
	 */
	Grid: "Grid",

	/**
	 * ListBox popup type.
	 * @public
	 * @type {ListBox}
	 */
	ListBox: "ListBox",

	 /**
	  * Menu popup type.
	  * @public
	  * @type {Menu}
	  */
	Menu: "Menu",

	 /**
	  * Tree popup type.
	  * @public
	  * @type {Tree}
	  */
	Tree: "Tree",
};

/**
 * @class
 * Different types of HasPopup.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.HasPopup
 * @public
 * @enum {string}
 */
class HasPopup extends DataType {
	static isValid(value) {
		return !!PopupTypes[value];
	}
}

HasPopup.generateTypeAccessors(PopupTypes);

export default HasPopup;
