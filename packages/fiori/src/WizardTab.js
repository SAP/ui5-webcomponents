import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";

import Icon from "@ui5/webcomponents/dist/Icon.js";
import WizardTabTemplate from "./generated/templates/WizardTabTemplate.lit.js";
import WizardTabCss from "./generated/themes/WizardTab.css.js";

const metadata = {
	tag: "ui5-wizard-tab",
	properties: /** @lends sap.ui.webc.fiori.WizardTab.prototype */ {
		/**
		 * Defines the <code>icon</code> of the step.
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the <code>titleText</code> of the step.
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.15
		 */
		titleText: {
			type: String,
		},

		/**
		 * Defines the <code>subtitleText</code> of the step.
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.15
		 */
		subtitleText: {
			type: String,
		},

		/**
		 * Defines the number that will be displayed in place of the <code>icon</code>, when it's missing.
		 * @type {string}
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
		 * Defines the tabindex of the step.
		 * @type {string}
		 * @defaultvalue -1
		 * @private
		 */
		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},

		_wizardTabAccInfo: {
			type: Object,
		},
	},
	slots: /** @lends sap.ui.webc.fiori.WizardTab.prototype */ {
	},
	events: /** @lends sap.ui.webc.fiori.WizardTab.prototype */ {
		/**
		 * Fired when clicking on none disabled step.
		 *
		 * @event sap.ui.webc.fiori.WizardTab#selection-change-requested
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
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/WizardTab.js";</code> (imported with <ui5-wizard>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.WizardTab
 * @extends sap.ui.webc.base.UI5Element
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

	_onkeyup(event) {
		if (this.disabled) {
			return;
		}

		if ((isSpace(event) || isEnter(event)) && !isSpaceShift(event)) {
			event.preventDefault();
			this.fireEvent("selection-change-requested");
		}
	}

	_onfocusin() {
		this.fireEvent("focused");
	}

	get tabIndex() {
		return this._tabIndex;
	}

	get hasTexts() {
		return this.titleText || this.subtitleText;
	}

	get accInfo() {
		return {
			"ariaSetsize": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaSetsize,
			"ariaPosinset": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaPosinset,
			"ariaLabel": this._wizardTabAccInfo && this._wizardTabAccInfo.ariaLabel,
			"ariaCurrent": this.selected ? "true" : undefined,
			"ariaDisabled": this.disabled ? "true" : undefined,
		};
	}
}

WizardTab.define();

export default WizardTab;
