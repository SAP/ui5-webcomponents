import ToolbarSeparatorTemplate from "./generated/templates/ToolbarSeparatorTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";

class ToolbarSeparator extends ToolbarItem {
	static get metadata() {
		return {
			tag: "ui5-toolbar-separator",
			properties: {
			},
		};
	}

	get ignoreSpace() {
		return true;
	}

	get toolbarTemplate() {
		return ToolbarSeparatorTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarSeparatorTemplate;
	}
}

ToolbarSeparator.define();

export default ToolbarSeparator;
