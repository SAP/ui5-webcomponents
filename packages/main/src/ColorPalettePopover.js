import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ColorPalettePopoverTemplate from "./generated/templates/ColorPalettePopoverTemplate.lit.js";

// Styles
import ColorPalettePopoverCss from "./generated/themes/ColorPalettePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

import Popover from "./Popover.js";
import Button from "./Button.js";
import ResponsivePopover from "./ResponsivePopover.js";

// import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"
// import "@ui5/webcomponents/dist/features/ColorPaletteRecentColors.js"

/**
 * @public
 */
const metadata = {
	tag: "ui5-color-palette-popover",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.ColorPalettePopover.prototype */ {
		/**
		 * Defines whether the user can see the last used colors in the bottom of the component
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.19
		 */
		showRecentColors: {
			type: Boolean,
		},

		/**
		 * Defines whether the user can choose a custom color from a color picker
		 * <b>Note:</b> In order to use this property you need to import the following module: <code>"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"</code>
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.19
		 */
		showMoreColors: {
			type: Boolean,
		},

		/**
		 * Defines whether the user can choose the default color from a button.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.19
		 */
		showDefaultColor: {
			type: Boolean,
		},

		/**
		 * Defines the default color of the color palette
		 * <b>Note:</b> The default color should be a part of the ColorPalette colors</code>
		 * @type {CSSColor}
		 * @public
		 * @since 1.0.0-rc.19
		 */
		defaultColor: {
			type: CSSColor,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.ColorPalettePopover.prototype */ {	
		/**
		 * Defines the content of the Popup.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
			propertyName: "colors",
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ColorPalettePopover.prototype */ {
		//
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
 * For the <code>ui5-color-palette-popover</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/ColorPalettePopover.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ColorPalettePopover
 * @extends UI5Element
 * @tagname ui5-color-palette-popover
 * @public
 */
class ColorPalettePopover extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, ColorPalettePopoverCss];
	}

	static get staticAreaTemplate() {
		return ColorPalettePopoverTemplate;
	}

	static get dependencies() {
		return [
			ResponsivePopover,
			Popover,
			Button
		];
	}

	async onAfterRendering() {
		await this._respPopover();
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticAreaItem.querySelector("[ui5-responsive-popover]");

		return this.responsivePopover;
	}

	closePopover() {
		this.responsivePopover.close();
	}

	openPopover(opener) {
		this.responsivePopover.openBy(opener);
	}

	get colorPaletteColors() {
		return this.colors.filter(item => item.value).slice(0, 15);
	} 
}

ColorPalettePopover.define();

export default ColorPalettePopover;
