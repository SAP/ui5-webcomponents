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

// Styles
import AINoticeIndicatorCss from "./generated/themes/AINoticeIndicator.css.js";

/**
 * @class
 *
 * AI Notice control is identifying AI-generated text, providing explanations, or collecting user feedback.
 *
 * <h3>Responsive Behavior</h3>
 *
 * The AI notice can be shortened if the available horizontal space becomes insufficient due to resizing of the screen or collision with bordering UI elements.
 *
 * <h3>Usage</h3>
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
class AINoticeIndicator extends UI5Element {
	/**
	 * Link text for AI Notice Control
	 *
	 * @public
	 * @default ""
	*/
	@property()
	attributionText: string = "";

	/**
	 * Description text for AI Notice Control
	 *
	 * @public
	 * @default ""
	*/
	@property()
	verificationText: string = "";

	/**
	 * Show icon for AI Notice Control link text
	 *
	 * @public
	 * @default false
	*/
	@property({
		type: Boolean,
		converter: {
			fromAttribute(value) {
				return value !== null && value !== "false";
			},
			toAttribute(value: unknown) {
				// If value is true, include the attribute, else omit it
				return value ? "" : null;
			},
		},
	})
	showIcon: boolean = false;

	/**
	 * Enable/Disable action on click - showing popup
	 *
	 * @public
	 * @default true
	*/
	@property({
		type: Boolean,
		converter: {
			fromAttribute(value) {
				return value !== null && value !== "false";
			},
			toAttribute(value: unknown) {
				// If value is true, include the attribute, else omit it
				return value ? "" : null;
			},
		},
	})
	enabled = true;

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
	_popoverAnchor!: Button | Link;

	constructor() {
		super();

		this._onResize = this._handleResize.bind(this);
	}

	_handleResize() {
		if (!this.shadowRoot) {
			return;
		}

		const label = this.shadowRoot.querySelector<HTMLElement>("ui5-label");

		if (!label) {
			return;
		}

		const containerWidth = this.offsetWidth;
		const margin = 2;

		// Compare total width to container width
		if (this._controlNeededWidth + margin > containerWidth) {
			label.style.display = "none";
		} else {
			label.style.display = "";
		}
	}

	_handlePopoverToggleClick = () => {
		if (this._popover.length) {
			const popover = this._popover[0] as Popover;
			popover.opener = this._popoverAnchor;
			popover.openPopup();
		}
	}

	_getNeededWidthToDisplayControlFully = () => {
		if (!this.shadowRoot) {
			return;
		}

		const button = this.shadowRoot.querySelector<HTMLElement>("ui5-button");
		const link = this.shadowRoot.querySelector<HTMLElement>("ui5-link");
		const label = this.shadowRoot.querySelector<HTMLElement>("ui5-label");

		if (!label) {
			return;
		}

		// Get widths
		const buttonWidth = button?.offsetWidth || 0;
		const linkWidth = link?.offsetWidth || 0;
		const labelWidth = label?.offsetWidth || 0;

		this._controlNeededWidth = buttonWidth + linkWidth + labelWidth;
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
}

AINoticeIndicator.define();

export default AINoticeIndicator;
