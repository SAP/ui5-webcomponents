import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.MessageStripDesign.prototype
 * @public
 */
const MessageStripDesigns = {
	/**
	 * Message should be just an information
	 * @public
	 * @type {Information}
	 */
	Information: "Information",

	/**
	 * Message is a success message
	 * @public
	 * @type {Positive}
	 */
	Positive: "Positive",

	/**
	 * Message is an error
	 * @public
	 * @type {Negative}
	 */
	Negative: "Negative",

	/**
	 * Message is a warning
	 * @public
	 * @type {Warning}
	 */
	Warning: "Warning",
};

/**
 * @class
 * Defines different types of MessageStrip.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.MessageStripDesign
 * @public
 * @enum {string}
 */
class MessageStripDesign extends DataType {
	static isValid(value) {
		return !!MessageStripDesigns[value];
	}
}

MessageStripDesign.generateTypeAccessors(MessageStripDesigns);

export default MessageStripDesign;
