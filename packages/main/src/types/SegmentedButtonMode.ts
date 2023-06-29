/**
 * Different SegmentedButton modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.SegmentedButtonMode
 */
enum SegmentedButtonMode {
	/**
	 * There is always one selected. Selecting one deselects the previous one.
	 * @public
	 * @type {SingleSelect}
	 */
	SingleSelect = "SingleSelect",

	/**
	 * Multiple items can be selected at a time. All items can be deselected.
	 * @public
	 * @type {MultiSelect}
	 */
	MultiSelect = "MultiSelect",
}

export default SegmentedButtonMode;
