import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/circle-task-2.js";
import "@ui5/webcomponents-icons/dist/arrow-right.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationSubItemTemplate from "./generated/templates/SideNavigationSubItemTemplate.lit.js";

// Styles
import SideNavigationItemCss from "./generated/themes/SideNavigationItem.css.js";

/**
 * @class
 *
 * ### Overview
 * Represents a single navigation action within `ui5-side-navigation-item`.
 * The `ui5-side-navigation-sub-item` is intended to be used inside a `ui5-side-navigation-item` only.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`
 *
 * @constructor
 * @extends SideNavigationSelectableItemBase
 * @public
 * @abstract
 * @since 1.0.0-rc.8
 */
@customElement({
	tag: "ui5-side-navigation-sub-item",
	renderer: litRender,
	template: SideNavigationSubItemTemplate,
	styles: SideNavigationItemCss,
	dependencies: [
		Icon,
	],
})
class SideNavigationSubItem extends SideNavigationSelectableItemBase {
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
