/**
 * Different types of list items separators.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ListSeparators
 */
enum ListSeparators {
	/**
	 * Separators between the items including the last and the first one.
	 * @public
	 * @type {All}
	 */
	All = "All",
	/**
	 * Separators between the items.
	 * <b>Note:</b> This enumeration depends on the theme.
	 * @public
	 * @type {Inner}
	 */
	Inner = "Inner",
	/**
	 * No item separators.
	 * @public
	 * @type {None}
	 */
	None = "None",
}

export default ListSeparators;
