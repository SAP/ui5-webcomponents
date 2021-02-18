import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import ColorPaletteTemplate from "./generated/templates/ColorPaletteTemplate.lit.js";
import ColorPaletteItem from "./ColorPaletteItem.js";
import {
	COLORPALETTE_CONTAINER_LABEL,
} from "./generated/i18n/i18n-defaults.js";

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
		 *
		 * The selected color.
		 * @type {CSSColor}
		 * @public
		 */
		value: {
			type: CSSColor,
		 },
	},
	slots: /** @lends sap.ui.webcomponents.main.ColorPalette.prototype */ {
		/**
		 * Defines the <code>ui5-color-palette-item</code> items.
		 * @type {HTMLElement[]}
		 * @slot colors
		 * @public
		 */
		"default": {
			propertyName: "colors",
			type: HTMLElement,
			invalidateOnChildChange: true,
			individualSlots: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ColorPalette.prototype */ {
		/**
		 * Fired when the user selects a color.
		 *
		 * @event
		 * @public
		 * @param {String} color the selected color
		 */
		change: {
			details: {
				color: {
					type: "String",
				},
			},
		 },
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The ColorPalette provides the users with a range of predefined colors.
 * You can set them by using the ColorPaletteItem items as slots.
 *
 * <h3>Usage</h3>
 * The palette is intended for users, who don't want to check and remember the different values of the colors .
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
 * @since 1.0.0-rc.12
 * @appenddocs ColorPaletteItem
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
		return [ColorPaletteItem];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.displayedColors,
			rowSize: 5,
			behavior: ItemNavigationBehavior.Cyclic,
		});
	}

	onBeforeRendering() {
		this.displayedColors.forEach((item, index) => {
			item.index = index + 1;
		});
	}

	selectColor(item) {
		item.focus();
		this._itemNavigation.setCurrentItem(item);

		this.value = item.value;

		this.fireEvent("change", {
			color: this.value,
		});
	}

	_onclick(event) {
		if (event.target.localName === "ui5-color-palette-item") {
			this.selectColor(event.target);
		}
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			event.preventDefault();
			this.selectColor(event.target);
		}
	}

	_onkeydown(event) {
		if (isEnter(event)) {
			this.selectColor(event.target);
		}
	}

	get displayedColors() {
		return this.colors.filter(item => item.value).slice(0, 15);
	}

	get colorContainerLabel() {
		return this.i18nBundle.getText(COLORPALETTE_CONTAINER_LABEL);
	}
}

ColorPalette.define();

export default ColorPalette;
