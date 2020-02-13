import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import SliderTemplate from "./generated/templates/SliderTemplate.lit.js";
import {
	isDown,
	isUp,
} from "../../base/src/events/PseudoEvents";

// Styles
import SliderCss from "./generated/themes/Slider.css.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";

/**
 * @private
 */
const metadata = {
	tag: "ui5-slider",
	properties: /** @lends sap.ui.webcomponents.main.Slider.prototype */ {
		/**
		 * Defines whether the <code>ui5-slider</code> is disabled
		 * (default is set to <code>false</code>).
		 * A disabled <code>ui5-slider</code> can't be pressed or
		 * focused, and it is not in the tab chain.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean
		},

		/**
		 * Defines the currently selected value
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		value: {
			type: String
		},

		/**
		 * Indicates if the slider will support cyclic scrolling.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		cyclic: {
			type: Boolean
		},

		/**
		 * Defines the label of the slider.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		label: {
			type: String,
			defaultValue: ""
		},

		/**
		 * Indicates if the slider is expanded.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		_expanded: {
			type: Boolean
		},

		_items: {
			type: Object
		}
	},
	slots: /** @lends sap.ui.webcomponents.main.Slider.prototype */ {

	},
	events: /** @lends sap.ui.webcomponents.main.Slider.prototype */ {
		/**
		 * Fires when the slider is expanded.
		 */
		expand: {},

		/**
		 * Fires when the slider is collapsed.
		 */
		collapse: {},

		/**
		 *  Fires when new value is selected.
		 */
		valueSelect: {
			value: {
				type: String
			}
		}
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
 * For the <code>ui5-slider</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Slider.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Slider
 * @extends UI5Element
 * @tagname ui5-slider
 * @public
 */
class Slider extends UI5Element {
	static get metadata() {
	return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return SliderCss;
	}

	static get template() {
		return SliderTemplate;
	}

	static async define(...params) {
		super.define(...params);
	}

	constructor() {
		super();
		//this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		// this._scroller = new ScrollEnablement(this);
		this._currentElementIndex = 0;
		this._itemCellHeight = 0;
	}

	onBeforeRendering(){
		this._itemCellHeight = this.shadowRoot.querySelectorAll(".ui5-slider-item").length && this.shadowRoot.querySelectorAll(".ui5-slider-item")[0].offsetHeight / 16;
	}

	_findSelectedElement(){
		let itemsList = this.shadowRoot.querySelector(`#${this._id}--items-list`),
			parentOffset = itemsList.parentElement.parentElement.offsetTop,
			itemsListArray = [...itemsList.children],
			firstVisibleElementIndex = 0;

		while ((itemsListArray[firstVisibleElementIndex].getBoundingClientRect().y - parentOffset) < 0){
			firstVisibleElementIndex++;
		}

		return itemsListArray[firstVisibleElementIndex + 5];
	}

	_updateScrolling(e){
		let sizeInRems = this._items.length * 3, // the size of one element in rems (16px = 1rem)
			sizeOfOneElementInPixels = _itemCellHeight * 16,
			indexForOffset;
		const elements = this.shadowRoot.querySelectorAll(".ui5-slider-item"),
			selectedElement = this._findSelectedElement();

		if (!selectedElement){
			return;
		}
		if (this.value === selectedElement.textContent) {
			return;
		}

		if ( (e.scroll / sizeOfOneElementInPixels) / 0.5 > 1)  {
			indexForOffset = Math.ceil(e.scroll / sizeOfOneElementInPixels);
		} else {
			indexForOffset = Math.floor(e.scroll / sizeOfOneElementInPixels);
		}

		this._selectElement(selectedElement);
		this.value = selectedElement.textContent;
	}

	onAfterRendering() {
		// this._scroller.scrollContainer = this.shadowRoot.querySelector(`#${this._id}--wrapper`);
		// this._scroller.attachEvent("scroll", this._updateScrolling.bind(this));

		this.shadowRoot.querySelector(".ui5-slider-wrapper > ul").addEventListener("wheel", (e) => {
			e.stopPropagation();
			e.preventDefault();

			if (e.timeStamp === this._prevWheelTimestamp){
				return;
			}

			if (e.deltaY > 0){
				this._onArrowUp();
			} else if (e.deltaY < 0) {
				this._onArrowDown();
			}

			this._prevWheelTimestamp = e.timeStamp;
		});

		if (this._expanded) {
			const elements = this.shadowRoot.querySelectorAll(".ui5-slider-item");
			for (let i = 0; i < elements.length; i++){
				if (elements[i].textContent === this.value){
					this._selectElement(elements[i]);
					return true;
				}
			}

			this._selectElement(elements[0]);
		}
	}

	get items() {;
		return this._items;
	}

	_onclick(e) {
		if (!e.target.classList.contains("ui5-slider-item")){
			return;
		}

		if(this._expanded) {
			this.value = e.target.textContent;
			this._selectElement(e.target);
		} else {
			this._expanded = true;
		}
	}

	expandSlider(){
		this._expanded = true;
		this.fireEvent("expand",{});
	}

	collapseSlider(){
		this._expanded = false;
		this.fireEvent("collapse",{});
	}

	_selectElement(element){	
		if (element && this._items.indexOf(element.textContent) > -1) {
			this._currentElementIndex = this._items.indexOf(element.textContent);
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_selectElementByIndex(index){
		const sliderElement = this.shadowRoot.getElementById(`${this._id}--items-list`);
		if ( index < this._items.length && index > - 1) {
			let offsetSelectedElement = 4 * this._itemCellHeight - (index * this._itemCellHeight);
			sliderElement.setAttribute("style",`top:${offsetSelectedElement}rem`);
			this.value = this._items[index];
			this._currentElementIndex = index;
		}
	}

	_onArrowDown(){
		const nextElementIndex = this._currentElementIndex + 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_onArrowUp(){
		const nextElementIndex = this._currentElementIndex - 1;
		this._selectElementByIndex(nextElementIndex);
	}

	_onkeydown(event){
		if (isUp(event)) {
			this._onArrowUp();
		}

		if (isDown(event)) {
			this._onArrowDown();
		}
	}
}

Slider.define();

export default Slider;
