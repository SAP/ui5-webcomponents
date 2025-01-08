import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import {
	customElement, property, slot, eventStrict as event,
} from "@ui5/webcomponents-base/dist/decorators.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import type { TabContainerTabSelectEventDetail } from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import SettingItemTemplate from "./SettingItemTemplate.js";
import type SettingView from "./SettingView.js";
import SettingsItemCss from "./generated/themes/SettingsItem.css.js";

// Icons
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/nav-back.js";

type SettingItemViewSelectEventDetail = {
	view: SettingView;
}

type SettingItemBackClickEventDetail = {
	view: SettingView;
}

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
 * Fired when a view is selected.
 * @param {SettingView} view The selected `view`.
 * @public
 */
@event("view-select", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when a back button is clicked in a page view.
 * @param {SettingView} view The selected `view`.
 * @public
 */
@event("back-click", {
	bubbles: true,
	cancelable: true,
})

/**
 *
 * @private
 */
@event("_collapse", {
	bubbles: true,
})

/**
 * @class
 * ### Overview
 *
 * The `ui5-setting-item` represents an item in the `ui5-settings dialog`.
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
		"_collapse": void,
		"view-select": SettingItemViewSelectEventDetail,
		"back-click": SettingItemBackClickEventDetail,

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
	 * Indicates weather the back button should be shown. It will be shown only on page views if their `selected` property is set to `true`.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showBackButton = false;

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
	_tabViews!: Array<SettingView>;

	/**
	 * @private
	 */
	_pageViews!: Array<SettingView>;

	/**
	 * @private
	 */
	_individualSlot?: string;

	onBeforeRendering() {
		this._tabViews = this.views.filter(view => view.type === "Tab");
		this._pageViews = this.views.filter(view => view.type === "Page");
	}

	get _hasSelectedPageView() {
		return this._pageViews.some(view => view.selected);
	}

	get _selectedPageView() {
		return this._pageViews.find(view => view.selected) || this._pageViews[0];
	}

	get ariaLabelledByText() {
		return `${this.text} ${this.accessibleName}`.trim();
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

	_handleBackButtonClick() {
		if (this._shouldShowBackButton) {
			const selectedPageView = this._selectedPageView;
			const eventPrevented = !this.fireDecoratorEvent("back-click", {
				view: selectedPageView,
			});

			if (!eventPrevented) {
				selectedPageView.selected = false;
			}
		} else {
			this.fireDecoratorEvent("_collapse");
		}
	}

	_handleTabSelect(e: CustomEvent<TabContainerTabSelectEventDetail>) {
		const tab = e.detail.tab as Tab & { associatedSettingView: SettingView };
		const tabView = tab.associatedSettingView;
		const eventPrevented = !this.fireDecoratorEvent("view-select", {
			view: tabView,
		});

		if (eventPrevented) {
			e.preventDefault();
		} else {
			this._tabViews.forEach(view => {
				view.selected = false;
			});
			tabView.selected = true;
		}
	}

	get _shouldShowBackButton() {
		return this.showBackButton && this._hasSelectedPageView;
	}

	captureRef(this: SettingView, ref: HTMLElement & { associatedSettingView?: SettingView} | null) {
		if (ref) {
			ref.associatedSettingView = this;
		}
	}
}

SettingItem.define();

export default SettingItem;
export type {
	SettingItemViewSelectEventDetail,
	SettingItemBackClickEventDetail,
};
