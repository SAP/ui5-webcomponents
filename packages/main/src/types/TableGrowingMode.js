import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.TableGrowingMode.prototype
 * @public
 */
const TableGrowingModes = {
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
 * Defines the growing mode, used in the <code>ui5-table</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TableGrowingMode
 * @public
 * @enum {string}
 */
class TableGrowingMode extends DataType {
	static isValid(value) {
		return !!TableGrowingModes[value];
	}
}

TableGrowingMode.generateTypeAccessors(TableGrowingModes);

export default TableGrowingMode;
