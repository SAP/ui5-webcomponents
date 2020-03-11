import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import WheelSliderTemplate from "./generated/templates/WheelSliderTemplate.lit.js";
import Button from "./Button.js";
import {
	isDown,
	isUp,
	isTabNext,
	isTabPrevious,
} from "../../base/src/Keys.js";

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
	}

	onBeforeRendering() {
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
					this._selectElement(elements[i]);
					return true;
				}
			}

			this._selectElement(elements[0]);
		}
	}

	get items() {
		return this._items || [];
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
			this._currentElementIndex = this._items.indexOf(element.textContent);
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_selectElementByIndex(index) {
		const sliderElement = this.shadowRoot.getElementById(`${this._id}--items-list`);
		if (index < this._items.length && index > -1) {
			const offsetSelectedElement = 4 * this._itemCellHeight - (index * this._itemCellHeight);
			sliderElement.setAttribute("style", `top:${offsetSelectedElement}rem`);
			this.value = this._items[index];
			this._currentElementIndex = index;
		}
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

		if (isTabPrevious(event) || isTabNext(event)) {
			event.preventDefault();
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
