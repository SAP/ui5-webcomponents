import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import URI from "@ui5/webcomponents-base/src/types/URI.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-option",
	noShadowDOM: true,
	usesNodeText: true,
	properties: /** @lends  sap.ui.webcomponents.main.Option.prototype */  {
		selected: {
			type: Boolean,
		},
		icon: {
			type: URI,
			defaultValue: null,
		},
		value: {
			type: String,
		},
	},

	events: /** @lends sap.ui.webcomponents.main.Option.prototype */ {

	},
};

class Option extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

Bootstrap.boot().then(_ => {
	Option.define();
});

export default Option;
