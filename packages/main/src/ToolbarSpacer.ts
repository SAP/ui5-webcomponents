import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarSpacerTemplate from "./generated/templates/ToolbarSpacerTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";

@customElement({
	tag: "ui5-toolbar-spacer",
})

class ToolbarSpacer extends ToolbarItem {
	static get metadata() {
		return {
			tag: "ui5-toolbar-spacer",
			properties: {

			},
		};
	}

	/**
	 * Spacer width
	 * @public
	 */
	@property({ type: String })
	width!: string

	get styles() {
		return this.width ? { width: this.width } : { flex: "auto" };
	}

	get ignoreSpace() {
		return true;
	}

	get toolbarTemplate() {
		return ToolbarSpacerTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarSpacerTemplate;
	}
}

ToolbarSpacer.define();

export default ToolbarSpacer;
