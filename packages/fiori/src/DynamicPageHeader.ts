import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import DynamicPageHeaderTemplate from "./generated/templates/DynamicPageHeaderTemplate.lit.js";

// Styles
import DynamicPageHeaderCss from "./generated/themes/DynamicPageHeader.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
 * @alias sap.ui.webc.fiori.DynamicPageHeader
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-dynamic-page-header
 * @public
 */
@customElement({
	tag: "ui5-dynamic-page-header",
	renderer: litRender,
	styles: DynamicPageHeaderCss,
	template: DynamicPageHeaderTemplate,
})
class DynamicPageHeader extends UI5Element {
	static i18nBundle: I18nBundle;

	static async onDefine() {
		DynamicPageHeader.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	@slot({ "default": true, type: HTMLElement })
	content!: HTMLElement[];
	get classes() {
		return {
			root: {
				"ui5-dynamic-page-header-root": true,
			},
		};
	}
}

DynamicPageHeader.define();

export default DynamicPageHeader;
