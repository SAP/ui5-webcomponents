import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
import type { ColorPaletteItemClickEventDetail } from "./ColorPalette.js";
import type ColorPaletteItem from "./ColorPaletteItem.js";

type ColorPalettePopoverItemClickEventDetail = ColorPaletteItemClickEventDetail;

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
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.16
 */
@customElement({
	tag: "ui5-color-palette-popover",
	renderer: litRender,
	styles: [ResponsivePopoverCommonCss, ColorPalettePopoverCss],
	template: ColorPalettePopoverTemplate,
	dependencies: [
		ResponsivePopover,
		Button,
		Title,
		ColorPalette,
	],
})

/**
 * Fired when the user selects a color.
 *
 * @public
 * @param {string} color the selected color
 */
@event("item-click", {
	detail: {
		/**
		 * @public
		 */
		color: {
			type: String,
		},
	},
})
class ColorPalettePopover extends UI5Element {
	/**
	 * Defines whether the user can see the last used colors in the bottom of the component
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showRecentColors!: boolean;

	/**
	 * Defines whether the user can choose a custom color from a component.
	 * <b>Note:</b> In order to use this property you need to import the following module: <code>"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"</code>
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showMoreColors!: boolean;

	/**
	 * Defines whether the user can choose the default color from a button.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showDefaultColor!: boolean;

	/**
	 * Defines the default color of the component.
	 * <b>Note:</b> The default color should be a part of the ColorPalette colors</code>
	 *
	 * @default undefined
	 * @public
	 */
	@property({ validator: CSSColor })
	defaultColor?: string;

	/**
	 * Defines the content of the component.
	 *
	 * @default []
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, individualSlots: true })
	colors!: Array<ColorPaletteItem>;

	static i18nBundle: I18nBundle;

	responsivePopover?: ResponsivePopover;

	static async onDefine() {
		ColorPalettePopover.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
	}

	_respPopover() {
		this.responsivePopover = this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
		return this.responsivePopover;
	}

	_colorPalette() {
		return this.responsivePopover!.content[0].querySelector<ColorPalette>("[ui5-color-palette]")!;
	}

	/**
	 * Shows the ColorPalettePopover.
	 *
	 * @param opener the element that the popover is shown at
	 * @public
	 * @since 1.1.1
	 */
	showAt(opener: HTMLElement): void {
		this._openPopover(opener);
	}

	/**
	 * Shows the ColorPalettePopover.
	 * <b>Note:</b> The method is deprecated and will be removed in future, use <code>showAt</code> instead.
	 *
	 * @param opener the element that the popover is shown at
	 * @public
	 * @since 1.0.0-rc.16
	 * @deprecated The method is deprecated in favour of <code>showAt</code>.
	 */
	openPopover(opener: HTMLElement): void {
		console.warn("The method 'openPopover' is deprecated and will be removed in future, use 'showAt' instead."); // eslint-disable-line
		this._openPopover(opener);
	}

	_openPopover(opener: HTMLElement) {
		this._respPopover();

		this.responsivePopover!.showAt(opener, true);

		if (this.showDefaultColor) {
			this._colorPalette().colorPaletteNavigationElements[0].focus();
		} else {
			this._colorPalette().focusColorElement(this._colorPalette().colorPaletteNavigationElements[0], this._colorPalette()._itemNavigation);
		}
	}

	closePopover() {
		this.responsivePopover!.close();
	}

	onSelectedColor(e: CustomEvent<ColorPaletteItemClickEventDetail>) {
		this.closePopover();
		this.fireEvent<ColorPalettePopoverItemClickEventDetail>("item-click", e.detail);
	}

	/**
	 * Returns if the component is opened.
	 *
	 * @protected
	 * @since 1.0.0-rc.16
	 */
	isOpen(): boolean {
		this._respPopover();
		return this.responsivePopover!.opened;
	}

	get colorPaletteColors() {
		return this.getSlottedNodes<ColorPaletteItem>("colors");
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
export type { ColorPalettePopoverItemClickEventDetail };
