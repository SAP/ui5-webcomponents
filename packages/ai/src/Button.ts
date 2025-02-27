import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type SplitButton from "@ui5/webcomponents/dist/SplitButton.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import {
	isDesktop,
	isSafari,
} from "@ui5/webcomponents-base/dist/Device.js";
import type ButtonState from "./ButtonState.js";
import "./ButtonState.js";

import ButtonTemplate from "./ButtonTemplate.js";

// Styles
import ButtonCss from "./generated/themes/Button.css.js";
import { isDown, isDownAlt, isEnter, isEscape, isF4, isShift, isSpace, isTabNext, isTabPrevious, isUp, isUpAlt } from "@ui5/webcomponents-base/dist/Keys.js";
import type { AriaHasPopup, AriaRole } from "@ui5/webcomponents-base/dist/types.js";
import { BUTTON_ARIA_TYPE_ACCEPT, BUTTON_ARIA_TYPE_EMPHASIZED, BUTTON_ARIA_TYPE_REJECT, SPLIT_BUTTON_ARROW_BUTTON_TOOLTIP, SPLIT_BUTTON_DESCRIPTION, SPLIT_BUTTON_KEYBOARD_HINT } from "@ui5/webcomponents/dist/generated/i18n/i18n-defaults.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import { getEnableDefaultTooltips } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";
import { getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import toLowercaseEnumValue from "@ui5/webcomponents-base/dist/util/toLowercaseEnumValue.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import type ButtonAccessibleRole from "@ui5/webcomponents/dist/types/ButtonAccessibleRole.js";


let isGlobalHandlerAttached = false;
let activeButton: Button | null = null

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component serves as a button for AI-related scenarios. Users can trigger actions by clicking or tapping the `ui5-ai-button`
 * or by pressing keyboard keys like [Enter] or [Space].
 *
 * ### Usage
 *
 * For the `ui5-ai-button` user interface, you can define one or more button states by placing `ui5-ai-button-state` components in their default slot.
 * Each state has a name for identification and can include text, an icon, and an end icon, as needed for its purpose.
 * You can define a split mode for the `ui5-ai-button`, which will results in displaying an arrow button for additional actions.
 *
 * You can choose from a set of predefined designs for `ui5-ai-button` (as in `ui5-button`) to match the desired styling.
 *
 * The `ui5-ai-button` can be activated by clicking or tapping it. You can change the button state in the click event handler. When the button is
 * in split mode, you can activate the default button action by clicking or tapping it, or by pressing keyboard keys like [Enter] or [Space].
 * You can activate the arrow button by clicking or tapping it, or by pressing keyboard keys like [Arrow Up], [Arrow Down], or [F4].
 * To display additional actions, you can attach a menu to the arrow button.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Button.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @experimental The Button and ButtonState web components are availabe since 2.0 under an experimental flag and their API and behaviour are subject to change.
 */

@customElement({
	tag: "ui5-ai-button",
	languageAware: true,
	renderer: jsxRenderer,
	template: ButtonTemplate,
	styles: ButtonCss,
	shadowRootOptions: { delegatesFocus: true },
})

/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 * @public
 */
@event("click", {
	bubbles: true,
})

/**
 * Fired when the component is in split mode and after the arrow button
 * is activated either by clicking or tapping it or by using the [Arrow Up] / [Arrow Down],
 * [Alt] + [Arrow Up]/ [Arrow Down], or [F4] keyboard keys.
 * @public
 */
@event("arrow-button-click", {
	bubbles: true,
})

class Button extends UI5Element {
	eventDetails!: {
		"click": void;
		"arrow-button-click": void;
		"active-state-change": void;
	}
	/**
	 * Defines the component design.
	 * @default "Default"
	 * @public
	 */
	@property()
	design: `${ButtonDesign}` = "Default"

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the current state of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	state?: string;

	/**
	 * Defines the active state of the arrow button in split mode.
	 * Set to true when the button is in split mode and a menu with additional options
	 * is opened by the arrow button. Set back to false when the menu is closed.
	 * @default false
	 * @public
	 * @since 2.6.0
	 */
	@property({ type: Boolean, noAttribute: true })
	arrowButtonPressed = false;

	/**
	 * Keeps the current state object of the component.
	 * @private
	 */
	@property({ type: Object })
	_currentStateObject?: ButtonState;

	/**
	 * Determines if the button is in icon-only mode.
	 * This property is animation related only.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	iconOnly? = false;

	/**
	 * Defines the available states of the component.
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that
	 * you only use `ui5-ai-button-state` components in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	states!: Array<ButtonState>;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node})
	text!: Array<Node>;

	@query("[ui5-split-button]")
	_splitButton?: SplitButton;

	@query(".ui5-ai-button-hidden[ui5-split-button]")
	_hiddenSplitButton?: SplitButton;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_tabIndex?: number;
	private _shiftOrEscapePressed?: boolean;
	private _textButtonActive = false;
	private _isKeyDownOperation = false;
	private _activeArrowButton?: boolean;
	private _isDefaultActionPressed?: boolean;
	private _spacePressed?: boolean;
	activeArrowButton: any;
	accessibleDescription = "";
	tooltip: any;
	hasIcon?: boolean;
	hasEndIcon?: boolean;
	buttonTitle: any;
	nonInteractive: any;
	_cancelAction?: boolean;
	forcedTabIndex = "";
	accessibilityAttributes: any;
	accessibleRole: `${ButtonAccessibleRole}` = "Button";
	active: any;

	get _hideArrowButton() {
		return !this._effectiveStateObject?.showArrowButton;
	}

	get _effectiveState() {
		return this.state || (this.states.length && this.states[0].name) || "";
	}

	get _effectiveStateObject() {
		return this.states.find(state => state.name === this._effectiveState);
	}

	get _stateIconOnly() {
		return !this._stateText && !!this._stateIcon;
	}

	get _stateText() {
		return this._currentStateObject?.text;
	}

	get _stateIcon() {
		return this._currentStateObject?.icon;
	}

	get _stateEndIcon() {
		const endIcon = this._effectiveStateObject?.showArrowButton ? "" : this._effectiveStateObject?.endIcon;
		return endIcon;
	}

	get _hasText() {
		return !!this._stateText;
	}

	constructor() {
		super();
		this._deactivate = () => {
			if (activeButton) {
				activeButton._setActiveState(false);
			}
		};

		if (!isGlobalHandlerAttached) {
			document.addEventListener("mouseup", this._deactivate);

			isGlobalHandlerAttached = true;
		}
	}

	_onmousedowntextbutton() {
		if (this.nonInteractive) {
			return;
		}

		this._setActiveState(true);
		activeButton = this; // eslint-disable-line
	}


	onBeforeRendering(): void {
		const splitButton = this._splitButton;

		if (splitButton) {
			splitButton.activeArrowButton = this.arrowButtonPressed;
		}

		if (!this._currentStateObject?.name) {
			this._currentStateObject = this._effectiveStateObject;
		}

		const currentStateName = this._currentStateObject?.name || "";

		this.iconOnly = this._stateIconOnly;
		if (currentStateName !== "" && currentStateName !== this._effectiveState) {
			this._fadeOut();
		}

		if (this.disabled) {
			this._tabIndex = -1;
		}

		this.hasIcon = !!this._stateIcon;
		this.hasEndIcon = !!this._stateEndIcon;
		this.iconOnly = this.isIconOnly;
	}

	_handleMouseClick(e: MouseEvent) {
		this._fireClick(e);
	}

	_onFocusOut() {
		if (this.disabled || this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}

		this._shiftOrEscapePressed = false;
		this._setTabIndexValue();
	}

	_onFocusIn() {
		if (this.disabled || this.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}
		this._shiftOrEscapePressed = false;
	}

	handleTouchStart(e: TouchEvent | MouseEvent) {
		e.stopPropagation();
		this._textButtonActive = true;
		this._tabIndex = -1;
	}

	_onInnerButtonFocusIn(e: FocusEvent) {
		e.stopPropagation();
		this._setTabIndexValue(true);
		const target = e.target as Button;
		target.focus();
	}

	_onKeyDown(e: KeyboardEvent) {
		this._isKeyDownOperation = true;
		if (this._isArrowKeyAction(e)) {
			this._handleArrowButtonAction(e);
			this._activeArrowButton = true;
		} else if (this._isDefaultAction(e)) {
			this._handleDefaultAction(e);
			this._isDefaultActionPressed = true;
		}

		if (this._spacePressed && this._isShiftOrEscape(e)) {
			this._handleShiftOrEscapePressed();
		}

		// Handles button freeze issue when pressing Enter/Space and navigating with Tab/Shift+Tab simultaneously.
		if (this._isDefaultActionPressed && (isTabNext(e) || isTabPrevious(e))) {
			this._activeArrowButton = false;
			this._textButtonActive = false;
		}

		this._tabIndex = -1;
	}

	_onKeyUp(e: KeyboardEvent) {
		this._isKeyDownOperation = false;
		if (this._isArrowKeyAction(e)) {
			e.preventDefault();
			this._activeArrowButton = false;
			this._textButtonActive = false;
		} else if (this._isDefaultAction(e)) {
			this._isDefaultActionPressed = false;
			this._textButtonActive = false;
			if (isSpace(e)) {
				e.preventDefault();
				e.stopPropagation();
				this._fireClick();
				this._spacePressed = false;
				this._textButtonActive = false;
			}
		}

		if (this._isShiftOrEscape(e)) {
			this._handleShiftOrEscapePressed();
		}

		this._tabIndex = -1;
	}

	_fireClick(e?: Event) {
		e?.stopPropagation();
		if (!this._shiftOrEscapePressed) {
			this.fireDecoratorEvent("click");
		}
		this._shiftOrEscapePressed = false;
	}

	_fireArrowClick(e?: Event) {
		e?.stopPropagation();

		this.fireDecoratorEvent("arrow-button-click");
	}

	_textButtonRelease() {
		this._textButtonActive = false;
		this._tabIndex = -1;
	}

	_arrowButtonPress(e: MouseEvent) {
		e.stopPropagation();

		this._tabIndex = -1;
	}

	_arrowButtonRelease(e: MouseEvent) {
		e.preventDefault();

		this._tabIndex = -1;
	}

	_setTabIndexValue(innerButtonPressed?: boolean) {
		this._tabIndex = this.disabled ? -1 : 0;

		if (this._tabIndex === -1 && innerButtonPressed) {
			this._tabIndex = 0;
		}
	}

	_onArrowButtonActiveStateChange(e: CustomEvent) {
		if (this.activeArrowButton) {
			e.preventDefault();
		}
	}

	/**
	 * Checks if the pressed key is an arrow key.
	 * @param e - keyboard event
	 * @private
	 */
	_isArrowKeyAction(e: KeyboardEvent): boolean {
		return isDown(e) || isUp(e) || isDownAlt(e) || isUpAlt(e) || isF4(e);
	}

	/**
	 * Checks if the pressed key is a default action key (Space or Enter).
	 * @param e - keyboard event
	 * @private
	 */
	_isDefaultAction(e: KeyboardEvent): boolean {
		return isSpace(e) || isEnter(e);
	}

	/**
	 * Checks if the pressed key is an escape key or shift key.
	 * @param e - keyboard event
	 * @private
	 */
	_isShiftOrEscape(e: KeyboardEvent): boolean {
		return isEscape(e) || isShift(e);
	}

	/**
	 * Handles the click event and the focus on the arrow button.
	 * @param e - keyboard event
	 * @private
	 */
	_handleArrowButtonAction(e: KeyboardEvent | MouseEvent) {
		e.preventDefault();

		this._fireArrowClick(e);

		if (isSpace((e as KeyboardEvent))) {
			this._spacePressed = true;
		}
	}

	/**
	 * Handles the default action and the active state of the respective button.
	 * @param e - keyboard event
	 * @private
	 */
	_handleDefaultAction(e: KeyboardEvent) {
		e.preventDefault();
		const wasSpacePressed = isSpace(e);
		const target = e.target as Button;

		if (this.arrowButton && target === this.arrowButton) {
			this._activeArrowButton = true;
			this._fireArrowClick();
			if (wasSpacePressed) {
				this._spacePressed = true;
				this._textButtonActive = false;
			}
		} else {
			this._textButtonActive = true;
			if (wasSpacePressed) {
				this._spacePressed = true;
				return;
			}
			this._fireClick();
		}
	}

	_handleShiftOrEscapePressed() {
		this._shiftOrEscapePressed = true;
		this._textButtonActive = false;
		this._isKeyDownOperation = false;
	}

	get effectiveActiveArrowButton() {
		return this.activeArrowButton || this._activeArrowButton;
	}

	get textButtonAccText() {
		return this.textContent;
	}

	get isTextButton() {
		return !!this.textContent;
	}

	get textButton() {
		return this.getDomRef()?.querySelector<Button>(".ui5-split-text-button");
	}

	get arrowButton() {
		return this.getDomRef()?.querySelector<Button>(".ui5-split-arrow-button");
	}

	get accInfo() {
		return {
			root: {
				"description": Button.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION),
				"keyboardHint": Button.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT),
			},
			arrowButton: {
				"title": this.arrowButtonTooltip,
				"accessibilityAttributes": {
					"hasPopup": "menu" as AriaHasPopup,
					"expanded": this.effectiveActiveArrowButton,
				},
			},
		};
	}

	get arrowButtonTooltip() {
		return Button.i18nBundle.getText(SPLIT_BUTTON_ARROW_BUTTON_TOOLTIP);
	}

	get ariaLabelText() {
		return [Button.i18nBundle.getText(SPLIT_BUTTON_DESCRIPTION), Button.i18nBundle.getText(SPLIT_BUTTON_KEYBOARD_HINT)].join(" ");
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}


	_onclicktextbutton() {
		if (this.nonInteractive) {
			return;
		}

		if (isSafari()) {
			this.getDomRef()?.focus();
		}
	}

	_ontouchendtextbutton(e: TouchEvent) {
		if (this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}


		if (this.active) {
			this._setActiveState(false);
		}

		if (activeButton) {
			activeButton._setActiveState(false);
		}
	}

	_onkeydowntextbutton(e: KeyboardEvent) {
		this._cancelAction = isShift(e) || isEscape(e);

		if (isSpace(e) || isEnter(e)) {
			this._setActiveState(true);
		} else if (this._cancelAction) {
			this._setActiveState(false);
		}
	}

	_onkeyuptextbutton(e: KeyboardEvent) {
		if (this._cancelAction) {
			e.preventDefault();
		}
		if (isSpace(e) || isEnter(e)) {
			if (this.active) {
				this._setActiveState(false);
			}
		}
	}

	_onfocusouttextbutton() {
		if (this.nonInteractive) {
			return;
		}

		if (this.active) {
			this._setActiveState(false);
		}
	}

	_setActiveState(active: boolean) {
		const eventPrevented = !this.fireDecoratorEvent("active-state-change");

		if (eventPrevented) {
			return;
		}

		this.active = active;
	}

	get _hasPopup() {
		return this.accessibilityAttributes.hasPopup;
	}

	get hasButtonType() {
		return this.design !== ButtonDesign.Default && this.design !== ButtonDesign.Transparent;
	}

	get isIconOnly() {
		return !willShowContent(this.text);
	}

	static typeTextMappings(): Record<string, I18nText> {
		return {
			"Positive": BUTTON_ARIA_TYPE_ACCEPT,
			"Negative": BUTTON_ARIA_TYPE_REJECT,
			"Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
		};
	}

	getDefaultTooltip() {
		if (!getEnableDefaultTooltips()) {
			return;
		}

		return getIconAccessibleName(this._stateIcon);
	}

	get buttonTypeText() {
		return Button.i18nBundle.getText(Button.typeTextMappings()[this.design]);
	}

	get effectiveAccRole(): AriaRole {
		return toLowercaseEnumValue(this.accessibleRole);
	}

	get tabIndexValue() {
		if (this.disabled) {
			return;
		}

		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return Number.parseInt(tabindex);
		}

		return this.nonInteractive ? -1 : Number.parseInt(this.forcedTabIndex);
	}

	get showIconTooltip() {
		return getEnableDefaultTooltips() && this.iconOnly && !this.tooltip;
	}

	get ariaLabelTextTextButton() {
		return getEffectiveAriaLabelText(this);
	}

	get ariaDescribedbyText() {
		return this.hasButtonType ? "ui5-button-hiddenText-type" : undefined;
	}

	get ariaDescriptionText() {
		return this.accessibleDescription === "" ? undefined : this.accessibleDescription;
	}

	/**
	 * Starts the fade-out animation.
	 * @private
	 */
	async _fadeOut(): Promise<void> {
		const fadeOutDuration = 180;
		const button = this._splitButton;
		const hiddenButton = this._hiddenSplitButton;
		const newStateObject = this._effectiveStateObject;

		if (!newStateObject) {
			// eslint-disable-next-line no-console
			console.warn(`State with name="${this.state}" doesn't exist!`);
			return;
		}

		if (!button || !hiddenButton) {
			return;
		}

		const buttonWidth = button.offsetWidth;
		const currentState: Partial<ButtonState> = this._currentStateObject || {};

		if ((!currentState.showArrowButton && newStateObject.showArrowButton) || (!currentState.endIcon && !!newStateObject.endIcon)) {
			this.classList.add("ui5-ai-button-button-to-menu");
		}
		if ((currentState.showArrowButton && !newStateObject.showArrowButton) || (!!currentState.endIcon && !newStateObject.endIcon)) {
			this.classList.add("ui5-ai-button-menu-to-button");
		}

		this.style.width = `${buttonWidth}px`;
		hiddenButton.icon = newStateObject.icon;
		hiddenButton._endIcon = newStateObject.endIcon;
		hiddenButton.textContent = newStateObject.text || null;
		hiddenButton._hideArrowButton = this._hideArrowButton;

		await renderFinished();
		const hiddenButtonWidth = hiddenButton.offsetWidth;
		this.style.width = `${hiddenButtonWidth}px`;
		this.classList.add("ui5-ai-button-fade-out");

		setTimeout(() => {
			this.classList.add("ui5-ai-button-fade-mid");
			button._hideArrowButton = this._hideArrowButton;
			this._fadeIn();
		}, fadeOutDuration);
	}

	/**
	 * Starts the fade-in animation.
	 * @private
	 */
	_fadeIn(): void {
		const fadeInDuration = 160;

		setTimeout(() => {
			const newStateObject = this._effectiveStateObject;
			this._currentStateObject = newStateObject;
			this.classList.add("ui5-ai-button-fade-in");
			this._resetFade();
		}, fadeInDuration);
	}

	/**
	 * Resets the fade phases when the animation is completed.
	 * @private
	 */
	_resetFade(): void {
		const fadeResetDuration = 160;

		setTimeout(() => {
			this.classList.remove("ui5-ai-button-fade-out");
			this.classList.remove("ui5-ai-button-fade-mid");
			this.classList.remove("ui5-ai-button-fade-in");
			this.classList.remove("ui5-ai-button-button-to-menu");
			this.classList.remove("ui5-ai-button-menu-to-button");
		}, fadeResetDuration);

		// reset the button's width after animations
		const button = this._splitButton;

		if (button) {
			button.style.width = "";
		}
	}

	/**
	 * Handles the click event.
	 * @private
	 */
	_onClick(e: CustomEvent): void {
		e.stopImmediatePropagation();
		this.fireDecoratorEvent("click");
	}

	/**
	 * Handles the arrow-button-click event when `ui5-ai-button` is in split mode.
	 * @private
	 */
	_onArrowClick(e: CustomEvent): void {
		e.stopImmediatePropagation();
		this.fireDecoratorEvent("arrow-button-click");
	}
}

Button.define();
export default Button;
