import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import {
	isSpace,
	isEnter,
	isDown,
	isLeft,
	isUp,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Label from "./Label.js";
import RadioButtonGroup from "./RadioButtonGroup.js";
import WrappingType from "./types/WrappingType.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";
import type FormSupport from "./features/InputElementsFormSupport.js";

// Template
import RadioButtonTemplate from "./generated/templates/RadioButtonTemplate.lit.js";

// i18n
import {
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	RADIO_BUTTON_GROUP_REQUIRED,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import radioButtonCss from "./generated/themes/RadioButton.css.js";

let isGlobalHandlerAttached = false;
let activeRadio: RadioButton;

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-radio-button` component enables users to select a single option from a set of options.
 * When a `ui5-radio-button` is selected by the user, the
 * `change` event is fired.
 * When a `ui5-radio-button` that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the `name` property.
 *
 * **Note:** If `ui5-radio-button` is not part of a group, it can be selected once, but can not be deselected back.
 *
 * ### Keyboard Handling
 *
 * Once the `ui5-radio-button` is on focus, it might be selected by pressing the Space and Enter keys.
 *
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 *
 * **Note:** On entering radio button group, the focus goes to the currently selected radio button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/RadioButton";`
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart outer-ring - Used to style the outer ring of the `ui5-radio-button`.
 * @csspart inner-ring - Used to style the inner ring of the `ui5-radio-button`.
 */
@customElement({
	tag: "ui5-radio-button",
	languageAware: true,
	renderer: litRender,
	template: RadioButtonTemplate,
	styles: radioButtonCss,
	dependencies: [Label],
})
/**
 * Fired when the component checked state changes.
 * @public
 * @since 1.0.0-rc.15
 */
@event("change")

class RadioButton extends UI5Element implements IFormElement {
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
	 * **Note:** A read-only component isn't editable or selectable.
	 * However, because it's focusable, it still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly!: boolean;

	/**
	 * Defines whether the component is required.
	 * @default false
	 * @public
	 * @since 1.9.0
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	 * Defines whether the component is checked or not.
	 *
	 * **Note:** The property value can be changed with user interaction,
	 * either by clicking/tapping on the component,
	 * or by using the Space or Enter key.
	 *
	 * **Note:** Only enabled radio buttons can be checked.
	 * Read-only radio buttons are not selectable, and therefore are always unchecked.
	 * @default false
	 * @formEvents change
	 * @formProperty
	 * @public
	 * @since 1.0.0-rc.15
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
	 * Defines the name of the component.
	 * Radio buttons with the same `name` will form a radio button group.
	 *
	 * **Note:**
	 * The selection can be changed with `ARROW_UP/DOWN` and `ARROW_LEFT/RIGHT` keys between radio buttons in same group.
	 *
	 * **Note:**
	 * Only one radio button can be selected per group.
	 *
	 * **Important:** For the `name` property to have effect when submitting forms, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 *
	 * **Note:** When set, a native `input` HTML element
	 * will be created inside the component so that it can be submitted as
	 * part of an HTML form.
	 * @default ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines the form value of the component.
	 * When a form with a radio button group is submitted, the group's value
	 * will be the value of the currently selected radio button.
	 *
	 * **Important:** For the `value` property to have effect, you must add the following import to your project:
	 * `import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`
	 * @default ""
	 * @public
	 */
	@property()
	value!: string;

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
	 * Defines the accessible ARIA name of the component.
	 * @default ""
	 * @public
	 * @since 1.6.0
	 */
	@property()
	accessibleName!: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 * @default ""
	 * @public
	 * @since 1.1.0
	 */
	@property()
	accessibleNameRef!: string;

	@property({ defaultValue: "-1", noAttribute: true })
	_tabIndex!: string;

	/**
	 * Defines the active state (pressed or not) of the component.
	 * @default false
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

	_deactivate: () => void;
	_name!: string;
	_checked!: boolean;
	_internals: ElementInternals;

	static get formAssociated() {
		return true;
	}

	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._internals = this.attachInternals();

		this._deactivate = () => {
			if (activeRadio) {
				activeRadio.active = false;
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);
			isGlobalHandlerAttached = true;
		}
	}

	static async onDefine() {
		RadioButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		this.syncGroup();

		this._enableFormSupport();
	}

	onExitDOM() {
		this.syncGroup(true);
	}

	syncGroup(forceRemove?: boolean) {
		const oldGroup = this._name;
		const currentGroup = this.name;
		const oldChecked = this._checked;
		const currentChecked = this.checked;

		if (forceRemove) {
			RadioButtonGroup.removeFromGroup(this, oldGroup);
		}

		if (currentGroup !== oldGroup) {
			if (oldGroup) {
				// remove the control from the previous group
				RadioButtonGroup.removeFromGroup(this, oldGroup);
			}

			if (currentGroup) {
				// add the control to the existing group
				RadioButtonGroup.addToGroup(this, currentGroup);
			}
		} else if (currentGroup) {
			RadioButtonGroup.enforceSingleSelection(this, currentGroup);
		}

		if (this.name && currentChecked !== oldChecked) {
			RadioButtonGroup.updateTabOrder(this.name);
		}

		this._name = this.name;
		this._checked = this.checked;
	}

	_enableFormSupport() {
		const formSupport = getFeature<typeof FormSupport>("FormSupport");

		if (formSupport) {
			this._setFormValue();
		} else if (this.value) {
			console.warn(`In order for the "value" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
		}
	}

	_setFormValue() {
		this._internals.setFormValue(this.checked ? this.value : null);
	}

	_resetFormValidity() {
		this._internals.setValidity({});
	}

	_invalidateForm() {
		this._internals.setValidity(
			{ valueMissing: true },
			this.radioButtonGroupRequiredText,
			this.shadowRoot!.firstElementChild as HTMLElement,
		);
	}

	_onclick() {
		return this.toggle();
	}

	_handleDown(e: KeyboardEvent) {
		const currentGroup = this.name;

		if (!currentGroup) {
			return;
		}

		e.preventDefault();
		RadioButtonGroup.selectNextItem(this, currentGroup);
	}

	_handleUp(e: KeyboardEvent) {
		const currentGroup = this.name;

		if (!currentGroup) {
			return;
		}

		e.preventDefault();
		RadioButtonGroup.selectPreviousItem(this, currentGroup);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.active = true;
			return e.preventDefault();
		}

		if (isEnter(e)) {
			this.active = true;
			return this.toggle();
		}

		const isRTL = this.effectiveDir === "rtl";

		if (isDown(e) || (!isRTL && isRight(e)) || (isRTL && isLeft(e))) {
			this._handleDown(e);
		}

		if (isUp(e) || (!isRTL && isLeft(e)) || (isRTL && isRight(e))) {
			this._handleUp(e);
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.toggle();
		}

		this.active = false;
	}

	_onmousedown() {
		this.active = true;
		activeRadio = this; // eslint-disable-line
	}

	_onmouseup() {
		this.active = false;
	}

	_onfocusout() {
		this.active = false;
	}

	toggle() {
		if (!this.canToggle()) {
			return this;
		}

		if (!this.name) {
			this.checked = !this.checked;
			this.fireEvent("change");
			return this;
		}

		RadioButtonGroup.selectItem(this, this.name);
		return this;
	}

	canToggle() {
		return !(this.disabled || this.readonly || this.checked);
	}

	get classes() {
		return {
			inner: {
				"ui5-radio-inner--hoverable": !this.disabled && !this.readonly && isDesktop(),
			},
		};
	}

	get effectiveAriaDisabled() {
		return (this.disabled || this.readonly) ? "true" : null;
	}

	get ariaLabelText() {
		return [getEffectiveAriaLabelText(this), this.text].filter(Boolean).join(" ");
	}

	get effectiveAriaDescribedBy() {
		return this.hasValueState ? `${this._id}-descr` : undefined;
	}

	get hasValueState() {
		return this.valueState !== ValueState.None;
	}

	get valueStateText() {
		switch (this.valueState) {
		case ValueState.Error:
			return RadioButton.i18nBundle.getText(VALUE_STATE_ERROR);
		case ValueState.Warning:
			return RadioButton.i18nBundle.getText(VALUE_STATE_WARNING);
		case ValueState.Success:
			return RadioButton.i18nBundle.getText(VALUE_STATE_SUCCESS);
		case ValueState.Information:
			return RadioButton.i18nBundle.getText(VALUE_STATE_INFORMATION);
		default:
			return "";
		}
	}

	get radioButtonGroupRequiredText(): string {
		return RadioButton.i18nBundle.getText(RADIO_BUTTON_GROUP_REQUIRED);
	}

	get effectiveTabIndex() {
		const tabindex = this.getAttribute("tabindex");

		if (this.disabled) {
			return "-1";
		}

		if (this.name) {
			return this._tabIndex;
		}

		return tabindex || "0";
	}
}

RadioButton.define();

export default RadioButton;
