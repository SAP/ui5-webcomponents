import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import TableCellBaseStyles from "./generated/themes/TableCellBase.css.js";

/**
 * @class
 * A class to serve as a foundation for the `TableCell` and `TableHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({
	renderer: litRender,
	styles: TableCellBaseStyles,
})
abstract class TableCellBase extends UI5Element {
	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: Array<Node>;

	@property({ type: Boolean })
	_popin = false;

	protected ariaRole: string = "gridcell";

	static i18nBundle: I18nBundle;
	static async onDefine() {
		TableCellBase.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		if (this._popin) {
			this.removeAttribute("role");
		} else {
			this.setAttribute("role", this.ariaRole);
		}
	}

	getFocusDomRef() {
		return this;
	}
}

export default TableCellBase;
