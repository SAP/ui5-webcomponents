import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

/**
 * Different types of ListItem.
 */
const ListItemTypes = {
	/**
	 * Indicates the list item does not have any active feedback when item is pressed.
	 * @public
	 */
	Inactive: "Inactive",

	/**
	 * Indicates that the item is clickable via active feedback when item is pressed.
	 * @public
	 */
	Active: "Active",
};

class ListItemType extends DataType {
	static isValid(value) {
		return !!ListItemTypes[value];
	}
}

ListItemType.generataTypeAcessors(ListItemTypes);

export default ListItemType;
