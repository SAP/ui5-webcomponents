import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import GridTemplate from "./generated/templates/GridTemplate.lit.js";

// Styles
import GridCss from "./generated/themes/Grid.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-grid",
	properties: /** @lends sap.ui.webcomponents.main.Grid.prototype */ {
		//
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Grid.prototype */ {
		columns: {
			type: HTMLElement,
			individualSlots: true,
		},
		"default": {
			propertyName: "cells",
			type: HTMLElement,
			individualSlots: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Grid.prototype */ {
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
 * For the <code>ui5-grid</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Grid.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Grid
 * @extends UI5Element
 * @tagname ui5-grid
 * @public
 */
class Grid extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return GridCss;
	}

	static get template() {
		return GridTemplate;
	}

	static get dependencies() {
		return [];
	}

	get rows() {
		const colCount = this.columns.length;
		if (colCount === 0) {
			return [];
		}

		const rows = [];
		let row = [];
		this.cells.forEach(cell => {
			row.push(cell);
			if (row.length === colCount) {
				rows.push(row);
				row = [];
			}
		});

		return rows;
	}
}

Grid.define();

export default Grid;
