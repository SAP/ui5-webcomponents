import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
	shadowRootOptions: { delegatesFocus: true },
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
	 * Determines whether the mode of AI icon.
	 *
	 * @default "Default"
	 * @public
	 */
	@property()
	mode: `${AINoticeIndicatorMode}` = "Default"

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

    get _usePopover() {
		return this.shadowRoot?.querySelector("[ui5-responsive-popover]") as HTMLElement;
	}

	get _verificationText() {
		return this.verificationText;
	}

	get _titleText() {
		return this.attributionText;
	}

    get _closeButtonText() {
		return AINoticeIndicator.i18nBundle.getText(BUTTON_TEXT_CLOSE);
	}

	get _popoverText() {
		return AINoticeIndicator.i18nBundle.getText(POPOVER_TEXT);
	}

    getMode(): void {
		if (this.attributionText && this.verificationText) {
            this.mode = AINoticeIndicatorMode.IconOnly;
		}

        this.mode = AINoticeIndicatorMode.Default;
	}

    _handleCloseButtonClick(e: MouseEvent) {
		this._usePopover;
		e.stopPropagation();
	}

	_handleToggleClick() {
		this._usePopover;
	}

	_handlePopoverClose() {
		this._usePopover;
	}
}

AINoticeIndicator.define();

export default AINoticeIndicator;
