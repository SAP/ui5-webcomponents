import DataType from "./DataType.js";

/**
 * Enumeration for different mode behaviors of the <code>InvisibleMessage</code>.
 * @private
 */
const InvisibleMessageModes = {

	/**
     * Indicates that updates to the region should be presented at the next graceful opportunity,
     * such as at the end of reading the current sentence, or when the user pauses typing.
     */
	Polite: "Polite",

	/**
     * Indicates that updates to the region have the highest priority and should be presented to the user immediately.
     */
	Assertive: "Assertive",

};

class InvisibleMessageMode extends DataType {
	static isValid(value) {
		return !!InvisibleMessageModes[value];
	}
}

InvisibleMessageMode.generateTypeAccessors(InvisibleMessageModes);

export default InvisibleMessageModes;
