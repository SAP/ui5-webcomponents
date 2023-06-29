/**
 * Enumeration for different content layouts of the <code>ui5-wizard</code>.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.WizardContentLayout
 */
enum WizardContentLayout {
	/**
      * Display the content of the <code>ui5-wizard</code> as multiple steps in a scroll section.
	 * @public
	 * @type {MultipleSteps}
     */
    MultipleSteps = "MultipleSteps",

	/**
      * Display the content of the <code>ui5-wizard</code> as single step.
	 * @public
	 * @type {SingleStep}
     */
     SingleStep = "SingleStep",
}

export default WizardContentLayout;
