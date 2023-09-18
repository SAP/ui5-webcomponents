/**
 * Different filtering types of the ComboBox.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ComboBoxFilter
 */
 enum ComboBoxFilter {
	/**
	 * Defines filtering by first symbol of each word of item's text.
	 * @public
	 * @type {StartsWithPerTerm}
	 */
	StartsWithPerTerm = "StartsWithPerTerm",

	/**
	 * Defines filtering by starting symbol of item's text.
	 * @public
	 * @type {StartsWith}
	 */
	StartsWith = "StartsWith",

	/**
	 * Defines contains filtering.
	 * @public
	 * @type {Contains}
	 */
	Contains = "Contains",

	/**
	 * Removes any filtering applied while typing
	 * @public
	 * @type {None}
	 */
	None = "None",
}

export default ComboBoxFilter;
