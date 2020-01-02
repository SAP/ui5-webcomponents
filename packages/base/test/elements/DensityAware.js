import UI5Element from "../../UI5Element.js";

const metadata = {
	tag: "ui5-test-density-aware",
	invalidateOnContentDensityChange: true,
};

class DensityAware extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

DensityAware.define();
