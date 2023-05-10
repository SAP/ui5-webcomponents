import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import ToolbarSeparatorTemplate from "./generated/templates/ToolbarSeparatorTemplate.lit.js";

import ToolbarItem from "./ToolbarItem.js";

@customElement({
	tag: "ui5-toolbar-separator",
})

class ToolbarSeparator extends ToolbarItem {
	get toolbarTemplate() {
		return ToolbarSeparatorTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarSeparatorTemplate;
	}
}

ToolbarSeparator.define();

export default ToolbarSeparator;
