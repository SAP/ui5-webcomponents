import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Defines which separator style will be applied for the list items.
 * @public
 */
const ListSeparatorsTypes = {
	/**
	 * Separators between the items including the last and the first one.
	 * @public
	 */
	All: "All",
	/**
	 * Separators between the items.
	 * <b>Note:</b> This enumeration depends on the theme.
	 * @public
	 */
	Inner: "Inner",
	/**
	 * No item separators.
	 * @public
	 */
	None: "None",
};

class ListSeparators extends DataType {
	static isValid(value) {
		return !!ListSeparatorsTypes[value];
	}
}

ListSeparators.generataTypeAcessors(ListSeparatorsTypes);

export default ListSeparators;
