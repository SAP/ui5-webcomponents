import UI5Element from "../../UI5Element.js";
import litRender, { html } from "../../renderer/LitRenderer.js";

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
			return html`
				<div>
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
