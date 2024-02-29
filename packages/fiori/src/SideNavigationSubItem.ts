import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import SideNavigationItemBase from "./SideNavigationItemBase.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-side-navigation-sub-item` is intended to be used inside a `ui5-side-navigation-item` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`
 * @constructor
 * @extends SideNavigationItemBase
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
@customElement("ui5-side-navigation-sub-item")
class SideNavigationSubItem extends SideNavigationItemBase {
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
