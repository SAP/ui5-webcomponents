import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Available Timeline layout orientation
 * @lends sap.ui.webcomponents.fiori.types.TimelineLayout.prototype
 * @public
 */
const Layout = {
	/**
	 * Vertical layout
	 * Default type
	 * @public
	 * @type {Vertical}
	 */
	Vertical: "Vertical",

	/**
	 * Horizontal layout
	 * @public
	 * @type {Horizontal}
	 */
	Horizontal: "Horizontal",
};

/**
 * @class
 * Different types of Timeline.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.types.TimelineLayout
 * @public
 * @enum {string}
 */
class TimeLineLayout extends DataType {
	static isValid(value) {
		return !!Layout[value];
	}
}

TimeLineLayout.generateTypeAccessors(Layout);

export default TimeLineLayout;
