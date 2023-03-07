/**
 * MessageStrip designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.MessageStripDesign
 */
enum MessageStripDesign {
	/**
	 * Message should be just an information
	 * @public
	 * @type {Information}
	 */
	Information = "Information",

	/**
	 * Message is a success message
	 * @public
	 * @type {Positive}
	 */
	Positive = "Positive",

	/**
	 * Message is an error
	 * @public
	 * @type {Negative}
	 */
	Negative = "Negative",

	/**
	 * Message is a warning
	 * @public
	 * @type {Warning}
	 */
	Warning = "Warning",
}

export default MessageStripDesign;
