/**
 * Different Icon semantic designs.
*
* @readonly
* @enum {string}
* @public
* @author SAP SE
* @alias sap.ui.webc.main.types.IconDesign
*/
enum IconDesign {
	/**
	 * Contrast design
	 * @public
	 * @type {Contrast}
	 */
	Contrast = "Contrast",

	/**
	 * Critical design
	 * @public
	 * @type {Critical}
	 */
	Critical = "Critical",

	/**
	 * Default design (brand design)
	 * @public
	 * @type {Default}
	*/
	Default = "Default",

	/**
	 * info type
	 * @public
	 * @type {Information}
	 */
	Information = "Information",

	/**
	 * Negative design
	 * @public
	 * @type {Negative}
	 */
	Negative = "Negative",

	/**
	 * Neutral design
	 * @public
	 * @type {Neutral}
	 */
	Neutral = "Neutral",

	/**
	 * Design that indicates an icon which isn't interactive
	 * @public
	 * @type {NonInteractive}
	 */
	NonInteractive = "NonInteractive",

	/**
	 * Positive design
	 * @public
	 * @type {Positive}
	 */
	Positive = "Positive"
}

export default IconDesign;
