import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import {
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import type SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import type SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationGroupTemplate from "./SideNavigationGroupTemplate.js";

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
	renderer: jsxRender,
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

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	get overflowItems() : Array<SideNavigationItem> {
		const separator1 = this.shadowRoot!.querySelector(".ui5-sn-item-separator:first-child") as SideNavigationItem;
		const separator2 = this.shadowRoot!.querySelector(".ui5-sn-item-separator:last-child") as SideNavigationItem;

		const overflowItems = this.items.reduce((result, item) => {
			return result.concat(item.overflowItems);
		}, new Array<SideNavigationItem>());

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

	get belowGroupClassName() {
		if (isInstanceOfSideNavigationGroup(this.previousElementSibling)) {
			return "ui5-sn-item-group-below-group";
		}

		return "";
	}

	get accDescription() {
		return SideNavigationGroup.i18nBundle.getText(SIDE_NAVIGATION_GROUP_HEADER_DESC);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isLeft(e)) {
			this.expanded = false;
			return;
		}

		if (isRight(e)) {
			this.expanded = true;
		}
	}

	_onclick() {
		this._toggle();
	}

	_onfocusin(e: FocusEvent) {
		e.stopPropagation();

		this.sideNavigation?.focusItem(this);
	}

	_toggle() {
		this.expanded = !this.expanded;
	}

	get isSideNavigationGroup() {
		return true;
	}
}

SideNavigationGroup.define();

const isInstanceOfSideNavigationGroup = (object: any): object is SideNavigationGroup => {
	return "isSideNavigationGroup" in object;
};

export default SideNavigationGroup;
export { isInstanceOfSideNavigationGroup };
