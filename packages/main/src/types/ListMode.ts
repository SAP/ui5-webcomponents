/**
 * Different list modes.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListMode
 */
enum ListMode {
	/**
	 * Default mode (no selection).
	 * @public
	 * @type {None}
	 */
	None = "None",

	/**
	 * Right-positioned single selection mode (only one list item can be selected).
	 * @public
	 * @type {SingleSelect}
	 */
	SingleSelect = "SingleSelect",

	/**
	 * Left-positioned single selection mode (only one list item can be selected).
	 * @public
	 * @type {SingleSelectBegin}
	 */
	SingleSelectBegin = "SingleSelectBegin",

	/**
	 * Selected item is highlighted but no selection element is visible
	 * (only one list item can be selected).
	 * @public
	 * @type {SingleSelectEnd}
	 */
	SingleSelectEnd = "SingleSelectEnd",

	/**
	 * Selected item is highlighted and selection is changed upon arrow navigation
	 * (only one list item can be selected - this is always the focused item).
	 * @public
	 * @type {SingleSelectAuto}
	 */
	SingleSelectAuto = "SingleSelectAuto",

	/**
	 * Multi selection mode (more than one list item can be selected).
	 * @public
	 * @type {MultiSelect}
	 */
	MultiSelect = "MultiSelect",

	/**
	 * Delete mode (only one list item can be deleted via provided delete button)
	 * @public
	 * @type {Delete}
	 */
	Delete = "Delete",
}

export default ListMode;
