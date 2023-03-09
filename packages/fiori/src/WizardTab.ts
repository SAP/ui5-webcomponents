import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter, isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import WizardTabTemplate from "./generated/templates/WizardTabTemplate.lit.js";
import WizardTabCss from "./generated/themes/WizardTab.css.js";

type WizardTabInfo = {
	[key: string]: string,
}

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

@customElement({
	tag: "ui5-wizard-tab",
	renderer: litRender,
	styles: WizardTabCss,
	template: WizardTabTemplate,
	dependencies: [Icon],
})

/**
 * Fired when clicking on none disabled step.
 *
 * @event sap.ui.webc.fiori.WizardTab#selection-change-requested
 * @private
 */
@event("selection-change-requested")

class WizardTab extends UI5Element implements ITabbable {
	/**
	 * Defines the <code>icon</code> of the step.
	 * @type {string}
	 * @defaultvalue ""
	 * @private
	 */
	@property()
	icon!: string

	/**
	 * Defines the <code>titleText</code> of the step.
	 * @type {string}
	 * @defaultvalue ""
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property()
	titleText!: string

	/**
	 * Defines the <code>subtitleText</code> of the step.
	 * @type {string}
	 * @defaultvalue ""
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property()
	subtitleText!: string

	/**
	 * Defines the number that will be displayed in place of the <code>icon</code>, when it's missing.
	 * @type {string}
	 * @defaultvalue ""
	 * @private
	 */
	@property()
	number!: string

	/**
	 * Defines if the step is <code>disabled</code> - the step is not responding to user interaction.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	 @property({ type: Boolean })
	 disabled!: boolean

	/**
	 * Defines if the step is <selected>selected</code>.
	 * <br><br>
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	selected!: boolean

	/**
	 * Defines if the step's separator is hidden or not.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	hideSeparator!: boolean

	/**
	 * Defines if the step's separator is active or not.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	activeSeparator!: boolean

	/**
	 * Defines if the step's separator is dashed or not.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	branchingSeparator!: boolean

	/**
	 * Defines the tabindex of the step.
	 * @type {string}
	 * @defaultvalue "-1"
	 * @private
	 */
	@property({ defaultValue: "-1" })
	_tabIndex!: string

	_wizardTabAccInfo? : WizardTabInfo

	_onclick() {
		if (!this.disabled) {
			this.fireEvent("selection-change-requested");
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (this.disabled) {
			return;
		}

		if ((isSpace(e) || isEnter(e)) && !isSpaceShift(e)) {
			e.preventDefault();
			this.fireEvent("selection-change-requested");
		}
	}

	_onfocusin() {
		this.fireEvent("focused");
	}

	get tabIndex() {
		return Number(this._tabIndex);
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
