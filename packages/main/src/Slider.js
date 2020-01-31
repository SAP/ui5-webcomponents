import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import SliderTemplate from "./generated/templates/SliderTemplate.lit.js";

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
		isCyclic: {
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
		 * @public
		 */
		isExpanded: {
			type: Boolean
		},

		_items: {
			type: Object
		}
	},
	slots: /** @lends sap.ui.webcomponents.main.Slider.prototype */ {
		// /**
		//  * Defines the <code>ui5-slider</code> items.
		//  *
		//  * @type {HTMLElement[]}
		//  * @slot
		//  * @public
		//  */
		// items: {
		// 	"default": {
		// 		propertyName: "items",
		// 		type: HTMLElement,
		// 		listenFor: { include: ["*"] },
		// 	}
		// }
	},
	events: /** @lends sap.ui.webcomponents.main.Slider.prototype */ {
		/**
		 * Fires when the slider is expanded.
		 */
		expanded: {},

		/**
		 * Fires when the slider is collapsed.
		 */
		collapsed: {},

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

		this._items = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
		this.value = this._items[0];
		//this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this._scroller = new ScrollEnablement(this);
		this.prevElement = 0;
		this._currentElementIndex = 0;
	}

	_findSelectedElement(){
		let itemsList = this.shadowRoot.querySelector(`#${this._id}--items-list`),
			parentOffset = itemsList.parentElement.parentElement.offsetTop,
			itemsListArray = [].slice.call(itemsList.children),
			firstVisibleElementIndex = 0;

		while ((itemsListArray[firstVisibleElementIndex].getBoundingClientRect().y - parentOffset) < 0){
			firstVisibleElementIndex++;
		}

		return itemsListArray[firstVisibleElementIndex + 5];
	}

	_updateScrolling(e){
		let sizeInRems = this._items.length * 3, // the size of one element in rems (16px = 1rem)
			sizeOfOneElementInPixels = 48,
			indexForOffset;
		const elements = this.shadowRoot.querySelectorAll(".sapMWSItem");

		//console.log(this.value + "    " + this._findSelectedElement().textContent);
		if (this.value === this._findSelectedElement().textContent) {
			return;
		}

		if ( (e.scroll / sizeOfOneElementInPixels) / 0.5 > 1)  {
			indexForOffset = Math.ceil(e.scroll / sizeOfOneElementInPixels);
		} else {
			indexForOffset = Math.floor(e.scroll / sizeOfOneElementInPixels);
		}

		this._selectElement(this._findSelectedElement());
		this.value = this._findSelectedElement().textContent;
	}

	onAfterRendering() {
		this._scroller.scrollContainer = this.shadowRoot.querySelector(`#${this._id}--wrapper`);
		this._scroller.attachEvent("scroll", this._updateScrolling.bind(this));
		if (this.expanded) {
			const elements = this.shadowRoot.querySelectorAll(".sapMWSItem");
			for (var i = 0; i < elements.length; i++){
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

	get isExpandedClass(){
		if (this.expanded){
			return " sapMWSExpanded";
		}

		return "";
	}

	get isDisabledClass(){
		if (this.disabled){
			return " sapMWSDisabled";
		}

		return "";
	}

	_onelementclick(e) {
		if(e.target.classList.contains("sapMWSItem")) {
			this.value = e.target.textContent;
		}

		if (!this.expanded) {
			this.expanded = true;
			this._invalidate();
		}

		this._selectElement(e.target);
	}

	expandSlider(){
		this.expanded = true;
		this._invalidate();
		this.fireEvent("expanded",{});
	}

	collapseSlider(){
		this.expanded = false;
		this._invalidate();
		this.fireEvent("collapsed",{});
	}

	_selectElement(element){
		if (this._items.indexOf(element.textContent) > -1){
			this._currentElementIndex = this._items.indexOf(element.textContent);
			this._selectElementByIndex(this._currentElementIndex);
		}
	}

	_selectElementByIndex(index){
		const sliderElement = this.shadowRoot.getElementById(`${this._id}--items-list`);
		if ( index < this._items.length && index > - 1) {
			let offsetSelectedElement = 12 - (index * 3);
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
}

Slider.define();

export default Slider;
