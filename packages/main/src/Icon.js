import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getIconData, getIconDataSync } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import createStyleInHead from "@ui5/webcomponents-base/dist/util/createStyleInHead.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import IconTemplate from "./generated/templates/IconTemplate.lit.js";

// Styles
import iconCss from "./generated/themes/Icon.css.js";

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

/**
 * @public
 */
const metadata = {
	tag: "ui5-icon",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.Icon.prototype */ {
		/**
		 * Defines if the icon is interactive (focusable and pressable)
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		 */
		interactive: {
			type: Boolean,
		},

		/**
		 * Defines the unique identifier (icon name) of each <code>ui5-icon</code>.
		 * <br>
		 *
		 * To browse all available icons, see the
		 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 * <br>
		 *
		 * Example:
		 * <br>
		 * <code>name='add'</code>, <code>name='delete'</code>, <code>name='employee'</code>.
		 * <br><br>
		 *
		 * <b>Note:</b> To use the SAP Fiori Tools icons,
		 * you need to set the <code>tnt</code> prefix in front of the icon's name.
		 * <br>
		 *
		 * Example:
		 * <br>
		 * <code>name='tnt/antenna'</code>, <code>name='tnt/actor'</code>, <code>name='tnt/api'</code>.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		*/
		name: {
			type: String,
		},

		/**
		 * Defines the text alternative of the <code>ui5-icon</code>.
		 * If not provided a default text alternative will be set, if present.
		 * <br><br>
		 * <b>Note:</b> Every icon should have a text alternative in order to
		 * calculate its accessible name.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Defines whether the <code>ui5-icon</code> should have a tooltip.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showTooltip: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		pathData: {
			type: String,
			noAttribute: true,
		},

		/**
		 * @private
		 */
		accData: {
			type: Object,
			noAttribute: true,
		},

		/**
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		* @private
		*/
		invalid: {
			type: Boolean,
		},
	},
	events: {
		/**
		 * Fired on mouseup, space and enter if icon is interactive
		 * @private
		 * @since 1.0.0-rc.8
		 */
		click: {},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component represents an SVG icon.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element; or as a visually appealing clickable area in the form of an icon button.
 * <br><br>
 * A large set of built-in icons is available
 * and they can be used by setting the <code>name</code> property on the <code>ui5-icon</code>.
 * But before using an icon, you need to import the desired icon.
 * <br>
 *
 * For the standard icon collection, you have to import an icon from the <code>@ui5/webcomponents-icons</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons/dist/employee.js";</code>
 * <br>
 *
 * For the SAP Fiori Tools icon collection (supported since 1.0.0-rc.10), you have to import an icon from the <code>@ui5/webcomponents-icons-tnt</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons-tnt/dist/antenna.js";</code>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Icon
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-icon
 * @public
 */
class Icon extends UI5Element {
	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

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

	static async onDefine() {
		this.createGlobalStyle(); // hide all icons until the first icon has rendered (and added the Icon.css)
		await fetchI18nBundle("@ui5/webcomponents");
	}

	_onfocusin(event) {
		if (this.interactive) {
			this.focused = true;
		}
	}

	_onfocusout(event) {
		this.focused = false;
	}

	_onkeydown(event) {
		if (this.interactive && isEnter(event)) {
			this.fireEvent("click");
		}
	}

	_onkeyup(event) {
		if (this.interactive && isSpace(event)) {
			this.fireEvent("click");
		}
	}

	_onclick(event) {
		if (this.interactive) {
			event.preventDefault();
			// Prevent the native event and fire custom event because otherwise the noConfict event won't be thrown
			this.fireEvent("click");
		}
	}

	get _dir() {
		if (!this.effectiveDir) {
			return;
		}

		if (this.ltr) {
			return "ltr";
		}

		return this.effectiveDir;
	}

	get tabIndex() {
		return this.interactive ? "0" : "-1";
	}

	get role() {
		if (this.interactive) {
			return "button";
		}

		return this.accessibleNameText ? "img" : "presentation";
	}

	static createGlobalStyle() {
		if (!window.ShadyDOM) {
			return;
		}
		const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
		if (!styleElement) {
			createStyleInHead(`ui5-icon { display: none !important; }`, { "data-ui5-icon-global": "" });
		}
	}

	static removeGlobalStyle() {
		if (!window.ShadyDOM) {
			return;
		}
		const styleElement = document.head.querySelector(`style[data-ui5-icon-global]`);
		if (styleElement) {
			document.head.removeChild(styleElement);
		}
	}

	async onBeforeRendering() {
		const name = this.name;
		if (!name) {
			/* eslint-disable-next-line */
			return console.warn("Icon name property is required", this);
		}
		let iconData = getIconDataSync(name);
		if (!iconData) {
			iconData = await getIconData(name);
		}

		if (iconData === ICON_NOT_FOUND) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/Assets.js".`);
		}

		if (!iconData) {
			this.invalid = true;
			/* eslint-disable-next-line */
			return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
		}

		// in case a new valid name is set, show the icon
		this.invalid = false;
		this.pathData = iconData.pathData;
		this.accData = iconData.accData;
		this.ltr = iconData.ltr;
	}

	get hasIconTooltip() {
		return this.showTooltip && this.accessibleNameText;
	}

	get accessibleNameText() {
		if (this.accessibleName) {
			return this.accessibleName;
		}

		return this.i18nBundle.getText(this.accData) || undefined;
	}

	async onEnterDOM() {
		setTimeout(() => {
			this.constructor.removeGlobalStyle(); // remove the global style as Icon.css is already in place
		}, 0);
	}
}

Icon.define();

export default Icon;
