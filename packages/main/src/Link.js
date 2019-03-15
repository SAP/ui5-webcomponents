import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import KeyCodes from "@ui5/webcomponents-core/dist/sap/ui/events/KeyCodes";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import LinkType from "./types/LinkType";
// Template
import LinkRederer from "./build/compiled/LinkRenderer.lit";
import LinkTemplateContext from "./LinkTemplateContext";

// Styles
import belize from "./themes/sap_belize/Link.less";
import belizeHcb from "./themes/sap_belize_hcb/Link.less";
import fiori3 from "./themes/sap_fiori_3/Link.less";

ShadowDOM.registerStyle("sap_belize", "Link.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Link.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Link.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-link",
	styleUrl: ["Link.css"],
	usesNodeText: true,
	properties: /** @lends  sap.ui.webcomponents.main.Link.prototype */  {

		/**
		 * Determines whether the <code>ui5-link</code> is disabled.
		 * <br><br>
		 * <b>Note:</b> When disabled, the link cannot be triggered by the user.
		 *
		 * @type {boolean}
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Defines the <code>ui5-link</code> target URI.
		 * <br><br>
		 * <b>Note:</b> Standard hyperlink behavior is supported.
		 *
		 * @type {string}
		 * @public
		 */
		href: {
			type: URI,
			defaultValue: "",
		},

		/**
		 * Defines the <code>ui5-link</code> target.
		 * <br><br>
		 * <b>Notes:</b>
		 * <ul><li>Available options are the standard values: <code>_self</code>, <code>_top</code>,
		 * <code>_blank</code>, <code>_parent</code>, and <code>_search</code>.</li>
		 * <li>This property must only be used when the <code>href</code> property is set.</li></ul>
		 *
		 * @type {string}
		 * @public
		 */
		target: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines the <code>ui5-link</code> type.
		 * <br><br>
		 * <b>Note:</b> Avaialble options are <code>Default</code>, <code>Subtle</code>, and <code>Emphasized</code>.
		 *
		 * @type {String}
		 * @defaultvalue "Default"
		 * @public
		 */
		type: {
			type: LinkType,
			defaultValue: LinkType.Default,
		},

		/**
		 * Defines whether the <code>ui5-link</code> text should wrap
		 * when there is no sufficient space.
		 * <br><br>
		 * <b>Note:</b> the text is truncated by default.
		 *
		 * @type {boolean}
		 * @public
		 */
		wrap: {
			type: Boolean,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Link.prototype */ {

		/**
		 * Fired when the <code>ui5-link</code> is triggered either with a click/tap
		 * or by using the Space or Enter key.
		 *
		 * @event
		 * @public
		 */
		press: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-link</code> is a hyperlink component is used to navigate to other
 * apps and web pages or to trigger actions.
 * It is a clickable text element, visualized in such a way that it stands out
 * from the standard text.
 * On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *

 *
 * <h3>Usage</h3>
 *
 * You can set the <code>ui5-link</code> to be enabled or disabled.
 * <br><br>
 * To create a visual hierarchy in large lists of links, you can set the less important links as
 * <code>Subtle</code> or the more important ones as <code>Emphasized</code>
 * by using the <code>type</code> property.
 * <br><br>
 * If the <code>href</code> property is set, the link behaves as the basic HTML
 * anchor tag (<code><a></code>) and opens the specified URL in the given target frame (<code>target</code> property).
 * To specify where the linked content is opened, you can use the <code>target</code> property.
 *
 * <h3>Responsive behavior</h3>
 *
 * If there is not enough space, the text of the <code>ui5-link</code> becomes truncated.
 * If the <code>wrap</code> property is set to <code>true</code>, the text is displayed
 * on several lines instead of being truncated.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Link";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Link
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-link
 * @usestextcontent
 * @public
 */
class Link extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return LinkRederer;
	}

	ontap(event) {
		if (this.disabled) {
			return;
		}

		const defaultPrevented = !this.fireEvent("press", {}, true);
		if (defaultPrevented) {
			event.preventDefault();
		}
	}

	onkeydown(event) {
		const eventKeyCode = event.keyCode;

		if (this.disabled) {
			return;
		}

		if (eventKeyCode === KeyCodes.SPACE) {
			event.preventDefault();
		}
	}

	onkeyup(event) {
		if (this.disabled) {
			return;
		}

		if (event.keyCode === KeyCodes.SPACE) {
			const defaultPrevented = !this.fireEvent("press", {}, true);
			if (defaultPrevented) {
				return;
			}

			// Simulate click event
			const oClickEvent = document.createEvent("MouseEvents");
			oClickEvent.initEvent("click" /* event type */, false/* no-bubbling */, true /* cancelable */);
			this.getDomRef().dispatchEvent(oClickEvent);
		}
	}

	static get calculateTemplateContext() {
		return LinkTemplateContext.calculate;
	}
}

Bootstrap.boot().then(_ => {
	Link.define();
});

export default Link;
