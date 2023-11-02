import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import DynamicPageHeaderActionsTemplate from "./generated/templates/DynamicPageHeaderActionsTemplate.lit.js";

// Styles
import DynamicPageHeaderActionsCss from "./generated/themes/DynamicPageHeaderActions.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
 * @alias sap.ui.webc.fiori.DynamicPageHeaderActions
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-dynamic-page-header-actions
 * @public
 */
@customElement({
	tag: "ui5-dynamic-page-header-actions",
	renderer: litRender,
	styles: DynamicPageHeaderActionsCss,
	template: DynamicPageHeaderActionsTemplate,
})

@event("expand-button-click")
@event("pin-button-click")

class DynamicPageHeaderActions extends UI5Element {
	static i18nBundle: I18nBundle;

	static async onDefine() {
		DynamicPageHeaderActions.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	@property({ type: Boolean })
	pinned!: boolean;

	@property({ type: Boolean })
	snapped!: boolean;

	get classes() {
		return {
			root: {
				"ui5-dynamic-page-header-actions-root": true,
			},
			wrapper: {
				"ui5-dynamic-page-header-actions--wrapper": true,
			},
		};
	}

	get arrowButtonIcon() {
		return this.snapped ? "slim-arrow-down" : "slim-arrow-up";
	}

	get pinButtonIcon() {
		return this.pinned ? "pushpin-on" : "pushpin-off";
	}

	onExpandClick() {
		this.fireEvent("expand-button-click");
	}

	onPinClick() {
		this.fireEvent("pin-button-click");
	}
}

DynamicPageHeaderActions.define();

export default DynamicPageHeaderActions;
