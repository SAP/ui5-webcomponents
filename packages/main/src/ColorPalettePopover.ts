import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
import type { ColorPaletteItemClickEventDetail, IColorPaletteItem } from "./ColorPalette.js";
import type ColorPaletteItem from "./ColorPaletteItem.js";

type ColorPalettePopoverItemClickEventDetail = ColorPaletteItemClickEventDetail;

/**
 * @class
 *
 * ### Overview
 * Represents a predefined range of colors for easier selection.
 *
 * Overview
 * The ColorPalettePopover provides the users with a slot to predefine colors.
 *
 * You can customize them with the use of the colors property. You can specify a defaultColor and display a "Default color" button for the user to choose directly.
 * You can display a "More colors..." button that opens an additional color picker for the user to choose specific colors that are not present in the predefined range.
 *
 * ### Usage
 *
 * The palette is intended for users, who don't want to check and remember the different values of the colors and spend large amount of time to configure the right color through the color picker.
 *
 * For the `ui5-color-palette-popover`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/ColorPalettePopover.js";`
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
 * @public
 * @param {string} color the selected color
 */
@event<ColorPalettePopoverItemClickEventDetail>("item-click", {
	detail: {
		/**
		 * @public
		 */
		color: {
			type: String,
		},
	},
})
/**
 * Fired when the `ui5-color-palette-popover` is closed due to user interaction.
 * @since 1.21.0
 * @public
 */
@event("close")
class ColorPalettePopover extends UI5Element {
	/**
	 * Defines whether the user can see the last used colors in the bottom of the component
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showRecentColors = false

	/**
	 * Defines whether the user can choose a custom color from a component.
	 *
	 * **Note:** In order to use this property you need to import the following module: `"@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"`
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showMoreColors = false

	/**
	 * Defines whether the user can choose the default color from a button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showDefaultColor = false

	/**
	 * Defines the default color of the component.
	 *
	 * **Note:** The default color should be a part of the ColorPalette colors`
	 * @default undefined
	 * @public
	 */
	@property()
	defaultColor?: string;

	/**
	 * Defines the open | closed state of the popover.
	 * @public
	 * @default false
	 * @since 1.21.0
	 */
	@property({ type: Boolean })
	open = false

	/**
	 * Defines the ID or DOM Reference of the element that the popover is shown at.
	 * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
	 * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	 * @public
	 * @default undefined
	 * @since 1.21.0
	 */
	@property()
	opener?: HTMLElement | string;

	/**
	 * Defines the content of the component.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, individualSlots: true })
	colors!: Array<IColorPaletteItem>;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		ColorPalettePopover.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();
	}

	get responsivePopover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	get respPopover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	closePopover() {
		this.open = false;
	}

	onAfterClose() {
		this.closePopover();
		this.fireEvent("close");
	}

	onSelectedColor(e: CustomEvent<ColorPaletteItemClickEventDetail>) {
		this.closePopover();
		this.fireEvent<ColorPalettePopoverItemClickEventDetail>("item-click", e.detail);
	}

	/**
	 * Returns if the component is opened.
	 * @protected
	 * @since 1.0.0-rc.16
	 */
	isOpen() {
		return this.open;
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

	get _open() {
		return this.open || undefined;
	}
}

ColorPalettePopover.define();

export default ColorPalettePopover;
export type { ColorPalettePopoverItemClickEventDetail };
