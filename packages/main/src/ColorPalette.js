import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ColorPaletteTemplate from "./generated/templates/ColorPaletteTemplate.lit.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ColorPaletteEntry from "./ColorPaletteEntry.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";

// Styles
import ColorPaletteCss from "./generated/themes/ColorPalette.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-color-palette",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.ColorPalette.prototype */ {
		/**
		 * @type {CSSColor}
		 * @public
		 */
		value: {
			type: CSSColor
		 }
	},
	slots: /** @lends sap.ui.webcomponents.main.ColorPalette.prototype */ {
		/**
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "colors",
			type: HTMLElement,
			invalidateOnChildChange: true,
		},
	},	
	events: /** @lends sap.ui.webcomponents.main.ColorPalette.prototype */ {
		change: {
			details: {
			   color: {
				   type: "String"
				}
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
 * For the <code>ui5-color-palette</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/ColorPalette.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ColorPalette
 * @extends UI5Element
 * @tagname ui5-color-palette
 * @public
 */
class ColorPalette extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ColorPaletteCss;
	}

	static get template() {
		return ColorPaletteTemplate;
	}

	static get dependencies() {
		return [ColorPaletteEntry];
	}

	static async onDefine() {

	}

	constructor() {
		super();
	}

	onBeforeRendering() {
		this._colorsArray = this.colors;
	}

	onAfterRendering() {
		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => Array.from(this.getDomRef().getElementsByClassName("ui5-cp-swatch")),
			rowSize: 5,
			behavior: ItemNavigationBehavior.Cyclic,
		});

		this._itemNavigation.onOverflowBottomEdge = this.onOverflowBottomEdge;
		this._itemNavigation.onOverflowTopEdge = this.onOverflowTopEdge;
	}

	selectColor(target) {
		target.focus();
		this._itemNavigation.update(target);

		this.value = target.getAttribute("value");

		this.fireEvent("change", {
			color: this.value,
		});
	}

	onOverflowBottomEdge(event) {
		const newIndex = this.currentIndex % this.rowSize;
		this.currentIndex = newIndex + 1 >= this.rowSize ? 0 : newIndex + 1;

		return;
	}

	onOverflowTopEdge(event) {
		const items = this._getItems();
		const firstIndex = -5;
		let rowsMultiplier;

		if(this.currentIndex === firstIndex) {
			rowsMultiplier = Math.floor((items.length + (this.rowSize + 2)) / this.rowSize);
		} else {
			rowsMultiplier = Math.floor((items.length + (this.rowSize + this.currentIndex + 2)) / this.rowSize);
		}

		const newIndex = this.currentIndex + rowsMultiplier * this.rowSize;

		this.currentIndex = newIndex - 1;

		return;
	}

	_onclick(event) {
		const target = event.target;
		event.preventDefault();
		event.stopPropagation();

		if (target.classList.contains("ui5-cp-swatch")){
			this.selectColor(target);
		}
	}

	_onkeyup(event) {
		const target = event.target;
		event.preventDefault();
		event.stopPropagation();

		if (isEnter(event) || isSpace(event)) {
			this.selectColor(target);
		}
	}


	get colorsArray() {
		const elementsPerRow = 5;
		const maxAllowedColors = 15;
		const rowsArray = this._colorsArray.slice(0, maxAllowedColors).reduce((resultArray, item, index) => { 
			const chunkIndex = Math.floor(index / elementsPerRow);

			if(!resultArray[chunkIndex]) {
			  resultArray[chunkIndex] = [];
			}

			resultArray[chunkIndex].push({ value: item.value, id: index });

			return resultArray;
		}, []);

		return rowsArray;
	}

	get colorContainerLabel() {
		return "labelinho";
	}

	get colorLabel() {
		return "color";
	}
}

ColorPalette.define();

export default ColorPalette;
