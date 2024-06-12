import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import GridCellBaseStyles from "./generated/themes/GridCellBase.css.js";

/**
 * @class
 * A class to serve as a foundation for the `GridCell` and `GridHeaderCell` classes.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.0
 * @public
 */
@customElement({
	renderer: litRender,
	styles: GridCellBaseStyles,
})
abstract class GridCellBase extends UI5Element {
	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	content!: Array<Node>;

	@property({ type: Boolean })
	_popin!: boolean;

	@property({ type: String, defaultValue: "Left" })
	hAlign!: string;

	protected ariaRole: string = "gridcell";

	static i18nBundle: I18nBundle;
	static async onDefine() {
		GridCellBase.i18nBundle = await getI18nBundle("@ui5/webcomponents");
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

export default GridCellBase;
