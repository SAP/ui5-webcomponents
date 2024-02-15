import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import {
	isSpace,
	isEnter,
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationGroupTemplate from "./generated/templates/SideNavigationGroupTemplate.lit.js";

// Styles
import SideNavigationItemCss from "./generated/themes/SideNavigationItem.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-side-navigation-group</code> is intended to be used inside a <code>ui5-side-navigation-group</code> only.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationGroup.js";</code>
 *
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-side-navigation-group",
	renderer: litRender,
	template: SideNavigationGroupTemplate,
	styles: SideNavigationItemCss,
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
	expanded!: boolean;

	/**
	 * Defines nested items by passing <code>ui5-side-navigation-item</code> to the default slot.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SideNavigationItem>;

	get overflowItems() : Array<SideNavigationSelectableItemBase> {
		return this.items.reduce((result, item) => {
			return result.concat(item.overflowItems);
		}, new Array<SideNavigationSelectableItemBase>());
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

	_onkeydown = (e: KeyboardEvent) => {
		if (isLeft(e)) {
			this.expanded = false;
			return;
		}

		if (isRight(e)) {
			this.expanded = true;
			return;
		}

		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._toggle();
		}
	}

	_onkeyup = (e: KeyboardEvent) => {
		if (isSpace(e)) {
			this._toggle();
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
}

SideNavigationGroup.define();

export default SideNavigationGroup;
