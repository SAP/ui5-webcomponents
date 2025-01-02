import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import {
	customElement, property, slot, event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import Input, { type InputEventDetail } from "@ui5/webcomponents/dist/Input.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import type { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import SettingsTemplate from "./SettingsTemplate.js";
import SettingItem from "./SettingItem.js";
import SettingsCss from "./generated/themes/Settings.css.js";

// Texts
import {
	SETTINGS_DIALOG_ACCESSIBLE_NAME,
	SETTING_LIST_ARIA_ROLE_DESC,
	SETTINGS_DIALOG_CLOSE_BUTTON_TEXT,
} from "./generated/i18n/i18n-defaults.js";

type SettingsItemSelectEventDetail = {
	item: SettingItem;
}

@customElement({
	tag: "ui5-settings",
	renderer: jsxRenderer,
	template: SettingsTemplate,
	styles: [SettingsCss],
	dependencies: [
		Title,
		Input,
		Icon,
		Dialog,
		Toolbar,
		ToolbarButton,
		ListItemStandard,
		List,
	],
})

/**
 * Fired when an item is selected.
 * @param {SettingItem} item The selected `setting item`.
 * @public
 */
@event<SettingsItemSelectEventDetail>("item-select", {
	detail: {
		/**
		 * @public
		 */
		item: { type: SettingItem },
	},
	cancelable: true,
})

/**
	 * @class
	 * ### Overview
	 *
	 * The `ui5-settings` is an SAP Fiori specific web component that is used in `ui5-profile-menu`
	 * and allows the user to easily see information and settings for the current account.
	 *
	 * ### ES6 Module Import
	 * `import "@ui5/webcomponents-fiori/dist/Settings.js";`
	 *
	 * @constructor
	 * @extends UI5Element
	 * @experimental
	 * @public
	 */
class Settings extends UI5Element {
	eventDetails!: {
		"item-select": SettingsItemSelectEventDetail;
	}
	/**
	 * Defines, if the Settings Dialog is opened.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	open = false;

	/**
	 * Defines the headerTitle of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property({ type: String })
	headerTitle?: string;

	/**
	 * Defines, if the Search Field would be displayed.
	 *
	 * **Note:** By default the Search Field is not displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField = false;

	/**
	 * Defines the setting items.
	 *
	 * **Note:** If no setting items is set as `selected`, the first one will be selected.
	 * @public
	 */
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

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	/**
	 * @private
	 */
	@property({ type: String })
	_searchValue = "";

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_collapsed = false;

	/**
	 * @private
	 */
	@property({ type: Object })
	_selectedSetting?: SettingItem;

	/**
	 * @private
	 */
	_normalItems: Array<SettingItem> = [];

	/**
	 * @private
	 */
	_fixedItems: Array<SettingItem> = [];

	onBeforeRendering() {
		if (!this.items.length) {
			return;
		}

		const searchValue = this._searchValue.toLowerCase();
		this._selectedSetting = undefined;
		this._normalItems = [];
		this._fixedItems = [];
		this.items.forEach(item => {
			if (item.fixedItem && item.text.toLowerCase().includes(searchValue)) {
				this._fixedItems.push(item);
			}

			if (!item.fixedItem && item.text.toLowerCase().includes(searchValue)) {
				this._normalItems.push(item);
			}

			if (item.selected) {
				this._selectedSetting = item;
			}
		});

		if (!this._selectedSetting) {
			this._selectedSetting = this._normalItems[0] || this.items[0];
		}
	}

	setSelectedItem(e: CustomEvent<ListItemClickEventDetail>) {
		const setting = e.detail.item as ListItemBase & { associatedSettingItem: SettingItem };
		const settingItem = setting.associatedSettingItem;
		const eventPrevented = !this.fireDecoratorEvent("item-select", {
			item: settingItem,
		});
		this._collapsed = true;

		if (eventPrevented) {
			return;
		}

		this.items.forEach(item => {
			item.selected = false;
		});
		settingItem.selected = true;
		this._selectedSetting = settingItem;
	}

	get accessibleNameText() {
		return Settings.i18nBundle.getText(SETTINGS_DIALOG_ACCESSIBLE_NAME);
	}

	get ariaRoleDescList() {
		return Settings.i18nBundle.getText(SETTING_LIST_ARIA_ROLE_DESC);
	}

	get closeButtonText() {
		return Settings.i18nBundle.getText(SETTINGS_DIALOG_CLOSE_BUTTON_TEXT);
	}

	get _selectedItemSlotName() {
		return this._selectedSetting ? this._selectedSetting._individualSlot : "";
	}

	_onClose() {
		this.open = false;
	}

	_handleCollapseClick() {
		this._collapsed = false;
	}

	_handleInput(e: CustomEvent<InputEventDetail>) {
		this._searchValue = (e.target as Input).value;
	}

	captureRef(ref: HTMLElement & { associatedSettingItem?: UI5Element} | null) {
		if (ref) {
			ref.associatedSettingItem = this;
		}
	}
}

Settings.define();

export default Settings;
export type {
	SettingsItemSelectEventDetail,
};
