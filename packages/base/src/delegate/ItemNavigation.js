import {
	isDown,
	isUp,
	isLeft,
	isRight,
	isHome,
	isEnd,
} from "../events/PseudoEvents.js";

import EventProvider from "../EventProvider.js";
import UI5Element from "../UI5Element.js";

// navigatable items must have id and tabindex
class ItemNavigation extends EventProvider {
	constructor(rootControl, options = {}) {
		super();

		this.currentIndex = options.currentIndex || 0;
		this.rowSize = options.rowSize || 1;
		this.cyclic = options.cyclic || false;

		this.rootControl = rootControl;
	}

	init() {
		this._getItems().forEach((item, idx) => {
			item._tabIndex = (idx === this.currentIndex) ? "0" : "-1";
		});
	}

	_onKeyPress(event) {
		const items = this._getItems();

		if (this.currentIndex >= items.length) {
			if (!this.cyclic) {
				this.fireEvent(ItemNavigation.BORDER_REACH, { start: false, end: true, offset: this.currentIndex });
			}

			this.currentIndex = this.currentIndex - items.length;
		} else if (this.currentIndex < 0) {
			if (!this.cyclic) {
				this.fireEvent(ItemNavigation.BORDER_REACH, { start: true, end: false, offset: this.currentIndex });
			}

			this.currentIndex = items.length + this.currentIndex;
		}

		this.update();
		this.focusCurrent();

		// stops browser scrolling with up/down keys
		event.stopPropagation();
		event.stopImmediatePropagation();
		event.preventDefault();
	}

	onkeydown(event) {
		if (isUp(event)) {
			return this._handleUp(event);
		}

		if (isDown(event)) {
			return this._handleDown(event);
		}

		if (isLeft(event)) {
			return this._handleLeft(event);
		}

		if (isRight(event)) {
			return this._handleRight(event);
		}

		if (isHome(event)) {
			return this._handleHome(event);
		}

		if (isEnd(event)) {
			return this._handleEnd(event);
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

		if (this._setItems) {
			this._setItems(items);
		}
	}

	focusCurrent() {
		const currentItem = this._getCurrentItem();
		if (currentItem) {
			currentItem.focus();
		}
	}

	_canNavigate() {
		const currentItem = this._getCurrentItem();

		let activeElement = document.activeElement;

		while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
			activeElement = activeElement.shadowRoot.activeElement;
		}

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

		if (currentItem instanceof UI5Element) {
			return currentItem.getFocusDomRef();
		}

		if (!this.rootControl.getDomRef()) {
			return;
		}

		return this.rootControl.getDomRef().querySelector(`#${currentItem.id}`);
	}

	set setItemsCallback(fn) {
		this._setItems = fn;
	}

	set getItemsCallback(fn) {
		this._getItems = fn;
	}

	set current(val) {
		this.currentIndex = val;
	}
}

ItemNavigation.BORDER_REACH = "_borderReach";

export default ItemNavigation;
