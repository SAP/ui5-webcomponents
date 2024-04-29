import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import { isIOS, isSafari } from "@ui5/webcomponents-base/dist/Device.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

import GridRowTemplate from "./generated/templates/GridRowTemplate.lit.js";
import GridRowCss from "./generated/themes/GridRow.css.js";
import GridCell from "./GridCell.js";
import Grid from "./Grid.js";
import GridSelection from "./GridSelection.js";
import RadioButton from "./RadioButton.js";
import CheckBox from "./CheckBox.js";
import {
	GRID_ROW_SELECTOR,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-grid-row</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/GridRow.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-row",
	renderer: litRender,
	styles: GridRowCss,
	template: GridRowTemplate,
	dependencies: [RadioButton, CheckBox],
})
class GridRow extends UI5Element {
	/**
	 * Defines the cells of the component.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-grid-cell</code> for the intended design.
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
	key!: string;

	/**
	 * Defines the interactive state of the row.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	interactive!: boolean;

	@property({ type: Integer, defaultValue: 0, noAttribute: true })
	_invalidate!: number;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		GridRow.i18nBundle = await getI18nBundle("@ui5/webcomponents");
		if (isSafari() && isIOS()) {
			// Safari on iOS does not use the :active state unless there is a touchstart event handler on the <body> element
			document.body.addEventListener("touchstart", () => {});
		}
	}

	onEnterDOM() {
		this.setAttribute("role", "row");
	}

	onBeforeRendering() {
		this.toggleAttribute("_interactive", this._isInteractive);
		if (this._isSelectable) {
			this.setAttribute("aria-selected", `${this._isSelected}`);
		} else {
			this.removeAttribute("aria-selected");
		}
	}

	getFocusDomRef() {
		return this;
	}

	async focus(focusOptions?: FocusOptions | undefined): Promise<void> {
		this.setAttribute("tabindex", "-1");
		HTMLElement.prototype.focus.call(this, focusOptions);
		return Promise.resolve();
	}

	_informSelectionChange() {
		this._gridSelection?.informRowSelectionChange(this);
	}

	_onkeydown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if ((eventOrigin === this && this._isSelectable && isSpace(e)) || (eventOrigin === this._selectionCell && (isSpace(e) || isEnter(e)))) {
			this._informSelectionChange();
			e.preventDefault();
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

	get _grid(): Grid | undefined {
		const grid = this.parentElement;
		return grid instanceof Grid ? grid : undefined;
	}

	get _gridId() {
		return this._grid?._id;
	}

	get _isInteractive() {
		return this.interactive;
	}

	get _gridSelection(): GridSelection | undefined {
		return this._grid?._getSelection();
	}

	get _isSelected() {
		return this._gridSelection?.isSelected(this);
	}

	get _isSelectable() {
		return this._gridSelection?.isSelectable();
	}

	get _isMultiSelect() {
		return this._gridSelection?.isMultiSelect();
	}

	get _hasRowSelector() {
		return this._gridSelection?.hasRowSelector();
	}

	get _selectionCell() {
		return this.shadowRoot!.getElementById("selection-cell");
	}

	get _visibleCells() {
		return this.cells.filter(c => !c._popin);
	}

	get _popinCells() {
		return this.cells.filter(c => c._popin);
	}

	get _i18nRowSelector(): string {
		return GridRow.i18nBundle.getText(GRID_ROW_SELECTOR);
	}
}

GridRow.define();

export default GridRow;
