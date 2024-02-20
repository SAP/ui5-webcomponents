import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/less.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type FormSupport from "./features/InputElementsFormSupport.js";
import type { IFormElement, NativeFormElement } from "./features/InputElementsFormSupport.js";
import Icon from "./Icon.js";
import SwitchDesign from "./types/SwitchDesign.js";

// Template
import SwitchTemplate from "./generated/templates/SwitchTemplate.lit.js";

// Styles
import switchCss from "./generated/themes/Switch.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-switch</code> component is used for changing between binary states.
 * <br>
 * The component can display texts, that will be switched, based on the component state, via the <code>textOn</code> and <code>textOff</code> properties,
 * but texts longer than 3 letters will be cutted off.
 * <br>
 * However, users are able to customize the width of <code>ui5-switch</code> with pure CSS (<code>&lt;ui5-switch style="width: 200px"></code>), and set widths, depending on the texts they would use.
 * <br>
 * Note: the component would not automatically stretch to fit the whole text width.
 *
 * <h3>Keyboard Handling</h3>
 * The state can be changed by pressing the Space and Enter keys.
 * <br /><br />
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Switch";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 * @csspart slider - Used to style the track, where the handle is being slid
 * @csspart text-on - Used to style the <code>textOn</code> property text
 * @csspart text-off - Used to style the <code>textOff</code> property text
 * @csspart handle - Used to style the handle of the switch
 */
@customElement({
	tag: "ui5-switch",
	languageAware: true,
	styles: switchCss,
	renderer: litRender,
	template: SwitchTemplate,
	dependencies: [Icon],
})
/**
 * Fired when the component checked state changes.
 *
 * @public
 * @allowPreventDefault
 */
@event("change")
class Switch extends UI5Element implements IFormElement {
	/**
	 * Defines the component design.
	 * <br><br>
	 * <b>Note:</b> If <code>Graphical</code> type is set,
	 * positive and negative icons will replace the <code>textOn</code> and <code>textOff</code>.
	 *
	 * @public
	 * @default "Textual"
	 */
	@property({ type: SwitchDesign, defaultValue: SwitchDesign.Textual })
	design!: `${SwitchDesign}`;

	/**
	 * Defines if the component is checked.
	 * <br><br>
	 * <b>Note:</b> The property can be changed with user interaction,
	 * either by cliking the component, or by pressing the <code>Enter</code> or <code>Space</code> key.
	 * @default false
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property({ type: Boolean })
	checked!: boolean;

	/**
	 * Defines whether the component is disabled.
	 * <br><br>
	 * <b>Note:</b> A disabled component is noninteractive.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean

	/**
	 * Defines the text, displayed when the component is checked.
	 *
	 * <br><br>
	 * <b>Note:</b> We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 *
	 * @default ""
	 * @public
	 */
	@property()
	textOn!: string

	/**
	 * Defines the text, displayed when the component is not checked.
	 * <br><br>
	 * <b>Note:</b> We recommend using short texts, up to 3 letters (larger texts would be cut off).
	 *
	 * @default ""
	 * @public
	 */
	@property()
	textOff!: string

	/**
	 * Sets the accessible ARIA name of the component.
	 *
	 * <b>Note</b>: We recommend that you set an accessibleNameRef pointing to an external label or at least an <code>accessibleName</code>.
	 * Providing an <code>accessibleNameRef</code> or an <code>accessibleName</code> is mandatory in the cases when <code>textOn</code> and <code>textOff</code> properties aren't set.
	 * @default ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * <b>Note</b>: We recommend that you set an accessibleNameRef pointing to an external label or at least an <code>accessibleName</code>.
	 * Providing an <code>accessibleNameRef</code> or an <code>accessibleName</code> is mandatory in the cases when <code>textOn</code> and <code>textOff</code> properties aren't set.
	 * @default ""
	 * @public
	 * @since 1.1.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Defines the tooltip of the component.
	 * <br>
	 * <b>Note:</b> If applicable an external label reference should always be the preferred option to provide context to the <code>ui5-switch</code> component over a tooltip.
	 * @default ""
	 * @public
	 * @since 1.9.0
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines whether the component is required.
	 *
	 * @default false
	 * @public
	 * @since 1.16.0
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	 * Determines the name with which the component will be submitted in an HTML form.
	 *
	 * <br><br>
	 * <b>Important:</b> For the <code>name</code> property to have effect, you must add the following import to your project:
	 * <code>import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";</code>
	 *
	 * <br><br>
	 * <b>Note:</b> When set, a native <code>input</code> HTML element
	 * will be created inside the component so that it can be submitted as
	 * part of an HTML form. Do not use this property unless you need to submit a form.
	 *
	 * @default ""
	 * @public
	 * @since 1.16.0
	 */
	@property()
	name!: string;

	/**
	 * The slot is used to render native <code>input</code> HTML element within Light DOM to enable form submit, when <code>Switch</code> is a part of HTML form.
	 *
	 * @private
	 * @since 1.16.0
	 */
	@slot()
	formSupport!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;

	onBeforeRendering() {
		this._enableFormSupport();
	}

	_enableFormSupport() {
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (formSupport) {
			formSupport.syncNativeHiddenInput(this, (element: IFormElement, nativeInput: NativeFormElement) => {
				const switchComponent = (element as Switch);
				(nativeInput as HTMLInputElement).checked = !!switchComponent.checked;
				nativeInput.disabled = !!switchComponent.disabled;
				nativeInput.value = switchComponent.checked ? "on" : "";
			});
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
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
				"ui5-switch-desktop": isDesktop(),
				"ui5-switch--disabled": this.disabled,
				"ui5-switch--checked": this.checked,
				"ui5-switch--semantic": this.graphical,
				"ui5-switch--no-label": !hasLabel,
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
