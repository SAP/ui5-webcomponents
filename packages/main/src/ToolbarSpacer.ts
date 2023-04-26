import ToolbarSpacerTemplate from "./generated/templates/ToolbarSpacerTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";

class ToolbarSpacer extends ToolbarItem {
	static get metadata() {
		return {
			tag: "ui5-toolbar-spacer",
			properties: {
				/**
				 * Spacer width
				 * @public
				 */
				width: {
					type: String,
				},
			},
		};
	}

	get styles() {
		return this.width ? { width: this.width } : { flex: "auto" };
	}

	get ignoreSpace() {
		return true;
	}

	get template() {
		return ToolbarSpacerTemplate;
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
