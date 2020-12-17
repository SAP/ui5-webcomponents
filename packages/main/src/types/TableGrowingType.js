import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";


/**
 * @lends sap.ui.webcomponents.main.types.TableGrowingType.prototype
 * @public
 */
const TableGrowingTypes = {
	/**
	 * Table's <code>load-more</code> is fired upon pressing a "More" button.
	 * at the bottom.
	 * @public
	 * @type {Button}
	 */
	Button: "Button",

	/**
	 * Table's <code>load-more</code> is fired upon scroll.
	 * @public
	 * @type {Scroll}
	 */
	Scroll: "Scroll",


	/**
	 * Table's growing is not enabled.
	 * @public
	 * @type {None}
	 */
	None: "None",
};

/**
 * @class
 * Defines the growing model, used in the <code>ui5-table</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.TableGrowingType
 * @public
 * @enum {string}
 */
class TableGrowingType extends DataType {
	static isValid(value) {
		return !!TableGrowingTypes[value];
	}
}

TableGrowingType.generateTypeAccessors(TableGrowingTypes);

export default TableGrowingType;
