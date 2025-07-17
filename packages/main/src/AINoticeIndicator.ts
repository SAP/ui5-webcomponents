import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";

import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
// Template
import AINoticeIndicatorTemplate from "./AINoticeIndicatorTemplate.js";
// Styles
import AINoticeIndicatorCss from "./generated/themes/AINoticeIndicator.css.js";

import type Link from "./Link.js";
import type AINoticeIndicatorMode from "./types/AINoticeIndicatorMode.js";
import type { LinkClickEventDetail } from "./Link.js";
import type ResponsivePopover from "./ResponsivePopover.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

import { AI_NOTICE_ATTRIBUTION_TEXT, AI_NOTICE_VERIFICATION_TEXT } from "./generated/i18n/i18n-defaults.js";

@customElement({
	tag: "ui5-ai-notice-indicator",
	languageAware: true,
	renderer: jsxRenderer,
	styles: AINoticeIndicatorCss,
	template: AINoticeIndicatorTemplate,
})
class AINoticeIndicator extends UI5Element {
	/**
	 * AI attribution notice text (e.g., "Created with AI").
	 */
	@property()
	attributionText?: string;

	/**
	 * AI verification prompt text (e.g., "Verify results before use").
	 */
	@property()
	verificationText?: string;

	/**
	 * The mode of the AI Notice Indicator.
	 * It can be set to "Default", "Shortened", "Emphasized", or "IconOnly".
	*/
	@property({ type: String })
	mode: `${AINoticeIndicatorMode}` = "Default";

	/**
	 * Slot for popover content.
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true })
	aiNoticePopover!: Array<HTMLElement>;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	constructor() {
		super();
	}

	get attributionTextValue() {
		if (this.attributionText) {
			return this.attributionText;
		}

		const defaultLabel = AINoticeIndicator.i18nBundle.getText(AI_NOTICE_ATTRIBUTION_TEXT);

		return defaultLabel;
	}

	get verificationTextValue() {
		if (this.verificationText) {
			return this.verificationText;
		}

		const defaultLabel = AINoticeIndicator.i18nBundle.getText(AI_NOTICE_VERIFICATION_TEXT);

		return defaultLabel;
	}

	_openRespPopover(e: CustomEvent<LinkClickEventDetail>) {
		const resPopover = this.getSlottedNodes<ResponsivePopover>("aiNoticePopover")[0];
		if (resPopover) {
			resPopover.opener = e.target as Link;
			resPopover.openPopup();
		}
	}
}

AINoticeIndicator.define();

export default AINoticeIndicator;
