/**
 * Different list item types.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListItemType
 */
enum ListItemType {
	/**
	 * Indicates the list item does not have any active feedback when item is pressed.
	 * @public
	 * @type {Inactive}
	 */
	Inactive = "Inactive",

	/**
	 * Indicates that the item is clickable via active feedback when item is pressed.
	 * @public
	 * @type {Active}
	 */
	Active = "Active",

	/**
	 * Enables detail button of the list item that fires detail-click event.
	 * @public
	 * @type {Detail}
	 */
	Detail = "Detail",

	/**
	 * Enables the type of navigation, which is specified to add an arrow at the end of the items and fires navigate-click event.
	 * @public
	 * @type {Navigation}
	 */
	Navigation = "Navigation",
}

export default ListItemType;
