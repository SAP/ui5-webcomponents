import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import URI from "@ui5/webcomponents-base/src/types/URI.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import IconTemplateContext from "./IconTemplateContext.js";
import IconRenderer from "./build/compiled/IconRenderer.lit.js";

// Styles
import iconCss from "./themes/Icon.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-icon",
	properties: /** @lends sap.ui.webcomponents.main.Icon.prototype */ {

		/**
		 * Defines the source URI of the <code>ui5-icon</code>.
		 * <br><br>
		 * SAP-icons font provides numerous options. To find all the available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * <br><br>
		 * Example:
		 * <br>
		 * <code>src='sap-icons://add'</code>, <code>src='sap-icons://delete'</code>, <code>src='sap-icons://employee'</code>.
		 *
		 * @type {string}
		 * @public
		*/
		src: { type: URI, defaultValue: null },
	},
	events: {
		press: {},
	},
	renderer: IconRenderer,
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component is a wrapper around the HTML tag to embed an icon from an icon font.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
 * In the first case, images are not predefined as tab stops in accessibility mode.
 * <br><br>
 * The <code>ui5-icon</code> uses embedded font instead of pixel image.
 * Comparing to image, <code>ui5-icon</code> is easily scalable,
 * its color can be altered live, and various effects can be added using CSS.
 * <br><br>
 * A large set of built-in icons is available
 * and they can be used by setting the <code>src</code> property on the <code>ui5-icon</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Icon
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-icon
 * @public
 */
class Icon extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return IconRenderer;
	}

	static get calculateTemplateContext() {
		return IconTemplateContext.calculate;
	}

	static get styles() {
		return iconCss;
	}

	focus() {
		HTMLElement.prototype.focus.call(this);
	}

	onclick() {
		this.fireEvent("press");
	}

	onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
			this.__spaceDown = true;
		} else if (isEnter(event)) {
			this.onclick(event);
		}
	}

	onkeyup(event) {
		if (isSpace(event) && this.__spaceDown) {
			this.fireEvent("press");
			this.__spaceDown = false;
		}
	}
}

Bootstrap.boot().then(_ => {
	Icon.define();
});

export default Icon;
