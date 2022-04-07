import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import GridCellTemplate from "./generated/templates/GridCellTemplate.lit.js";

// Styles
import GridCellCss from "./generated/themes/GridCell.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-grid-cell",
	properties: /** @lends sap.ui.webcomponents.main.GridCell.prototype */ {
		column: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.GridCell.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.main.GridCell.prototype */ {
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
 * For the <code>ui5-grid-cell</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridCell.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.GridCell
 * @extends UI5Element
 * @tagname ui5-grid-cell
 * @public
 */
class GridCell extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return GridCellCss;
	}

	static get template() {
		return GridCellTemplate;
	}

	static get dependencies() {
		return [];
	}
}

GridCell.define();

export default GridCell;
