import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import AINoticeIndicatorTemplate from "./AINoticeIndicatorTemplate.js";
import AINoticeIndicatorDisplayMode from "./types/AINoticeIndicatorDisplayMode.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import Link from "./Link.js";
import Label from "./Label.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";
import Button from "./Button.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

// Styles
import AINoticeIndicatorCss from "./generated/themes/AINoticeIndicator.css.js";

/**
 * @class
 * ### Overview
 * AI Notice control is identifying AI-generated text, providing explanations, or collecting user feedback.
 *
 * <h3>Responsive Behavior</h3>
 *
 * The AI notice can be shortened if the available horizontal space becomes insufficient due to resizing of the screen or collision with bordering UI elements.
 *
 * ### Usage
 *
 * Use for AI-specific interactions like identifying AI-generated text, providing explanations, or collecting user feedback.
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/AINoticeIndicator.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.12.0
 * @public
 */
@customElement({
	tag: "ui5-ai-notice-indicator",
	renderer: jsxRenderer,
	template: AINoticeIndicatorTemplate,
	styles: AINoticeIndicatorCss,
	dependencies: [
		Label,
		Popover,
		Icon,
		Button,
		Link,
	],
})
/**
 * Fired on mouseup, space and enter if ai-notice is interactive
 *
 * **Note:** The event will not be fired if the `disabled`
 * property is set to `true`.
 * @public
 */
@event("notice-press")
class AINoticeIndicator extends UI5Element {
	eventDetails!: {
		"notice-press": void
	}
	/**
	 * Link text for AI Notice Component
	 *
	 * @public
	 * @default ""
	*/
	@property()
	attributionText: string = "";

	/**
	 * Description text for AI Notice Component
	 *
	 * @public
	 * @default ""
	*/
	@property()
	verificationText: string = "";

	/**
	 * Show icon for AI Notice Component link text
	 *
	 * @public
	 * @default false
	*/
	@property({ type: Boolean })
	showIcon: boolean = false;

	/**
	 * Enable/Disable action on click - showing popup
	 *
	 * @public
	 * @default false
	*/
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Determines how <code>AINoticeIndicator</code> will be displayed.
	 *
	 * @public
	 * @default "Default"
	*/
	@property()
	displayMode: `${AINoticeIndicatorDisplayMode}` = AINoticeIndicatorDisplayMode.Default;

	/**
	 * Defines the popover of the component.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	_popover!: Array<HTMLElement>;

	_controlNeededWidth: number = 0;
	_onResize!: ResizeObserverCallback;

	constructor() {
		super();

		this._onResize = this._handleResize.bind(this);
	}

	_handleResize() {
		if (!this._label) {
			return;
		}

		const containerWidth = this.offsetWidth;
		const margin = 2;

		// Compare total width to container width
		if (this._controlNeededWidth + margin > containerWidth) {
			this._label.style.display = "none";
		} else {
			this._label.style.display = "";
		}
	}

	_getNeededWidthToDisplayControlFully = () => {
		if (!this._label) {
			return;
		}

		// Get widths
		const buttonWidth = this._button?.offsetWidth || 0;
		const linkWidth = this._label?.offsetWidth || 0;
		const labelWidth = this._label?.offsetWidth || 0;

		this._controlNeededWidth = buttonWidth + linkWidth + labelWidth;
	}

	_onLinkPress() {
		this.fireDecoratorEvent("notice-press");
	}

	get _showIconButton() {
		return this.displayMode === AINoticeIndicatorDisplayMode.Emphasized
			|| this.displayMode === AINoticeIndicatorDisplayMode.IconOnly
			|| (!this.attributionText && !this.verificationText);
	}

	/**
	 * Lifecycle methods
	 */
	onEnterDOM() {
		requestAnimationFrame(() => {
			this._getNeededWidthToDisplayControlFully();
		});
		ResizeHandler.register(this, this._onResize);
	}

	onExitDOM() {
		this._controlNeededWidth = 0;
		ResizeHandler.deregister(this, this._onResize);
	}

	get _button() {
		return this.shadowRoot?.querySelector<HTMLElement>("ui5-button");
	}

	get _link() {
		return this.shadowRoot?.querySelector<HTMLElement>("ui5-link");
	}

	get _label() {
		return this.shadowRoot?.querySelector<HTMLElement>("ui5-label");
	}
}

AINoticeIndicator.define();

export default AINoticeIndicator;
