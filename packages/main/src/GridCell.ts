import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { ClassMap } from "@ui5/webcomponents-base/dist/types.js";

import GridCellTemplate from "./generated/templates/GridCellTemplate.lit.js";
import GridCellCss from "./generated/themes/GridCell.css.js";
import GridHeaderCell from "./GridHeaderCell.js";

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
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-cell",
	renderer: litRender,
	styles: GridCellCss,
	template: GridCellTemplate,
	dependencies: [],
})
class GridCell extends UI5Element {
	/**
	 * Defines the content of the component.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	@property({ type: Boolean, noAttribute: true })
	_invalidate!: boolean;

	_info!: { header: Node | string | null, poppedIn: boolean };

	_column!: GridHeaderCell;

	constructor() {
		super();
		this._info = { header: null, poppedIn: false };
	}

	onEnterDOM(): void {
		this.setAttribute("role", "gridcell");
		this.setAttribute("tabindex", "0");
	}

	onBeforeRendering(): void {
		if (this._info.poppedIn) {
			this.setAttribute("tabindex", "-1");
			this.removeAttribute("role");
		} else {
			this.setAttribute("role", "gridcell");
			this.setAttribute("tabindex", "0");
		}
	}

	set _columnInfo(c: { header: Node | string | null, poppedIn: boolean }) {
		this._info = c;
		this._invalidate = false;
		this._invalidate = true;
	}

	get _columnInfo() {
		return this._info;
	}

	get classes(): ClassMap {
		return {
			"popin": {
				"popin-area": true,
				"inline": false,
				"block": true,
			},
		};
	}
}

GridCell.define();

export default GridCell;
