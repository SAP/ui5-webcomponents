import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	customElement, property, slot, event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import SettingItemTemplate from "./SettingItemTemplate.js";
import type SettingView from "./SettingView.js";
import SettingsItemCss from "./generated/themes/SettingsItem.css.js";

// Icons
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";

type SettingItemBackEventDetail = {
	item: SettingItem;
};

@customElement({
	tag: "ui5-setting-item",
	renderer: jsxRenderer,
	template: SettingItemTemplate,
	styles: [SettingsItemCss],
	dependencies: [
		Button,
		TabContainer,
		Tab,
		Title,
		BusyIndicator,
	],
})

/**
 *
 * @private
 */
@event("_collapse", {
	bubbles: true,
})

@event<SettingItemBackEventDetail>("back-navigation", {
	detail: {
		item: { type: SettingItem },
	},
	cancelable: true,
})

/**
	 * @class
	 * ### Overview
	 *
	 * The `ui5-setting-item` represents an item in the `ui5-settings-dialog`.
	 *
	 * ### ES6 Module Import
	 * `import "@ui5/webcomponents-fiori/dist/SettingItem.js";`
	 *
	 * You can disable the <code>SettingItem</code> by setting the <code>enabled</code> property to <code>false</code>,
	 * or use the <code>SettingItem</code> in read-only mode by setting the <code>editable</code> property to false.
	 *
	 * <b>Note:</b> Disabled and read-only states shouldn't be used together.
	 *
	 * @constructor
	 * @extends UI5Element
	 * @experimental
	 * @public
	 */
class SettingItem extends UI5Element {
	eventDetails!: {
		"_collapse": void;
		"back-navigation": SettingItemBackEventDetail;
	}
	/**
	 * Defines the text of the item.
	 *
	 *
	 * @public
	 * @default undefined
	 */
	@property({ type: String })
	text = "";

	/**
	 * Defines the tooltip of the component.
	 *
	 * A tooltip attribute should be provided, in order to represent meaning/function, when the component is collapsed(icon only is visualized).
	 * @default undefined
	 * @public
	 */
	@property({ type: String })
	tooltip = "";

	/**
	 * Defines the headerTitle of the item.
	 *
	 * @public
	 * @default undefined
	 */
	@property({ type: String })
	headerTitle?: string;

	/**
	 * Shows item tab.
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	selected = false;

	/**
	 * Defines whether the component is read-only.
	 *
	 * **Note:** A read-only component is not editable,
	 * but still provides visual feedback upon user interaction.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	readonly = false;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Indicates whether a loading indicator should be shown.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Indicates is there back navigation button.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showBackNavigation = false;

	/**
	 * Defines the position of the item.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	fixedItem = false;

	/**
	 * Defines the icon of the component.
	 *
	 * @default undefined
	 * @public
	 */
	@property({ type: String })
	icon = "globe";

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines the text of the tooltip for the menu item.
	 * @default undefined
	 * @public
	 * @since 1.23.0
	 */

	/**
	 * Defines the views of the setting item.
	 *
	 * **Note:** If there is one view, it will be rendered as a single view. If more than one view is provided, they will be rendered as tabs if the mode of the
	 * `Setting Dialog` is set to `Tabs` and as navigation views if the mode is set to `Navigation`.
	 * @public
	 */
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

	/**
	 * @private
	 */
	_individualSlot?: string;

	get ariaLabelledByText() {
		return `${this.text} ${this.accessibleName}`.trim();
	}

	get _shouldHaveTabs() {
		return this.views.length > 1;
	}

	get _tooltip() {
		return this.tooltip ? this.tooltip : this.text;
	}

	get _isPhone() {
		return isPhone();
	}

	get _icon() {
		return `sap-icon://${this.icon}`;
	}

	_handleCollapseClick() {
		this.fireDecoratorEvent("_collapse");
	}

	_handleBackNavigationClick() {
		!this.fireDecoratorEvent("back-navigation", {
			item: this,
		});
	}
}

SettingItem.define();

export default SettingItem;
export type {
	SettingItemBackEventDetail,
};
