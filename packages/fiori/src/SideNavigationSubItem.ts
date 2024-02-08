import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-side-navigation-sub-item</code> is intended to be used inside a <code>ui5-side-navigation-item</code> only.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";</code>
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
@customElement("ui5-side-navigation-sub-item")
class SideNavigationSubItem extends SideNavigationSelectableItemBase {
	get isFixedItem() {
		return this.parentElement?.slot === "fixedItems";
	}

	_onkeydown = (e: KeyboardEvent) => {
		super._onkeydown(e);
	}

	_onkeyup = (e: KeyboardEvent) => {
		super._onkeyup(e);
	}

	_onfocusin = (e: FocusEvent) => {
		super._onfocusin(e);
	}

	_onclick = (e: PointerEvent) => {
		super._onclick(e);
	}
}

SideNavigationSubItem.define();

export default SideNavigationSubItem;
