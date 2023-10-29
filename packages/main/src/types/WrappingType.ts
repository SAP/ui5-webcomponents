/**
 * Different types of wrapping.
 *
 * @public
 */
enum WrappingType {
	/**
	 * The text will be truncated with an ellipsis.
	 * @public
	 * @type {None}
	 */
	None = "None",

	/**
	 * The text will wrap. The words will not be broken based on hyphenation.
	 * @public
	 * @type {Normal}
	 */
	Normal = "Normal",
}

export default WrappingType;
