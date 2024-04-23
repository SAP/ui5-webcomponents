import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import AiButtonState from "./types/AiButtonState.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import Menu from "./Menu.js";
import AiButtonTemplate from "./generated/templates/AiButtonTemplate.lit.js";

import { AI_BUTTON_TEXT_GENERATE, AI_BUTTON_TEXT_GENERATING, AI_BUTTON_TEXT_REVISE } from "./generated/i18n/i18n-defaults.js";

// Styles
import aiButtonCss from "./generated/themes/AiButton.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-ai-button` component represents *TBD*
 *
 * ### Usage
 *
 * *TBD*
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/AiButton.js";`
 * @constructor
 * @extends Button
 * @public
 */
@customElement({
	tag: "ui5-ai-button",
	languageAware: true,
	renderer: litRender,
	template: AiButtonTemplate,
	styles: aiButtonCss,
	dependencies: [Icon],
})

/**
 * Fired whenever the state of the component changes.
 * @public
 */
@event("state-change", {
	detail: {
		/**
		 * @public
		 */
		previousState: {
			type: AiButtonState,
		},
		/**
		 * @public
		 */
		state: {
			type: AiButtonState,
		},
	},
})

class AiButton extends Button {
	/**
	 * Defines the component design.
	 * @default "Default"
	 * @public
	 */
	@property({ type: AiButtonState, defaultValue: AiButtonState.Generate })
	state!: `${AiButtonState}`;

	/**
	 * Defines the menu of the component.
	 * @public
	 */
	@slot({ type: HTMLElement })
	menu!: Array<Node>;

	static i18nBundle: I18nBundle;

	get _icon() {
		return this.state === AiButtonState.Revise ? "navigation-down-arrow" : "";
	}

	get _text() {
		return AiButton.i18nBundle.getText(AiButton._stateText()[this.state]);
	}

	get _hasIcon() {
		return this.state === AiButtonState.Revise;
	}

	static async onDefine() {
		AiButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	static _stateText(): Record<string, I18nText> {
		return {
			"Generate": AI_BUTTON_TEXT_GENERATE,
			"Generating": AI_BUTTON_TEXT_GENERATING,
			"Revise": AI_BUTTON_TEXT_REVISE,
		};
	}

	_stateIcon() {
		return this.state === AiButtonState.Generating ? "stop" : "ai";
	}

	_onclick(e: MouseEvent) {
		// const menu = this.menu[0] as Menu;
		const menu = document.getElementById("myMenu") as Menu;
		const target = e.target as HTMLElement;
		const currentState = this.state;

		switch (currentState) {
		case AiButtonState.Generate:
			this.state = AiButtonState.Generating;
			break;
		case AiButtonState.Generating:
			this.state = AiButtonState.Generate;
			break;
		case AiButtonState.Revise:
			if (menu) {
				if (menu.open) {
					menu.close();
				} else {
					menu.showAt(target);
				}
			}
			break;
		}

		if (this.state !== AiButtonState.Revise) {
			this.fireEvent("state-change", {
				previousState: currentState,
				state: this.state,
			});
		}

		super._onclick(e);
	}
}

AiButton.define();

export default AiButton;
