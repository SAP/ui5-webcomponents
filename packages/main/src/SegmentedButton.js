import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
import { SEGMENTEDBUTTON_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
import ToggleButton from "./ToggleButton.js";

// Template
import SegmentedButtonTemplate from "./generated/templates/SegmentedButtonTemplate.lit.js";

// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-segmentedbutton",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */  {},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */ {

		/**
		 * Defines the buttons of <code>ui5-segmentedbutton</code>.
		 * <br><br>
		 * <b>Note:</b> Multiple buttons are allowed.
		 * <br><br>
		 * <b>Note:</b> Use the <code>ui5-togglebutton</code> for the intended design.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "buttons",
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.SegmentedButton.prototype */ {

		/**
		 * Fired when the selected button changes.
		 *
		 * @event sap.ui.webcomponents.main.SegmentedButton#selection-change
		 * @param {HTMLElement} selectedButton the pressed button.
		 * @public
		 */
		"selection-change": {
			detail: {
				selectedButton: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-segmentedbutton</code> shows a group of buttons. When the user clicks or taps
 * one of the buttons, it stays in a pressed state. It automatically resizes the buttons
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 * <br><br>
 * <b>Note:</b> There can be just one selected <code>button</code> at a time.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SegmentedButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.SegmentedButton
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-segmentedbutton
 * @since 1.0.0-rc.6
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

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
			ToggleButton.define(),
		]);
	}

	constructor() {
		super();
		this.initItemNavigation();

		this.absoluteWidthSet = false; // set to true whenever we set absolute width to the component
		this.percentageWidthSet = false; //  set to true whenever we set 100% width to the component
		this.hasPreviouslyFocusedItem = false;

		this._handleResizeBound = this._doLayout.bind(this);
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onEnterDOM() {
		ResizeHandler.register(this.parentNode, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this.parentNode, this._handleResizeBound);
	}

	onBeforeRendering() {
		this.normalizeSelection();
	}

	async onAfterRendering() {
		await this._doLayout();
	}

	prepareToMeasureButtons() {
		this.style.width = "";
		this.buttons.forEach(button => {
			button.style.width = "";
		});
	}

	async measureButtonsWidth() {
		await RenderScheduler.whenDOMUpdated();
		this.prepareToMeasureButtons();

		this.widths = this.buttons.map(button => {
			// +1 is added because for width 100.44px the offsetWidth property returns 100px and not 101px
			let width = button.offsetWidth + 1;

			if (isIE()) {
				// in IE we are adding 1 one px beacause the width of the border on a button in the middle is not calculated and if the
				// longest button is in the middle, it truncates
				width += 1;
			}

			return width;
		});
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this);

		this._itemNavigation.getItemsCallback = () => this.getSlottedNodes("buttons");
	}

	normalizeSelection() {
		this._selectedButton = this.buttons.filter(button => button.pressed).pop();

		if (this._selectedButton) {
			this.buttons.forEach(button => {
				button.pressed = false;
			});
			this._selectedButton.pressed = true;
		}
	}

	_onclick(event) {
		if (event.target.disabled || event.target === this.getDomRef()) {
			return;
		}

		if (event.target !== this._selectedButton) {
			if (this._selectedButton) {
				this._selectedButton.pressed = false;
			}
			this._selectedButton = event.target;
			this.fireEvent("selection-change", {
				selectedButton: this._selectedButton,
			});
		}

		this._selectedButton.pressed = true;
		this._itemNavigation.update(this._selectedButton);

		return this;
	}

	_onfocusin(event) {
		// If the component was previously focused,
		// update the ItemNavigation to sync butons` tabindex values
		if (this.hasPreviouslyFocusedItem) {
			this._itemNavigation.update(event.target);
			return;
		}

		// If the component is focused for the first time
		// focus the selected item if such present
		if (this.selectedButton) {
			this.selectedButton.focus();
			this._itemNavigation.update(this._selectedButton);
			this.hasPreviouslyFocusedItem = true;
		}
	}

	async _doLayout() {
		const buttonsHaveWidth = this.widths && this.widths.some(button => button.offsetWidth > 2); // 2 are the pixel's added for rounding & IE
		if (!buttonsHaveWidth) {
			await this.measureButtonsWidth();
		}

		const parentWidth = this.parentNode.offsetWidth;

		if (!this.style.width || this.percentageWidthSet) {
			this.style.width = `${Math.max(...this.widths) * this.buttons.length}px`;
			this.absoluteWidthSet = true;
		}

		this.buttons.forEach(button => {
			button.style.width = "100%";
		});

		if (parentWidth <= this.offsetWidth && this.absoluteWidthSet) {
			this.style.width = "100%";
			this.percentageWidthSet = true;
		}
	}

	/**
	 * Currently selected button.
	 *
	 * @readonly
	 * @type { ui5-togglebutton }
	 * @public
	 */
	get selectedButton() {
		return this._selectedButton;
	}

	get ariaDescription() {
		return this.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIPTION);
	}
}

SegmentedButton.define();

export default SegmentedButton;
