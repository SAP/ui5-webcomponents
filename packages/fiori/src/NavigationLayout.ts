import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import browserScrollbarCSS from "@ui5/webcomponents/dist/generated/themes/BrowserScrollbar.css.js";
import {
	isPhone,
	isTablet,
	isCombi,
} from "@ui5/webcomponents-base/dist/Device.js";
import type SideNavigation from "./SideNavigation.js";

// Template
import NavigationLayoutTemplate from "./generated/templates/NavigationLayoutTemplate.lit.js";

// Styles
import NavigationLayoutCss from "./generated/themes/NavigationLayout.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tool-page` is a container ...
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/NavigationLayout.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.1.0
 * @public
 */
@customElement({
	tag: "ui5-navigation-layout",
	languageAware: true,
	renderer: litRender,
	styles: [
		browserScrollbarCSS,
		NavigationLayoutCss,
	],
	template: NavigationLayoutTemplate,
})
class NavigationLayout extends UI5Element {
	_sideCollapsed = isPhone() || (isTablet() && !isCombi());

	/**
	 * @private
	 */
	@property({ type: Boolean })
	isPhone = isPhone();

	/**
	 * @private
	 */
	@property({ type: Boolean })
	isTablet = isTablet() && !isCombi();

	/**
	 * Indicates whether if the side menu is collapsed.
	 * @public
	 */
	@property({ type: Boolean })
	set sideCollapsed(value: boolean) {
		this._sideCollapsed = value;

		if (isPhone()) {
			return;
		}

		const sideNavigation = this.querySelector("[ui5-side-navigation]") as SideNavigation;

		if (sideNavigation) {
			sideNavigation.collapsed = value;
		}
	}

	get sideCollapsed() {
		return this._sideCollapsed;
	}

	/**
	 * Defines the header HTML Element.
	 * @public
	 */
	@slot()
	header!: Array<HTMLElement>;

	/**
	 * Defines the side content HTML Element.
	 * @public
	 */
	@slot()
	sideContent!: Array<HTMLElement>;

	/**
	 * Defines the content HTML Element.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;
}

NavigationLayout.define();

export default NavigationLayout;
