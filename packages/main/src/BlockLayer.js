import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import BlockLayerTemplate from "./generated/templates/BlockLayerTemplate.lit.js";
import styles from "./generated/themes/BlockLayer.css.js";


class BlockLayer extends UI5Element {
	static get metadata() {
		return {
			tag: "ui5-block-layer",
			properties: {
				visible: {
					type: Boolean,
				},
			},
		};
	}

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return BlockLayerTemplate;
	}
}

BlockLayer.define();

export default BlockLayer;
