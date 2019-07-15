import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getIconInfo } from "@ui5/webcomponents-base/dist/IconPool.js";
import { getIconData } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import getEffectiveRTL from "@ui5/webcomponents-base/dist/util/getEffectiveRTL.js";
import IconTemplate from "./generated/templates/IconSVGTemplate.lit.js";

// Styles
import iconCss from "./generated/themes/IconSVG.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-icon-svg",
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
		src: {
			type: String,
		},
	},
	events: {
		press: {},
	},
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

	static get render() {
		return litRender;
	}

	static get template() {
		return IconTemplate;
	}

	static get styles() {
		return iconCss;
	}

	get d() {
		return getIconData(this.src).d;
	}

	get viewBox() {
		return getIconData(this.src).viewBox;
	}

	focus() {
		HTMLElement.prototype.focus.call(this);
	}

	onclick() {
		// this.fireEvent("press");
	}

	onkeydown(event) {
		// if (isSpace(event)) {
		// 	event.preventDefault();
		// 	this.__spaceDown = true;
		// } else if (isEnter(event)) {
		// 	this.onclick(event);
		// }
	}

	onkeyup(event) {
		// if (isSpace(event) && this.__spaceDown) {
		// 	this.fireEvent("press");
		// 	this.__spaceDown = false;
		// }
	}

	get classes() {
		const iconInfo = getIconInfo(this.src) || {};
		return {
			main: {
				sapWCIcon: true,
				sapWCIconMirrorInRTL: !iconInfo.suppressMirroring,
			},
		};
	}

	get iconContent() {
		const iconInfo = getIconInfo(this.src) || {};
		return iconInfo.content;
	}

	get dir() {
		return getEffectiveRTL() ? "rtl" : "ltr";
	}

	get fontStyle() {
		const iconInfo = getIconInfo(this.src) || {};
		return `font-family: '${iconInfo.fontFamily}'`;
	}
}

Icon.define();

export default Icon;
