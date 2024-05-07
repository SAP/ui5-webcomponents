import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/complete.js";
import "@ui5/webcomponents-icons/dist/border.js";
import "@ui5/webcomponents-icons/dist/tri-state.js";
import Icon from "./Icon.js";
import Label from "./Label.js";
import WrappingType from "./types/WrappingType.js";
import {
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_SUCCESS,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import checkboxCss from "./generated/themes/CheckBox.css.js";
import type FormSupport from "./features/InputElementsFormSupport.js";
import type { IFormElement, NativeFormElement } from "./features/InputElementsFormSupport.js";

// Template
import CheckBoxTemplate from "./generated/templates/CheckBoxTemplate.lit.js";

let isGlobalHandlerAttached = false;
let activeCb: CheckBox;

/**
 * @class
 *
 * ### Overview
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 *
 * The `ui5-checkbox` component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the `ui5-checkbox`, the user has to click or tap the square
 * box or its label.
 *
 * The `ui5-checkbox` component only has 2 states - checked and unchecked.
 * Clicking or tapping toggles the `ui5-checkbox` between checked and unchecked state.
 *
 * ### Usage
 *
 * You can define the checkbox text with via the `text` property. If the text exceeds the available width, it is truncated by default.
 * In case you prefer text to wrap, set the `wrappingType` property to "Normal".
 * The touchable area for toggling the `ui5-checkbox` ends where the text ends.
 *
 * You can disable the `ui5-checkbox` by setting the `disabled` property to
 * `true`,
 * or use the `ui5-checkbox` in read-only mode by setting the `readonly`
 * property to `true`.
 *
 * ### Keyboard Handling
 *
 * The user can use the following keyboard shortcuts to toggle the checked state of the `ui5-checkbox`.
 *
 * - [Space],[Enter] - Toggles between different states: checked, not checked.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CheckBox.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart root - Used to style the outermost wrapper of the `ui5-checkbox`
 * @csspart label - Used to style the label of the `ui5-checkbox`
 * @csspart icon - Used to style the icon of the `ui5-checkbox`
 */
@customElement({
	tag: "ui5-checkbox",
	languageAware: true,
	renderer: litRender,
	template: CheckBoxTemplate,
	styles: checkboxCss,
	dependencies: [
		Label,
		Icon,
	],
})
/**
 * Fired when the component checked state changes.
 * @public
 * @allowPreventDefault
 */
@event("change")

class CheckBox extends UI5Element implements IFormElement {
	/**
	 * Receives id(or many ids) of the elements that label the component
	 * @default ""
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleNameRef!: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @public
	 * @default ""
	 * @since 1.1.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines whether the component is disabled.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Determines whether the `ui5-checkbox` is in display only state.
	 *
	 * When set to `true`, the `ui5-checkbox` is not interactive, not editable, not focusable
	 * and not in the tab chain. This setting is used for forms in review mode.
	 *
	 * **Note:** When the property `disabled` is set to `true` this property has no effect.
	 * @since 1.22.0
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	displayOnly!: boolean;

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.3.0
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	* Defines whether the component is displayed as partially checked.
	*
	* **Note:** The indeterminate state can be set only programmatically and can’t be achieved by user
	* interaction and the resulting visual state depends on the values of the `indeterminate`
	* and `checked` properties:
	*
	* -  If the component is checked and indeterminate, it will be displayed as partially checked
	* -  If the component is checked and it is not indeterminate, it will be displayed as checked
	* -  If the component is not checked, it will be displayed as not checked regardless value of the indeterminate attribute
	* @default false
	* @public
	* @since 1.0.0-rc.15
	*/
	@property({ type: Boolean })
	indeterminate!: boolean;

	/**
	 * Defines if the component is checked.
	 *
	 * **Note:** The property can be changed with user interaction,
	 * either by cliking/tapping on the component, or by
	 * pressing the Enter or Space key.
	 * @default false
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property({ type: Boolean })
	checked!: boolean;

	/**
	 * Defines the text of the component.
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines whether the component text wraps when there is not enough space.
	 *
	 * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	 * @default "None"
	 * @public
	 */
	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: `${WrappingType}`;

	/**
	 * Determines the name with which the component will be submitted in an HTML form.
	 *
	 * **Important:** For the `name` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 *
	 * **Note:** When set, a native `input` HTML element
	 * will be created inside the component so that it can be submitted as
	 * part of an HTML form. Do not use this property unless you need to submit a form.
	 * @default ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines the active state (pressed or not) of the component.
	 * @private
	 */
	@property({ type: Boolean })
	active!: boolean;

	/**
	 * The slot is used to render native `input` HTML element within Light DOM to enable form submit,
	 * when `name` property is set.
	 * @private
	 */
	@slot()
	formSupport!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;
	_deactivate: () => void;

	constructor() {
		super();

		this._deactivate = () => {
			if (activeCb) {
				activeCb.active = false;
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);
			isGlobalHandlerAttached = true;
		}
	}

	onBeforeRendering() {
		this._enableFormSupport();
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	_enableFormSupport() {
		const formSupport = getFeature<typeof FormSupport>("FormSupport");
		if (formSupport) {
			formSupport.syncNativeHiddenInput(this, (element: IFormElement, nativeInput: NativeFormElement) => {
				nativeInput.disabled = !!element.disabled;
				(nativeInput as HTMLInputElement).checked = !!element.checked;
				nativeInput.value = element.checked ? "on" : "";
			});
		} else if (this.name) {
			console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_onclick() {
		this.toggle();
	}

	_onmousedown() {
		if (this.readonly || this.disabled) {
			return;
		}

		this.active = true;
		activeCb = this; // eslint-disable-line
	}

	_onmouseup() {
		this.active = false;
	}

	_onfocusout() {
		this.active = false;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (this.readonly || this.disabled) {
			return;
		}

		if (isEnter(e)) {
			this.toggle();
		}

		this.active = true;
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.toggle();
		}

		this.active = false;
	}

	toggle() {
		if (this.canToggle()) {
			const lastState = {
				checked: this.checked,
				indeterminate: this.indeterminate,
			};
			if (this.indeterminate) {
				this.indeterminate = false;
				this.checked = true;
			} else {
				this.checked = !this.checked;
			}

			const changePrevented = !this.fireEvent("change", null, true);
			// Angular two way data binding
			const valueChagnePrevented = !this.fireEvent("value-changed", null, true);

			if (changePrevented || valueChagnePrevented) {
				this.checked = lastState.checked;
				this.indeterminate = lastState.indeterminate;
			}
		}
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readonly || this.displayOnly);
	}

	valueStateTextMappings() {
		return {
			"Negative": CheckBox.i18nBundle.getText(VALUE_STATE_ERROR),
			"Critical": CheckBox.i18nBundle.getText(VALUE_STATE_WARNING),
			"Positive": CheckBox.i18nBundle.getText(VALUE_STATE_SUCCESS),
		};
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get classes() {
		return {
			main: {
				"ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop(),
			},
		};
	}

	get ariaReadonly() {
		return this.readonly || this.displayOnly ? "true" : undefined;
	}

	get effectiveAriaDisabled() {
		return this.disabled ? "true" : undefined;
	}

	get effectiveAriaChecked() {
		return this.indeterminate && this.checked ? "mixed" : this.checked;
	}

	get ariaLabelledBy() {
		if (!this.ariaLabelText) {
			return this.text ? `${this._id}-label` : undefined;
		}

		return undefined;
	}

	get ariaDescribedBy() {
		return this.hasValueState ? `${this._id}-descr` : undefined;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get valueStateText() {
		if (this.valueState !== ValueState.None && this.valueState !== ValueState.Information) {
			return this.valueStateTextMappings()[this.valueState];
		}
	}

	get effectiveTabIndex() {
		const tabindex = this.getAttribute("tabindex");
		return this.disabled || this.displayOnly ? undefined : tabindex || "0";
	}

	get isCompletelyChecked() {
		return this.checked && !this.indeterminate;
	}

	get isDisplayOnly() {
		return this.displayOnly && !this.disabled;
	}

	get displayOnlyIcon() {
		if (this.isCompletelyChecked) {
			return "complete";
		}
		if (this.checked && this.indeterminate) {
			return "tri-state";
		}
		return "border";
	}

	static async onDefine() {
		CheckBox.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

CheckBox.define();

export default CheckBox;
