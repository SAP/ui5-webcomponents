import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import URI from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/URI";
import Integer from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Integer";
import Function from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/Function";
import { fetchCldrData } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/CLDR";
import configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import Icon from "./Icon";
import Link from "./Link";
import TimelineItemTemplateContext from "./TimelineItemTemplateContext";
import TimelineItemRenderer from "./build/compiled/TimelineItemRenderer.lit";

// Styles
import belize from "./themes/sap_belize/TimelineItem.less";
import belizeHcb from "./themes/sap_belize_hcb/TimelineItem.less";
import fiori3 from "./themes/sap_fiori_3/TimelineItem.less";

ShadowDOM.registerStyle("sap_belize", "TimelineItem.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "TimelineItem.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "TimelineItem.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-timeline-item",
	styleUrl: [
		"TimelineItem.css",
	],
	defaultSlot: "description",
	slots: /** @lends sap.ui.webcomponents.main.TimelineItem.prototype */ {
		/**
		 * Determines the description of the <code>ui5-timeline-item</code>.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		description: {
			type: HTMLElement,
			multiple: false,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TimelineItem.prototype */ {
		/**
		 * Defines the icon to be displayed as graphical element within the <code>ui5-timeline-item</code>.
		 * SAP-icons font provides numerous options.
		 * </br></br>
		 *
		 * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
		 *
		 * @type {URI}
		 * @defaultvalue ""
		 * @public
		 */
		icon: { type: URI, defaultValue: null },

		/**
		 * Defines the name of the item.
		 *
		 * @type {String}
		 * @public
		 */
		itemName: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Defines whether the name is clickable.
		 *
		 * @type {Boolean}
		 * @public
		 */
		itemNameClickable: {
			type: Boolean,
		},

		/**
		 * Defines the title text of the component.
		 *
		 * @type {String}
		 * @public
		 */
		titleText: {
			type: String,
			defaultValue: "",
		},

		/**
		 * It's a UNIX timestamp - seconds since 00:00:00 UTC on Jan 1, 1970.
		 * @type {Integer}
		 * @public
		 */
		timestamp: {
			type: Integer,
		},

		/**
		 * Defines the format of date/time of the component.
		 * @type {Integer}
		 * @public
		 */
		timeFormat: {
			type: String,
			defaultValue: "dd.MM.YYYY hh:mm",
		},

		_onItemNamePress: {
			type: Function,
		},

		_tabIndex: {
			type: String,
			defaultValue: "-1",
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TimelineItem.prototype */ {
		/**
		 * Fired when the item name is pressed either with a
		 * click/tap or by using the Enter or Space key.
		 * </br></br>
		 * <b>Note:</b> The event will not be fired if the <code>item-name-clickable</code>
		 * attribute is not set.
		 *
		 * @event
		 * @public
		 */
		itemNamePress: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An entry posted on the timeline.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TimelineItem
 * @extends WebComponent
 * @tagname ui5-timeline
 * @usestextcontent
 * @public
 */
class TimelineItem extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TimelineItemRenderer;
	}

	static get calculateTemplateContext() {
		return TimelineItemTemplateContext.calculate;
	}

	constructor() {
		super();

		this._onItemNamePress = this.onItemNamePress.bind(this);
	}

	onItemNamePress() {
		this.fireEvent("itemNamePress", {});
	}

	static async define(...params) {
		await Promise.all([
			fetchCldrData(configuration.getLocale().getLanguage(), configuration.getLocale().getRegion(), configuration.getLocale().getScript()),
			Icon.define(),
			Link.define(),
		]);

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	TimelineItem.define();
});

export default TimelineItem;
