import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import {
	property,
	customElement,
	eventStrict,
	slot,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

import type TestButtonState from "./TestButtonState.js";

import TestButtonTemplate from "./TestButtonTemplate.js";

// Styles
import TestButtonCss from "./generated/themes/TestButton.css.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const animations = [
	{
		element: "[data-icon]",
		keyframes: [
			{ transform: "translateY(0)" },
			{ transform: "translateY(-1rem)" },
		],
		options: {
			delay: 0,
			duration: 100,
			fill: "forwards",
			easing: "ease-in-out",
		},
	},
	{
		element: "[data-icon]",
		keyframes: [
			{ opacity: "1" },
			{ opacity: "0" },
		],
		options: {
			id: "iconFadeOut",
			delay: 60,
			duration: 40,
			fill: "forwards",
		},
	},
	{
		element: "[data-text]",
		keyframes: [
			{ transform: "translateY(0)" },
			{ transform: "translateY(-1rem)" },
		],
		options: {
			delay: 120,
			duration: 80,
			fill: "forwards",
			easing: "ease-in-out",
		},
	},
	{
		element: "[data-text]",
		keyframes: [
			{ opacity: "1" },
			{ opacity: "0" },
		],
		options: {
			id: "textFadeOut",
			delay: 120,
			duration: 60,
			fill: "forwards",
		},
	},
	{
		element: "[data-icon]",
		keyframes: [
			{ transform: "translateY(1rem)" },
			{ transform: "translateY(0)" },
		],
		options: {
			delay: 240,
			duration: 100,
			fill: "forwards",
			easing: "ease-in-out",
		},
	},
	{
		element: "[data-icon]",
		keyframes: [
			{ opacity: "0" },
			{ opacity: "1" },
		],
		options: {
			delay: 240,
			duration: 40,
			fill: "forwards",
		},
	},
	{
		element: "[data-text]",
		keyframes: [
			{ transform: "translateY(1rem)" },
			{ transform: "translateY(0)" },
		],
		options: {
			id: "textFadeIn",
			delay: 300,
			duration: 80,
			fill: "forwards",
			easing: "ease-in-out",
		},
	},
	{
		element: "[data-text]",
		keyframes: [
			{ opacity: "0" },
			{ opacity: "1" },
		],
		options: {
			delay: 300,
			duration: 60,
			fill: "forwards",
		},
	},
];

@customElement({
	tag: "test-button",
	renderer: jsxRenderer,
	styles: TestButtonCss,
	template: TestButtonTemplate,
})
@eventStrict("click", {
	bubbles: true,
})
@eventStrict("arrow-click", {
	bubbles: true,
})
class TestButton extends UI5Element {
	eventDetails!: {
		click: void;
		"arrow-click": void;
	}

	@property()
	design: "Default" | "Transparent" | "Emphasized" = "Default";

	@property({ type: Boolean })
	readonly = false;

	@property({ type: Boolean })
	arrowBtnActivated = false;

	@property({ type: Boolean })
	mainBtnActivated = false;

	@property({ type: Boolean })

	@property()
	state?: string;

	@slot({ type: HTMLElement, "default": true })
	states!: Array<TestButtonState>;

	@query("#arrow-btn")
	arrowBtn?: HTMLElement;

	@query("#main-btn")
	mainBtn?: HTMLElement;

	@property({ type: Boolean })
	private _innerBtnFocused = false;

	_prevStateObject?: TestButtonState;

	onBeforeRendering(): void {
		if (!this._prevStateObject) {
			this._prevStateObject = this.currentStateObject;
		}
	}

	onAfterRendering(): void {
		if (this.currentStateObject !== this._prevStateObject) {
			this.testAnimation();
		}
	}

	handleFocusIn(e: FocusEvent) {
		if (e.target === this.mainBtn || e.target === this.arrowBtn) {
			this._innerBtnFocused = true;
		}
	}

	handleFocusOut(e: FocusEvent) {
		if (e.currentTarget === this.getDomRef()) {
			this._innerBtnFocused = false;
			this.arrowBtnActivated = false;
			this.mainBtnActivated = false;
		}
	}

	fireClickEvent(e: KeyboardEvent | MouseEvent, eventName: "click" | "arrow-click") {
		e.preventDefault();
		e.stopImmediatePropagation();
		this.fireDecoratorEvent(eventName);
	}

	testAnimation() {
		const oldText = this._prevStateObject?.text || "";
		const oldIcon = this._prevStateObject?.icon || "";
		const newText = this.currentStateObject?.text || "";
		const newIcon = this.currentStateObject?.icon || "";

		animations.forEach(animation => {
			const element = this.shadowRoot?.querySelector(animation.element);
			const currentAnimation = element?.animate(animation.keyframes, animation.options);

			if (currentAnimation?.id === "textFadeOut") {
				currentAnimation.finished.then(() => {
					if (newText.length > oldText.length) {
						this.shadowRoot!.querySelector("[data-text]")!.textContent = newText;
					}

					if (newText) {
						this.shadowRoot!.querySelector("[data-text]").hidden = false;
					}

					this.shadowRoot!.querySelector("[data-icon]").name = newIcon;

					if (newIcon) {
						this.shadowRoot!.querySelector("[data-icon]").hidden = false;
					}

					this.shadowRoot!.querySelector("[data-text]")
						?.animate([
							{ maxWidth: `${oldText.length}ch` },
							{ maxWidth: `${newText.length}ch` },
						], {
							delay: 0,
							duration: 100,
							fill: "forwards",
							easing: "ease-in-out",
						})
						.finished.then(() => {
							if (!(newText.length > oldText.length)) {
								this.shadowRoot!.querySelector("[data-text]")!.textContent = newText;
							}

							if (!newText) {
								this.shadowRoot!.querySelector("[data-text]").hidden = true;
							}
						});

					this.shadowRoot!.querySelector("[data-icon]")
						?.animate([
							{ width: oldIcon ? "1rem" : "0px" },
							{ width: newIcon ? "1rem" : "0px" },
						], {
							delay: 0,
							duration: 100,
							fill: "forwards",
							easing: "ease-in-out",
						})
						.finished
						.then(() => {
							if (!newIcon) {
								this.shadowRoot!.querySelector("[data-icon]").hidden = true;
							}
						});
				});
			}

			this._prevStateObject = this.currentStateObject;
		});
	}

	handleKeyDown(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.arrowBtnActivated = this.arrowBtn === e.currentTarget;
			this.mainBtnActivated = this.arrowBtn !== e.currentTarget;
		}

		if (isEnter(e)) {
			this.fireClickEvent(e, e.currentTarget === this.arrowBtn ? "arrow-click" : "click");
		}
	}

	handleKeyUp(e: KeyboardEvent) {
		this.arrowBtnActivated = false;
		this.mainBtnActivated = false;

		if (isSpace(e)) {
			this.fireClickEvent(e, e.currentTarget === this.arrowBtn ? "arrow-click" : "click");
		}
	}

	handleClick(e: MouseEvent) {
		this.fireClickEvent(e, e.currentTarget === this.arrowBtn ? "arrow-click" : "click");
	}

	protected get effectiveTabIndex() {
		return this.readonly || this._innerBtnFocused ? -1 : 0;
	}

	protected get effectiveState() {
		return this.state || this.states[0]?.name;
	}

	protected get currentStateObject() {
		return this.states.find(state => state.name === this.effectiveState);
	}
}

TestButton.define();

export default TestButton;
