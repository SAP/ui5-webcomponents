import UI5Element from "../UI5Element.js";
import litRender, { html } from "../renderer/LitRenderer.js";
import customElement from "../decorators/customElement.js";
import slot from "../decorators/slot.js";
import property from "../decorators/property.js";

@customElement({
	tag: "ui5-test-generic",
	renderer: litRender,
})
class Generic extends UI5Element {
	@property()
	strProp?: string;

	@property({ type: Boolean })
	boolProp = false;

	@property({ type: Object })
	objectProp?: object;

	@property({ type: String, noAttribute: true })
	noAttributeProp?: string;

	@property({ type: Array })
	multiProp?: Array<string>;

	@property()
	defaultValueProp = "Hello";

	@slot({ type: Node, "default": true})
	content!: Array<Node>

	@slot({ type: HTMLElement })
	other!: Array<HTMLElement>

	@slot({ type: HTMLElement, individualSlots: true })
	individual!: Array<HTMLElement>

	@slot({ type: HTMLElement, propertyName: "items" })
	named!: Array<HTMLElement>

	@slot({ type: HTMLElement })
	"row-header"!: Array<HTMLElement>

	static get template() {
		return () => {
			return html`<div><p>
				<slot></slot>
				<slot name="other"></slot>
				<slot name="individual-1"></slot>
				<slot name="individual-2"></slot>
			</p></div>`;
		};
	}

	static get styles() {
		return `:host {
                    display: inline-block;
                    border: 1px solid black;
                    color: var(--var1);
                }`;
	}
}

Generic.define();

export default Generic;
