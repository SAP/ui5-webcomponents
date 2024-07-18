import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import browserScrollbarCSS from "@ui5/webcomponents/dist/generated/themes/BrowserScrollbar.css.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type SideNavigation from "./SideNavigation.js";

// Template
import ToolPageTemplate from "./generated/templates/ToolPageTemplate.lit.js";

// Styles
import ToolPageCss from "./generated/themes/ToolPage.css.js";

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tool-page` is a container ...
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/ToolPage.js";`
 * @constructor
 * @extends UI5Element
 * @since 2.1.0
 * @public
 */
@customElement({
	tag: "ui5-tool-page",
	languageAware: true,
	renderer: litRender,
	styles: [
		browserScrollbarCSS,
		ToolPageCss,
	],
	template: ToolPageTemplate,
})
class ToolPage extends UI5Element {
	_sideCollapsed = false;

	/**
	 * Indicates whether if the side menu is collapsed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	set sideCollapsed(value: boolean) {
		this._sideCollapsed = value;

		if (isPhone()) {
			return;
		}

		if (this.sideContent.length > 0) {
			(this.sideContent[0] as SideNavigation).collapsed = value;
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

	get classes() {
		return {
			root: {
				"ui5-tool-page-phone": isPhone(),
			},
		};
	}
}

ToolPage.define();

export default ToolPage;
