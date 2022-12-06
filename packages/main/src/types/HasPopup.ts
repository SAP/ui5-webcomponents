/**
 * Different types of HasPopup.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.HasPopup
 */
enum HasPopup {
	/**
	 * Dialog popup type.
	 * @public
	 * @type {Dialog}
	 */
	Dialog = "Dialog",

	/**
	 * Grid popup type.
	 * @public
	 * @type {Grid}
	 */
	Grid = "Grid",

	/**
	 * ListBox popup type.
	 * @public
	 * @type {ListBox}
	 */
	ListBox = "ListBox",

	 /**
	  * Menu popup type.
	  * @public
	  * @type {Menu}
	  */
	Menu = "Menu",

	 /**
	  * Tree popup type.
	  * @public
	  * @type {Tree}
	  */
	Tree = "Tree",
}

export default HasPopup;
