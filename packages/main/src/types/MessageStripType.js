import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.MessageStripType.prototype
 * @public
 */
const MessageStripTypes = {
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
 * @alias sap.ui.webcomponents.main.types.MessageStripType
 * @public
 * @enum {string}
 */
class MessageStripType extends DataType {
	static isValid(value) {
		return !!MessageStripTypes[value];
	}
}

MessageStripType.generateTypeAccessors(MessageStripTypes);

export default MessageStripType;
