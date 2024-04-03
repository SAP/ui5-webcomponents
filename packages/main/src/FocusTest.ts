import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import FocusTestTemplate from "./generated/templates/FocusTestTemplate.lit.js";
// Styles
import focusTestCss from "./generated/themes/FocusTest.css.js";

@customElement({
	tag: "ui5-focus-test",
	renderer: litRender,
	template: FocusTestTemplate,
	styles: focusTestCss,
})

class FocusTest extends UI5Element {

}

FocusTest.define();

export default FocusTest;
