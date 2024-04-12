import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";

import Grid, { IGridGrowing } from "./Grid.js";
import GridGrowingMode from "./types/GridGrowingMode.js";
import GridGrowingTemplate from "./generated/templates/GridGrowingTemplate.lit.js";
import GridGrowingCss from "./generated/themes/GridGrowing.css.js";
import GridColumnMode from "./types/GridColumnMode.js";
import {
	GRID_MORE,
	GRID_MORE_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";

// The documentation should be similar to the Table.ts class documentation!
// Please only use that style where it uses markdown and the documentation is more readable.

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-grid-growing` component is used inside the `ui5-grid` to add a growing/data loading functionalities
 * to the grid.
 *
 * The component offers two options:
 * * Button - a More button is displayed, clicking it will load more data.
 * * Scroll - additional data is loaded automatically when the user scrolls to the end of the grid.
 *
 * ### Usage
 *
 * The `ui5-grid-growing` component is only used inside the `ui5-grid` component as a feature.
 * It has to be slotted inside the `ui5-grid` in the `features` slot.
 * The component is not intended to be used as a standalone component.
 *
 * ```html
 * <ui5-grid>
 * 	<ui5-grid-growing type="Button" growing-text="More" slot="features">
 * 	</ui5-grid-growing>
 * </ui5-grid>
 * ```
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/GridGrowing.js";`
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-grid-growing",
	renderer: litRender,
	template: GridGrowingTemplate,
	styles: GridGrowingCss,
})

/**
 * Fired when the growing button is pressed or the user scrolls to the end of the grid.
 *
 * @public
 */
@event("load-more")

class GridGrowing extends UI5Element implements IGridGrowing {
	/**
	 * Defines the mode of the <code>ui5-grid</code> growing.
	 *
	 * Available options are:
	 * * Button - Shows a More button at the bottom of the grid, pressing it will load more rows.
	 * * Scroll - The rows are loaded automatically by scrolling to the bottom of the grid.
	 * @default GridGrowingMode.Button
	 * @public
	 */
	@property({ type: GridGrowingMode, defaultValue: GridGrowingMode.Button })
	type!: `${GridGrowingMode}`;

	/**
	 * Defines the text that will be displayed inside the growing button.
	 * Has no effect when type is set to Scroll.
	 *
	 * **Note:** When not provided and the type is set to Button, a default text is displayed, corresponding to the
	 * current language.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	growingText!: string;

	/**
	 * Defines the text that will be displayed below the `growingText` inside the growing button.
	 * Has no effect when type is set to Scroll.
	 *
	 * @default ""
	 * @public
	 */
	@property({ type: String })
	growingSubText!: string;

	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the active state of the growing button.
	 * Used for keyboard interaction.
	 * @private
	 */
	@property({ type: Boolean })
	_activeState?: boolean;

	_grid?: Grid;
	_observer?: IntersectionObserver;
	_individualSlot?: string;
	_currentLastRow?: HTMLElement;
	_shouldFocusRow?: boolean;

	static async onDefine() {
		Grid.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onGridActivate(grid: Grid): void {
		this._grid = grid;
		this._shouldFocusRow = false;
		if (this.hasScrollToLoad()) {
			this.observeGridEnd();
		}
	}

	onGridRendered(): void {
		if (this.disabled) {
			return;
		}

		// focus the first new item after growing
		if (this.hasScrollToLoad()) {
			this.observeGridEnd();
		}

		// Focus the first row after growing, when the growing button is used
		if (this._shouldFocusRow) {
			this._shouldFocusRow = false;
			const focusRow = this._currentLastRow?.nextElementSibling as HTMLElement
				|| this._grid?._growingControl as HTMLElement
				|| this._grid?.rows[0] as HTMLElement;
			focusRow?.focus();
		}
	}

	onExitDOM(): void {
		this._grid = undefined;
		this._observer?.disconnect();
		this._observer = undefined;
	}

	onBeforeRendering(): void {
		this._observer?.disconnect();
		this._observer = undefined;
		this._invalidateGrid();
	}

	hasGrowingControl(): boolean {
		return this.type === GridGrowingMode.Button && !this.disabled;
	}

	/**
	 * An event handler that can be used by the Grid to notify the GridGrowing that
	 * the Grid is growing either by pressing the load more button or by scrolling to the end of the grid.
	 */
	loadMore(): void {
		// remembers the last row
		if (this._grid) {
			this._currentLastRow = this._grid.rows[this._grid.rows.length - 1];
			this._shouldFocusRow = true;
		}

		if (this._grid?.columnMode === GridColumnMode.Popin) {
			this._grid._onResize();
		}

		this.fireEvent("load-more");
	}

	hasScrollToLoad() {
		return this.type === GridGrowingMode.Scroll;
	}

	/**
	 * Observes the end of the grid.
	 * @private
	 */
	observeGridEnd(): void {
		if (!this._grid) {
			return;
		}

		const lastElement = this._grid.shadowRoot?.querySelector("#table-end-row");
		if (lastElement) {
			this.getIntersectionObserver().observe(lastElement);
		}
	}

	/**
	 * Returns the IntersectionObserver instance. If it does not exist, it will be created.
	 * The observer will call the loadMore function when the end of the grid is reached.
	 * @private
	 */
	getIntersectionObserver(): IntersectionObserver {
		if (!this._observer) {
			this._observer = new IntersectionObserver(this._onIntersection.bind(this), {
				root: document,
				rootMargin: "10px",
				threshold: 1.0,
			});
		}
		return this._observer;
	}

	_onIntersection(entries: Array<IntersectionObserverEntry>) {
		if (entries.some(entry => entry.isIntersecting)) {
			this.loadMore();
		}
	}

	_invalidateGrid() {
		if (!this._grid) {
			return;
		}
		this._grid._invalidate++;
	}

	/**
	 * Handles the keydown event on the growing button.
	 *
	 * Calls the loadMore function when the Enter and Space keys are pressed.
	 * @private
	 */
	_onKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this._activeState = true;
		}

		if (isEnter(e)) {
			this.loadMore();
			this._activeState = true;
		}
	}

	_onKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.loadMore();
		}
		this._activeState = false;
	}

	_onFocusout() {
		this._activeState = false;
	}

	get _growingButtonText() {
		return this.growingText || Grid.i18nBundle.getText(GRID_MORE);
	}

	get _growingButtonDescription() {
		return Grid.i18nBundle.getText(GRID_MORE_DESCRIPTION);
	}

	get _hasGrowingButton() {
		return this.type === GridGrowingMode.Button;
	}
}

GridGrowing.define();

export default GridGrowing;
