import Generic from "./Generic.js";

const metadata = {
	tag: "ui5-test-generic-ext",
	properties: {
		extProp: {
			type: String,
		},
		strProp: {
			defaultValue: "Ext",
		}
	},
	slots: {
		extSlot: {
			type: HTMLElement,
		},
	}
};

class GenericExt extends Generic {
	static get metadata() {
		return metadata;
	}
}

GenericExt.define();
