import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { supportsTouch } from "@ui5/webcomponents-base/dist/Device.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isLeft,
	isLeftShift,
	isRight,
	isRightShift,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { PassiveEventListenerObject } from "@ui5/webcomponents-base/dist/types.js";
import FCLLayout from "./types/FCLLayout.js";
import type { LayoutConfiguration } from "./fcl-utils/FCLLayout.js";
import {
	getLayoutsByMedia,
	getNextLayoutByStartArrow,
	getNextLayoutByEndArrow,
} from "./fcl-utils/FCLLayout.js";

// Texts
import {
	FCL_START_COLUMN_TXT,
	FCL_MIDDLE_COLUMN_TXT,
	FCL_END_COLUMN_TXT,
	FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP,
	FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP,
	FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP,
	FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

// Template
import FlexibleColumnLayoutTemplate from "./generated/templates/FlexibleColumnLayoutTemplate.lit.js";

// Styles
import FlexibleColumnLayoutCss from "./generated/themes/FlexibleColumnLayout.css.js";

enum MEDIA {
	PHONE = "phone",
	TABLET = "tablet",
	DESKTOP = "desktop",
}

const BREAKPOINTS = {
	"PHONE": 599,
	"TABLET": 1023,
} as const;

const COLUMN_MIN_WIDTH = 312;

const COLUMN_INDEX = { // TODO to type
	START: 0,
	MID: 1,
	END: 2,
};

type EDGE_COLUMN = 0 | 2;

type FlexibleColumnLayoutColumnLayout = Array<string | number>;

type FlexibleColumnLayoutLayoutChangeEventDetail = {
	layout: `${FCLLayout}`,
	columnLayout: FlexibleColumnLayoutColumnLayout,
	startColumnVisible: boolean,
	midColumnVisible: boolean,
	endColumnVisible: boolean,
	arrowUsed: boolean,
	arrowsUsed: boolean,
	resize: boolean,
};

type FlexibleColumnLayoutAccessibilityTexts = {
	startColumnAccessibleName?: I18nText;
	startArrowContainerAccessibleName?: I18nText;
	startArrowLeftText?: I18nText;
	startArrowRightText?: I18nText;
	midColumnAccessibleName?: I18nText;
	endColumnAccessibleName?: I18nText;
	endArrowContainerAccessibleName?: I18nText;
	endArrowRightText?: I18nText;
	endArrowLeftText?: I18nText;
};

type FlexibleColumnLayoutAccessibilityRoles = {
	startColumnRole?: I18nText;
	midColumnRole?: I18nText;
	endColumnRole?: I18nText;
	startArrowContainerRole?: I18nText;
	endArrowContainerRole?: I18nText;
};

type UserDefinedColumnLayouts = {
	"tablet": {
		[layoutName in FCLLayout]?: FlexibleColumnLayoutColumnLayout;
	},
	"desktop": {
		[layoutName in FCLLayout]?: FlexibleColumnLayoutColumnLayout;
	},
}

/**
 * @class
 *
 * ### Overview
 *
 * The `FlexibleColumnLayout` implements the list-detail-detail paradigm by displaying up to three pages in separate columns.
 * There are several possible layouts that can be changed either with the component API, or by pressing the arrows, displayed between the columns.
 *
 * ### Usage
 *
 * Use this component for applications that need to display several logical levels of related information side by side (e.g. list of items, item, sub-item, etc.).
 * The Component is flexible in a sense that the application can focus the user's attention on one particular column.
 *
 * ### Responsive Behavior
 *
 * The `FlexibleColumnLayout` automatically displays the maximum possible number of columns based on `layout` property and the window size.
 * The component would display 1 column for window size smaller than 599px, up to two columns between 599px and 1023px,
 * and 3 columns for sizes bigger than 1023px.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 *
 * - [Space] / [Enter] or [Return] - If focus is on the layout toggle button (arrow button), once activated, it triggers the associated action (such as expand/collapse the column).
 * - This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-flexible-column-layout",
	fastNavigation: true,
	renderer: litRender,
	styles: FlexibleColumnLayoutCss,
	template: FlexibleColumnLayoutTemplate,
	dependencies: [Button],
})

/**
 * Fired when the layout changes via user interaction by clicking the arrows
 * or by changing the component size due to resizing.
 * @param {FCLLayout} layout The current layout
 * @param {array} columnLayout The effective column layout, f.e [67%, 33%, 0]
 * @param {boolean} startColumnVisible Indicates if the start column is currently visible
 * @param {boolean} midColumnVisible Indicates if the middle column is currently visible
 * @param {boolean} endColumnVisible Indicates if the end column is currently visible
 * @param {boolean} arrowsUsed Indicates if the layout is changed via the arrows
 * @param {boolean} resize Indicates if the layout is changed via resizing
 * @public
 */
@event<FlexibleColumnLayoutLayoutChangeEventDetail>("layout-change", {
	detail: {
		/**
		* @public
		*/
		layout: { type: FCLLayout },
		/**
		* @public
		*/
		columnLayout: { type: Array },
		/**
		* @public
		*/
		startColumnVisible: { type: Boolean },
		/**
		* @public
		*/
		midColumnVisible: { type: Boolean },
		/**
		* @public
		*/
		endColumnVisible: { type: Boolean },
		/**
		* @public
		*/
		arrowsUsed: { type: Boolean },
		/**
		 * @public
		*/
		resize: { type: Boolean },
		/**
		 * @private
		*/
		arrowUsed: { type: Boolean },
	},
})
class FlexibleColumnLayout extends UI5Element {
	/**
	* Defines the columns layout and their proportion.
	*
	* **Note:** The layout also depends on the screen size - one column for screens smaller than 599px,
	* two columns between 599px and 1023px and three columns for sizes bigger than 1023px.
	*
	* **For example:** layout=`TwoColumnsStartExpanded` means the layout will display up to two columns
	* in 67%/33% proportion.
	* @default "OneColumn"
	* @public
	*/
	@property({ type: FCLLayout, defaultValue: FCLLayout.OneColumn })
	layout!: `${FCLLayout}`;

	/**
	* Defines the visibility of the arrows,
	* used for expanding and shrinking the columns.
	* @default false
	* @public
	* @since 1.0.0-rc.15
	*/
	@property({ type: Boolean })
	hideArrows!: boolean;

	/**
	* An object of strings that defines several additional accessibility texts for even further customization.
	*
	* It supports the following fields:
	*  - `startColumnAccessibleName`: the accessibility name for the `startColumn` region
	*  - `midColumnAccessibleName`: the accessibility name for the `midColumn` region
	*  - `endColumnAccessibleName`: the accessibility name for the `endColumn` region
	*  - `startArrowLeftText`: the text that the first arrow (between the `begin` and `mid` columns) will have when pointing to the left
	*  - `startArrowRightText`: the text that the first arrow (between the `begin` and `mid` columns) will have when pointing to the right
	*  - `endArrowLeftText`: the text that the second arrow (between the `mid` and `end` columns) will have when pointing to the left
	*  - `endArrowRightText`: the text that the second arrow (between the `mid` and `end` columns) will have when pointing to the right
	*  - `startArrowContainerAccessibleName`: the text that the first arrow container (between the `begin` and `mid` columns) will have as `aria-label`
	*  - `endArrowContainerAccessibleName`: the text that the second arrow container (between the `mid` and `end` columns) will have as `aria-label`
	* @default {}
	* @public
	* @since 1.0.0-rc.11
	*/
	@property({ type: Object })
	accessibilityTexts!: FlexibleColumnLayoutAccessibilityTexts;

	/**
	* An object of strings that defines additional accessibility roles for further customization.
	*
	* It supports the following fields:
	*  - `startColumnRole`: the accessibility role for the `startColumn`
	*  - `startArrowContainerRole`: the accessibility role for the first arrow container (between the `begin` and `mid` columns)
	*  - `midColumnRole`: the accessibility role for the `midColumn`
	*  - `endArrowContainerRole`: the accessibility role for the second arrow container (between the `mid` and `end` columns)
	*  - `endColumnRole`: the accessibility role for the `endColumn`
	* @default {}
	* @public
	* @since 1.1.0
	*/
	@property({ type: Object })
	accessibilityRoles!: FlexibleColumnLayoutAccessibilityRoles;

	/**
	* Defines the component width in px.
	* @default 0
	* @private
	*/
	@property({ validator: Float, defaultValue: 0 })
	_width!: number;

	/**
	* Defines the effective columns layout,
	* based on both the `layout` property and the screen size.
	* Example: [67%, 33%, 0], [25%, 50%, 25%], etc.
	* @default undefined
	* @private
	*/
	@property({ type: Object, defaultValue: undefined })
	_columnLayout?: FlexibleColumnLayoutColumnLayout;

	/**
	* Defines the visible columns count - 1, 2 or 3.
	* @default 1
	* @private
	*/
	@property({ validator: Integer, defaultValue: 0 })
	_visibleColumns!: number;

	/**
	* Allows the user to replace the whole layouts configuration
	* @private
	*/
	@property({ type: Object, defaultValue: undefined })
	_layoutsConfiguration?: LayoutConfiguration;

	/**
	* Defines the content in the start column.
	* @public
	*/
	@slot()
	startColumn!: Array<HTMLElement>;

	/**
	* Defines the content in the middle column.
	* @public
	*/
	@slot()
	midColumn!: Array<HTMLElement>;

	/**
	* Defines the content in the end column.
	* @public
	*/
	@slot()
	endColumn!: Array<HTMLElement>;

	initialRendering: boolean;
	_handleResize: () => void;
	_handleMove: (e: TouchEvent | MouseEvent) => void;
	_handleUp: (e: TouchEvent | MouseEvent) => void;
	static i18nBundle: I18nBundle;
	_prevLayout: `${FCLLayout}` | null;
	_userDefinedColumnLayouts: UserDefinedColumnLayouts = {
		tablet: {},
		desktop: {},
	};
	_ontouchstart: PassiveEventListenerObject;
	cursorX?: number;
	movedSeparator?: HTMLElement; // which separator is dragged

	constructor() {
		super();

		this._prevLayout = null;
		this.initialRendering = true;
		this._handleResize = this.handleResize.bind(this);
		this._handleMove = this.handleMove.bind(this);
		this._handleUp = this.handleUp.bind(this);

		const handleTouchStartEvent = (e: TouchEvent) => {
			this.handleDown(e);
		};

		this._ontouchstart = {
			handleEvent: handleTouchStartEvent,
			passive: true,
		};
	}

	static async onDefine() {
		FlexibleColumnLayout.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	static get ANIMATION_DURATION() {
		return getAnimationMode() !== AnimationMode.None ? 560 : 0;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize.bind(this));
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	onAfterRendering() {
		if (this.initialRendering) {
			this.handleInitialRendering();
			return;
		}

		this.syncLayout();
	}

	handleInitialRendering() {
		this._prevLayout = this.layout;
		this.updateLayout();
		this.initialRendering = false;
	}

	handleResize() {
		if (this.initialRendering) {
			return;
		}

		// store the previous layout
		const prevLayoutHash = this.columnLayout!.join();

		// update the column layout, based on the current width
		this.updateLayout();

		// fire layout-change if the column layout changed
		if (prevLayoutHash !== this.columnLayout!.join()) {
			this.fireLayoutChange(false, true);
		}
	}

	updateLayout() {
		this._width = this.widthDOM;
		this._columnLayout = this.nextColumnLayout(this.layout);
		this._visibleColumns = this.calcVisibleColumns(this._columnLayout);
		this.toggleColumns();
	}

	syncLayout() {
		if (this._prevLayout !== this.layout) {
			this.updateLayout();
			this._prevLayout = this.layout;
		}
	}

	toggleColumns() {
		this.toggleColumn("start");
		this.toggleColumn("mid");
		this.toggleColumn("end");
	}

	toggleColumn(column: string) {
		let columnWidth;
		let columnDOM;

		if (column === "start") {
			columnWidth = this.startColumnWidth;
			columnDOM = this.startColumnDOM;
		} else if (column === "mid") {
			columnWidth = this.midColumnWidth;
			columnDOM = this.midColumnDOM;
		} else {
			columnWidth = this.endColumnWidth;
			columnDOM = this.endColumnDOM;
		}

		const currentlyHidden = this._isColumnHidden(columnWidth);
		const previouslyHidden = this._isColumnHidden(columnDOM.style.width);

		// no change
		if (currentlyHidden && previouslyHidden) {
			return;
		}

		// column resizing: from 33% to 67%, from 25% to 50%, etc.
		if (!currentlyHidden && !previouslyHidden) {
			columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
			return;
		}

		// hide column: 33% to 0, 25% to 0, etc .
		if (currentlyHidden) {
			// animate the width
			columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;

			// hide column with delay to allow the animation runs entirely
			columnDOM.addEventListener("transitionend", this.columnResizeHandler);

			return;
		}

		// show column: from 0 to 33%, from 0 to 25%, etc.
		if (previouslyHidden) {
			columnDOM.removeEventListener("transitionend", this.columnResizeHandler);
			columnDOM.classList.remove("ui5-fcl-column--hidden");
			columnDOM.style.width = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
		}
	}

	columnResizeHandler = (e: Event) => {
		(e.target as HTMLElement).classList.add("ui5-fcl-column--hidden");
	}

	nextLayout(layout: `${FCLLayout}`, arrowsInfo: { start: boolean, end: boolean }) {
		if (!arrowsInfo) {
			return;
		}

		if (arrowsInfo.start) {
			return getNextLayoutByStartArrow()[layout as keyof typeof getNextLayoutByStartArrow];
		}

		if (arrowsInfo.end) {
			return getNextLayoutByEndArrow()[layout as keyof typeof getNextLayoutByEndArrow];
		}
	}

	nextColumnLayout(layout: `${FCLLayout}`) {
		let customLayout;
		if (this.media !== MEDIA.PHONE && this._userDefinedColumnLayouts[this.media]) {
			customLayout = this._userDefinedColumnLayouts[this.media][layout];
		}
		return customLayout || this._effectiveLayoutsByMedia[this.media][layout].layout;
	}

	calcVisibleColumns(colLayout: FlexibleColumnLayoutColumnLayout) {
		return colLayout.filter(colWidth => !this._isColumnHidden(colWidth)).length;
	}

	fireLayoutChange(arrowUsed: boolean, resize: boolean) {
		this.fireEvent<FlexibleColumnLayoutLayoutChangeEventDetail>("layout-change", {
			layout: this.layout,
			columnLayout: this._columnLayout!,
			startColumnVisible: this.startColumnVisible,
			midColumnVisible: this.midColumnVisible,
			endColumnVisible: this.endColumnVisible,
			arrowUsed, // for backwards compatibility
			arrowsUsed: arrowUsed, // as documented
			resize,
		});
	}

	handleDown(e: TouchEvent | MouseEvent) {
		const pressedSeparator = (e.target as HTMLElement).closest(".ui5-fcl-grip-container") as HTMLElement;
		if (pressedSeparator.classList.contains("ui5-fcl-grip-container-start") && !this.showStartArrow) {
			return;
		}

		this.movedSeparator = pressedSeparator;
		this.cursorX = this.getPageXValueFromEvent(e);

		this.attachMoveListeners(e instanceof TouchEvent);
		this.toggleSideAnimations(pressedSeparator, false); // toggle animations for side colmns
	}

	handleMove(e: TouchEvent | MouseEvent) {
		e.preventDefault(); // TODO: check if needed

		const latestCursorX = this.getPageXValueFromEvent(e),
			latestSeparatorX = this.movedSeparator!.getBoundingClientRect().x, // TODO: can we agoid getBoundingClientRect
			movementDelta = latestCursorX - this.cursorX!,
			isStartSeparator = this.movedSeparator! === this.startSeparatorDOM,
			isForwardMove = movementDelta > 0; // is start-to-end direction

		if (!movementDelta) {
			return;
		}

		// if the dragged separator was re-rendered away from the cursor
		// due to change of layout during drag
		// => check if the cursor lags-behind the separator
		// and skip resizing untill the cursor catches-up with the separator
		if (this.isSeparatorAheadOfCursor(latestCursorX, latestSeparatorX, isForwardMove)) {
			this.cursorX = latestCursorX;
			return;
		}

		// synchronously move the separator in DOM => resizes the columns accordingly
		this.moveSeparator(isStartSeparator, movementDelta, false);

		this.cursorX = latestCursorX;
	}

	private handleUp() {
		// ensure %
		this._columnLayout!.forEach((w, i) => { // TODO refactor to move inside function
			this._columnLayout![i] = this.convertToRelativeColumnWidth(w);
		});
		this.toggleColumns();

		const separator = this.movedSeparator!;
		this.detachMoveListeners();
		this.toggleSideAnimations(separator, true);

		separator.focus();
		this.movedSeparator = undefined;
	}

	private isSeparatorAheadOfCursor(cursorX: number, separatorX: number, isForwardMove: boolean) {
		if (isForwardMove) {
			return separatorX > cursorX;
		}
		return separatorX < cursorX;
	}

	// sounds odd
	calculateNewColumnWidth(columnToResize: EDGE_COLUMN, columnLayout: Array<number>, separatorOffset: number) {
		const previousColumnWidth = columnLayout[columnToResize];
		const newColumnWidth = columnToResize === COLUMN_INDEX.START
			? previousColumnWidth + separatorOffset
			: previousColumnWidth - separatorOffset;

		// correct if needed against constraint for column-minimal-required-width
		return this.normalizeColumnWidth(newColumnWidth, columnToResize as EDGE_COLUMN, columnLayout);
	}

	moveSeparator(isStartSeparator: boolean, offsetX: number, isResizeEnd: boolean) {
		const previousLayout = this.layout,
			oldColumnLayout: Array<number> = this._columnLayout!.map(x => this.convertColumnWidthToPixels(x)),
			newColumnLayout = [...oldColumnLayout],
			columnToResize = isStartSeparator ? COLUMN_INDEX.START : COLUMN_INDEX.END,
			media = this.media as MEDIA.TABLET | MEDIA.DESKTOP,
			isRTL = this.effectiveDir === "rtl";

		if (isRTL) {
			offsetX = -offsetX;
		}

		const newColumnWidth = this.calculateNewColumnWidth(columnToResize as EDGE_COLUMN, oldColumnLayout, offsetX),
			isExpandingWidth = newColumnWidth > oldColumnLayout[columnToResize],
			forwardDirection = offsetX > 0;

		// required when the user is dragging a separator to reveal a hidden column
		this.displayColumnIfHidden(columnToResize);
		// update the columnLayout array with the new column widths
		this.adjustColumnLayout(newColumnLayout, columnToResize, newColumnWidth);

		if (!offsetX && !isResizeEnd) {
			return;
		}

		// obtain the layout that corresponds to the new column widths
		this.layout = this.getNextLayoutOnMoveSeparator(isStartSeparator, forwardDirection, newColumnLayout);
		const layoutChange = this.layout !== previousLayout,
			visibleColumnsChange = layoutChange
			&& this.getColumnsVisibilityHash(this.layout as FCLLayout)
			!== this.getColumnsVisibilityHash(previousLayout as FCLLayout);

		if (visibleColumnsChange) { // the user dragged the separator to a point where the layout should change
			// but *the new layout also requires some column to be shown or hidden*
			// => the old _columnLayout is no longer valid and should be updated:
			this._columnLayout = this.nextColumnLayout(this.layout);
			this._visibleColumns = this.calcVisibleColumns(this._columnLayout);
		}
		// apply the requested <code>offset</code> on the new <code>columnLayout</code>
		this.adjustColumnLayout(this._columnLayout!, columnToResize, newColumnWidth, isExpandingWidth);

		this.toggleColumns();
		this._userDefinedColumnLayouts[media][this.layout] = [...this._columnLayout!];
		if (layoutChange) {
			this.fireLayoutChange(true, false);
		}
	}

	displayColumnIfHidden(columnToOffset: number) {
		if (!this._columnLayout) {
			return;
		}
		const columnIsHidden = this._isColumnHidden(this._columnLayout[columnToOffset]);
		if (columnIsHidden) {
			const columnDOM = this.getDomRef()!.querySelectorAll(".ui5-fcl-column")[columnToOffset];
			columnDOM.classList.remove("ui5-fcl-column--hidden");
			columnDOM.removeAttribute("aria-hidden");
		}
	}

	adjustColumnLayout(columnLayout: Array<string|number>, columnToResize: number, newSize: number, isExpandingColumn? : boolean) {
		if (this._isColumnHidden(columnLayout[columnToResize]) && isExpandingColumn === false) {
			// the user move was a transition to hide the column
			newSize = 0;
			this.handleUp(); // TODO
		}

		columnLayout.forEach((x, i) => {
			columnLayout[i] = this.convertColumnWidthToPixels(x);
		});

		// apply the new size
		columnLayout[columnToResize] = newSize;
		columnLayout[COLUMN_INDEX.MID] = this._width
			- (columnLayout[COLUMN_INDEX.START] as number)
			- (columnLayout[COLUMN_INDEX.END] as number);
	}

	async _onkeydown(e: KeyboardEvent) {
		const stepSize = 2,
			bigStepSize = this._width;
		let step = 0;
		if (isLeft(e)) {
			step = -stepSize * 10;
		} else if (isRight(e)) {
			step = stepSize * 10;
		} else if (isLeftShift(e)) {
			step = -stepSize;
		} else if (isRightShift(e)) {
			step = stepSize;
		} else if (isHome(e)) {
			step = -bigStepSize;
		} else if (isEnd(e)) {
			step = bigStepSize;
		}

		const separator = e.target as HTMLElement,
			isStartSeparator = separator === this.startSeparatorDOM;
		this.moveSeparator(isStartSeparator, step, false);

		await renderFinished();
		separator.focus();
	}

	private normalizeColumnWidth(newColumnWidth: number, columnToResize: 0 | 2, oldColumnWidths: Array<number>) {
		const newColumnWidths = [...oldColumnWidths];

		this.adjustColumnLayout(newColumnWidths, columnToResize, newColumnWidth);
		const indexOfBelowMinWidth = newColumnWidths.findIndex(width => width && width < COLUMN_MIN_WIDTH);
		if (indexOfBelowMinWidth === -1) { // no off-limits column to normalize
			return newColumnWidth;
		}

		if (indexOfBelowMinWidth === columnToResize) {
			return COLUMN_MIN_WIDTH;
		}

		const correction = COLUMN_MIN_WIDTH - newColumnWidths[indexOfBelowMinWidth];
		// shrink the resized column by the correction value
		// to make space for its sibling column to expand to min-width
		return newColumnWidth - correction;
	}

	private attachMoveListeners(isTouch: boolean) {
		// TODO: attach to DOMRef?
		if (isTouch && supportsTouch()) {
			window.addEventListener("touchmove", this._handleMove);
			window.addEventListener("touchend", this._handleUp);
		} else {
			window.addEventListener("mousemove", this._handleMove);
			window.addEventListener("mouseup", this._handleUp);
		}
	}

	private detachMoveListeners() {
		window.removeEventListener("mouseup", this._handleUp);
		window.removeEventListener("touchend", this._handleUp);
		// Only one of the following was attached, but it's ok to remove both as there is no error
		window.removeEventListener("mousemove", this._handleMove);
		window.removeEventListener("touchmove", this._handleMove);
	}

	private toggleSideAnimations(separator: HTMLElement, shouldAnimate: boolean) {
		const adjacentColumns = [
			separator.previousElementSibling,
			separator.nextElementSibling,
		];

		adjacentColumns.forEach(column => column!.classList.toggle("ui5-fcl-column-animation", shouldAnimate));
	}

	private getPageXValueFromEvent(e: TouchEvent | MouseEvent): number {
		if (supportsTouch() && e instanceof TouchEvent) {
			if (e.changedTouches && e.changedTouches.length > 0) {
				return e.changedTouches[0].pageX;
			}
			return 0;
		}

		return (e as MouseEvent).pageX; // MouseEvent
	}

	convertColumnWidthToPixels(width: string | number) {
		if (typeof width === "number") {
			return width;
		}
		const parsedValue = parseFloat(width),
			totalWidth = this._width;

		if (width.endsWith("%")) {
			return (totalWidth / 100) * parsedValue;
		}
		return parsedValue;
	}

	convertToRelativeColumnWidth(pxWidth: string | number) {
		if (typeof pxWidth === "string") {
			return pxWidth;
		}
		if (pxWidth === 0) {
			return "0px";
		}
		return `${(pxWidth / this._width) * 100}%`;
	}

	getNextLayoutOnMoveSeparator(isStartSeparator: boolean, forwardDirection: boolean, newColumnLayout: Array<number>) {
		const separatorName = isStartSeparator ? "start" : "end",
			moved = (options: any) => {
				return options.from === this.layout
				&& options.separator === separatorName
				&& options.forward === forwardDirection;
			},
			newColumnWidths = {
				start: newColumnLayout[0],
				mid: newColumnLayout[1],
				end: newColumnLayout[2],
			},
			startColumnPxWidth = newColumnWidths.start,
			startColumnPercentWidth = (startColumnPxWidth / this.widthDOM) * 100,
			isTablet = this.media === MEDIA.TABLET;

		if (moved({
			separator: "start",
			from: FCLLayout.TwoColumnsMidExpanded,
			forward: true,
		}) && (newColumnWidths.start >= newColumnWidths.mid)) {
			return FCLLayout.TwoColumnsStartExpanded;
		}

		if (moved({
			separator: "start",
			from: FCLLayout.TwoColumnsStartExpanded,
			forward: false,
		}) && (newColumnWidths.start < newColumnWidths.mid)) {
			return FCLLayout.TwoColumnsMidExpanded;
		}

		if (moved({
			separator: "start",
			from: FCLLayout.ThreeColumnsMidExpanded,
			forward: true,
		}) && startColumnPercentWidth >= 33) {
			return FCLLayout.ThreeColumnsMidExpandedEndHidden;
		}

		if (moved({
			separator: "start",
			from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
			forward: false,
		}) && startColumnPercentWidth < 33) {
			return FCLLayout.ThreeColumnsMidExpanded;
		}

		if (moved({
			separator: "end",
			from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
			forward: false,
		}) && ((newColumnWidths.end >= COLUMN_MIN_WIDTH))) {
			return FCLLayout.ThreeColumnsMidExpanded;
		}

		if (moved({
			separator: "end",
			from: FCLLayout.ThreeColumnsMidExpanded,
			forward: false,
		}) && newColumnWidths.mid < newColumnWidths.end) {
			return FCLLayout.ThreeColumnsEndExpanded;
		}

		if (moved({
			separator: "end",
			from: FCLLayout.ThreeColumnsEndExpanded,
			forward: true,
		}) && newColumnWidths.mid >= newColumnWidths.end) {
			return FCLLayout.ThreeColumnsMidExpanded;
		}

		if (moved({
			separator: "start",
			from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
			forward: true,
		}) && newColumnWidths.start >= newColumnWidths.mid) {
			return FCLLayout.ThreeColumnsStartExpandedEndHidden;
		}

		if (moved({
			separator: "start",
			from: FCLLayout.ThreeColumnsStartExpandedEndHidden,
			forward: false,
		}) && newColumnWidths.start < newColumnWidths.mid) {
			return FCLLayout.ThreeColumnsMidExpandedEndHidden;
		}

		if (moved({
			separator: "start",
			from: FCLLayout.ThreeColumnsMidExpanded,
			forward: true,
		}) && isTablet && ((startColumnPxWidth >= COLUMN_MIN_WIDTH) /* || isResizeEnd */)) {
			return FCLLayout.ThreeColumnsMidExpandedEndHidden;
		}

		if (moved({
			separator: "end",
			from: FCLLayout.ThreeColumnsMidExpandedEndHidden,
			forward: false,
		}) && isTablet && ((newColumnWidths.end >= COLUMN_MIN_WIDTH) /* || isResizeEnd */)) {
			return FCLLayout.ThreeColumnsMidExpanded;
		}

		return this.layout; // no layout change
	}

	getColumnsVisibilityHash(layout: FCLLayout): string {
		return this.nextColumnLayout(layout).map(width => (this.convertColumnWidthToPixels(width) ? 1 : 0)).join();
	}

	/**
	 * Checks if a column is hidden based on its width.
	 */
	private _isColumnHidden(columnWidth: number | string): boolean {
		return columnWidth === 0 || columnWidth === "0px";
	}

	/**
	* Returns the current column layout, based on both the `layout` property and the screen size.
	*
	* **For example:** ["67%", "33%", 0], ["100%", 0, 0], ["25%", "50%", "25%"], etc,
	* where the numbers represents the width of the start, middle and end columns.
	* @default undefined
	* @public
	*/
	get columnLayout(): FlexibleColumnLayoutColumnLayout | undefined {
		return this._columnLayout;
	}

	/**
	* Returns if the `start` column is visible.
	* @default true
	* @public
	*/
	get startColumnVisible(): boolean {
		if (this._columnLayout) {
			return !this._isColumnHidden(this._columnLayout[0]);
		}

		return false;
	}

	/**
	* Returns if the `middle` column is visible.
	* @default false
	* @public
	*/
	get midColumnVisible(): boolean {
		if (this._columnLayout) {
			return !this._isColumnHidden(this._columnLayout[1]);
		}

		return false;
	}

	/**
	* Returns if the `end` column is visible.
	* @default false
	* @public
	*/
	get endColumnVisible(): boolean {
		if (this._columnLayout) {
			return !this._isColumnHidden(this._columnLayout[2]);
		}

		return false;
	}

	/**
	* Returns the number of currently visible columns.
	* @default 1
	* @public
	*/
	get visibleColumns(): number {
		return this._visibleColumns;
	}

	get classes() {
		const hasAnimation = getAnimationMode() !== AnimationMode.None;

		return {
			root: {
				"ui5-fcl-root": true,
			},
			columns: {
				start: {
					"ui5-fcl-column": true,
					"ui5-fcl-column-animation": hasAnimation,
					"ui5-fcl-column--start": true,
				},
				middle: {
					"ui5-fcl-column": true,
					"ui5-fcl-column-animation": hasAnimation,
					"ui5-fcl-column--middle": true,
				},
				end: {
					"ui5-fcl-column": true,
					"ui5-fcl-column-animation": hasAnimation,
					"ui5-fcl-column--end": true,
				},
			},
		};
	}

	get styles() {
		return {
			arrowsContainer: {
				start: {
					display: this.showStartSeparator ? "flex" : "none",
				},
				end: {
					display: this.showEndSeparator ? "flex" : "none",
				},
			},
			arrows: {
				start: {
					display: this.showStartArrow ? "inline-block" : "none",
				},
				end: {
					display: this.showEndArrow ? "inline-block" : "none",
				},
			},
		};
	}

	get startColumnWidth() {
		return this._columnLayout ? this._columnLayout[0] : "100%";
	}

	get midColumnWidth() {
		return this._columnLayout ? this._columnLayout[1] : "0px";
	}

	get endColumnWidth() {
		return this._columnLayout ? this._columnLayout[2] : "0px";
	}

	get showStartSeparator() {
		return this.effectiveArrowsInfo[0].separator || this.startArrowVisibility;
	}

	get showEndSeparator() {
		return this.effectiveArrowsInfo[1].separator || this.endArrowVisibility;
	}

	get showStartArrow() {
		return this.hideArrows ? false : this.startArrowVisibility;
	}

	get showEndArrow() {
		return this.hideArrows ? false : this.endArrowVisibility;
	}

	get startArrowVisibility() {
		return this.effectiveArrowsInfo[0].visible;
	}

	get endArrowVisibility() {
		return this.effectiveArrowsInfo[1].visible;
	}

	get startArrowDirection() {
		return this.effectiveArrowsInfo[0].dir;
	}

	get endArrowDirection() {
		return this.effectiveArrowsInfo[1].dir;
	}

	get effectiveArrowsInfo() {
		return this._effectiveLayoutsByMedia[this.media][this.layout].arrows;
	}

	get startSeparatorDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-grip-container-start")!;
	}

	get endSeparatorDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-grip-container-end")!;
	}

	get startSeparatorTabIndex() {
		if (this.showStartArrow) {
			return 0;
		}
	}

	get endSeparatorTabIndex() {
		if (this.showEndArrow) {
			return 0;
		}
		return -1;
	}

	get media() {
		if (this._width <= BREAKPOINTS.PHONE) {
			return MEDIA.PHONE;
		}

		if (this._width <= BREAKPOINTS.TABLET) {
			return MEDIA.TABLET;
		}

		return MEDIA.DESKTOP;
	}

	get widthDOM() {
		return this.getBoundingClientRect().width;
	}

	get startColumnDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-column--start")!;
	}

	get midColumnDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-column--middle")!;
	}

	get endColumnDOM() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-fcl-column--end")!;
	}

	get accStartColumnText() {
		return this.accessibilityTexts.startColumnAccessibleName || FlexibleColumnLayout.i18nBundle.getText(FCL_START_COLUMN_TXT);
	}

	get accMiddleColumnText() {
		return this.accessibilityTexts.midColumnAccessibleName || FlexibleColumnLayout.i18nBundle.getText(FCL_MIDDLE_COLUMN_TXT);
	}

	get accEndColumnText() {
		return this.accessibilityTexts.endColumnAccessibleName || FlexibleColumnLayout.i18nBundle.getText(FCL_END_COLUMN_TXT);
	}

	get accStartArrowContainerText() {
		return this.accessibilityTexts.startArrowContainerAccessibleName || undefined;
	}

	get accEndArrowContainerText() {
		return this.accessibilityTexts.endArrowContainerAccessibleName || undefined;
	}

	get accStartColumnRole() {
		if (this.startColumnVisible) {
			return this.accessibilityRoles.startColumnRole || "region";
		}
		return undefined;
	}

	get accMiddleColumnRole() {
		if (this.midColumnVisible) {
			return this.accessibilityRoles.midColumnRole || "region";
		}
		return undefined;
	}

	get accEndColumnRole() {
		if (this.endColumnVisible) {
			return this.accessibilityRoles.endColumnRole || "region";
		}
		return undefined;
	}

	get accStartArrowContainerRole() {
		return this.accessibilityRoles.startArrowContainerRole || "separator";
	}

	get accEndArrowContainerRole() {
		return this.accessibilityRoles.endArrowContainerRole || "separator";
	}

	get _effectiveLayoutsByMedia() {
		return this._layoutsConfiguration || getLayoutsByMedia();
	}

	get _accAttributes() {
		return {
			columns: {
				start: {
					role: this.accStartColumnRole,
					ariaHidden: !this.startColumnVisible || undefined,
				},
				middle: {
					role: this.accMiddleColumnRole,
					ariaHidden: !this.midColumnVisible || undefined,
				},
				end: {
					role: this.accEndColumnRole,
					ariaHidden: !this.endColumnVisible || undefined,
				},
			},
		};
	}

	get accStartArrowText() {
		const customTexts = this.accessibilityTexts;

		if (this.startArrowDirection === "mirror") {
			return customTexts.startArrowLeftText || FlexibleColumnLayout.i18nBundle.getText(FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP);
		}

		return customTexts.startArrowRightText || FlexibleColumnLayout.i18nBundle.getText(FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP);
	}

	get accEndArrowText() {
		const customTexts = this.accessibilityTexts;

		if (this.endArrowDirection === "mirror") {
			return customTexts.endArrowRightText || FlexibleColumnLayout.i18nBundle.getText(FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP);
		}

		return customTexts.endArrowLeftText || FlexibleColumnLayout.i18nBundle.getText(FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP);
	}
}

FlexibleColumnLayout.define();

export default FlexibleColumnLayout;

export type {
	MEDIA,
	FlexibleColumnLayoutLayoutChangeEventDetail,
	FlexibleColumnLayoutAccessibilityTexts,
	FlexibleColumnLayoutAccessibilityRoles,
	FlexibleColumnLayoutColumnLayout,
};
