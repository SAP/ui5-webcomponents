import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";

// Template
import INIT_PACKAGE_VAR_CLASS_NAMETemplate from "./generated/templates/INIT_PACKAGE_VAR_CLASS_NAMETemplate.lit.js";

// Styles
import INIT_PACKAGE_VAR_CLASS_NAMECss from "./generated/themes/INIT_PACKAGE_VAR_CLASS_NAME.css.js";

import { COUNT } from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>INIT_PACKAGE_VAR_TAG</code> component is a demo component that displays some text.
 *
 * @constructor
 * @alias INIT_PACKAGE_VAR_NAMESPACE.INIT_PACKAGE_VAR_CLASS_NAME
 * @extends sap.ui.webc.base.UI5Element
 * @tagname INIT_PACKAGE_VAR_TAG
 * @public
 */
@customElement({
	tag: "INIT_PACKAGE_VAR_TAG",
	renderer: litRender,
	styles: INIT_PACKAGE_VAR_CLASS_NAMECss,
	template: INIT_PACKAGE_VAR_CLASS_NAMETemplate,
})
class INIT_PACKAGE_VAR_CLASS_NAME extends UI5Element {
	static i18nBundle: I18nBundle;

	static async onDefine() {
		INIT_PACKAGE_VAR_CLASS_NAME.i18nBundle = await getI18nBundle("INIT_PACKAGE_VAR_NAME");
	}

	/**
	 * Defines the component count.
	 * @name INIT_PACKAGE_VAR_NAMESPACE.INIT_PACKAGE_VAR_CLASS_NAME.prototype.count
	 * @public
	 * @type { sap.ui.webc.base.types.Integer }
	 */
	@property({ validator: Integer, defaultValue: 0 })
	count!: number;

	onClick() {
		this.count++;
	}

	get counterText() {
		return INIT_PACKAGE_VAR_CLASS_NAME.i18nBundle.getText(COUNT);
	}
}

INIT_PACKAGE_VAR_CLASS_NAME.define();

export default INIT_PACKAGE_VAR_CLASS_NAME;
