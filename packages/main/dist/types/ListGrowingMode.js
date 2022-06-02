import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.ListGrowingMode.prototype
 * @public
 */
const ListGrowingModes = {
	/**
	 * Component's <code>load-more</code> is fired upon pressing a "More" button.
	 * at the bottom.
	 * @public
	 * @type {Button}
	 */
	Button: "Button",

	/**
	 * Component's <code>load-more</code> is fired upon scroll.
	 * @public
	 * @type {Scroll}
	 */
	Scroll: "Scroll",

	/**
	 * Component's growing is not enabled.
	 * @public
	 * @type {None}
	 */
	None: "None",
};

/**
 * @class
 * Defines the growing mode, used in the <code>ui5-list</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ListGrowingMode
 * @public
 * @enum {string}
 */
class ListGrowingMode extends DataType {
	static isValid(value) {
		return !!ListGrowingModes[value];
	}
}

ListGrowingMode.generateTypeAccessors(ListGrowingModes);

export default ListGrowingMode;
