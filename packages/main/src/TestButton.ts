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
import type Icon from "./Icon.js";
import { ANIMATIONS } from "./TestButtonAnimations.js";

const RESIZE_ANIMATION_SETTINGS = {
	delay: 0,
	duration: 100,
	fill: "forwards" as FillMode,
	easing: "ease-in-out",
};

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
		const oldEndIcon = this._prevStateObject?.endIcon || "";
		const oldShowArrowIcon = this._prevStateObject?.showArrowButton || false;
		const newText = this.currentStateObject?.text || "";
		const newIcon = this.currentStateObject?.icon || "";
		const newEndIcon = this.currentStateObject?.endIcon || "";
		const newShowArrowButton = this.currentStateObject?.showArrowButton || false;

		ANIMATIONS.forEach(animation => {
			const element = this.shadowRoot?.querySelector(animation.element);
			const currentAnimation = element?.animate(animation.keyframes, animation.options);

			if (currentAnimation?.id === "textFadeOut") {
				currentAnimation.finished.then(() => {
					this.iconAnimation("#end-icon", oldEndIcon, newEndIcon);
					this.iconAnimation("#start-icon", oldIcon, newIcon);
					this.textAnimation(oldText, newText);
					this.arrowButtonAnimation(oldShowArrowIcon, newShowArrowButton);
				});
			}
		});

		this._prevStateObject = this.currentStateObject;
	}

	arrowButtonAnimation(oldState: boolean, newState: boolean) {
		const arrowBtn = this.shadowRoot!.querySelector<HTMLElement>("#arrow-btn")!;
		if (newState) {
			arrowBtn.style.display = "inline-block";
		}

		arrowBtn
			?.animate([
				{ width: oldState ? "100%" : "0px" },
				{ width: newState ? "100%" : "0px" },
			], RESIZE_ANIMATION_SETTINGS)
			.finished.then(() => {
				if (!newState) {
					arrowBtn.style.display = "none";
				}
			});
	}

	textAnimation(oldState: string, newState: string) {
		const textEl = this.shadowRoot!.querySelector<HTMLSpanElement>("#text")!;

		if (newState.length > oldState.length) {
			textEl.textContent = newState;
		}

		if (newState) {
			textEl.style.display = "inline-block";
		}

		textEl
			?.animate([
				{ maxWidth: `${oldState.length}ch` },
				{ maxWidth: `${newState.length}ch` },
			], RESIZE_ANIMATION_SETTINGS)
			.finished.then(() => {
				if (!(newState.length > oldState.length)) {
					textEl.textContent = newState;
				}

				if (!newState) {
					textEl.style.display = "none";
				}
			});
	}

	iconAnimation(el: string, oldState: string, newState: string) {
		const icon = this.shadowRoot!.querySelector<Icon>(el)!;
		icon.name = newState;

		if (newState) {
			icon.style.display = "inline-block";
		}

		this.shadowRoot!.querySelector(el)
			?.animate([
				{ width: oldState ? "1rem" : "0px" },
				{ width: newState ? "1rem" : "0px" },
			], RESIZE_ANIMATION_SETTINGS)
			.finished
			.then(() => {
				if (!newState) {
					icon.style.display = "none";
				}
			});
	}

	handleKeyDown(e: KeyboardEvent) {
		if (isSpace(e) || isEnter(e)) {
			this.arrowBtnActivated = this.arrowBtn === e.target;
			this.mainBtnActivated = this.arrowBtn !== e.target;
		}

		if (isEnter(e)) {
			this.fireClickEvent(e, e.target === this.arrowBtn ? "arrow-click" : "click");
		}
	}

	handleKeyUp(e: KeyboardEvent) {
		this.arrowBtnActivated = false;
		this.mainBtnActivated = false;

		if (isSpace(e)) {
			this.fireClickEvent(e, e.target === this.arrowBtn ? "arrow-click" : "click");
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
