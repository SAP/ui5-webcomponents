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

	/**
	* Message is a warning
	* @public
	* @type {Custom}
	*/
   ColorSet1 = "ColorSet1",

	/**
	* Message is a warning
	* @public
	* @type {Custom}
	*/
	ColorSet2 = "ColorSet2",
}

export default MessageStripDesign;
