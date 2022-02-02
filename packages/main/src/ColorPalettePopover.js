import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import CSSColor from "@ui5/webcomponents-base/dist/types/CSSColor.js";
import ColorPalettePopoverTemplate from "./generated/templates/ColorPalettePopoverTemplate.lit.js";

// Styles
import ColorPalettePopoverCss from "./generated/themes/ColorPalettePopover.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import {
	COLORPALETTE_POPOVER_TITLE,
	COLOR_PALETTE_DIALOG_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

import Button from "./Button.js";
import Title from "./Title.js";
import ResponsivePopover from "./ResponsivePopover.js";
import ColorPalette from "./ColorPalette.js";

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
		 */
		showRecentColors: {
			type: Boolean,
		},

		/**
		 * Defines whether the user can choose a custom color from a component.
		 * <b>Note:</b> In order to use this property you need to import the following module: <code>"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"</code>
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showMoreColors: {
			type: Boolean,
		},

		/**
		 * Defines whether the user can choose the default color from a button.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showDefaultColor: {
			type: Boolean,
		},

		/**
		 * Defines the default color of the component.
		 * <b>Note:</b> The default color should be a part of the ColorPalette colors</code>
		 * @type {CSSColor}
		 * @public
		 */
		defaultColor: {
			type: CSSColor,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.ColorPalettePopover.prototype */ {
		/**
		 * Defines the content of the component.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
			propertyName: "colors",
			individualSlots: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ColorPalettePopover.prototype */ {
		/**
		 * Fired when the user selects a color.
		 *
		 * @event sap.ui.webcomponents.main.ColorPalettePopover#item-click
		 * @public
		 * @param {String} color the selected color
		 */
		"item-click": {
			details: {
				color: {
					type: String,
				},
			},
		 },
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * Represents a predefined range of colors for easier selection.
 *
 * Overview
 * The ColorPalettePopover provides the users with a slot to predefine colors.
 *
 * You can customize them with the use of the colors property. You can specify a defaultColor and display a "Default color" button for the user to choose directly.
 * You can display a "More colors..." button that opens an additional color picker for the user to choose specific colors that are not present in the predefined range.
 *
 * <h3>Usage</h3>
 *
 * The palette is intended for users, who don't want to check and remember the different values of the colors and spend large amount of time to configure the right color through the color picker.
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
 * @since 1.0.0-rc.16
 */
class ColorPalettePopover extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return [ResponsivePopoverCommonCss, ColorPalettePopoverCss];
	}

	static get template() {
		return ColorPalettePopoverTemplate;
	}

	static get dependencies() {
		return [
			ResponsivePopover,
			Button,
			Title,
			ColorPalette,
		];
	}

	static async onDefine() {
		ColorPalettePopover.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
	}

	_respPopover() {
		this.responsivePopover = this.shadowRoot.querySelector("[ui5-responsive-popover]");

		return this.responsivePopover;
	}

	_colorPalette() {
		return this.responsivePopover.content[0].querySelector("[ui5-color-palette]");
	}

	/**
	 * Shows the ColorPalettePopover.
	 * @param {HTMLElement} opener the element that the popover is shown at
	 * @public
	 * @since 1.1.1
	 */
	showAt(opener) {
		this._openPopover(opener);
	}

	/**
	 * Shows the ColorPalettePopover.
	 * <b>Note:</b> The method is deprecated and will be removed in future, use <code>showAt</code> instead.
	 * @param {HTMLElement} opener the element that the popover is shown at
	 * @public
	 * @since 1.0.0-rc.16
	 * @deprecated The method is deprecated in favour of <code>showAt</code>.
	 */
	openPopover(opener) {
		console.warn("The method 'openPopover' is deprecated and will be removed in future, use 'showAt' instead."); // eslint-disable-line
		this._openPopover(opener);
	}

	_openPopover(opener) {
		this._respPopover();

		this.responsivePopover.showAt(opener, true);

		if (this.showDefaultColor) {
			this._colorPalette().colorPaletteNavigationElements[0].focus();
		} else {
			this._colorPalette().focusColorElement(this._colorPalette().colorPaletteNavigationElements[0], this._colorPalette()._itemNavigation);
		}
	}

	closePopover() {
		this.responsivePopover.close();
	}

	onSelectedColor(event) {
		this.closePopover();
		this.fireEvent("item-click", event.detail);
	}

	/**
	 * Returns if the component is opened.
	 *
	 * @protected
	 * @since 1.0.0-rc.16
	 * @returns {boolean}
	 */
	isOpen() {
		this._respPopover();

		return this.responsivePopover.opened;
	}

	get colorPaletteColors() {
		return this.getSlottedNodes("colors");
	}

	get _colorPaletteTitle() {
		return ColorPalettePopover.i18nBundle.getText(COLORPALETTE_POPOVER_TITLE);
	}

	get _cancelButtonLabel() {
		return ColorPalettePopover.i18nBundle.getText(COLOR_PALETTE_DIALOG_CANCEL_BUTTON);
	}
}

ColorPalettePopover.define();

export default ColorPalettePopover;
