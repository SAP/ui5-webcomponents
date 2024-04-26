import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import DOMReference from "@ui5/webcomponents-base/dist/types/DOMReference.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import menuTemplate from "./generated/templates/TestMenuItemTemplate.lit.js";
import menuCss from "./generated/themes/TestMenuItem.css.js";

@customElement({
	tag: "ui5-test-menu-item",
	renderer: litRender,
	styles: menuCss,
	template: menuTemplate,
	dependencies: [
	],
})

class TestMenuItem extends UI5Element {
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: {
			properties: false,
			slots: ["default"],
		},
		"default": true,
		individualSlots: true,
	})
	items!: Array<TestMenuItem>;

	@slot()
	content!: Array<HTMLElement>;

	@property({ validator: DOMReference })
	_opener!: HTMLElement | string;

	@property({ type: Boolean })
	_showSubMenu!: boolean;

	_openSubMenu() {
		if (this.items.length) {
			this._showSubMenu = true;
			this._opener = this;
		}
	}

	get _effectiveItems() {
		return this.getSlottedNodes("items");
	}
}

TestMenuItem.define();
export default TestMenuItem;
