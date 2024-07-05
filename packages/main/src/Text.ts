import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import renderer, { html } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";

// Styles
import styles from "./generated/themes/Text.css.js";

/**
 * @class
 *
 * <h3>Overview</h3>
 *
 * The `ui5-text` component displays text that can be used in any content area of an application.
 *
 * <h3>Usage</h3>
 *
 * - Use the `ui5-text` if you want to display text inside a form, table, or any other content area.
 * - Do not use the `ui5-text` if you need to reference input type of components (use ui5-label).
 *
 * <h3>Responsive behavior</h3>
 *
 * The `ui5-text` component is fully adaptive to all screen sizes.
 * By default, the text will wrap when the space is not enough.
 * In addition, the component supports truncation via the <code>max-lines</code> property,
 * by defining the number of lines the text should wrap before start truncating.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Text";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @slot {Array<Node>} default - Defines the text of the component.
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-text",
	renderer,
	template: () => {
		return html`<bdi><slot></slot></bdi>`;
	},
	styles,
})
class Text extends UI5Element {
	/**
	 * Defines the number of lines the text should wrap before it truncates.
	 * @default Infinity
	 * @public
	 */
	@property({ type: Number })
	maxLines: number = Infinity;

	onBeforeRendering() {
		this.style.setProperty(getScopedVarName("--_ui5_text_max_lines"), `${this.maxLines}`);
	}
}

Text.define();

export default Text;
