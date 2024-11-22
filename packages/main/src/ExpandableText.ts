import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Text from "./Text.js";
import Link from "./Link.js";
import ResponsivePopover from "./ResponsivePopover.js";
import Button from "./Button.js";
import ExpandableTextOverflowMode from "./types/ExpandableTextOverflowMode.js";
import type TextEmptyIndicatorMode from "./types/TextEmptyIndicatorMode.js";
import {
	EXPANDABLE_TEXT_SHOW_LESS,
	EXPANDABLE_TEXT_SHOW_MORE,
	EXPANDABLE_TEXT_CLOSE,
} from "./generated/i18n/i18n-defaults.js";

// Template
import ExpandableTextTemplate from "./generated/templates/ExpandableTextTemplate.lit.js";

// Styles
import ExpandableTextCss from "./generated/themes/ExpandableText.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-expandable-text` component allows displaying a large body of text in a small space. It provides an "expand" functionality, which shows the full text.
 *
 * ### Usage</h3>
 *
 * #### When to use:
 * - You specifically have to deal with long texts
 *
 * #### When not to use:
 * - Do not use long texts and descriptions if you can provide short and meaningful alternatives
 * - The content is critical for the user. In this case use short descriptions that can fit in
 *
 * ### Responsive Behavior
 *
 * On phones, when the component is set to show the full text in a popover, the popover will be displayed full screen.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Text";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.5.0
 */
@customElement({
	tag: "ui5-expandable-text",
	renderer: litRender,
	styles: ExpandableTextCss,
	template: ExpandableTextTemplate,
	dependencies: [
		Text,
		Link,
		ResponsivePopover,
		Button,
	],
})
class ExpandableText extends UI5Element {
	/**
	 * Text of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Maximum number of characters to be displayed. After them, a "show more" trigger will be displayed.
	 * @default Infinity
	 * @public
	 */
	@property({ type: Number })
	maxCharacters : number = Infinity;

	/**
	 * Determines how the full text will be displayed.
	 * @default "InPlace"
	 * @public
	 */
	@property()
	overflowMode: `${ExpandableTextOverflowMode}` = ExpandableTextOverflowMode.InPlace

	/**
	 * Specifies if an empty indicator should be displayed when there is no text.
	 * @default "Off"
	 * @public
	 */
	@property()
	emptyIndicatorMode: `${TextEmptyIndicatorMode}` = "Off";

	@property({ type: Boolean })
	_expanded = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	_preventNextToggleClickHandling = false;

	getFocusDomRef(): HTMLElement | undefined {
		if (this._usePopover) {
			return this.shadowRoot?.querySelector("[ui5-responsive-popover]") as HTMLElement;
		}

		return this.shadowRoot?.querySelector("ui5-link") as HTMLElement;
	}

	get _displayedText() {
		if (this._expanded && !this._usePopover) {
			return this.text;
		}

		return this.text?.substring(0, this.maxCharacters);
	}

	get _maxCharactersExceeded() {
		return (this.text?.length || 0) > this.maxCharacters;
	}

	get _usePopover() {
		return this.overflowMode === ExpandableTextOverflowMode.Popover;
	}

	get _ellipsisText() {
		if (this._expanded && !this._usePopover) {
			return " ";
		}

		return "... ";
	}

	get _textForToggle() {
		return this._expanded ? ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_LESS) : ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_SHOW_MORE);
	}

	get _closeButtonText() {
		return ExpandableText.i18nBundle.getText(EXPANDABLE_TEXT_CLOSE);
	}

	_handlePopoverClose() {
		if (!isPhone()) {
			this._expanded = false;

			// TODO: find way to prevent next click handling, only if the popover is closed by a click on the toggle (link)
			// if (this.shadowRoot!.activeElement === this.shadowRoot!.querySelector("[ui5-link]")) {
			// 	this._preventNextToggleClickHandling = true;
			// }
		}
	}

	_handleToggleClick() {
		// if (this._preventNextToggleClickHandling) {
		// 	this._preventNextToggleClickHandling = false;
		// 	return;
		// }

		this._expanded = !this._expanded;
	}

	_handleCloseButtonClick(e: CustomEvent) {
		this._expanded = false;
		e.stopPropagation();
	}
}

ExpandableText.define();

export default ExpandableText;
