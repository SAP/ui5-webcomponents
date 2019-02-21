import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

/**
 * Different types of Switch.
 */
const SwitchTypes = {
	/**
	 * the default type and styling
	 */
	Standard: "Standard",

	/**
	 * semantic type (positive and negative colors are applied)
	 */
	Semantic: "Semantic",
};

class SwitchType extends DataType {
	static isValid(value) {
		return !!SwitchTypes[value];
	}
}

SwitchType.generataTypeAcessors(SwitchTypes);

export default SwitchType;
