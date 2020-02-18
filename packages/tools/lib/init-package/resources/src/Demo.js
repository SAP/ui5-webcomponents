import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

// Template
import INIT_PACKAGE_VAR_CLASS_NAMETemplate from "./generated/templates/INIT_PACKAGE_VAR_CLASS_NAMETemplate.lit.js";

// Styles
import INIT_PACKAGE_VAR_CLASS_NAMECss from "./generated/themes/INIT_PACKAGE_VAR_CLASS_NAME.css.js";

import { PLEASE_WAIT } from "./generated/i18n/i18n-defaults.js";

const metadata = {
	tag: "INIT_PACKAGE_VAR_TAG",
	properties: {
	},
	slots: {
	},
	events: {
	},
};

class INIT_PACKAGE_VAR_CLASS_NAME extends UI5Element {
	constructor() {
		super();
		this.i18nBundle = getI18nBundle("INIT_PACKAGE_VAR_NAME");
	}

	get pleaseWaitText() {
		return this.i18nBundle.getText(PLEASE_WAIT);
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return INIT_PACKAGE_VAR_CLASS_NAMETemplate;
	}

	static get styles() {
		return INIT_PACKAGE_VAR_CLASS_NAMECss;
	}

	static async onDefine() {
		await fetchI18nBundle("INIT_PACKAGE_VAR_NAME");
	}
}

INIT_PACKAGE_VAR_CLASS_NAME.define();

export default INIT_PACKAGE_VAR_CLASS_NAME;
