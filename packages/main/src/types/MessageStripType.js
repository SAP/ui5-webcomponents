import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Defines different types of MessageStrip.
 * @public
 */
const MessageStripTypes = {
	/**
	 * Message should be just an information
	 * @public
	 */
	Information: "Information",

	/**
	 * Message is a success message
	 * @public
	 */
	Positive: "Positive",

	/**
	 * Message is an error
	 * @public
	 */
	Negative: "Negative",

	/**
	 * Message is a warning
	 * @public
	 */
	Warning: "Warning",
};

class MessageStripType extends DataType {
	static isValid(value) {
		return !!MessageStripTypes[value];
	}
}

MessageStripType.generataTypeAcessors(MessageStripTypes);

export default MessageStripType;
