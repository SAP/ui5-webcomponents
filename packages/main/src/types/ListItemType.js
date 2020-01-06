import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.ListItemType.prototype
 * @public
 */
const ListItemTypes = {
	/**
	 * Indicates the list item does not have any active feedback when item is pressed.
	 * @public
	 * @type {Inactive}
	 */
	Inactive: "Inactive",

	/**
	 * Indicates that the item is clickable via active feedback when item is pressed.
	 * @public
	 * @type {Active}
	 */
	Active: "Active",
};

/**
 * @class
 * Different types of ListItem.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ListItemType
 * @public
 * @enum {string}
 */
class ListItemType extends DataType {
	static isValid(value) {
		return !!ListItemTypes[value];
	}
}

ListItemType.generataTypeAcessors(ListItemTypes);

export default ListItemType;
