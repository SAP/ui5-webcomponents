import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import { html } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/renderer/LitRenderer";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";

class Simple extends WebComponent {
	static get metadata() {
		return {
			tag: "ui5-simple",
			usesNodeText: true,
		};
	}

	static get renderer() {
		return {
			render: context => {
				return html`<h1>${context.ctr._nodeText} 22</h1>`;
			},
		};
	}
}

Bootstrap.boot().then(_ => {
	Simple.define();
});

export default Simple;
