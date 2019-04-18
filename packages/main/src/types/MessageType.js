import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

/**
 * Different types of Message.
 */
const MessageTypes = {
	/**
	 * Message should be just an information
	 * @public
	 */
	Information: "Information",

	/**
	 * Message is a warning
	 * @public
	 */
	Warning: "Warning",

	/**
	 * Message is an error
	 * @public
	 */
	Error: "Error",

	/**
	 * Message has no specific level
	 * @public
	 */
	None: "None",

	/**
	 * Message is a success message
	 * @public
	 */
	Success: "Success",
};

class MessageType extends DataType {
	static isValid(value) {
		return !!MessageTypes[value];
	}
}

MessageType.generataTypeAcessors(MessageTypes);

export default MessageType;
