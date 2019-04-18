import WebComponent from "@ui5/webcomponents-base/src/WebComponent.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle.js";
import TitleLevel from "./types/TitleLevel.js";
import TitleRenderer from "./build/compiled/TitleRenderer.lit.js";

// Styles
// Styles
import titleCss from "./themes/Title.css.js";

addCustomCSS("ui5-title", "sap_fiori_3", titleCss);
addCustomCSS("ui5-title", "sap_belize", titleCss);
addCustomCSS("ui5-title", "sap_belize_hcb", titleCss);

/**
 * @public
 */
const metadata = {
	tag: "ui5-title",
	styleUrl: [
		"Title.css",
	],
	usesNodeText: true,
	properties: /** @lends sap.ui.webcomponents.main.Title.prototype */ {

		/**
		 * Determines whether the <code>ui5-title</code> should wrap.
		 *
		 * @type {Boolean}
		 * @public
		*/
		wrap: {
			type: Boolean,
		},

		/**
		 * Defines the title level.
		 * Supported values are from <code>H5</code> to <code>H1</code>.
		 *
		 * @type {String}
		 * @public
		*/
		level: {
			type: TitleLevel,
			defaultValue: TitleLevel.H2,
		},
	},
};

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
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Title
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-title
 * @usestextcontent
 * @public
 */
class Title extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TitleRenderer;
	}

	static calculateTemplateContext(state) {
		const context = {
			tag: (state.level === TitleLevel.Auto ? "div" : state.level).toLowerCase(),
			ctr: state,
			classes: {
				main: {
					sapMTitle: true,
					sapMTitleWrap: state.wrap,
					sapUiSelectable: true,
					[`sapMTitleStyle${state.level}`]: true,
				},
			},
			styles: {
				main: {},
			},
		};

		return context;
	}
}

Bootstrap.boot().then(_ => {
	Title.define();
});

export default Title;
