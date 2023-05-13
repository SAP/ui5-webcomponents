/**
 * Enumeration for different render mode behaviors of the <code>ui5-wizard</code>.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.WizardRenderMode
 */
enum WizardRenderMode {
	/**
     * Display all steps into a scroll section.
	 * @public
	 * @type {Scroll}
     */
    Scroll = "Scroll",

	/**
     * Display steps as separate, single pages.
	 * @public
	 * @type {Page}
     */
     Page = "Page",
}

export default WizardRenderMode;
