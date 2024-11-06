import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import { customElement, slot } from "@ui5/webcomponents-base/dist/decorators.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import SettingItemTemplate from "./generated/templates/SettingItemTemplate.lit.js";
import type SettingView from "./SettingView.js";
import SettingsItemCss from "./generated/themes/SettingsItem.css.js";

type SettingItemBackEventDetail = {
	item: SettingItem;
};
@customElement({
	tag: "ui5-setting-item",
	renderer: litRender,
	template: SettingItemTemplate,
	styles: [SettingsItemCss],
	dependencies: [Button, TabContainer, Tab, Title],
})

/**
 *
 * @param {HTMLElement} item The setting item.
 * @private
 */
@event<SettingItemBackEventDetail>("_back", {
	detail: {
		item: { type: HTMLElement },
	},
	bubbles: true,
})

/**
 * @class
 * Base class for the items that are accepted by the `ui5-setting-item` component.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
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
	 */
	@property({ type: String })
	icon= "globe";

	@slot({
		type: HTMLElement,
		"default": true,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	views!: Array<SettingView>;

	_individualSlot?: string;

	get _shouldHaveTabs() {
		return this.views.length > 1;
	}

	get _tooltip() {
		return this.tooltip ? this.tooltip : this.text;
	}

	get _isPhone() {
		return isPhone();
	}

	_onBackClick() {
		this.fireDecoratorEvent("_back", { item: this });
	}
}

SettingItem.define();

export type { SettingItemBackEventDetail };
export default SettingItem;
