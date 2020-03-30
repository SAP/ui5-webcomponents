import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import {
	isDown,
	isUp,
} from "@ui5/webcomponents-base/src/Keys.js";
import "@ui5/webcomponents-icons/dist/icons/navigation-up-arrow.js";
import "@ui5/webcomponents-icons/dist/icons/navigation-down-arrow.js";
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
		 * Defines whether the <code>ui5-wheelslider</code> is disabled
		 * (default is set to <code>false</code>).
		 * A disabled <code>ui5-wheelslider</code> can't be pressed or
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
		 * @private
		 */
		_expanded: {
			type: Boolean,
		},

		_items: {
			type: Object,
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
		valueSelect: {
			value: {
				type: String,
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-wheelslider</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/WheelSlider.js";</code>
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
		this._itemCellHeight = 0;
		this._itemsToShow = [];
	}

	onBeforeRendering() {
		if (!this._expanded && this.cyclic) {
			const index = this._currentElementIndex % this._items.length;
			this._currentElementIndex = (this._timesMultipliedOnCyclic() / 2) * this._items.length + index;
			this._buildItemsToShow();
		}
		this._updateItemCellHeight();
	}

	_updateItemCellHeight() {
		this._itemCellHeight = this.shadowRoot.querySelectorAll(".ui5-wheelslider-item").length && Number(getComputedStyle(this.shadowRoot.querySelector(".ui5-wheelslider-item")).getPropertyValue("--_ui5_wheelslider_item_height").replace("rem", ""));
	}

	static async onDefine() {
		await Button.define();
	}

	onAfterRendering() {
		if (this._expanded) {
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

	_timesMultipliedOnCyclic() {
		const minElementsInCyclicWheelSlider = 70;
		const repetitionCount = Math.round(minElementsInCyclicWheelSlider / this._items.length);
		const minRepetitionCount = 3;

		return Math.min(minRepetitionCount, repetitionCount);
	}

	_buildItemsToShow() {
		if (this.cyclic && this._items) {
			if (this._itemsToShow.length < this._items.length * this._timesMultipliedOnCyclic()) {
				this._itemsToShow = this._items;
				for (let i = 0; i < this._timesMultipliedOnCyclic(); i++) {
					this._itemsToShow = this._itemsToShow.concat(this._items);
				}
			}
		} else {
			this._itemsToShow = this.items;
		}
	}

	get items() {
		return this._items || [];
	}

	get itemsToShow() {
		return this._itemsToShow || [];
	}

	get classes() {
		return {
			root: {
				"ui5-wheelslider-root": true,
				"ui5-phone": isPhone(),
			},
		};
	}

	_handleWheel(e) {
		if (!e) {
			return;
		}

		e.stopPropagation();
		e.preventDefault();

		if (e.timeStamp === this._prevWheelTimestamp || !this._expanded) {
			return;
		}

		if (e.deltaY > 0) {
			this._onArrowUp(e);
		} else if (e.deltaY < 0) {
			this._onArrowDown(e);
		}

		this._prevWheelTimestamp = e.timeStamp;
	}

	_onclick(e) {
		if (!e.target.classList.contains("ui5-wheelslider-item")) {
			return;
		}

		if (this._expanded) {
			this.value = e.target.textContent;
			this._selectElement(e.target);
			this.fireEvent("valueSelect", { value: this.value });
		} else {
			this._expanded = true;
		}
	}

	expandSlider() {
		this._expanded = true;
		this.fireEvent("expand", {});
	}

	collapseSlider() {
		this._expanded = false;
		this.fireEvent("collapse", {});
	}

	_selectElement(element) {
		if (element && this._items.indexOf(element.textContent) > -1) {
			this._currentElementIndex = Number(element.dataset.itemIndex);
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_getCurrentRepetition() {
		return Math.floor(this._currentElementIndex / this._items.length);
	}

	_selectElementByIndex(currentIndex) {
		const sliderElement = this.shadowRoot.getElementById(`${this._id}--items-list`);
		const itemsCount = this._itemsToShow.length;
		const itemCellHeight = this._itemCellHeight ? this._itemCellHeight : 2.875;
		const offsetStep = isPhone() ? 4 : 2;
		let index = currentIndex;

		if (this.cyclic) {
			index = this.handleArrayBorderReached(index);
		}

		if (index < itemsCount && index > -1) {
			const offsetSelectedElement = offsetStep * itemCellHeight - (index * itemCellHeight);
			sliderElement.setAttribute("style", `top:${offsetSelectedElement}rem`);
			this._currentElementIndex = index;
			this.value = this._items[index - (this._getCurrentRepetition() * this._items.length)];
			this.fireEvent("valueSelect", { value: this.value });
		}
	}

	handleArrayBorderReached(currentIndex) {
		const arrayLength = this._itemsToShow.length;
		const maxVisibleElementsOnOneSide = 5;
		let index = currentIndex;

		if (maxVisibleElementsOnOneSide > index) {
			index += this._items.length * 2;
		} else if (index > arrayLength - maxVisibleElementsOnOneSide) {
			index -= this._items.length * 2;
		}

		return index;
	}

	_onArrowDown(e) {
		e.preventDefault();
		const nextElementIndex = this._currentElementIndex + 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_onArrowUp(e) {
		e.preventDefault();
		const nextElementIndex = this._currentElementIndex - 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_onkeydown(event) {
		if (!this._expanded) {
			return;
		}

		if (isUp(event)) {
			this._onArrowUp(event);
		}

		if (isDown(event)) {
			this._onArrowDown(event);
		}
	}

	_onfocusin(e) {
		e.preventDefault();
		this.expandSlider();
	}

	_onfocusout(e) {
		e.preventDefault();
		this.collapseSlider();
	}
}

WheelSlider.define();

export default WheelSlider;
