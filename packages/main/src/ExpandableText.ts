import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Text from "./Text.js";
import Link from "./Link.js";
import ResponsivePopover from "./ResponsivePopover.js";
import ExpandableTextOverflowMode from "./types/ExpandableTextOverflowMode.js";

// Template
import ExpandableTextTemplate from "./generated/templates/ExpandableTextTemplate.lit.js";

// Styles
import ExpandableTextCss from "./generated/themes/ExpandableText.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>expandable-text</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/ExpandableText.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
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
	maxCharacters = Number.POSITIVE_INFINITY;

	/**
	 * Determines how the full text will be displayed.
	 */
	@property()
	overflowMode: `${ExpandableTextOverflowMode}` = ExpandableTextOverflowMode.InPlace

	@property({ type: Boolean })
	_expanded = false;
	_popoverClosed = false;

	onAfterRendering() {
		this._popoverClosed = false;
	}

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

	get _toggleText() {
		return this._expanded ? "Show Less" : "Show More";
	}

	_handleShowLessClick() {
		this._expanded = false;
	}

	_handleShowMoreClick() {
		this._expanded = true;
	}

	_handlePopoverClose() {
		this._toggleExpanded();
		this._popoverClosed = true;
	}

	_toggleExpanded() {
		if (this._popoverClosed) {
			return;
		}
		this._expanded = !this._expanded;
	}
}

ExpandableText.define();

export default ExpandableText;
