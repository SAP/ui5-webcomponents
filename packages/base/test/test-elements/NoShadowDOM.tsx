import customElement from "../../src/decorators/customElement.js";
import UI5Element from "../../src/UI5Element.js";

@customElement("ui5-test-no-shadow")
class NoShadow extends UI5Element {}

NoShadow.define();

export default NoShadow;
