import ToolbarSpacerTemplate from "./generated/templates/ToolbarSpacerTemplate.lit.js";

import OverflowItem from "./OverflowItem.js";

class ToolbarSpacer extends OverflowItem {
	static get metadata() {
		return {
			tag: "ui5-toolbar-spacer",
			properties: {
				/**
				 * Button width
				 * @public
				 */
				width: {
					type: String,
				},
			},
		};
	}

	get isSpacer() {
		return true;
	}

	get overflowToolbarTemplate() {
		return ToolbarSpacerTemplate;
	}

	get overflowPopoverTemplate() {
		return ToolbarSpacerTemplate;
	}
}

ToolbarSpacer.define();

export default ToolbarSpacer;
