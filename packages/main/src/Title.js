import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import ShadowDOM from "@ui5/webcomponents-base/src/compatibility/ShadowDOM";
import TitleLevel from "./types/TitleLevel";
import TitleRenderer from "./build/compiled/TitleRenderer.lit";

// Styles
import belize from "./themes/sap_belize/Title.less";
import belizeHcb from "./themes/sap_belize_hcb/Title.less";
import fiori3 from "./themes/sap_fiori_3/Title.less";

ShadowDOM.registerStyle("sap_belize", "Title.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Title.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Title.css", fiori3);

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
