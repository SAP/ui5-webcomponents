import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.ViewSettingsDialogMode.prototype
 * @public
 */
const ModeTypes = {
	/**
	 * Default type
	 * @since 1.0.0-rc.16
	 * @public
	 * @type {Sort}
	 */
	Sort: "Sort",

	/**
	 * Filter type
	 * @since 1.0.0-rc.16
	 * @public
	 * @type {Filter}
	 */
	Filter: "Filter",
};

/**
 * @class
 * Different types of Bar.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.ViewSettingsDialogMode
 * @private
 * @since 1.0.0-rc.16
 * @enum {string}
 */
class ViewSettingsDialogMode extends DataType {
	static isValid(value) {
		return !!ModeTypes[value];
	}
}

ViewSettingsDialogMode.generateTypeAccessors(ModeTypes);

export default ViewSettingsDialogMode;
