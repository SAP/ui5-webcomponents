import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

/**
 * Different types of Switch.
 */
const SwitchTypes = {
	/**
	 * The Textual type includes the default styling and user provided texts.
	 */
	Standard: "Textual",

	/**
	 * The Graphic type - positive/negative icons and colors are displayed.
	 */
	Semantic: "Graphic",
};

class SwitchType extends DataType {
	static isValid(value) {
		return !!SwitchTypes[value];
	}
}

SwitchType.generataTypeAcessors(SwitchTypes);

export default SwitchType;
