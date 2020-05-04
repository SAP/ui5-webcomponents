import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-toolbar-spacer",
	properties: /** @lends sap.ui.webcomponents.main.ToolbarSpacer.prototype */ {
		//
	},
	slots: /** @lends sap.ui.webcomponents.main.ToolbarSpacer.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.ToolbarSpacer.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * Flex control that adds horizontal space between the items used within a ui5-overflow-toolbar.
 *
 * <h3>Usage</h3>
 * <code>ui5-toolbar-spacer</code> is used only inside <code>ui5-overflow-toolbar</code>.
 *
 *
 * For the <code>ui5-toolbar-spacer</code>
 * <h3>ES6 Module Import</h3>
 *
 * <b>Note:</b>
 * You don't have to import this component. It comes out of the box with the <code>ui5-overflow-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ToolbarSpacer
 * @extends UI5Element
 * @tagname ui5-toolbar-spacer
 * @public
 */
class ToolbarSpacer extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}
}

ToolbarSpacer.define();

export default ToolbarSpacer;
