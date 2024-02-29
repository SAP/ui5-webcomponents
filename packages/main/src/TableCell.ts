import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import TableCellTemplate from "./generated/templates/TableCellTemplate.lit.js";

// Styles
import tableCellStyles from "./generated/themes/TableCell.css.js";

// Texts
import {
	ARIA_LABEL_EMPTY_CELL,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-table-cell` component defines the structure of the data in a single `ui5-table` cell.
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart cell - Used to style the native `td` element
 */
@customElement({
	tag: "ui5-table-cell",
	renderer: litRender,
	template: TableCellTemplate,
	styles: tableCellStyles,
})
class TableCell extends UI5Element {
	/**
	 * @private
	 */
	@property({ type: Boolean })
	lastInRow!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	popined!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_popinedInline!: boolean;

	/**
	 * Specifies the content of the component.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content?: Array<HTMLElement>;

	static i18nBundle: I18nBundle;
	static async onDefine() {
		TableCell.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	get cellContent(): Array<HTMLElement> {
		return this.getSlottedNodes<HTMLElement>("content");
	}

	get ariaLabelEmptyCellText(): string {
		return TableCell.i18nBundle.getText(ARIA_LABEL_EMPTY_CELL);
	}
}

TableCell.define();

export default TableCell;
