import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import { isSpaceShift } from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import willShowContent from "@ui5/webcomponents-base/dist/util/willShowContent.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

import { SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION } from "./generated/i18n/i18n-defaults.js";
import type { ISegmentedButtonItem } from "./SegmentedButton.js";
import SegmentedButtonItemTemplate from "./generated/templates/SegmentedButtonItemTemplate.lit.js";

import { IButton } from "./Button.js";
import Icon from "./Icon.js";

import segmentedButtonItemCss from "./generated/themes/SegmentedButtonItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Users can use the `ui5-segmented-button-item` as part of a `ui5-segmented-button`.
 *
 * Clicking or tapping on a `ui5-segmented-button-item` changes its state to `selected`.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * `ui5-segmented-button-item`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButtonItem.js";`
 * @constructor
 * @extends UI5Element
 * @implements { ISegmentedButtonItem, IButton }
 * @public
 */
@customElement({
	tag: "ui5-segmented-button-item",
	renderer: litRender,
	template: SegmentedButtonItemTemplate,
	styles: segmentedButtonItemCss,
	dependencies: [Icon],
})
class SegmentedButtonItem extends UI5Element implements IButton, ISegmentedButtonItem {
	/**
	 * Defines whether the component is disabled.
	 * A disabled component can't be selected or
	 * focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines whether the component is displayed as selected.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default ""
	 * @public
	 * @since 1.2.0
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines the icon, displayed as graphical element within the component.
	 * The SAP-icons font provides numerous options.
	 *
	 * Example:
	 * See all the available icons within the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Indicates if the element is focusable
	 * @private
	 */
	@property({ type: Boolean })
	nonInteractive!: boolean;

	/**
	 * Defines the tabIndex of the component.
	 * @private
	 */
	@property({ type:String, defaultValue: "0", noAttribute: true })
	forcedTabIndex!: string;

	/**
	 * Defines the index of the item inside of the SegmentedButton.
	 * @default 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	posInSet!: number;

	/**
	 * Defines how many items are inside of the SegmentedButton.
	 * @default 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	sizeOfSet!: number;

	/**
	 * Defines the text of the component.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	@slot({ type: Node, "default": true })
	text!: Array<Node>;

	static i18nBundle: I18nBundle;

	get ariaDescription() {
		return SegmentedButtonItem.i18nBundle.getText(SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION);
	}

	constructor() {
		super();
	}

	_onclick() {
		this.selected = !this.selected;
	}

	onEnterDOM() {
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpaceShift(e)) {
			e.preventDefault();
		}
	}

	get isIconOnly() {
		return !willShowContent(this.text);
	}

	get tabIndexValue() {
		const tabindex = this.getAttribute("tabindex");

		if (tabindex) {
			return tabindex;
		}

		return this.forcedTabIndex;
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get showIconTooltip() {
		return this.isIconOnly && !this.tooltip;
	}

	static async onDefine() {
		SegmentedButtonItem.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

SegmentedButtonItem.define();

export default SegmentedButtonItem;
