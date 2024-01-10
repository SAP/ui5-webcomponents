import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import TitleLevel from "./types/TitleLevel.js";
import WrappingType from "./types/WrappingType.js";

// Template
import TitleTemplate from "./generated/templates/TitleTemplate.lit.js";

// Styles
import titleCss from "./generated/themes/Title.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-title</code> component is used to display titles inside a page.
 * It is a simple, large-sized text with explicit header/title semantics.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Title";</code>
 *
 * @constructor
 * @extends UI5Element
 * @slot {Node[]} default - Defines the text of the component.
 * This component supports nesting a <code>Link</code> component inside.
 * <br><br>
 * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @public
 */
@customElement({
	tag: "ui5-title",
	renderer: litRender,
	template: TitleTemplate,
	styles: titleCss,
})
class Title extends UI5Element {
	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 * <br><b>Note:</b> for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	 *
	 * @default "None"
	 * @public
	 */
	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: `${WrappingType}`

	/**
	 * Defines the component level.
	 * Available options are: <code>"H6"</code> to <code>"H1"</code>.
	 *
	 * @default "H2"
	 * @public
	 */
	@property({ type: TitleLevel, defaultValue: TitleLevel.H2 })
	level!: `${TitleLevel}`;

	get normalizedLevel() {
		return this.level.toLowerCase();
	}

	get h1() {
		return this.normalizedLevel === "h1";
	}

	get h2() {
		return this.normalizedLevel === "h2";
	}

	get h3() {
		return this.normalizedLevel === "h3";
	}

	get h4() {
		return this.normalizedLevel === "h4";
	}

	get h5() {
		return this.normalizedLevel === "h5";
	}

	get h6() {
		return this.normalizedLevel === "h6";
	}
}

Title.define();

export default Title;
