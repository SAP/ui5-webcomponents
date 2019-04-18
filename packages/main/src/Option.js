import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import URI from "@ui5/webcomponents-base/src/types/URI";
import StandardListItem from "./StandardListItem";

import OptionRenderer from "./build/compiled/OptionRenderer.lit";

/**
 * @public
 */
const metadata = {
	tag: "ui5-option",
	styleUrl: [
	],
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

class Option extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return OptionRenderer;
	}

	static async define(...params) {
		await StandardListItem.define();

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	Option.define();
});

export default Option;
