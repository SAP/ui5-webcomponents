var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import AccessorBase from "./AccessorBase.js";
import customElement from "../../dist/decorators/customElement.js";
import property from "../../dist/decorators/property.js";
import litRender, { html } from "../../dist/renderer/LitRenderer.js";
let Accessor = class Accessor extends AccessorBase {
    constructor() {
        super(...arguments);
    }
    render() {
        return html `<div>${this.myProp}</div>`;
    }
};
Accessor = __decorate([
    customElement({
        tag: "ui5-test-accessor",
        renderer: litRender,
    })
], Accessor);
__decorate([
    property({ type: String, defaultValue: undefined })
], Accessor.prototype, "title", void 0);
Accessor.define();
export default Accessor;

/*
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender, { html } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

@customElement({
	tag: "ui5-test-accessor",
	renderer: litRender,
})
class Accessor extends UI5Element {
	@property({ type: String, defaultValue: undefined})
	title!: string;

	render() {
		return html`<div>${this.myProp}</div>`;
	}
}

Accessor.define();

export default Accessor;
*/