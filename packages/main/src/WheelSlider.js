import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import {
	isDown,
	isUp,
	isPageUp,
	isPageDown,
} from "@ui5/webcomponents-base/dist/Keys.js";
import getEffectiveContentDensity from "@ui5/webcomponents-base/dist/util/getEffectiveContentDensity.js";
import "@ui5/webcomponents-icons/dist/navigation-up-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import WheelSliderTemplate from "./generated/templates/WheelSliderTemplate.lit.js";
import Button from "./Button.js";

// Styles
import WheelSliderCss from "./generated/themes/WheelSlider.css.js";

/**
 * @private
 */
const metadata = {
	tag: "ui5-wheelslider",
	properties: /** @lends sap.ui.webcomponents.main.WheelSlider.prototype */ {
		/**
		 * Defines whether the component is disabled
		 * (default is set to <code>false</code>).
		 * A disabled component can't be pressed or
		 * focused, and it is not in the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the currently selected value
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String,
			defaultValue: "0",
		},

		/**
		 * Defines the label of the wheelslider.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		label: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Indicates if the wheelslider is expanded.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		expanded: {
			type: Boolean,
		},

		_items: {
			type: String,
			multiple: true,
			compareValues: true,
		},

		_itemsToShow: {
			type: Object,
			multiple: true,
		},

		/**
		 * Indicates if the wheelslider has a cyclic behaviour.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		cyclic: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.WheelSlider.prototype */ {

	},
	events: /** @lends sap.ui.webcomponents.main.WheelSlider.prototype */ {
		/**
		 * Fires when the wheel slider is expanded.
		 */
		expand: {},

		/**
		 * Fires when the wheel slider is collapsed.
		 */
		collapse: {},

		/**
		 *  Fires when new value is selected.
		 */
		select: {
			detail: {
				value: {
					type: String,
				},
			},
		},
	},
};

const CELL_SIZE_COMPACT = 32;
const CELL_SIZE_COZY = 46;

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <h3>Usage</h3>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/WheelSlider.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.WheelSlider
 * @extends UI5Element
 * @tagname ui5-wheelslider
 * @public
 * @since 1.0.0-rc.6
 */
class WheelSlider extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return WheelSliderCss;
	}

	static get template() {
		return WheelSliderTemplate;
	}

	constructor() {
		super();
		this._currentElementIndex = 0;
		this._itemsToShow = [];
		this._scroller = new ScrollEnablement(this);
		this._scroller.attachEvent("scroll", this._updateScrolling.bind(this));
		this._scroller.attachEvent("mouseup", this._handleScrollTouchEnd.bind(this));
		this._scroller.attachEvent("touchend", this._handleScrollTouchEnd.bind(this));
	}

	onBeforeRendering() {
		if (!this.expanded && this.cyclic) {
			const index = this._currentElementIndex % this._items.length;
			this._currentElementIndex = (this._timesMultipliedOnCyclic() / 2) * this._items.length + index;
		}

		if (!this.value) {
			this.value = this._items[0];
		}

		this._buildItemsToShow();
	}

	static get dependencies() {
		return [Button];
	}

	onAfterRendering() {
		if (!this._scroller.scrollContainer) {
			this._scroller.scrollContainer = this.shadowRoot.querySelector(`#${this._id}--wrapper`);
		}

		if (!this.expanded) {
			this._scroller.scrollTo(0, 0);
		}

		if (this.expanded) {
			const elements = this.shadowRoot.querySelectorAll(".ui5-wheelslider-item");
			for (let i = 0; i < elements.length; i++) {
				if (elements[i].textContent === this.value) {
					this._selectElementByIndex(Number(elements[i].dataset.itemIndex) + this._getCurrentRepetition() * this._items.length);
					return true;
				}
			}

			this._selectElement(elements[0]);
		}
	}

	get classes() {
		return {
			root: {
				"ui5-wheelslider-root": true,
				"ui5-phone": isPhone(),
			},
		};
	}

	expandSlider() {
		this.expanded = true;
		this.fireEvent("expand", {});
	}

	collapseSlider() {
		this.expanded = false;
		this.fireEvent("collapse", {});
	}

	get _itemCellHeight() {
		const defaultSize = getEffectiveContentDensity(document.body) === "compact" ? CELL_SIZE_COMPACT : CELL_SIZE_COZY;

		if (this.shadowRoot.querySelectorAll(".ui5-wheelslider-item").length) {
			const itemComputedStyle = getComputedStyle(this.shadowRoot.querySelector(".ui5-wheelslider-item"));
			const itemHeightValue = itemComputedStyle.getPropertyValue("--_ui5_wheelslider_item_height");
			const onlyDigitsValue = itemHeightValue.replace("px", "");
			return Number(onlyDigitsValue) || defaultSize;
		}

		return defaultSize;
	}

	_updateScrolling() {
		const cellSizeInPx = this._itemCellHeight,
			scrollWhere = this._scroller.scrollContainer.scrollTop;
		let offsetIndex;

		if (!scrollWhere) {
			return;
		}

		offsetIndex = Math.round(scrollWhere / cellSizeInPx);

		if (this.value === this._itemsToShow[offsetIndex].value) {
			return;
		}

		if (this.cyclic) {
			const newIndex = this._handleArrayBorderReached(offsetIndex);
			if (offsetIndex !== newIndex) {
				offsetIndex = newIndex;
			}
		}

		this.value = this._itemsToShow[offsetIndex].value;
		this._currentElementIndex = offsetIndex;
	}

	_handleScrollTouchEnd() {
		if (this.expanded) {
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_selectElement(element) {
		if (element && this._items.indexOf(element.textContent) > -1) {
			this._currentElementIndex = Number(element.dataset.itemIndex);
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_getCurrentRepetition() {
		if (this._currentElementIndex) {
			return Math.floor(this._currentElementIndex / this._items.length);
		}

		return 0;
	}

	_selectElementByIndex(currentIndex) {
		let index = currentIndex;
		const itemsCount = this._itemsToShow.length;
		const cellSizeInPx = this._itemCellHeight;
		const scrollBy = cellSizeInPx * index;

		if (this.cyclic) {
			index = this._handleArrayBorderReached(index);
		}

		if (index < itemsCount && index > -1) {
			this._scroller.scrollTo(0, scrollBy, 5, 100); // sometimes the container isn't painted yet so retry 5 times (although it succeeds on the 1st)
			this._currentElementIndex = index;
			this.value = this._items[index - (this._getCurrentRepetition() * this._items.length)];
			this.fireEvent("select", { value: this.value });
		}
	}

	_timesMultipliedOnCyclic() {
		const minElementsInCyclicWheelSlider = 70;
		const repetitionCount = Math.round(minElementsInCyclicWheelSlider / this._items.length);
		const minRepetitionCount = 3;

		return Math.max(minRepetitionCount, repetitionCount);
	}

	_buildItemsToShow() {
		let itemsToShow = this._items;
		if (this.cyclic) {
			if (itemsToShow.length < this._items.length * this._timesMultipliedOnCyclic()) {
				for (let i = 0; i < this._timesMultipliedOnCyclic(); i++) {
					itemsToShow = itemsToShow.concat(this._items);
				}
			}
		}

		this._itemsToShow = itemsToShow.map(value => {
			return {
				value,
				"selected": (value === this.value),
			};
		});
	}

	_handleArrayBorderReached(currentIndex) {
		const arrayLength = this._itemsToShow.length;
		const maxVisibleElementsOnOneSide = 7;
		let index = currentIndex;

		if (maxVisibleElementsOnOneSide > index) {
			index += this._items.length * 2;
		} else if (index > arrayLength - maxVisibleElementsOnOneSide) {
			index -= this._items.length * 2;
		}

		return index;
	}

	_handleWheel(e) {
		if (!e) {
			return;
		}

		e.stopPropagation();
		e.preventDefault();

		if (e.timeStamp === this._prevWheelTimestamp || !this.expanded) {
			return;
		}

		if (e.deltaY > 0) {
			this._itemUp();
		} else if (e.deltaY < 0) {
			this._itemDown();
		}

		this._prevWheelTimestamp = e.timeStamp;
	}

	_onclick(e) {
		if (!e.target.classList.contains("ui5-wheelslider-item")) {
			return;
		}

		if (this.expanded) {
			this.value = e.target.textContent;
			this._selectElement(e.target);
			this.fireEvent("select", { value: this.value });
		} else {
			this.expanded = true;
		}
	}

	_onArrowDown(e) {
		e.preventDefault();
		this._itemDown();
	}

	_onArrowUp(e) {
		e.preventDefault();
		this._itemUp();
	}

	_itemDown() {
		const nextElementIndex = this._currentElementIndex + 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_itemUp() {
		const nextElementIndex = this._currentElementIndex - 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_onkeydown(е) {
		if (!this.expanded) {
			return;
		}

		if (isUp(е)) {
			this._onArrowUp(е);
		}

		if (isDown(е)) {
			this._onArrowDown(е);
		}

		if (isPageDown(е)) {
			this._selectLimitCell(е, false);
		}

		if (isPageUp(е)) {
			this._selectLimitCell(е, true);
		}
	}

	_selectLimitCell(event, isMax) {
		event.preventDefault();
		const intexIncrease = this.cyclic ? this._items.length : 0;
		if (isMax) {
			this._selectElementByIndex(this._items.length - 1 + intexIncrease);
		} else {
			this._selectElementByIndex(intexIncrease);
		}
	}
}

WheelSlider.define();

export default WheelSlider;
