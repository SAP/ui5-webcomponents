import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/less.js";
import Icon from "./Icon.js";
import SwitchDesign from "./types/SwitchDesign.js";
import { FORM_CHECKABLE_REQUIRED } from "./generated/i18n/i18n-defaults.js";

// Template
import SwitchTemplate from "./generated/templates/SwitchTemplate.lit.js";

// Styles
import switchCss from "./generated/themes/Switch.css.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-switch` component is used for changing between binary states.
 *
 * The component can display texts, that will be switched, based on the component state, via the `textOn` and `textOff` properties,
 * but texts longer than 3 letters will be cutted off.
 *
 * However, users are able to customize the width of `ui5-switch` with pure CSS (`<ui5-switch style="width: 200px">`), and set widths, depending on the texts they would use.
 *
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * ### Keyboard Handling
 * The state can be changed by pressing the Space and Enter keys.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Switch";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 * @csspart slider - Used to style the track, where the handle is being slid
 * @csspart text-on - Used to style the `textOn` property text
 * @csspart text-off - Used to style the `textOff` property text
 * @csspart handle - Used to style the handle of the switch
 */
@customElement({
	tag: "ui5-switch",
	formAssociated: true,
	languageAware: true,
	styles: switchCss,
	renderer: litRender,
	template: SwitchTemplate,
	dependencies: [Icon],
})
/**
 * Fired when the component checked state changes.
 * @public
 * @allowPreventDefault
 */
@event("change")
class Switch extends UI5Element implements IFormInputElement {
	/**
	 * Defines the component design.
	 *
	 * **Note:** If `Graphical` type is set,
	 * positive and negative icons will replace the `textOn` and `textOff`.
	 * @public
	 * @default "Textual"
	 */
	@property({ type: SwitchDesign, defaultValue: SwitchDesign.Textual })
	design!: `${SwitchDesign}`;

	/**
	 * Defines if the component is checked.
	 *
	 * **Note:** The property can be changed with user interaction,
	 * either by cliking the component, or by pressing the `Enter` or `Space` key.
	 * @default false
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property({ type: Boolean, formValue: true })
	checked!: boolean;

	/**
	 * Defines whether the component is disabled.
	 *
	 * **Note:** A disabled component is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean

	/**
	 * Defines the text, displayed when the component is checked.
	 *
	 * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 * @default ""
	 * @public
	 */
	@property()
	textOn!: string

	/**
	 * Defines the text, displayed when the component is not checked.
	 *
	 * **Note:** We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 * @default ""
	 * @public
	 */
	@property()
	textOff!: string

	/**
	 * Sets the accessible ARIA name of the component.
	 *
	 * **Note**: We recommend that you set an accessibleNameRef pointing to an external label or at least an `accessibleName`.
	 * Providing an `accessibleNameRef` or an `accessibleName` is mandatory in the cases when `textOn` and `textOff` properties aren't set.
	 * @default ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * **Note**: We recommend that you set an accessibleNameRef pointing to an external label or at least an `accessibleName`.
	 * Providing an `accessibleNameRef` or an `accessibleName` is mandatory in the cases when `textOn` and `textOff` properties aren't set.
	 * @default ""
	 * @public
	 * @since 1.1.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** If applicable an external label reference should always be the preferred option to provide context to the `ui5-switch` component over a tooltip.
	 * @default ""
	 * @public
	 * @since 1.9.0
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.16.0
	 */
	@property({ type: Boolean, formValue: true })
	required!: boolean;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default ""
	 * @public
	 * @since 1.16.0
	 */
	@property()
	name!: string;

	static i18nBundle: I18nBundle;

	get formValidityMessage() {
		return Switch.i18nBundle.getText(FORM_CHECKABLE_REQUIRED);
	}

	get formValidity(): ValidityStateFlags {
		return { valueMissing: this.required && !this.checked };
	}

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	get formFormattedValue() {
		return this.checked ? "on" : null;
	}

	get sapNextIcon() {
		return this.checked ? "accept" : "less";
	}

	_onclick() {
		this.toggle();
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._onclick();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onclick();
		}
	}

	toggle() {
		if (!this.disabled) {
			this.checked = !this.checked;
			const changePrevented = !this.fireEvent("change", null, true);
			// Angular two way data binding;
			const valueChangePrevented = !this.fireEvent("value-changed", null, true);

			if (changePrevented || valueChangePrevented) {
				this.checked = !this.checked;
			}
		}
	}

	get graphical() {
		return this.design === SwitchDesign.Graphical;
	}

	get hasNoLabel() {
		return !(this.graphical || this.textOn || this.textOff);
	}

	get _textOn() {
		return this.graphical ? "" : this.textOn;
	}

	get _textOff() {
		return this.graphical ? "" : this.textOff;
	}

	get effectiveTabIndex() {
		return this.disabled ? undefined : "0";
	}

	get classes(): ClassMap {
		const hasLabel = this.graphical || this.textOn || this.textOff;

		return {
			main: {
				"ui5-switch--desktop": isDesktop(),
				"ui5-switch--disabled": this.disabled,
				"ui5-switch--checked": this.checked,
				"ui5-switch--semantic": this.graphical,
				"ui5-switch--no-label": !hasLabel,
				"ui5-switch--safari": isSafari(),
			},
		};
	}

	get effectiveAriaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get accessibilityOnText() {
		return this._textOn;
	}

	get accessibilityOffText() {
		return this._textOff;
	}

	get hiddenText() {
		return this.checked ? this.accessibilityOnText : this.accessibilityOffText;
	}

	get ariaLabelText() {
		return [getEffectiveAriaLabelText(this), this.hiddenText].join(" ").trim();
	}

	static async onDefine() {
		Switch.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Switch.define();

export default Switch;
