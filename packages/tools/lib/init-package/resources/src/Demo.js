import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import INIT_PACKAGE_VAR_CLASS_NAMETemplate from "./generated/templates/INIT_PACKAGE_VAR_CLASS_NAMETemplate.lit.js";

// Styles
import INIT_PACKAGE_VAR_CLASS_NAMECss from "./generated/themes/INIT_PACKAGE_VAR_CLASS_NAME.css.js";


const metadata = {
	tag: "INIT_PACKAGE_VAR_TAG",
	properties: {
		//
	},
	slots: {
		//
	},
	events: {
		//
	},
};

class INIT_PACKAGE_VAR_CLASS_NAME extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return INIT_PACKAGE_VAR_CLASS_NAMECss;
	}

	static get template() {
		return INIT_PACKAGE_VAR_CLASS_NAMETemplate;
	}

	static async define(...params) {
		super.define(...params);
	}
}

INIT_PACKAGE_VAR_CLASS_NAME.define();

export default INIT_PACKAGE_VAR_CLASS_NAME;
