import UI5Element from "../../dist/UI5Element.js";
import litRender, { html } from "../../dist/renderer/LitRenderer.js";

const metadata = {
	tag: "ui5-with-static-area",
	properties: {
		/**
		 * Defines whether the static area item will be rendered
		 */
		staticContent: {
			type: Boolean,
		}
	},
	slots: {

	}
};

class WithStaticArea extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return element => {
			// access effectiveDir getter to mark control as RTL-aware (test changes dir attribute and expects rerender)
			return html`
				<div dir=${element.effectiveDir}>
					WithStaticArea works!
				</div>`;
		};
	}

	static get staticAreaTemplate() {
		return element => {
			return html`
				<div class="ui5-with-static-area-content">
					Static area content.
				</div>`;
		};
	}

	static get styles() {
		return `
			:host {
				display: inline-block;
				border: 1px solid black;
				color: red;
			}`;
	}

	async addStaticArea() {
		if (!this.staticContent) {
			return;
		}

		// Require static area item
		const staticArea = await this.getStaticAreaItemDomRef();
		this.responsivePopover = staticArea.querySelector(".ui5-with-static-area-content");
		return this.responsivePopover;
	}

	onBeforeRendering() {
		this.addStaticArea();
	}
	onAfterRendering() {}
	onEnterDOM() {}
	onExitDOM() {}
}

WithStaticArea.define();

export default WithStaticArea;
