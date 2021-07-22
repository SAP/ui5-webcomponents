import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.fiori.types.TimelineLayout.prototype
 * @public
 */
const AxistOrintation = {
	/**
	 * Default type
	 * @public
	 * @type {Header}
	 */
	Vertical: "Vertical",

	/**
	 * Subheader type
	 * @public
	 * @type {Subheader}
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
		return !!AxistOrintation[value];
	}
}

TimeLineLayout.generateTypeAccessors(AxistOrintation);

export default TimeLineLayout;
