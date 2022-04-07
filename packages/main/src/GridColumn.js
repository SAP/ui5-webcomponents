import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import GridColumnTemplate from "./generated/templates/GridColumnTemplate.lit.js";

// Styles
import GridColumnCss from "./generated/themes/GridColumn.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-grid-column",
	properties: /** @lends sap.ui.webcomponents.main.GridColumn.prototype */ {
		name: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.GridColumn.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.GridColumn.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-grid-column</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridColumn.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.GridColumn
 * @extends UI5Element
 * @tagname ui5-grid-column
 * @public
 */
class GridColumn extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return GridColumnCss;
	}

	static get template() {
		return GridColumnTemplate;
	}

	static get dependencies() {
		return [];
	}
}

GridColumn.define();

export default GridColumn;
