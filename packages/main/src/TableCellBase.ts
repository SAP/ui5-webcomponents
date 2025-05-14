import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, slot, property, i18n,
} from "@ui5/webcomponents-base/dist/decorators.js";
import { toggleAttribute } from "./TableUtils.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableCellBaseStyles from "./generated/themes/TableCellBase.css.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type TableCellHorizontalAlign from "./types/TableCellHorizontalAlign.js";

/**
 * @class
 * A class to serve as a foundation for the `TableCell` and `TableHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0.0
 * @public
 */
@customElement({
	renderer: jsxRenderer,
	styles: TableCellBaseStyles,
})
abstract class TableCellBase extends UI5Element {
	/**
	 * Defines the content of the component.
	 *
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: Array<Node>;

	/**
	 * Determines the horizontal alignment of table cells.
	 *
	 * @default undefined
	 * @public
	 */
	@property()
    horizontalAlign?: `${TableCellHorizontalAlign}`;

	@property({ type: Boolean })
	_popin = false;

	@property({ type: Boolean, noAttribute: true })
	_popinHidden = false;

	protected ariaRole: string = "gridcell";

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	onEnterDOM() {
		this.toggleAttribute("ui5-table-cell-base", true);
	}

	onBeforeRendering() {
		toggleAttribute(this, "role", !this._popin, this.ariaRole);
	}

	getFocusDomRef() {
		return this;
	}

	isTableCellBase() {
		return true;
	}
}

export default TableCellBase;
