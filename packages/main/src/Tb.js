import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TbCss from "./generated/themes/Tb.css.js";
import TbTemplate from "./generated/templates/TbTemplate.lit.js";
/**
 * @public
 */
const metadata = {
	tag: "ui5-tb",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.Tb.prototype */ {
		/**
		 * @private
		 */
		selectedTab: {
			type: Object,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Tb.prototype */ {
		/**
		 */
		"default": {
			type: HTMLElement,
		},
		"subtabs": {
			type: HTMLElement,
			individualSlots: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Tb.prototype */ {
	},
};

/**
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Tb
 * @extends UI5Element
 * @tagname ui5-Tb
 * @since 1.0.0-rc.6
 * @implements sap.ui.webcomponents.main.ITb
 * @public
 */
class Tb extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return TbCss;
	}

	static get template() {
		return TbTemplate;
	}

	isOnSelectedTabPath() {
		return this.selectedTab === this || this.subtabs.some(subtab => subtab.isOnSelectedTabPath());
	}

	get _effectiveSlotName() {
		return this.isOnSelectedTabPath() ? this._individualSlot : "disabled-slot";
	}

	get _defaultSlotName() {
		return this.selectedTab === this ? "" : "disabled-slot";
	}
}

Tb.define();

export default Tb;
