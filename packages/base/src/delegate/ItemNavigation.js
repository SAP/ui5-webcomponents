import RenderScheduler from "../RenderScheduler.js";
import {
	isDown,
	isUp,
	isLeft,
	isRight,
	isHome,
	isEnd,
	isPageUp,
	isPageDown,
} from "../Keys.js";
import getActiveElement from "../util/getActiveElement.js";

import EventProvider from "../EventProvider.js";
import NavigationMode from "../types/NavigationMode.js";
import ItemNavigationBehavior from "../types/ItemNavigationBehavior.js";

/**
 * The ItemNavigation class manages the calculations to determine the correct "tabindex" for a group of related items inside a root component.
 * Important: ItemNavigation only does the calculations and does not change "tabindex" directly, this is a responsibility of the developer.
 *
 * The keys that trigger ItemNavigation are:
 *  - Up/down
 *  - Left/right
 *  - Home/End
 *  - PageUp/PageDown
 *
 * Usage:
 * 1) Use the "getItemsCallback" constructor property to pass a callback to ItemNavigation, which, whenever called, will return the list of items to navigate among.
 *
 * Each item passed to ItemNavigation via "getItemsCallback" must be:
 *  - A) either a UI5Element with a "_tabIndex" property
 *  - B) or an Object with "id" and "_tabIndex" properties which represents a part of the root component's shadow DOM.
 *    The "id" must be a valid ID within the shadow root of the component ItemNavigation operates on.
 *    This object must not be a DOM object because, as said, ItemNavigation will not set "tabindex" on it. It must be a representation of a DOM object only
 *    and the developer has the responsibility to update the "tabindex" in the component's DOM.
 *  - C) a combination of the above
 *
 * Whenever the user navigates with the keyboard, ItemNavigation will modify the "_tabIndex" properties of the items.
 * It is the items' responsibilities to re-render themselves and apply the correct value of "tabindex" (i.e. to map the "_tabIndex" ItemNavigation set to them to the "tabindex" property).
 * If the items of the ItemNavigation are UI5Elements themselves, this can happen naturally since they will be invalidated by their "_tabIndex" property.
 * If the items are Objects with "id" and "_tabIndex" however, it is the developer's responsibility to apply these and the easiest way is to have the root component invalidated by ItemNavigation.
 * To do so, set the "affectedPropertiesNames" constructor property to point to one or more of the root component's properties that need refreshing when "_tabIndex" is changed deeply.
 *
 * 2) Call the "update" method of ItemNavigation whenever you want to change the current item.
 * This is most commonly required if the user for example clicks on an item and thus selects it directly.
 * Pass as the only argument to "update" the item that becomes current (must be one of the items, returned by "getItemsCallback").
 *
 * @class
 * @public
 */
class ItemNavigation extends EventProvider {
	/**
	 *
	 * @param rootWebComponent the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
	 * @param options Object with configuration options:
	 *  - currentIndex: the index of the item that will be initially selected (from which navigation will begin)
	 *  - navigationMode (Auto|Horizontal|Vertical): whether the items are displayed horizontally (Horizontal), vertically (Vertical) or as a matrix (Auto) meaning the user can navigate in both directions (up/down and left/right)
	 *  - rowSize: tells how many items per row there are when the items are not rendered as a flat list but rather as a matrix. Relevant for navigationMode=Auto
	 *  - behavior (Static|Cycling|Paging): tells what to do when trying to navigate beyond the first and last items
	 *    Static means that nothing happens if the user tries to navigate beyond the first/last item.
	 *    Cycling means that when the user navigates beyond the last item they go to the first and vice versa.
	 *    Paging means that when the urse navigates beyond the first/last item, a new "page" of items appears (as commonly observed with calendars for example)
	 *  - pageSize: tells how many items the user skips by using the PageUp/PageDown keys
	 *  - getItemsCallback: function that, when called, returns an array with all items the user can navigate among
	 *  - affectedPropertiesNames: a list of metadata properties on the root component which, upon user navigation, will be reassigned by address thus causing the root component to invalidate
	 */
	constructor(rootWebComponent, options = {}) {
		super();

		this.currentIndex = options.currentIndex || 0;
		this.rowSize = options.rowSize || 1;
		this.behavior = options.behavior || ItemNavigationBehavior.Static;
		const navigationMode = options.navigationMode;
		const autoNavigation = !navigationMode || navigationMode === NavigationMode.Auto;
		this.horizontalNavigationOn = autoNavigation || navigationMode === NavigationMode.Horizontal;
		this.verticalNavigationOn = autoNavigation || navigationMode === NavigationMode.Vertical;

		this.pageSize = options.pageSize;

		if (options.affectedPropertiesNames) {
			this.affectedPropertiesNames = options.affectedPropertiesNames;
		}

		if (options.getItemsCallback) {
			this._getItems = options.getItemsCallback;
		}

		const trueFunction = () => true;
		this._hasNextPage = typeof options.hasNextPageCallback === "function" ? options.hasNextPageCallback : trueFunction;
		this._hasPreviousPage = typeof options.hasPreviousPageCallback === "function" ? options.hasPreviousPageCallback : trueFunction;

		this.rootWebComponent = rootWebComponent;
		this.rootWebComponent.addEventListener("keydown", this.onkeydown.bind(this));
		this.rootWebComponent._onComponentStateFinalized = () => {
			this._init();
		};
	}

	_init() {
		this._getItems().forEach((item, idx) => {
			item._tabIndex = (idx === this.currentIndex) ? "0" : "-1";
		});
	}

	_horizontalNavigationOn() {
		return this.horizontalNavigationOn;
	}

	_verticalNavigationOn() {
		return this.verticalNavigationOn;
	}

	async _onKeyPress(event) {
		if (this.currentIndex >= this._getItems().length) {
			this.onOverflowBottomEdge(event);
		} else if (this.currentIndex < 0) {
			this.onOverflowTopEdge(event);
		}

		event.preventDefault();

		await RenderScheduler.whenFinished();

		this.update();
		this.focusCurrent();
		this.fireEvent(ItemNavigation.AFTER_FOCUS);
	}

	onkeydown(event) {
		if (isUp(event) && this._verticalNavigationOn()) {
			return this._handleUp(event);
		}

		if (isDown(event) && this._verticalNavigationOn()) {
			return this._handleDown(event);
		}

		if (isLeft(event) && this._horizontalNavigationOn()) {
			return this._handleLeft(event);
		}

		if (isRight(event) && this._horizontalNavigationOn()) {
			return this._handleRight(event);
		}

		if (isHome(event)) {
			return this._handleHome(event);
		}

		if (isEnd(event)) {
			return this._handleEnd(event);
		}

		if (isPageUp(event)) {
			return this._handlePageUp(event);
		}

		if (isPageDown(event)) {
			return this._handlePageDown(event);
		}
	}

	_handleUp(event) {
		if (this._canNavigate()) {
			this.currentIndex -= this.rowSize;
			this._onKeyPress(event);
		}
	}

	_handleDown(event) {
		if (this._canNavigate()) {
			this.currentIndex += this.rowSize;
			this._onKeyPress(event);
		}
	}

	_handleLeft(event) {
		if (this._canNavigate()) {
			this.currentIndex -= 1;
			this._onKeyPress(event);
		}
	}

	_handleRight(event) {
		if (this._canNavigate()) {
			this.currentIndex += 1;
			this._onKeyPress(event);
		}
	}

	_handleHome(event) {
		if (this._canNavigate()) {
			const homeEndRange = this.rowSize > 1 ? this.rowSize : this._getItems().length;
			this.currentIndex -= this.currentIndex % homeEndRange;
			this._onKeyPress(event);
		}
	}

	_handleEnd(event) {
		if (this._canNavigate()) {
			const homeEndRange = this.rowSize > 1 ? this.rowSize : this._getItems().length;
			this.currentIndex += (homeEndRange - 1 - this.currentIndex % homeEndRange); // eslint-disable-line
			this._onKeyPress(event);
		}
	}

	_handlePageUp(event) {
		if (this._canNavigate()) {
			this.currentIndex -= this.pageSize;
			this._onKeyPress(event);
		}
	}

	_handlePageDown(event) {
		if (this._canNavigate()) {
			this.currentIndex += this.pageSize;
			this._onKeyPress(event);
		}
	}

	/**
	 * Call this method to set a new "current" (selected) item in the item navigation
	 * Note: the item passed to this function must be one of the items, returned by the getItemsCallback function
	 *
	 * @public
	 * @param current the new selected item
	 */
	update(current) {
		const origItems = this._getItems();

		if (current) {
			this.currentIndex = this._getItems().indexOf(current);
		}

		if (!origItems[this.currentIndex]
			|| (origItems[this.currentIndex]._tabIndex && origItems[this.currentIndex]._tabIndex === "0")) {
			return;
		}

		const items = origItems.slice(0);

		for (let i = 0; i < items.length; i++) {
			items[i]._tabIndex = (i === this.currentIndex ? "0" : "-1");
		}

		if (Array.isArray(this.affectedPropertiesNames)) {
			this.affectedPropertiesNames.forEach(propName => {
				const prop = this.rootWebComponent[propName];
				this.rootWebComponent[propName] = Array.isArray(prop) ? [...prop] : { ...prop };
			});
		}
	}

	/**
	 * @public
	 * @deprecated
	 */
	focusCurrent() {
		const currentItem = this._getCurrentItem();
		if (currentItem) {
			currentItem.focus();
		}
	}

	_canNavigate() {
		const currentItem = this._getCurrentItem();
		const activeElement = getActiveElement();

		return currentItem && currentItem === activeElement;
	}

	_getCurrentItem() {
		const items = this._getItems();

		if (!items.length) {
			return null;
		}

		// normalize the index
		while (this.currentIndex >= items.length) {
			this.currentIndex -= this.rowSize;
		}

		if (this.currentIndex < 0) {
			this.currentIndex = 0;
		}

		const currentItem = items[this.currentIndex];

		if (!currentItem) {
			return;
		}

		if (currentItem.isUI5Element) {
			return currentItem.getFocusDomRef();
		}

		if (!this.rootWebComponent.getDomRef()) {
			return;
		}

		return this.rootWebComponent.getDomRef().querySelector(`#${currentItem.id}`);
	}

	/**
	 * Set to callback that returns the list of items to navigate among
	 * @public
	 * @param callback a function that returns an array of items to navigate among
	 */
	set getItemsCallback(callback) {
		this._getItems = callback;
	}

	/**
	 * @public
	 * @deprecated
	 * @param val
	 */
	set current(val) {
		this.currentIndex = val;
	}

	onOverflowBottomEdge(event) {
		const items = this._getItems();
		const offset = (this.currentIndex - items.length) % this.rowSize;

		if (this.behavior === ItemNavigationBehavior.Cyclic) {
			this.currentIndex = 0;
			return;
		}

		if (this.behavior === ItemNavigationBehavior.Paging) {
			this._handleNextPage();
		} else {
			this.currentIndex = items.length - 1;
		}

		this.fireEvent(ItemNavigation.BORDER_REACH, {
			start: false,
			end: true,
			originalEvent: event,
			offset,
		});
	}

	onOverflowTopEdge(event) {
		const items = this._getItems();
		const offsetRight = (this.currentIndex + this.rowSize) % this.rowSize;
		const offset = offsetRight < 0 ? (this.rowSize + offsetRight) : offsetRight;

		if (this.behavior === ItemNavigationBehavior.Cyclic) {
			this.currentIndex = items.length - 1;
			return;
		}

		if (this.behavior === ItemNavigationBehavior.Paging) {
			this._handlePrevPage();
		} else {
			this.currentIndex = 0;
		}

		this.fireEvent(ItemNavigation.BORDER_REACH, {
			start: true,
			end: false,
			originalEvent: event,
			offset,
		});
	}

	_handleNextPage() {
		const items = this._getItems();

		if (!this._hasNextPage()) {
			this.currentIndex = items.length - 1;
		} else {
			this.currentIndex -= this.pageSize;
		}
	}

	_handlePrevPage() {
		if (!this._hasPreviousPage()) {
			this.currentIndex = 0;
		} else {
			this.currentIndex = this.pageSize + this.currentIndex;
		}
	}
}

ItemNavigation.BORDER_REACH = "_borderReach";
ItemNavigation.AFTER_FOCUS = "_afterFocus";

export default ItemNavigation;
