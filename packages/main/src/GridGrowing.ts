import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";

import Grid, { IGridGrowing } from "./Grid.js";
import GridGrowingMode from "./types/GridGrowingMode.js";
import GridGrowingTemplate from "./generated/templates/GridGrowingTemplate.lit.js";
import GridGrowingCss from "./generated/themes/GridGrowing.css.js";
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
	 * * Scroll - The rows are loaded automatically by scrolling to the bottom of the grid. If the grid is not scrollable, this option is the same as the Button.
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

	/**
	 * Disables the growing feature.
	 */
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

	static i18nBundle: I18nBundle;

	static async onDefine() {
		GridGrowing.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	onGridActivate(grid: Grid): void {
		this._grid = grid;
		this._shouldFocusRow = false;
		if (this._hasScrollToLoad()) {
			this._observeGridEnd();
		}
	}

	onGridRendered(): void {
		// Focus the first row after growing, when the growing button is used
		if (this._shouldFocusRow) {
			this._shouldFocusRow = false;
			let focusRow = this._currentLastRow?.nextElementSibling as HTMLElement;

			if (this.hasGrowingComponent()) {
				focusRow ||= this.getFocusDomRef() as HTMLElement;
			}

			focusRow ||= this._grid?.rows[0] as HTMLElement;

			focusRow?.focus();
		}

		if (this.disabled) {
			return;
		}

		if (this._hasScrollToLoad()) {
			this._observeGridEnd();
		}
	}

	onExitDOM(): void {
		this._grid = undefined;
		this._observer?.disconnect();
		this._observer = undefined;
		this._currentLastRow = undefined;
	}

	onBeforeRendering(): void {
		this._observer?.disconnect();
		this._observer = undefined;
		this._currentLastRow = undefined;
		this._invalidateGrid();
	}

	hasGrowingComponent(): boolean {
		if (this._hasScrollToLoad()) {
			return !this._grid?._scrollContainer;
		}

		return this.type === GridGrowingMode.Button && !this.disabled;
	}

	/**
	 * An event handler that can be used by the Grid to notify the GridGrowing that
	 * the Grid is growing either by pressing the load more button or by scrolling to the end of the grid.
	 */
	loadMore(): void {
		// remembers the last row. only do this when the grid has a growing component rendered.
		if (this._grid && this.hasGrowingComponent()) {
			this._currentLastRow = this._grid.rows[this._grid.rows.length - 1];
		}
		this._shouldFocusRow = true;

		this.fireEvent("load-more");
	}

	focus(focusOptions?: FocusOptions | undefined): Promise<void> {
		const focusDomRef = this.getFocusDomRef();
		if (focusDomRef) {
			focusDomRef.setAttribute("tabindex", "-1");
		}
		return UI5Element.prototype.focus.call(this, focusOptions);
	}

	_hasScrollToLoad() {
		return this.type === GridGrowingMode.Scroll;
	}

	/**
	 * Observes the end of the grid.
	 * @private
	 */
	_observeGridEnd(): void {
		if (!this._grid) {
			return;
		}

		const lastElement = this._grid.shadowRoot?.querySelector("#table-end-row");
		if (lastElement) {
			this._getIntersectionObserver().observe(lastElement);
		}
	}

	/**
	 * Returns the IntersectionObserver instance. If it does not exist, it will be created.
	 * The observer will call the loadMore function when the end of the grid is reached.
	 * @private
	 */
	_getIntersectionObserver(): IntersectionObserver {
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
		return this.growingText || GridGrowing.i18nBundle.getText(GRID_MORE);
	}

	get _growingButtonDescription() {
		return GridGrowing.i18nBundle.getText(GRID_MORE_DESCRIPTION);
	}

	get _hasGrowingButton() {
		return this.hasGrowingComponent();
	}
}

GridGrowing.define();

export default GridGrowing;
