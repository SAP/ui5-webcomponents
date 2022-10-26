import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { SEGMENTEDBUTTON_ARIA_DESCRIPTION, SEGMENTEDBUTTON_ARIA_DESCRIBEDBY } from "./generated/i18n/i18n-defaults.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";

// Template
import SegmentedButtonTemplate from "./generated/templates/SegmentedButtonTemplate.lit.js";

// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-segmented-button",
	altTag: "ui5-segmentedbutton",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */  {
		/**
		 * Defines the accessible ARIA name of the component.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 * @since 1.0.3
		 */
		 accessibleName: {
			type: String,
			defaultValue: undefined,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */ {

		/**
		 * Defines the items of <code>ui5-segmented-button</code>.
		 * <br><br>
		 * <b>Note:</b> Multiple items are allowed.
		 * <br><br>
		 * <b>Note:</b> Use the <code>ui5-segmented-button-item</code> for the intended design.
		 * @type {sap.ui.webcomponents.main.ISegmentedButtonItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */ {

		/**
		 * Fired when the selected item changes.
		 *
		 * @event sap.ui.webcomponents.main.SegmentedButton#selection-change
		 * @param {HTMLElement} selectedItem the pressed item.
		 * @public
		 */
		"selection-change": {
			detail: {
				selectedItem: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-segmented-button</code> shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 * <br><br>
 * <b>Note:</b> There can be just one selected <code>item</code> at a time.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SegmentedButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SegmentedButton
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-segmented-button
 * @since 1.0.0-rc.6
 * @appenddocs SegmentedButtonItem
 * @public
 */
class SegmentedButton extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return SegmentedButtonTemplate;
	}

	static get styles() {
		return SegmentedButtonCss;
	}

	static get dependencies() {
		return [SegmentedButtonItem];
	}

	static async onDefine() {
		SegmentedButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.getSlottedNodes("items"),
		});

		this.absoluteWidthSet = false; // set to true whenever we set absolute width to the component
		this.percentageWidthSet = false; //  set to true whenever we set 100% width to the component
		this.hasPreviouslyFocusedItem = false;

		this._handleResizeBound = this._doLayout.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this.parentNode, this._handleResizeBound);
	}

	onExitDOM() {
		if (this.parentNode) {
			ResizeHandler.deregister(this.parentNode, this._handleResizeBound);
		}
	}

	onBeforeRendering() {
		const items = this.getSlottedNodes("items");

		items.forEach((item, index, arr) => {
			item.posInSet = index + 1;
			item.sizeOfSet = arr.length;
		});

		this.normalizeSelection();
	}

	async onAfterRendering() {
		await this._doLayout();
	}

	prepareToMeasureItems() {
		this.style.width = "";
		this.items.forEach(item => {
			item.style.width = "";
		});
	}

	async measureItemsWidth() {
		await renderFinished();
		this.prepareToMeasureItems();

		this.widths = this.items.map(item => {
			// +1 is added because for width 100.44px the offsetWidth property returns 100px and not 101px
			return item.offsetWidth + 1;
		});
	}

	normalizeSelection() {
		this._selectedItem = this.items.filter(item => item.pressed).pop();

		if (this._selectedItem) {
			this.items.forEach(item => {
				item.pressed = false;
			});
			this._selectedItem.pressed = true;
		}
	}

	_selectItem(event) {
		if (event.target.disabled || event.target === this.getDomRef()) {
			return;
		}

		if (event.target !== this._selectedItem) {
			if (this._selectedItem) {
				this._selectedItem.pressed = false;
			}
			this._selectedItem = event.target;
			this.fireEvent("selection-change", {
				selectedItem: this._selectedItem,
			});
		}

		this._selectedItem.pressed = true;
		this._itemNavigation.setCurrentItem(this._selectedItem);

		return this;
	}

	_onclick(event) {
		this._selectItem(event);
		this.selectedItem.focus();
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			this._selectItem(event);
		} else if (isSpace(event)) {
			event.preventDefault();
		}
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this._selectItem(event);
		}
	}

	_onfocusin(event) {
		// If the component was previously focused,
		// update the ItemNavigation to sync butons` tabindex values
		if (this.hasPreviouslyFocusedItem) {
			this._itemNavigation.setCurrentItem(event.target);
			return;
		}

		// If the component is focused for the first time
		// focus the selected item if such present
		if (this.selectedItem) {
			this.selectedItem.focus();
			this._itemNavigation.setCurrentItem(this._selectedItem);
			this.hasPreviouslyFocusedItem = true;
		}
	}

	async _doLayout() {
		const itemsHaveWidth = this.widths && this.widths.some(item => item.offsetWidth > 2); // 2 are the pixel's added for rounding & IE
		if (!itemsHaveWidth) {
			await this.measureItemsWidth();
		}

		const parentWidth = this.parentNode ? this.parentNode.offsetWidth : 0;

		if (!this.style.width || this.percentageWidthSet) {
			this.style.width = `${Math.max(...this.widths) * this.items.length}px`;
			this.absoluteWidthSet = true;
		}

		this.items.forEach(item => {
			item.style.width = "100%";
		});

		if (parentWidth <= this.offsetWidth && this.absoluteWidthSet) {
			this.style.width = "100%";
			this.percentageWidthSet = true;
		}
	}

	/**
	 * Currently selected item.
	 *
	 * @readonly
	 * @type {sap.ui.webcomponents.main.ISegmentedButtonItem}
	 * @public
	 */
	get selectedItem() {
		return this._selectedItem;
	}

	get ariaDescribedBy() {
		return SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY);
	}

	get ariaDescription() {
		return SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIPTION);
	}
}

SegmentedButton.define();

export default SegmentedButton;
