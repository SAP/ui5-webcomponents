import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import WrappingType from "./types/WrappingType.js";

// Template
import LabelTemplate from "./generated/templates/LabelTemplate.lit.js";

// Styles
import labelCss from "./generated/themes/Label.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-label</code> is a component used to represent a label,
 * providing valuable information to the user.
 * Usually it is placed next to a value holder, such as a text field.
 * It informs the user about what data is displayed or expected in the value holder.
 * <br><br>
 * The <code>ui5-label</code> appearance can be influenced by properties,
 * such as <code>required</code> and <code>wrappingType</code>.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Label";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Label
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-label
 * @public
 */
@customElement({
	tag: "ui5-label",
	renderer: litRender,
	template: LabelTemplate,
	styles: labelCss,
})
class Label extends UI5Element {
	/**
	 * Defines the labeled input by providing its ID.
	 * <br><br>
	 * <b>Note:</b> Can be used with both <code>ui5-input</code> and native input.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Label.prototype.for
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	for!: string;

	/**
	 * Defines whether colon is added to the component text.
	 * <br><br>
	 * <b>Note:</b> Usually used in forms.
	 * @name sap.ui.webc.main.Label.prototype.showColon
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	showColon!: boolean;

	/**
	 * Defines whether an asterisk character is added to the component text.
	 * <br><br>
	 * <b>Note:</b> Usually indicates that user input (bound with the <code>for</code> property) is required.
	 * In that case the <code>required</> property of
	 * the corresponding input should also be set.
	 *
	 * @name sap.ui.webc.main.Label.prototype.required
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	required!: boolean;

	/**
	 * Defines how the text of a component will be displayed when there is not enough space.
	 * Available options are:
	 * <ul>
	 * <li><code>None</code> - The text will be truncated with an ellipsis.</li>
	 * <li><code>Normal</code> - The text will wrap. The words will not be broken based on hyphenation.</li>
	 * </ul>
	 *
	 * @name sap.ui.webc.main.Label.prototype.wrappingType
	 * @type {sap.ui.webc.main.types.WrappingType}
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: WrappingType, defaultValue: WrappingType.None })
	wrappingType!: `${WrappingType}`;

	/**
	 * Defines the text of the component.
	 * <br><b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 *
	 * @type {Node[]}
	 * @slot
	 * @public
	 * @name sap.ui.webc.main.Label.prototype.default
	 */

	_onclick() {
		if (!this.for) {
			return;
		}

		const elementToFocus = (this.getRootNode() as HTMLElement).querySelector(`#${this.for}`) as HTMLElement;
		if (elementToFocus) {
			elementToFocus.focus();
		}
	}
}

Label.define();

export default Label;
