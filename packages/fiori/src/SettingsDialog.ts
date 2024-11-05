import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { customElement } from "@ui5/webcomponents-base/dist/decorators.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarButton from "@ui5/webcomponents/dist/ToolbarButton.js";
import SettingsDialogTemplate from "./generated/templates/SettingsDialogTemplate.lit.js";
import type SettingItem from "./SettingItem.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigation, { type SideNavigationSelectionChangeEventDetail } from "./SideNavigation.js";
import NavigationLayout from "./NavigationLayout.js";

import SettingsDialogCss from "./generated/themes/SettingsDialog.css.js";

type SettingListItem = SideNavigationItem & {
	mappedItem: SettingItem
};
@customElement({
	tag: "ui5-settings-dialog",
	renderer: litRender,
	template: SettingsDialogTemplate,
	styles: [SettingsDialogCss],
	dependencies: [
		Title,
		Input,
		Icon,
		Button,
		Dialog,
		Toolbar,
		ToolbarButton,
		SideNavigation,
		SideNavigationItem,
		NavigationLayout,
	],
})

/**
 * @class
 * Base class for the items that are accepted by the `ui5-setting-tab` component.
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
class SettingDialog extends UI5Element {
	/**
	 * Defines, if the Settings Dialog is opened.
	 *
	 * **Note:** By default the Search Field is displayed.
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

	@property({ type: Boolean })
	_sideCollapsed = false;

	onBeforeRendering() {
		if (!this.items.length) {
			return;
		}

		if (this.shadowRoot!.querySelector<NavigationLayout>("[ui5-navigation-layout]")) {
			this.shadowRoot!.querySelector<NavigationLayout>("[ui5-navigation-layout]")!.sideCollapsed = this._sideCollapsed; // zTODO: check if there is a better place to change the property
		}

		const selectedSetting = this.items.find(setting => setting.selected);

		if (selectedSetting) {
			this._selectedSetting = selectedSetting;
		} else if (!isPhone()) {
			this._selectedSetting = this.items[0];
			this.items[0].selected = true;
		}
	}

	setSelectedItem(e: CustomEvent<SideNavigationSelectionChangeEventDetail>) {
		const setting = e.detail.item as SettingListItem;
		const settingItem = setting.mappedItem;
		this.items.forEach(item => {
			item.selected = false;
		});
		this._selectedSetting = settingItem;
		settingItem.selected = true;

		if (isPhone()) {
			this._sideCollapsed = true;
		}
	}

	get _selectedItemSlotName() {
		return this._selectedSetting ? this._selectedSetting._individualSlot : "";
	}
}

SettingDialog.define();

export default SettingDialog;
