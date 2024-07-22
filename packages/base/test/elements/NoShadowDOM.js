import UI5Element from "../../src/UI5Element.ts";

const metadata = {
	tag: "ui5-test-no-shadow",
};

class NoShadow extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

NoShadow.define();
