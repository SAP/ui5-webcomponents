/**
 * Tab layout of TabContainer.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.TabLayout
 */
enum TabLayout {
	/**
	 * Inline type, the tab "main text" and "additionalText" are displayed horizotally.
	 * @public
	 * @type {Inline}
	 */
	Inline = "Inline",

	/**
	 * Standard type, the tab "main text" and "additionalText" are displayed vertically.
	 * @public
	 * @type {Standard}
	 */
	Standard = "Standard",
}

export default TabLayout;
