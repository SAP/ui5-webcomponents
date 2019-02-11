import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

/**
 * @public
 */
const ToolbarStyleTypes = /** @lends sap.ui.webcomponents.main.types.ToolbarStyle */ {
	/**
	 * Default visual style dependent on the used theme.
	 * @public
	 * @type {String}
	 */
	Standard: "Standard",

	/**
	 * <code>Toolbar</code> will be displayed without bottom border.
	 * @public
	 * @type {String}
	 */
	Clear: "Clear",
};

/**
 * Defines the <code>ui5-toolbar</code> toolbarStyle property values.
 * The available options are: 'Standard' and 'Clear'.
 *
 * Example: <ui5-toolbar toolbar-style="Clear"></ui5-toolbar>
 *
 * @enum
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ToolbarStyle
 * @extends sap.ui.webcomponents.base.types.DataType
 * @public
 */
class ToolbarStyle extends DataType {
	static isValid(value) {
		return !!ToolbarStyleTypes[value];
	}
}

ToolbarStyle.generataTypeAcessors(ToolbarStyleTypes);

export default ToolbarStyle;
