import DataType from "./DataType.js";

/**
 * Enumeration for different mode behaviors of the <code>InvisibleMessage</code>.
 * @lends sap.ui.webcomponents.base.types.InvisibleMessageMode.prototype
 * @public
 */
enum InvisibleMessageModes {

	/**
     * Indicates that updates to the region should be presented at the next graceful opportunity,
     * such as at the end of reading the current sentence, or when the user pauses typing.
	 * @public
	 * @type {Polite}
     */
	Polite= "Polite",

	/**
     * Indicates that updates to the region have the highest priority and should be presented to the user immediately.
	 * @public
	 * @type {Assertive}
     */
	Assertive= "Assertive",

};

/**
 * @class
 * Different types of InvisibleMessageMode.
 *
 * @extends sap.ui.webcomponents.base.types.DataType
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.base.types.InvisibleMessageMode
 * @public
 * @enum {string}
 */
class InvisibleMessageMode extends DataType {
	static override isValid(value: InvisibleMessageModes) {
		return !!InvisibleMessageModes[value];
	}
}

InvisibleMessageMode.generateTypeAccessors(InvisibleMessageModes);

export default InvisibleMessageModes;
