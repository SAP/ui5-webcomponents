import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import Integer from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Integer";
import TabBase from "./TabBase";
import TabTemplateContext from "./TabTemplateContext";
import TabDesignMode from "./types/TabDesignMode";
import IconColor from "./types/IconColor";
import Icon from "./Icon";
import TabRenderer from "./build/compiled/TabRenderer.lit";

/**
 * @public
 */
const metadata = {
	tag: "ui5-tab",
	styleUrl: [],
	defaultSlot: "content",
	slots: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

		/**
		 * Defines the tab content.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: HTMLElement,
			multiple: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

		/**
		 * The text to be displayed for the item.
		 * @type {String}
		 * @public
		 */
		text: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Enabled items can be selected.
		 * @type {Boolean}
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Represents the "count" text, which is displayed in the tab filter.
		 * @type {String}
		 * @public
		 */
		count: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Specifies the icon to be displayed for the tab filter.
		 * @type {URI}
		 * @public
		 */
		icon: {
			type: URI,
			defaultValue: "",
		},

		/**
		 * Specifies the icon color.
		 *
		 * If an icon font is used, the color can be chosen from the icon colors
		 * (sap.ui.core.IconColor).
		 * Possible semantic colors are: Neutral, Positive, Critical, Negative.
		 * Instead of the semantic icon color the brand color can be used, this is named Default.
		 * Semantic colors and brand colors should not be mixed up inside one IconTabBar.
		 * @type {IconColor}
		 * @public
		 */
		iconColor: {
			type: IconColor,
			defaultValue: IconColor.Default,
		},

		/**
		 * Specifies whether the icon and the texts are placed vertically or horizontally.
		 * @type {TabDesignMode}
		 * @public
		 */
		design: {
			type: TabDesignMode,
			defaultValue: TabDesignMode.Vertical,
		},

		_showAll: { type: Boolean },
		_isSelected: { type: Boolean, defaultValue: false },
		_isInline: { type: Boolean },
		_isNoIcon: { type: Boolean },
		_isNoText: { type: Boolean },
		_tabIndex: { type: String, defaultValue: "-1" },
		_posinset: { type: Integer },
		_setsize: { type: Integer },
		_contentId: { type: String, defaultValue: " " },
		_labelledbyControls: { type: String, defaultValue: " " },
		_isIconColorRead: { type: Boolean },
	},
	events: /** @lends sap.ui.webcomponents.main.Tab.prototype */ {

	},
};

/**
 * @class
 * The <code>ui5-tab</code> represents a selectable item inside a <code>ui5-tabcontainer</code>.
 * It defines both the item in the tab strip (top part of the <code>ui5-tabcontainer</code>) and the
 * content that is presented to the user once the tab is selected.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Tab
 * @extends TabBase
 * @tagname ui5-tab
 * @public
 */
class Tab extends TabBase {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TabRenderer;
	}

	constructor(state) {
		super(state);
	}

	static get calculateTemplateContext() {
		return TabTemplateContext.calculate;
	}

	static async define(...params) {
		await Icon.define();

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	Tab.define();
});

export default Tab;
