import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";
import AINoticeIndicatorMode from "./types/AINoticeIndicatorMode.js";
import {
	AI_NOTICE_INDICATOR_CLOSE_BUTTON_TEXT,
	AI_NOTICE_INDICATOR_POPOVER_CONTENT,
	AI_NOTICE_INDICATOR_ATTRIBUTIONTEXT,
	AI_NOTICE_INDICATOR_VERIFICATIONTEXT
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
 * Depending on the mode chosen, the user can configure which parts of the component will be visible.
 * 
 * ### Usage
 * 
 * The component supports different display modes:
 * - **Default**: Displays both attribution and verification text.
 * - **Shortened**: Displays a condensed version of the notice without verification text.
 * - **Emphasized**: Includes an icon and both attribution and verification text.
 * - **IconOnly**: Only displays an icon. Note: This mode is not recommended, we suggest always providing a text.
 * 
 * The `ui5-ai-notice-indicator` opens a popover on interaction, and includes a close button to dismiss it.
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
	 * @default undefined
	 * @public
	 */
	@property()
	attributionText?: string;

	/**
	 * Determines the verification prompt text.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	verificationText?: string;

	/**
	 * Determines content of the popover.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	popoverText?: string;

	/**
	 * Determines text of the close button inside the popover.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
	closeButtonText?: string;

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

	get _attributionText() {
		return this.attributionText || AINoticeIndicator.i18nBundle.getText(AI_NOTICE_INDICATOR_ATTRIBUTIONTEXT);
	}

	get _verificationText() {
		return this.verificationText || AINoticeIndicator.i18nBundle.getText(AI_NOTICE_INDICATOR_VERIFICATIONTEXT);
	}

	get _closeButtonText() {
		return this.closeButtonText || AINoticeIndicator.i18nBundle.getText(AI_NOTICE_INDICATOR_CLOSE_BUTTON_TEXT);
	}

	get _popoverText() {
		return this.popoverText || AINoticeIndicator.i18nBundle.getText(AI_NOTICE_INDICATOR_POPOVER_CONTENT);
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
