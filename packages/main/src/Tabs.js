import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import TabsCss from "./generated/themes/Tabs.css.js";
import TabsTemplate from "./generated/templates/TabsTemplate.lit.js";
import Tb from "./Tb.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tabs",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.Tabs.prototype */ {
		/**
		 * @private
		 */
		selectedTab: {
			type: Object,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.Tabs.prototype */ {
		/**
		 */
		"default": {
			propertyName: "tabs",
			type: HTMLElement,
			individualSlots: true,
			invalidateOnChildChange: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Tabs.prototype */ {
	},
};

const walk = (tabs, callback) => {
	[...tabs].forEach(tab => {
		callback(tab);
		if (tab.subtabs) {
			walk(tab.subtabs, callback);
		}
	});
};

/**
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Tabs
 * @extends UI5Element
 * @tagname ui5-Tabs
 * @since 1.0.0-rc.6
 * @implements sap.ui.webcomponents.main.ITabs
 * @public
 */
class Tabs extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return TabsCss;
	}

	static get template() {
		return TabsTemplate;
	}

	static get dependencies() {
		return [Tb];
	}

	get _menu() {
		const items = [];
		walk(this.tabs, tab => {
			items.push(tab);
		});

		return items;
	}

	_handleMenuClick(event) {
		this.selectedTab = event.target.associatedTab;
		console.log("Selected tab is:", this.selectedTab);

		walk(this.tabs, tab => {
			tab.selectedTab = this.selectedTab;
		});
	}
}

Tabs.define();

export default Tabs;
