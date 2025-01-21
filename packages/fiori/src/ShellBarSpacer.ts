import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-shellbar-spacer` is an element, used for visual separation between the two content parts of the `ui5-shellbar`.
 * **Note:** The `ui5-shellbar-spacer` component is in an experimental state and is a subject to change.
 * @constructor
 * @extends UI5Element
 * @since 2.7.0
 * @abstract
 * @public
 */
@customElement({
	tag: "ui5-shellbar-spacer",
})

class ShellBarSpacer extends UI5Element {
	@property({ type: Boolean })
	visible = false;
}

ShellBarSpacer.define();

export default ShellBarSpacer;
