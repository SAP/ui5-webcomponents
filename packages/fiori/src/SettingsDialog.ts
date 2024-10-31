import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

import {
	isPhone,
} from "@ui5/webcomponents-base/dist/Device.js";

// Templates
import { customElement } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import List from "@ui5/webcomponents/List.js";
import Title from "@ui5/webcomponents/Title.js";
import Icon from "@ui5/webcomponents/Icon.js";
import Button from "@ui5/webcomponents/Button.js";
import ListItemStandard from "@ui5/webcomponents/ListItemStandard.js";
import SettingsDialogTemplate from "./generated/templates/SettingsDialogTemplate.lit.js";
import type SettingItem from "./SettingItem.js";
import SettingView from "./SettingView.js";
import SettingTab from "./SettingTab.js";

@customElement({
	tag: "ui5-settings-dialog",
	renderer: litRender,
	template: SettingsDialogTemplate,
	dependencies: [
		Title,
		Input,
		Icon,
		List,
		ListItemStandard,
		Button,
		SettingTab,
		SettingView,
	],
})

/**
	 * @class
	 * Base class for the items that are accepted by the `ui5-setting-tab` component.
	 *
	 * @constructor
	 * @extends UI5Element
	 * @abstract
	 * @public
	 * @since
	 */
class SettingDialog extends UI5Element {
	/**
	 * Defines the headerTitle of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	headerTitle?: string;

	/**
	 * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
	 *
	 * **Note:** By default the Search Field is displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField = false;

	@property({ type: Object })
	_selectedSetting?: SettingItem;

	/**
	 * Defines the `ui5-input`, that will be used as a search field.
	 * @public
	 */
	@slot()
	searchField!: Array<Input>;

	@slot({
		"default": true,
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: true,
		},
	})
	items!: Array<SettingItem>;

	fixedItems: Array<SettingItem> = [];
	// @slot({ type: HTMLElement, invalidateOnChildChange: true })
	// fixedItems!: Array<SettingItem>;

	// _items: Array<SettingItem> = [];

	onBeforeRendering() {
		if (!this.items.length) {
			return;
		}

		this.fixedItems = this.items.filter(item => item.fixedItem);
		const selectedSetting = this.items.find((setting): setting is SettingItem => setting.selected);

		if (selectedSetting) {
			this._selectedSetting = selectedSetting;
		} else {
			this._selectedSetting = this.items[0];
		}
		this.items[0]._selectedSettingReference = this.items[0]; // TODO
	}

	get _isPhone() {
		return isPhone();
	}
}
SettingDialog.define();
export default SettingDialog;
