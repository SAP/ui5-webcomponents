/**
 * Different types of list items separators.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListSeparators
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
	 * Note: This enumeration depends on the theme.
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
