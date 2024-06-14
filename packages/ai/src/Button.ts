import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import MainButton from "@ui5/webcomponents/dist/Button.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import ButtonState from "./ButtonState.js";

import ButtonTemplate from "./generated/templates/ButtonTemplate.lit.js";

// Styles
import ButtonCss from "./generated/themes/Button.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component represents a button used in AI-related scenarios.
 * It enables users to trigger actions by clicking or tapping the `ui5-ai-button`, or by pressing
 * certain keyboard keys, such as Enter.
 *
 * ### Usage
 *
 * For the `ui5-ai-button` UI, you can define one or more states of the button by placing `ai-button-state` components in its default slot.
 * Each state have a name that identifies it and can have text, icon and end icon defined (in any combination) depending on the state purpose.
 *
 * You can choose from a set of predefined designs (the same as for regular `ui5-button` component) that allow different styling to correspond to the triggered action.
 *
 * `ui5-ai-button` can be activated by clicking or tapping it. The state can be changed in `click` event handler.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-ai/dist/Button.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0
 * @public
 */

@customElement({
	tag: "ui5-ai-button",
	languageAware: true,
	renderer: litRender,
	template: ButtonTemplate,
	styles: ButtonCss,
	dependencies: [MainButton, Icon, ButtonState],
	shadowRootOptions: { delegatesFocus: true },
})

/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 * @public
 */
@event("click")

/**
 * @experimental
 */
class Button extends UI5Element {
	/**
	 * Defines the component design.
	 * @default "Default"
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design?: `${ButtonDesign}`;

	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be pressed or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the current state of the component.
	 *
	 * **Note:** If nothing is defined, the component will be set initially to the first defined state (if any).
	 *
	 * @default ""
	 * @public
	 */
	@property()
	state?: string;

	/**
	 * Keeps the current state of the component.
	 * @private
	 */
	@property({ type: Object })
	_currentStateObject?: ButtonState;

	/**
	 * Initiates button elements fade-out phase.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	fadeOut!: boolean;

	/**
	 * Initiates button fade middle phase.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	fadeMid!: boolean;

	/**
	 * Initiates button elements fade-in phase.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	fadeIn!: boolean;

	/**
	 * Defines the available states of the component.
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use `ui5-ai-button-state` components in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: ButtonState, "default": true })
	states!: Array<ButtonState>;

	onBeforeRendering(): void {
		if (this.fadeOut || this.fadeIn) {
			return;
		}

		if (this.state && this._currentStateObject && !Object.keys(this._currentStateObject).length) {
			this._currentStateObject = this._findStateByName(this.state);
		}

		const currentStateName = this._currentStateObject?.name || "";

		if (!this.state) {
			this.state = this.states.length ? this.states[0].name : "";
			this._currentStateObject = this._findStateByName(this.state);
		}

		if (!this._currentStateObject) {
			this._throwMissingStateError();
		}

		if (currentStateName !== "" && currentStateName !== this.state) {
			this._fadeOut();
		}
	}

	onAfterRendering(): void {
		if (!this._findStateByName(this.state!) && this._currentStateObject) {
			this.state = this._currentStateObject.name;
		}
	}

	/**
	 * Starts the fade-out animation.
	 * @private
	 */
	async _fadeOut(): Promise<void> {
		const fadeOutDuration = 180;

		const button = this.shadowRoot?.querySelector("[ui5-button]") as MainButton;
		const newStateObject = this._findStateByName(this.state!);

		if (button && newStateObject) {
			const buttonWidth = button.offsetWidth;
			const hiddenButton = this.shadowRoot?.querySelector(".ui5-ai-button-hidden") as MainButton;
			button.style.width = `${buttonWidth}px`;
			hiddenButton.icon = newStateObject.icon;
			hiddenButton.endIcon = newStateObject.endIcon;
			hiddenButton.textContent = newStateObject.text;

			await renderFinished();
			const hiddenButtonWidth = hiddenButton.offsetWidth;
			this.fadeOut = true;
			button.style.width = `${hiddenButtonWidth}px`;

			setTimeout(() => {
				this.fadeMid = true;
				this._currentStateObject = newStateObject;
				this._fadeIn();
			}, fadeOutDuration);
		} else {
			this._throwMissingStateError();
		}
	}

	/**
	 * Starts the fade-in animation.
	 * @private
	 */
	_fadeIn(): void {
		const fadeInDuration = 60;

		setTimeout(() => {
			this.fadeIn = true;
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
			this.fadeOut = false;
			this.fadeMid = false;
			this.fadeIn = false;
		}, fadeResetDuration);
	}

	/**
	 * Returns the current state object.
	 * @private
	 */
	_findStateByName(name: string): ButtonState | undefined {
		return this.states.find(state => state.name === name);
	}

	/**
	 * Handles the click event.
	 * @private
	 */
	_onclick(e: MouseEvent): void {
		e.stopImmediatePropagation();
		this.fireEvent("click");
	}

	/**
	 * Throws an error when the current state is missing.
	 * @private
	 */
	_throwMissingStateError(): void {
		throw new Error(`State with name="${this.state}" doesn't exist!`);
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
		return this._currentStateObject?.endIcon;
	}

	get _hasText() {
		return !!this._stateText;
	}
}

Button.define();
export default Button;
