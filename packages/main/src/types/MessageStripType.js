import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

/**
 * Different types of MessageStrip.
 */
const MessageStripTypes = {
	/**
	 * default type (no special styling)
	 */
	Information: "Information",

	/**
	 * accept type
	 */
	Positive: "Positive",

	/**
	 * reject style
	 */
	Negative: "Negative",

	/**
	 * warning type
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
