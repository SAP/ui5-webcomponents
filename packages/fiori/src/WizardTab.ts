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
 * ### Overview
 * Private component, used internally by the `ui5-wizard`
 * to represent a "step" in the navigation header of the `ui5-wizard`.
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WizardTab.js";` (imported with <ui5-wizard>)
 * @constructor
 * @extends UI5Element
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
 * @private
 */
@event("selection-change-requested")

class WizardTab extends UI5Element implements ITabbable {
	/**
	 * Defines the `icon` of the step.
	 * @default ""
	 * @private
	 */
	@property()
	icon!: string

	/**
	 * Defines the `titleText` of the step.
	 * @default ""
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property()
	titleText!: string

	/**
	 * Defines the `subtitleText` of the step.
	 * @default ""
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property()
	subtitleText!: string

	/**
	 * Defines the number that will be displayed in place of the `icon`, when it's missing.
	 * @default ""
	 * @private
	 */
	@property()
	number!: string

	/**
	 * Defines if the step is `disabled` - the step is not responding to user interaction.
	 * @default false
	 * @private
	 */
	 @property({ type: Boolean })
	 disabled!: boolean

	/**
	 * Defines if the step is `selected`.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	selected!: boolean

	/**
	 * Defines if the step's separator is hidden or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	hideSeparator!: boolean

	/**
	 * Defines if the step's separator is active or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	activeSeparator!: boolean

	/**
	 * Defines if the step's separator is dashed or not.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	branchingSeparator!: boolean

	/**
	 * Defines the tabindex of the step.
	 * @default "-1"
	 * @private
	 */
	@property({ defaultValue: "-1" })
	forcedTabIndex!: string

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

	get hasTexts() {
		return this.titleText || this.subtitleText;
	}

	get effectiveTabIndex() {
		if (this.disabled) {
			return;
		}

		if (this.selected || this.forcedTabIndex === "0") {
			return "0";
		}

		return "-1";
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
