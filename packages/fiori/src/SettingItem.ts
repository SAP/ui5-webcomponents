import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import {
	isPhone,
} from "@ui5/webcomponents-base/dist/Device.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import { customElement, slot } from "@ui5/webcomponents-base/decorators.js";

// Templates
import SettingItemTemplate from "./generated/templates/SettingItemTemplate.lit.js";
import type SettingTab from "./SettingTab.js";

@customElement({
	tag: "ui5-setting-item",
	renderer: litRender,
	template: SettingItemTemplate,
})

/**
 * @class
 * Base class for the items that are accepted by the `ui5-setting-item` component.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 * @since
 */
class SettingItem extends UI5Element {
	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines the tooltip of the component.
	 *
	 * A tooltip attribute should be provided, in order to represent meaning/function, when the component is collapsed(icon only is visualized).
	 * @default undefined
	 * @public
	 * @since
	 */
	@property()
	tooltip?: string;

	/**
	 * Defines the headerTitle of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	headerTitle?: string;

	/**
	 * Shows item tab.
	 *
	 * @private
	 * @default undefined
	 */
	@property({ type: Boolean })
	selected= false;

	@property({ type: Boolean })
	fixedItem= false;
	/**
	 * Defines the icon of the component.
	 *
	 * @default undefined
	 * @public
	 * @since
	 */
	@property({ type: String })
	icon= "globe";

	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	tabs!: Array<SettingTab>;

	@property({ type: Object })
	_selectedSettingReference?: SettingItem;

	_individualSlot?: string;

	onBeforeRendering() {
	}

	get settings(): Array<SettingTab> {
		return this.tabs;//when return correct item don't render  tabs
	}

	get _defaultSlotName() {
		return this._selectedSettingReference === this ? "" : "disabled-slot";
	}

	get isSelectedSetting(): boolean {
		return this._selectedSettingReference === this;
	}

	get _effectiveSlotName() {
		return this.isSelectedSetting ? this._individualSlot : `disabled-${this._individualSlot}`;
	}

	setSelectedItem() {
		console.log("XXX");
		//arguments[0].target.selected = true;

	}

	get _isPhone() {
		return isPhone();
	}
}
SettingItem.define();
export default SettingItem;
