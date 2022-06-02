import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.SwitchDesign.prototype
 * @public
 */
const SwitchDesigns = {
	/**
	 * Defines the Switch as Textual
	 * @public
	 * @type {Textual}
	 */
	Textual: "Textual",

	/**
	 * Defines the Switch as Graphical
	 * @public
	 * @type {Graphical}
	 */
	Graphical: "Graphical",
};

/**
 * @class
 * Defines input types
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.SwitchDesign
 * @public
 * @enum {string}
 */
class SwitchDesign extends DataType {
	static isValid(value) {
		return !!SwitchDesigns[value];
	}
}

SwitchDesign.generateTypeAccessors(SwitchDesigns);

export default SwitchDesign;
