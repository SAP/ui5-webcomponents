import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import AINoticeIndicatorMode from "./types/AINoticeIndicatorMode.js";
import {
	BUTTON_TEXT_CLOSE,
	POPOVER_TEXT,
} from "./generated/i18n/i18n-defaults.js";


// Template
import AINoticeIndicatorTemplate from "./AINoticeIndicatorTemplate.js";

// Styles
import AINoticeIndicatorCss from "./generated/themes/AINoticeIndicator.css.js";

/**
 * @class
 *
 * ### Overview
 * 
 * The `ui5-ai-notice-indicator` component provides an AI-related notice that can include attribution and verification text.
 * It allows users to toggle visibility and adjust its appearance based on different modes.
 * 
 * ### Usage
 * 
 * The component supports different display modes:
 * - **Default**: Displays both attribution and verification text.
 * - **Shortened**: Displays a condensed version of the notice.
 * - **Emphasized**: Highlights the notice for better visibility.
 * - **IconOnly**: Only shows an icon when no text is provided.
 * 
 * The `ui5-ai-notice-indicator` can be expanded or collapsed when interacted with, and includes a close button to dismiss it.
 * 
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/AINoticeIndicator.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.6.0
 */

@customElement({
	tag: "ui5-ai-notice-indicator",
	renderer: jsxRender,
	styles: AINoticeIndicatorCss,
	template: AINoticeIndicatorTemplate,
})

class AINoticeIndicator extends UI5Element {
	/**
	 * Determines the AI attribution notice text.
	 *
	 * @default "Created with AI."
	 * @public
	 */
	@property({ type: String })
	attributionText = "Created with AI.";

	/**
	 * Determines the verification prompt text.
	 *
	 * @default "Verify results before use."
	 * @public
	 */
	@property({ type: String })
	verificationText = "Verify results before use.";

	/**
	 * Determines whether the mode of AI icon.
	 *
	 * @default "Default"
	 * @public
	 */
	@property()
	mode: `${AINoticeIndicatorMode}` = "Default"

	@property({ type: Boolean })
	_popoverOpen = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get isIconOnly() {
		return this.mode == AINoticeIndicatorMode.IconOnly;
	}

	get isShortened() {
		return this.mode == AINoticeIndicatorMode.Shortened;
	}

	get isEmphasized() {
		return this.mode == AINoticeIndicatorMode.Emphasized;
	}

	get _closeButtonText() {
		return AINoticeIndicator.i18nBundle.getText(BUTTON_TEXT_CLOSE);
	}

	get _popoverText() {
		return AINoticeIndicator.i18nBundle.getText(POPOVER_TEXT);
	}

	get _popover() {
		return this.shadowRoot?.querySelector("ui5-responsive-popover") as ResponsivePopover;
	}

	_handleToggleClick(e: Event) {
		const popover = this._popover;
		if (popover) {
			popover.open = !popover.open;
		}
	}

	_handlePopoverClose() {
		const popover = this._popover;
		if (popover) {
			popover.open = false;
		}
	}
}

AINoticeIndicator.define();

export default AINoticeIndicator;
