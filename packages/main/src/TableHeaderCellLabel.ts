import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import TableHeaderCellLabelTemplate from "./TableHeaderCellLabelTemplate.js";
import TableHeaderCellLabelStyles from "./generated/themes/TableHeaderCellLabel.css.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type WrappingType from "./types/WrappingType.js";
import type TableSortOrder from "./types/TableSortOrder.js";
import type Popover from "./Popover.js";
import type Text from "./Text.js";
import {
	TABLE_AI_GENERATED_COLUMN_LINE1,
	TABLE_AI_GENERATED_COLUMN_LINE2,
} from "./generated/i18n/i18n-defaults.js";

let PopoverConstructor: new () => Popover;
let TextConstructor: new () => Text;

/**
 * @class
 *
 * ### Overview
 *
 * The TableHeaderCellLabel provides the ability to render a label inside a table header cell.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TableHeaderCellLabel";`
 *
 * @constructor
 * @extends UI5Element
 * @slot {Array<Node>} default - Defines the text of the component.
 * @since 2.7.0
 * @private
 */
@customElement({
	tag: "ui5-table-header-cell-label",
	renderer: jsxRenderer,
	template: TableHeaderCellLabelTemplate,
	styles: TableHeaderCellLabelStyles,
})
class TableHeaderCellLabel extends UI5Element {
	/**
	 * Defines the sort-order indicator.
	 *
	 * @default "None"
	 * @public
	 */
	@property()
	sortOrder: `${TableSortOrder}` = "None";

	/**
	 * Defines whether ai-generated indicator is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	aiGenerated = false;

	/**
	 * Defines whether an asterisk character is added to the component text.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	required = false;

	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 *
	 * @default "None"
	 * @public
	 */
	@property()
	wrappingType: `${WrappingType}` = "None";

	/**
	 * Defines whether the label is shown in the popin.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	popin = false;

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	private static popover: Popover;
	private static async getPopover() {
		if (!PopoverConstructor) {
			[PopoverConstructor, TextConstructor] = await Promise.all([
				import("./Popover.js").then(module => module.default),
				import("./Text.js").then(module => module.default),
			]);
		}

		if (!this.popover || !this.popover.isConnected) {
			const text = new TextConstructor();
			text.style.whiteSpace = "pre-line";
			text.textContent = [
				this.i18nBundle.getText(TABLE_AI_GENERATED_COLUMN_LINE1),
				this.i18nBundle.getText(TABLE_AI_GENERATED_COLUMN_LINE2),
			].join("\n\n");
			this.popover = new PopoverConstructor();
			this.popover.style.maxWidth = "25rem";
			this.popover.append(text);
			document.body.append(this.popover);
		}

		return this.popover;
	}

	async _onAIButtonClick(e: MouseEvent) {
		const popover = await TableHeaderCellLabel.getPopover();
		popover.opener = e.target as HTMLElement;
		popover.open = true;
	}
}

TableHeaderCellLabel.define();

export default TableHeaderCellLabel;
