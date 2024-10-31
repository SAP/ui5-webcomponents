import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import {
	isPhone,
} from "@ui5/webcomponents-base/dist/Device.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { customElement, slot } from "@ui5/webcomponents-base/decorators.js";
import litRender from "@ui5/webcomponents-base/renderer/LitRenderer.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

// Templates
import SettingTabTemplate from "./generated/templates/SettingTabTemplate.lit.js";
import type SettingView from "./SettingView.js";

@customElement({
	tag: "ui5-setting-tab",
	renderer: litRender,
	template: SettingTabTemplate,
	dependencies: [
		BusyIndicator,
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
class SettingTab extends UI5Element implements ITabbable {
	/**
	 * Defines the title of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	tabTitle?: string;

	/**
	 * Defines the text of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property()
	text?: string;

	/**
	 * Defines the busy state of the component.
	 *
	 * @default false
	 * @public
	 * @since
	 */
	@property({ type: Boolean })
	busy = false;

	@slot()
	views!: Array<SettingView>;

	@slot({
		type: HTMLElement,
		individualSlots: true,
		invalidateOnChildChange: {
			properties: true,
			slots: false,
		},
	})
	items!: Array<SettingTab>

	@property({ type: Object })
	_selectedSettingReference?: SettingTab;

	_individualSlot?: string;

	get settings(): Array<SettingTab> {
		return this.items;
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
	get _isPhone() {
		return isPhone();
	}
}
SettingTab.define();
export default SettingTab;
