import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-wizard-step",
	properties: /** @lends sap.ui.webcomponents.fiori.WizardStep.prototype */ {
		/**
		 * Defines the <code>heading</code> of the step.
		 * <br><br>
		 *
		 * <b>Note:</b> the text is displayed in the <code>ui5-wizard</code> navigation header.
		 * <br>
		 * <b>Note:</b> the text will hide on small sizes (about 559 px).
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 */
		heading: {
			type: String,
		},

		/**
		 * Defines the <code>subheading</code> of the step.
		 * <br><br>
		 *
		 * <b>Note:</b> the text is displayed in the <code>ui5-wizard</code> navigation header.
		 * <br>
		 * <b>Note:</b> the text will hide on small sizes (about 559 px).
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 */
		subheading: {
			type: String,
		},

		/**
		 * Defines the <code>icon</code> of the step.
		 * <br><br>
		 *
		 * <b>Note:</b> the icon is displayed in the <code>ui5-wizard</code> navigation header.
		 * <br><br>
		 *
		 * The SAP-icons font provides numerous options.
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines if the step is <code>disabled</code>. When disabled the step is displayed,
		 * but the user can't select the step by clicking or navigate to it with scrolling.
		 * <br><br>
		 *
		 * <b>Note:</b> Step can't be <code>selected</code> and <code>disabled</code> at the same time.
		 * In this case the <code>selected</code> property would take precedence.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the step's <code>selected</code> state - the step that is currently active.
		 * <br><br>
		 *
		 * <b>Note:</b> Step can't be <code>selected</code> and <code>disabled</code> at the same time.
		 * In this case the <code>selected</code> property would take precedence.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * When <code>branching</code> is enabled a dashed line would be displayed after the step,
		 * meant to indicate that the next step is not yet known and depends on user choice in the current step.
		 * <br><br>
		 *
		 * <b>Note:</b> It is recommended to use <code>branching</code> on the last known step
		 * and later add new steps when it becomes clear how the wizard flow should continue.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		branching: {
			type: Boolean,
		},

		/**
		 * Defines the aria-label of the step.
		 * @type {boolean}
		 * @defaultvalue ""
		 * @private
		 */
		ariaLabel: {
			type: String,
		},

		/**
		 * Defines the aria-labelledby of the step.
		 * @type {boolean}
		 * @defaultvalue ""
		 * @private
		 */
		ariaLabelledby: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.WizardStep.prototype */ {
	},
	events: /** @lends sap.ui.webcomponents.fiori.WizardStep.prototype */ {
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * A component that represents a logical step as part of the <code>ui5-wizard</code>.
 * It is meant to aggregate arbitrary HTML elements that forms the content of a single step.
 *
 * <h3>Structure</h3>
 * <ul>
 * <li>Each wizard step has arbitrary content</li>
 * <li>Each wizard step might have texts - defined by the <code>heading</code> and <code>subheading</code> properties</li>
 * <li>Each wizard step might have an icon - defined by the <code>icon</code> property</li>
 * <li>Each wizard step might display a number in place of the <code>icon</code>, when it's missing</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * The <code>ui5-wizard-step</code> component should be used only as slot of the <code>ui5-wizard</code> component
 * and should not be used standalone.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.WizardStep
 * @extends UI5Element
 * @tagname ui5-wizard-step
 * @public
 */
class WizardStep extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

WizardStep.define();

export default WizardStep;
