import property from "@ui5/webcomponents-base/dist/decorators/property-v2.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import {
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationGroupTemplate from "./generated/templates/SideNavigationGroupTemplate.lit.js";

import {
	SIDE_NAVIGATION_GROUP_HEADER_DESC,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import SideNavigationGroupCss from "./generated/themes/SideNavigationGroup.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * Represents a group of navigation actions within `ui5-side-navigation`.
 * The `ui5-side-navigation-group` can only be used inside a `ui5-side-navigation`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";`
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.24.0
 */
@customElement({
	tag: "ui5-side-navigation-group",
	renderer: litRender,
	template: SideNavigationGroupTemplate,
	styles: SideNavigationGroupCss,
	dependencies: [
		Icon,
	],
})
class SideNavigationGroup extends SideNavigationItemBase {
	/**
	 * Defines if the item is expanded
	 *
	 * @public
	 * @default false
	 */
	@property({ type: Boolean })
	expanded = false;

	/**
	 * Defines nested items by passing `ui5-side-navigation-item` to the default slot.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SideNavigationItem>;

	static i18nBundle: I18nBundle;

	get overflowItems() : Array<HTMLElement> {
		const separator1 = this.shadowRoot!.querySelector(".ui5-sn-item-separator:first-child") as HTMLElement;
		const separator2 = this.shadowRoot!.querySelector(".ui5-sn-item-separator:last-child") as HTMLElement;

		const overflowItems = this.items.reduce((result, item) => {
			return result.concat(item.overflowItems);
		}, new Array<HTMLElement>());

		return [separator1, ...overflowItems, separator2];
	}

	get selectableItems() : Array<SideNavigationSelectableItemBase> {
		return this.items.reduce((result, item) => {
			return result.concat(item.selectableItems);
		}, new Array<SideNavigationSelectableItemBase>());
	}

	get focusableItems() : Array<SideNavigationItemBase> {
		if (this.sideNavCollapsed) {
			return this.items;
		}

		if (this.expanded) {
			return this.items.reduce((result, item) => {
				return result.concat(item.focusableItems);
			}, new Array<SideNavigationItemBase>(this));
		}

		return [this];
	}

	get allItems() : Array<SideNavigationItemBase> {
		return this.items.reduce((result, item) => {
			return result.concat(item.allItems);
		}, new Array<SideNavigationItemBase>(this));
	}

	get _groupId() {
		if (!this.items.length) {
			return undefined;
		}

		return `${this._id}-group`;
	}

	get _expanded() {
		if (!this.items.length) {
			return undefined;
		}

		return this.expanded;
	}

	get _toggleIconName() {
		return this.expanded ? "navigation-down-arrow" : "navigation-right-arrow";
	}

	get belowGroupClassName() {
		if (this.previousElementSibling instanceof SideNavigationGroup) {
			return "ui5-sn-item-group-below-group";
		}

		return "";
	}

	get accDescription() {
		return SideNavigationGroup.i18nBundle.getText(SIDE_NAVIGATION_GROUP_HEADER_DESC);
	}

	_onkeydown = (e: KeyboardEvent) => {
		if (isLeft(e)) {
			this.expanded = false;
			return;
		}

		if (isRight(e)) {
			this.expanded = true;
		}
	}

	_onclick = () => {
		this._toggle();
	}

	_onfocusin = (e: FocusEvent) => {
		e.stopPropagation();

		this.sideNavigation?.focusItem(this);
	}

	_toggle() {
		this.expanded = !this.expanded;
	}

	static async onDefine() {
		[SideNavigationGroup.i18nBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents-fiori"),
			super.onDefine(),
		]);
	}
}

SideNavigationGroup.define();

export default SideNavigationGroup;
