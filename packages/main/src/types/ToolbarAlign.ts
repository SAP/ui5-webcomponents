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
	 * Toolbar items are situated at the <code>start</code> of the Toolbar
	 */
	Start = "Start",

	/**
	 * @public
	 * Toolbar items are situated at the <code>end</code> of the Toolbar
	 */
	End = "End",

	/**
	 * @public
	 * Toolbar items are separated by equal amount of space inside the Toolbar
	 */
	SpaceBetween = "SpaceBetween",
}

export default ToolbarAlign;
