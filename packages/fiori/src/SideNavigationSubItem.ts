import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRender from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import SideNavigationSelectableItemBase from "./SideNavigationSelectableItemBase.js";
import SideNavigationSubItemTemplate from "./SideNavigationSubItemTemplate.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

// Styles
import SideNavigationSubItemCss from "./generated/themes/SideNavigationSubItem.css.js";

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
	renderer: jsxRender,
	template: SideNavigationSubItemTemplate,
	styles: SideNavigationSubItemCss,
})
class SideNavigationSubItem extends SideNavigationSelectableItemBase {
	/**
	 * Defines if the item's parent is disabled.
	 * @private
	 * @default false
	 * @since 2.10.0
	 */
	@property({ type: Boolean, noAttribute: true })
	_parentDisabled: boolean = false;

	_onkeydown(e: KeyboardEvent) {
		super._onkeydown(e);
	}

	_onkeyup(e: KeyboardEvent) {
		super._onkeyup(e);
	}

	_onfocusin(e: FocusEvent) {
		super._onfocusin(e);
	}

	_onclick(e: MouseEvent) {
		super._onclick(e);
	}

	get effectiveDisabled() {
		return this.disabled || this._parentDisabled;
	}

	get classesArray() {
		const classes = super.classesArray;

		if (this.icon) {
			classes.push("ui5-sn-item-has-icon");
		}

		if (this.effectiveDisabled) {
			classes.push("ui5-sn-item-disabled");
		}

		return classes;
	}
}

SideNavigationSubItem.define();

export default SideNavigationSubItem;
