import {
	isUp,
	isDown,
	isLeft,
	isRight,
	isPageUp,
	isPageDown,
	isHome,
	isEnd,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";
import isElementClickable from "@ui5/webcomponents-base/dist/util/isElementClickable.js";
import isElementHidden from "@ui5/webcomponents-base/dist/util/isElementHidden.js";
import { getTabbableElements } from "@ui5/webcomponents-base/dist/util/TabbableElements.js";
import Grid from "./Grid.js";
import GridRow from "./GridRow.js";
import GridCell from "./GridCell.js";
import GridHeaderRow from "./GridHeaderRow.js";
import GridHeaderCell from "./GridHeaderCell.js";
import GridWalker from "./GridWalker.js";

/**
 * Handles the keyboard navigation for the ui5-grid.
 *
 * @class
 * @private
 */
class GridNavigation {
	_grid: Grid;
	_gridWalker: GridWalker;
	_onclickBound: (e: MouseEvent) => void;
	_onfocusinBound: (e: FocusEvent) => void;
	_onkeydownBound: (e: KeyboardEvent) => void;
	_colPosition: number;
	_tabPosition: number;
	_ignoreFocusIn?: boolean;

	constructor(grid: Grid) {
		this._grid = grid;
		this._onclickBound = this._onclick.bind(this);
		this._onfocusinBound = this._onfocusin.bind(this);
		this._onkeydownBound = this._onkeydown.bind(this);
		grid.addEventListener("click", this._onclickBound);
		grid.addEventListener("focusin", this._onfocusinBound);
		grid.addEventListener("keydown", this._onkeydownBound);
		this._gridWalker = new GridWalker();
		this._gridWalker.setGrid(this._getNavigationItemsOfGrid());
		this._colPosition = 0;
		this._tabPosition = 0;
	}

	_getNavigationItemsOfRow(row: GridRow | GridHeaderRow) {
		return [row, ...row.shadowRoot!.children].map(element => {
			return element.localName === "slot" ? (element as HTMLSlotElement).assignedElements() : element;
		}).flat().filter(element => {
			return element.localName.includes("ui5-grid-") && !element.hasAttribute("excluded-from-navigation");
		}) as HTMLElement[];
	}

	_getNavigationItemsOfGrid() {
		const items = [];
		if (this._grid.headerRow && !isElementHidden(this._grid.headerRow)) {
			items.push(this._getNavigationItemsOfRow(this._grid.headerRow));
			this._gridWalker.setFirstRowPos(1);
		} else {
			this._gridWalker.setFirstRowPos(0);
		}

		if (this._grid.rows.length) {
			this._grid.rows.forEach(row => items.push(this._getNavigationItemsOfRow(row)));
		} else {
			items.push(this._getNavigationItemsOfRow(this._grid._nodataRow));
		}

		if (this._grid._shouldRenderGrowing) {
			items.push([this._grid._growing.getFocusDomRef()]);
			this._gridWalker.setLastRowPos(-1);
		} else {
			this._gridWalker.setLastRowPos(0);
		}

		if (!this._gridWalker.getCurrent()) {
			this._gridWalker.setRowPos(this._gridWalker.getFirstRowPos());
		}

		this._gridWalker.setGrid(items);
		return items;
	}

	_setCurrentItem(e: Event, callback?: (currentItem: HTMLElement) => void) {
		const navigationItems = this._getNavigationItemsOfGrid().flat();
		const navigationItem = e.composedPath().find(target => navigationItems.includes(target as HTMLElement)) as HTMLElement;
		if (navigationItem) {
			this._gridWalker.setCurrent(navigationItem);
			callback && callback(navigationItem);
		}
	}

	_isRowEvent(e: Event) {
		const eventOrigin = e.composedPath()[0];
		return eventOrigin instanceof GridRow || eventOrigin instanceof GridHeaderRow;
	}

	_isCellEvent(e: Event) {
		const eventOrigin = e.composedPath()[0];
		return eventOrigin instanceof GridCell || eventOrigin instanceof GridHeaderCell;
	}

	_isEventFromCurrentItem(e: Event) {
		return e.composedPath()[0] === this._gridWalker.getCurrent();
	}

	_focusElement(element: HTMLElement, ignoreFocusIn: boolean = true) {
		if (!element) {
			return;
		}

		const activeElement = getActiveElement() as HTMLElement;
		if (activeElement === element) {
			return;
		}

		const navigationItems = this._getNavigationItemsOfGrid().flat();
		if (navigationItems.includes(activeElement)) {
			activeElement.removeAttribute("tabindex");
		}

		if (navigationItems.includes(element)) {
			element.setAttribute("tabindex", "-1");
		}

		this._ignoreFocusIn = ignoreFocusIn;
		element.focus();
		if (element instanceof HTMLInputElement) {
			element.select();
		}
		this._handleSticky(element);
		this._ignoreFocusIn = false;
	}

	_focusCurrentItem() {
		this._focusElement(this._gridWalker.getCurrent() as HTMLElement);
	}

	/**
	 * Scrolls the focused item into view, if it is behind the sticky header/sticky elements.
	 */
	_handleSticky(element: HTMLElement) {
		const stickyElements = this._grid._stickyElements;
		// If there are no sticky elements or the focused element is the header row, do nothing
		if (stickyElements.length === 0 || element === this._grid.headerRow) {
			return;
		}

		// Find the sticky element that is closest to the focused element
		const elementRect = element.getBoundingClientRect();
		const stickyBottom = stickyElements.reduce((min, stickyElement) => {
			const stickyRect = stickyElement.getBoundingClientRect();

			if (stickyRect.bottom > elementRect.top) {
				return Math.max(min, stickyRect.bottom);
			}
			return min;
		}, -Infinity);

		// If the focused element is not behind any sticky element, do nothing
		if (stickyBottom === -Infinity) {
			return;
		}

		// Scroll the focused element into view
		const scrollContainer = this._grid._scrollContainer;
		scrollContainer.scrollTop += elementRect.top - stickyBottom;
	}

	_handleEnter(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (this._isCellEvent(e)) {
			this._handleF2(e, eventOrigin);
		}
	}

	_handleF2(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (this._isEventFromCurrentItem(e)) {
			const firstTabbable = getTabbableElements(eventOrigin)[0];
			this._focusElement(firstTabbable);
		} else {
			this._setCurrentItem(e, () => this._focusCurrentItem());
		}
		e.preventDefault();
	}

	_handleF7(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (this._isRowEvent(e)) {
			this._gridWalker.setColPos(this._colPosition);
			let elementToFocus = this._gridWalker.getCurrent() as HTMLElement;
			if (this._tabPosition > -1) {
				const tabbables = getTabbableElements(elementToFocus);
				elementToFocus = tabbables[this._tabPosition] || tabbables.pop() || elementToFocus;
			}
			this._focusElement(elementToFocus);
		} else {
			this._setCurrentItem(e, currentItem => {
				this._tabPosition = getTabbableElements(currentItem).indexOf(eventOrigin);
				this._colPosition = this._gridWalker.getColPos();
				this._gridWalker.setColPos(0);
				this._focusCurrentItem();
			});
		}
		e.preventDefault();
	}

	_handleTab(e: KeyboardEvent, eventOrigin: HTMLElement) {
		if (this._isEventFromCurrentItem(e)) {
			this._focusElement(e.shiftKey ? this._grid._beforeElement : this._grid._afterElement);
		} else {
			const tabbables = getTabbableElements(this._grid._gridElement);
			if (e.shiftKey && tabbables[0] === eventOrigin) {
				this._focusElement(this._grid._beforeElement);
			}
			if (!e.shiftKey && tabbables[tabbables.length - 1] === eventOrigin) {
				this._focusElement(this._grid._afterElement);
			}
		}
	}

	_handleArrowUpDown(e: KeyboardEvent, eventOrigin: HTMLElement, direction: -1 | 1) {
		if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.defaultPrevented || this._isEventFromCurrentItem(e) || /^(input|textarea)$/i.test(eventOrigin.nodeName)) {
			return false;
		}

		this._setCurrentItem(e, currentItem => {
			this._tabPosition = getTabbableElements(currentItem).indexOf(eventOrigin);
			this._gridWalker.setRowPos(this._gridWalker.getRowPos() + direction);
			let elementToFocus = this._gridWalker.getCurrent() as HTMLElement;
			const tabbables = getTabbableElements(elementToFocus);
			elementToFocus = tabbables[this._tabPosition] || tabbables.pop() || elementToFocus;
			this._focusElement(elementToFocus);
			e.preventDefault();
		});
		return false;
	}

	_handleArrowUp(e: KeyboardEvent, eventOrigin: HTMLElement) {
		return this._handleArrowUpDown(e, eventOrigin, -1);
	}

	_handleArrowDown(e: KeyboardEvent, eventOrigin: HTMLElement) {
		return this._handleArrowUpDown(e, eventOrigin, 1);
	}

	_onkeydown(e: KeyboardEvent) {
		if (e.defaultPrevented) {
			return;
		}

		const eventOrigin = e.composedPath()[0] as HTMLElement;
		if (!this._isEventFromCurrentItem(e) && this._getNavigationItemsOfGrid().flat().includes(eventOrigin)) {
			this._gridWalker.setCurrent(eventOrigin);
		}

		const keydownHandlerName = `_handle${e.code}` as keyof GridNavigation;
		const keydownHandler = this[keydownHandlerName] as (e: KeyboardEvent, eventOrigin: HTMLElement) => void | false;
		if (typeof keydownHandler === "function" && keydownHandler.call(this, e, eventOrigin) === undefined) {
			return;
		}

		if (!this._isEventFromCurrentItem(e)) {
			return;
		}

		if (isLeft(e)) {
			this._gridWalker[this._grid.effectiveDir === "rtl" ? "right" : "left"]();
		} else if (isRight(e)) {
			this._gridWalker[this._grid.effectiveDir === "rtl" ? "left" : "right"]();
		} else if (isUp(e)) {
			this._gridWalker.up();
		} else if (isDown(e)) {
			this._gridWalker.down();
		} else if (isHome(e)) {
			this._gridWalker.home();
		} else if (isEnd(e)) {
			this._gridWalker.end();
		} else if (isPageUp(e)) {
			this._gridWalker.pageup();
		} else if (isPageDown(e)) {
			this._gridWalker.pagedown();
		} else {
			return;
		}

		this._focusCurrentItem();
		e.preventDefault();
	}

	_onclick(e: MouseEvent) {
		const navigationItems = this._getNavigationItemsOfGrid();
		const flatNavigationItems = navigationItems.flat();
		let navigationItem = null;

		// eslint-disable-next-line no-restricted-syntax
		for (const target of e.composedPath() as any[]) {
			if (target.nodeType === Node.ELEMENT_NODE) {
				const element = target as HTMLElement;
				if (element.getAttribute("tabindex") === "-1" || isElementClickable(element)) {
					break;
				}
				if (flatNavigationItems.includes(element)) {
					navigationItem = element;
					break;
				}
			}
		}

		if (navigationItem) {
			this._gridWalker.setCurrent(navigationItem);
			this._gridWalker.setColPos(0);
			this._focusCurrentItem();
		}
	}

	_onfocusin(e: FocusEvent) {
		if (this._ignoreFocusIn) {
			return;
		}

		const evetOrigin = e.composedPath()[0];
		const currentItem = this._gridWalker.getCurrent() as HTMLElement;
		if (currentItem && currentItem !== evetOrigin) {
			currentItem.removeAttribute("tabindex");
		}

		if (evetOrigin === this._grid._beforeElement || evetOrigin === this._grid._afterElement) {
			this._gridWalker.setColPos(0);
			this._focusCurrentItem();
		}
	}
}

export default GridNavigation;
