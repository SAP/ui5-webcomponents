import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

/**
 * Different states.
 */
const TextAlignTypes = {
	/**
	 * Locale-specific positioning at the beginning of the line.
	 */
	Begin: "Begin",

	/**
	 * Locale-specific positioning at the end of the line.
	 */
	End: "End",

	/**
	 * Hard option for left alignment.
	 */
	Left: "Left",

	/**
	 * Hard option for right alignment.
	 */
	Right: "Right",

	/**
	 * Centered text alignment.
	 */
	Center: "Center",

	/**
	 * Sets no text align, so the browser default is used.
	 */
	Initial: "Initial",
};

class TextAlign extends DataType {
	static isValid(value) {
		return !!TextAlignTypes[value];
	}
}

TextAlign.generataTypeAcessors(TextAlignTypes);

export default TextAlign;
