import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

/**
 * @public
 */
const ToolbarDesignTypes = /** @lends sap.ui.webcomponents.main.types.ToolbarDesign */ {
	/**
	 * The toolbar and its content will be displayed transparent.
	 * @public
	 * @type {String}
	 */
	Transparent: "Transparent",

	/**
	 * The toolbar appears smaller than the regular size to show information(e.g: text, icon).
	 * @public
	 * @type {String}
	 */
	Info: "Info",

	/**
	 * The toolbar has a solid background. Its content will be rendered in a standard way.
	 * @public
	 * @type {String}
	 */
	Solid: "Solid",
};

/**
 * Defines the <code>ui5-toolbar</code> design property values.
 * The available options are: 'Solid', 'Transparent' and 'Info'.
 *
 * Example: <ui5-toolbar design="Transparent"></ui5-toolbar>
 *
 * @enum
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ToolbarDesign
 * @extends sap.ui.webcomponents.base.types.DataType
 * @public
 */
class ToolbarDesign extends DataType {
	static isValid(value) {
		return !!ToolbarDesignTypes[value];
	}
}

ToolbarDesign.generataTypeAcessors(ToolbarDesignTypes);

export default ToolbarDesign;
