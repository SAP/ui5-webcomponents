import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.GrowingMode.prototype
 * @public
 */
const GrowingModes = {
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
 * Defines the growing mode of the component.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.GrowingMode
 * @public
 * @enum {string}
 */
class GrowingMode extends DataType {
	static isValid(value) {
		return !!GrowingModes[value];
	}
}

GrowingMode.generateTypeAccessors(GrowingModes);

export default GrowingMode;
