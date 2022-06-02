import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.BreadcrumbsSeparatorStyle.prototype
 * @public
 */
const SeparatorTypes = {

	/**
	 * The separator appears as "/".
	 * @public
	 * @type {Slash}
	 */
	Slash: "Slash",

	/**
	 * The separator appears as "\".
	 * @public
	 * @type {BackSlash}
	 */
	BackSlash: "BackSlash",

	/**
	 * The separator appears as "\\".
	 * @public
	 * @type {DoubleBackSlash}
	 */
	DoubleBackSlash: "DoubleBackSlash",

	/**
	 * The separator appears as ">>".
	 * @public
	 * @type {DoubleGreaterThan}
	 */
	DoubleGreaterThan: "DoubleGreaterThan",

	/**
	 * The separator appears as "//".
	 * @public
	 * @type {DoubleSlash}
	 */
	DoubleSlash: "DoubleSlash",

	/**
	 * The separator appears as ">".
	 * @public
	 * @type {GreaterThan}
	 */
	GreaterThan: "GreaterThan",
};

/**
 * @class
 * Different types of <code>Breadcrumbs</code> separator.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.BreadcrumbsSeparatorStyle
 * @public
 * @enum {string}
 */
class BreadcrumbsSeparatorStyle extends DataType {
	static isValid(value) {
		return !!SeparatorTypes[value];
	}
}

BreadcrumbsSeparatorStyle.generateTypeAccessors(SeparatorTypes);

export default BreadcrumbsSeparatorStyle;
