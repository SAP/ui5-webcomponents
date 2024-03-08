/**
 * Different types of list items separators.
 * @public
 */
enum ListSeparators {
	/**
	 * Separators between the items including the last and the first one.
	 * @public
	 */
	All = "All",
	/**
	 * Separators between the items.
	 * Note: This enumeration depends on the theme.
	 * @public
	 */
	Inner = "Inner",
	/**
	 * No item separators.
	 * @public
	 */
	None = "None",
}

export default ListSeparators;
