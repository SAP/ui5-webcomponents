import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import { isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isIOS, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import GridRowTemplate from "./generated/templates/GridRowTemplate.lit.js";
import GridRowBase from "./GridRowBase.js";
import GridRowCss from "./generated/themes/GridRow.css.js";
import GridCell from "./GridCell.js";
import RadioButton from "./RadioButton.js";

/**
 * @class
 *
 * ### Overview
 *
 * @constructor
 * @extends GridRowBase
 * @since 2.0
 * @public
 */
@customElement({
	tag: "ui5-grid-row",
	styles: [GridRowBase.styles, GridRowCss],
	template: GridRowTemplate,
	dependencies: [...GridRowBase.dependencies, RadioButton, GridCell],
})
class GridRow extends GridRowBase {
	/**
	 * Defines the cells of the component.
	 *
	 * **Note:** Use `ui5-grid-cell` for the intended design.
	 *
	 * @public
	 */
	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: ["_popin"],
			slots: false,
		},
	})
	cells!: Array<GridCell>;

	/**
	 * Unique identifier of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	key = "";

	/**
	 * Defines the interactive state of the row.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive = false;

	static async onDefine() {
		await super.onDefine();
		if (isSafari() && isIOS()) {
			// Safari on iOS does not use the :active state unless there is a touchstart event handler on the <body> element
			document.body.addEventListener("touchstart", () => {});
		}
	}

	onBeforeRendering() {
		super.onBeforeRendering();
		this.toggleAttribute("_interactive", this._isInteractive);
	}

	async focus(focusOptions?: FocusOptions | undefined): Promise<void> {
		this.setAttribute("tabindex", "-1");
		HTMLElement.prototype.focus.call(this, focusOptions);
		return Promise.resolve();
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		super._onkeydown(e, eventOrigin);
		if (e.defaultPrevented) {
			return;
		}

		if (eventOrigin === this && this._isInteractive && isEnter(e)) {
			this.toggleAttribute("_active", true);
			this._grid?._onRowPress(this);
		}
	}

	_onclick() {
		if (this._isInteractive && this === getActiveElement()) {
			this._grid?._onRowPress(this);
		}
	}

	_onkeyup() {
		this.removeAttribute("_active");
	}

	_onfocusout() {
		this.removeAttribute("_active");
	}

	get _isInteractive() {
		return this.interactive;
	}
}

GridRow.define();

export default GridRow;
