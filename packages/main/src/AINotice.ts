import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import AINoticeTemplate from "./generated/templates/AINoticeTemplate.lit.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import AINoticeCss from "./generated/themes/AINotice.css.js";
import { AINOTICE_BUTTON_TOOLTIP } from "./generated/i18n/i18n-defaults.js";

import Link from "./Link.js";
import Button from "./Button.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";

/**
 * @class
 *
 * ### Overview
 * The `AINotice` component is a custom UI5 web component that displays an informational notice.
 * It can include text for attribution and verification, as well as an optional icon. The layout
 * of the component adapts based on its content and available space.
 *
 * ### Usage
 * Use the `AINotice` component when you need to display an informational message with the option to include attribution, verification, and an icon.
 *
 * **Properties:**
 * - `attributionText`: The text for attribution (e.g., source or author).
 * - `verificationText`: The text for verification (e.g., "Verified", "Approved").
 * - `showIcon`: A boolean indicating whether the icon should be shown.
 *
 * **Note**: The layout dynamically adjusts based on the available space and the content's width. If space is limited, verification text may be hidden to maintain the layout.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/AINotice.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.4.0
 */

@customElement({
	tag: "ui5-ainotice",
	renderer: litRender,
	template: AINoticeTemplate,
	styles: AINoticeCss,
	dependencies: [Link, Button, Popover, Icon],
})

class AINotice extends UI5Element {

	/**
	 * A callback function used for resizing logic.
	 * @private
	 */
	_handleResize: ResizeObserverCallback;

	/**
	 * Defines the attribution text to be displayed in the component.
	 * @public
	 */
	@property()
	attributionText = "";

	/**
	 * Defines the verification text to be displayed in the component.
	 * @public
	 */
	@property()
	verificationText = "";

	/**
	 * Defines whether an icon should be shown in the component.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showIcon = false;

	/**
	 * The popup slot allows for custom popups to be inserted into the component.
	 * @public
	 */
	@slot({ type: HTMLElement })
	popup!: HTMLElement;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._handleResize = this.resizeWidth.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	/**
	 * A getter that determines whether the component is in the "emphasized" state, which includes attribution text, verification text, and an icon.
	 */
	get isEmphasized(): boolean {
		return !!this.attributionText && !!this.verificationText && this.showIcon;
	}

	/**
	 * A getter that determines whether the component is in the "icon-only" state, where only the icon is displayed.
	 */
	get isIconOnly(): boolean {
		return !this.attributionText && !this.verificationText && this.showIcon;
	}

	/**
	 * A getter that determines whether the component is in the "shortened" state, which shows only attribution text and hides verification text and icon.
	 */
	get isShortened(): boolean {
		return !!this.attributionText && !this.verificationText && !this.showIcon;
	}

	get tooltipValue() {
		return AINotice.i18nBundle.getText(AINOTICE_BUTTON_TOOLTIP);
	}

	/**
	 * Resizes the component based on its content and the available space.
	 * It adjusts the visibility of the verification text depending on the available width.
	 */
	resizeWidth() {
		const container = this.getDomRef();
		const verificationText = this.shadowRoot?.querySelector(".verificationText") as HTMLElement;
		const attributionText = this.shadowRoot?.querySelector(".link-text") as HTMLElement;
		if (container && verificationText && attributionText) {
			const containerWidth = container.offsetWidth;
			const verificationTextWidth = verificationText.offsetWidth;
			const attributionTextWidth = attributionText ? attributionText.offsetWidth : 0;

			const aInputRelevantCSS = ["padding-left"]; // Relevant CSS for padding
			const computedStyle = window.getComputedStyle(verificationText);
			const paddingLeft = parseInt(computedStyle.getPropertyValue(aInputRelevantCSS[0]) || "0"); // Fallback to "0" if no value is found
			const combinedWidth = verificationTextWidth + attributionTextWidth + paddingLeft;

			// Show or hide verification text based on available space
			if (combinedWidth <= containerWidth) {
				verificationText.style.visibility = "visible";
			} else {
				verificationText.style.visibility = "hidden";
			}
		}
	}

	/**
	 * Handles the click event for the component and opens the associated popup.
	 */
	onPress(e: Event) {
		const popup = this.getPopup();
		popup.opener = e.target as HTMLElement;
		popup.open = true;
	}

	getPopup() {
		const popup = this.querySelector<Popover>("ui5-popover")!;
		return popup;
	}
}

AINotice.define();

export default AINotice;
