/**
 * Different types of wrapping.
 * @public
 */
enum WrappingType {
	/**
	 * The text will be truncated with an ellipsis.
	 * @public
	 */
	None = "None",

	/**
	 * The text will wrap. The words will not be broken based on hyphenation.
	 * @public
	 */
	Normal = "Normal",
}

export default WrappingType;
