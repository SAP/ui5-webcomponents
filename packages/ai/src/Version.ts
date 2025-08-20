import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";

// Types
import VersionTemplate from "./VersionTemplate.js";

// Styles
import VersionCss from "./generated/themes/Version.css.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>sap-writing-assistant-version</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @sap-webcomponents/rich-text-editor/dist/Version.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
@customElement({
	tag: "sap-writing-assistant-version",
	renderer: jsxRenderer,
	styles: VersionCss,
	template: VersionTemplate,
})

/**
 * Fired when the user clicks on the "Previous Version" button.
 *
 * @public
 */
@event("previous-version-click")

/**
 * Fired when the user clicks on the "Next Version" button.
 *
 * @public
 */
@event("next-version-click")

class Version extends UI5Element {
	eventDetails!: {
		"previous-version-click": object,
		"next-version-click": object,
	}

	/**
	 * Indicates the index of the currently displayed result version.
	 *
	 * The index is **1-based** (i.e. `1` represents the first result).
	 *
	 * @default 1
	 * @public
	 */
	@property({ type: Number })
	currentStep = 1;

	/**
	 * Indicates the total number of result versions available.
	 *
	 * When not set or `0`, versioning UI will be hidden.
	 *
	 * @default 0
	 * @public
	 */
	@property({ type: Number })
	totalSteps = 0;

	_handlePreviousVersionClick() {
		this.fireDecoratorEvent("previous-version-click");
	}

	_handleNextVersionClick() {
		this.fireDecoratorEvent("next-version-click");
	}
}

Version.define();

export default Version;
