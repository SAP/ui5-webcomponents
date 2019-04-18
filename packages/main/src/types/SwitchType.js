import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

/**
 * Different types of Switch.
 */
const SwitchTypes = {
	/**
	 * The Textual type includes the default styling and user provided texts.
	 */
	Textual: "Textual",

	/**
	 * The Graphical type - positive/negative icons and colors are displayed.
	 */
	Graphical: "Graphical",
};

class SwitchType extends DataType {
	static isValid(value) {
		return !!SwitchTypes[value];
	}
}

SwitchType.generataTypeAcessors(SwitchTypes);

export default SwitchType;
