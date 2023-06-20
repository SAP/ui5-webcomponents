/**
* Defines which direction the items of ui5-toolbar will be aligned.
 *
 * @readonly
 * @enum {string}
 * @public
 * @type {string}
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ToolbarAlign
 */
enum ToolbarAlign {
	/**
	 * @public
	 * @type {Start}
	 * Toolbar items are situated at the <code>start</code> of the Toolbar
	 */
	Start = "Start",

	/**
	 * @public
	 * @type {End}
	 * Toolbar items are situated at the <code>end</code> of the Toolbar
	 */
	End = "End",
}

export default ToolbarAlign;
