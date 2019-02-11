import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

const TextDirections = {
	/**
	 * Specifies left-to-right text direction.
	 * @public
	 */
	LTR: "LTR",

	/**
	 * Specifies right-to-left text direction.
	 * @public
	 */
	RTL: "RTL",

	/**
	 * Inherits the direction from its parent control/container.
	 * @public
	 */
	Inherit: "Inherit",
};

class TextDirection extends DataType {
	static isValid(value) {
		return !!TextDirections[value];
	}
}

TextDirection.generataTypeAcessors(TextDirections);

export default TextDirection;
