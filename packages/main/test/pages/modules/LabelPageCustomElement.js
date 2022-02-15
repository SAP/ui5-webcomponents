// create a custom element for testing the usage of ui5-label in a shadow root

class LabelPageCustomElement extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: "open" });

		const container = document.createElement("div");
		container.innerHTML = `
			<ui5-label for="input">Label:</ui5-label>
			<ui5-input id="input"></ui5-input>
		`;

		this.shadowRoot.append(container);
	}
}

customElements.define("label-page-custom-element", LabelPageCustomElement);