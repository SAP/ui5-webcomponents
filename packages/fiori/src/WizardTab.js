import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";

import WizardTabTemplate from "./generated/templates/WizardTabTemplate.lit.js";
import WizardTabCss from "./generated/themes/WizardTab.css.js";

const metadata = {
	tag: "ui5-wizard-tab",
	properties: /** @lends sap.ui.webcomponents.fiori.WizardTab.prototype */ {
		/**
		 * Defines the <code>icon</code> of the step.
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the <code>heading</code> of the step.
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 */
		heading: {
			type: String,
		},

		/**
		 * Defines the <code>subheading</code> of the step.
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 */
		subheading: {
			type: String,
		},

		/**
		 * Defines the number that will be displayed in place of the <code>icon</code>, when it's missing.
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 */
		number: {
			type: String,
		},

		/**
		 * Defines if the step is <code>disabled</code> - the step is not responding to user interaction.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines if the step is <selected>selected</code>.
		 * <br><br>
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines if the step's separator is hidden or not.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		hideSeparator: {
			type: Boolean,
		},

		/**
		 * Defines if the step's separator is active or not.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		activeSeparator: {
			type: Boolean,
		},

		/**
		 * Defines if the step's separator is dashed or not.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		branchingSeparator: {
			type: Boolean,
		},

		/**
		 * Defines the role of the step.
		 * @type {boolean}
		 * @defaultvalue listitem
		 * @private
		 */
		role: {
			type: String,
			defaultValue: "listitem",
		},

		/**
		 * Defines the aria-roledescription of the step.
		 * @type {boolean}
		 * @defaultvalue ""
		 * @private
		 */
		ariaRoledescription: {
			type: String,
		},

		/**
		 * Defines the aria-label of the step.
		 * @type {boolean}
		 * @defaultvalue undefined
		 * @private
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines the aria-labelledby of the step.
		 * @type {boolean}
		 * @defaultvalue undefined
		 * @private
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines the aria-setsize of the step.
		 * @type {boolean}
		 * @defaultvalue undefined
		 * @private
		 */
		ariaSetsize: {
			type: Integer,
		},

		/**
		 * Defines the aria-posinset of the step.
		 * @type {boolean}
		 * @defaultvalue undefined
		 * @private
		 */
		ariaPosinset: {
			type: Integer,
		},

		/**
		 * Defines the tabindex of the step.
		 * @type {String}
		 * @defaultvalue -1
		 * @private
		 */
		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.WizardTab.prototype */ {
	},
	events: /** @lends sap.ui.webcomponents.fiori.WizardTab.prototype */ {
		/**
		 * Fired when clicking on none disabled step.
		 *
		 * @event sap.ui.webcomponents.fiori.WizardTab#selection-change-requested
		 * @private
		 */
		"selection-change-requested": {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * Private component, used internally by the <code>ui5-wizard</code>
 * to represent a "step" in the navigation header of the <code>ui5-wizard</code>.
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-wizard-tap</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/WizardTab.js";</code> (imported with <ui5-wizard>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.WizardTab
 * @extends UI5Element
 * @tagname ui5-wizard-tab
 * @private
 */
class WizardTab extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return WizardTabCss;
	}

	static get template() {
		return WizardTabTemplate;
	}

	static get dependencies() {
		return [Icon];
	}

	_onclick() {
		if (!this.disabled) {
			this.fireEvent("selection-change-requested");
		}
	}

	_onkeydown(event) {
		if (this.disabled) {
			return;
		}

		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this.fireEvent("selection-change-requested");
		}
	}

	_onkeyup(event) {
		if (this.disabled) {
			return;
		}

		if (isSpace(event)) {
			this.fireEvent("selection-change-requested");
		}
	}

	_onfocusin() {
		if (this.disabled) {
			return;
		}

		this.fireEvent("focused");
	}

	get tabIndex() {
		return this.disabled ? undefined : this._tabIndex;
	}

	get ariaCurrent() {
		return this.selected ? "step" : undefined;
	}

	get ariaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get hasTexts() {
		return this.heading || this.subheading;
	}
}

WizardTab.define();

export default WizardTab;
