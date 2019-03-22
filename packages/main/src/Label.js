import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/compatibility/ShadowDOM";
// Template
import LabelRenderer from "./build/compiled/LabelRenderer.lit";
import LabelTemplateContext from "./LabelTemplateContext";

// Styles
import belize from "./themes/sap_belize/Label.less";
import belizeHcb from "./themes/sap_belize_hcb/Label.less";
import fiori3 from "./themes/sap_fiori_3/Label.less";

ShadowDOM.registerStyle("sap_belize", "Label.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Label.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Label.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-label",
	styleUrl: [
		"Label.css",
	],
	usesNodeText: true,
	properties: /** @lends sap.ui.webcomponents.main.Label.prototype */  {

		/**
		 * Defines whether an asterisk character is added to the <code>ui5-label</code> text.
		 * <br><br>
		 * <b>Note:</b> Usually indicates that user input is required.
		 *
		 * @type {boolean}
		 * @public
		 */
		required: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-label</code> should wrap, when there is not enough space.
		 * <br><br>
		 * <b>Note:</b> By default the text would truncate.
		 *
		 * @type {boolean}
		 * @public
		 */
		wrap: {
			type: Boolean,
		},

		/**
		 * Defines the labeled input by providing its ID.
		 * <br><br>
		 * <b>Note:</b> Can be used with both <code>ui5-input</code> and native input.
		 *
		 * @type {string}
		 * @public
		 */
		"for": {
			defaultValue: "",
			type: String,
		},
	},
	renderer: LabelRenderer,
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-label</code> is a component used to represent a label,
 * providing valuable information to the user.
 * Usually it is placed next to a value holder, such as a text field.
 * It informs the user about what data is displayed or expected in the value holder.
 * The <code>ui5-label</code> is associated with its value holder by setting the
 * <code>labelFor</code> association.
 * <br><br>
 * The <code>ui5-label</code> appearance can be influenced by properties,
 * such as <code>required</code> and <code>wrap</code>.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Label";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Label
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-label
 * @usestextcontent
 * @public
 */
class Label extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return LabelRenderer;
	}

	onclick() {
		const elementToFocus = document.getElementById(this.for);

		if (elementToFocus) {
			elementToFocus.focus();
		}
	}

	static get calculateTemplateContext() {
		return LabelTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	Label.define();
});

export default Label;
