import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import { getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";
import getEffectiveRTL from "@ui5/webcomponents-base/src/util/getEffectiveRTL.js";
import Icon from "./Icon.js";
import Link from "./Link.js";
import TimelineItemTemplate from "./build/compiled/TimelineItemTemplate.lit.js";

// Styles
import styles from "./themes/TimelineItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-timeline-item",
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
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		icon: {
			type: String,
		},

		/**
		 * Defines the name of the item.
		 *
		 * @type {string}
		 * @defaultvalue false
		 * @public
		 */
		itemName: {
			type: String,
		},

		/**
		 * Defines whether the <code>itemName</code> is clickable.
		 *
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		itemNameClickable: {
			type: Boolean,
		},

		/**
		 * Defines the title text of the component.
		 *
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		titleText: {
			type: String,
		},

		/**
		 * Defines the subtitle text of the component.
		 * @type {string}
		 * @defaultvalue: ""
		 * @public
		 */
		subtitleText: {
			type: String,
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
 * @extends UI5Element
 * @tagname ui5-timeline
 * @public
 */
class TimelineItem extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TimelineItemTemplate;
	}

	static get styles() {
		return styles;
	}

	constructor() {
		super();
	}

	onItemNamePress() {
		this.fireEvent("itemNamePress", {});
	}

	get classes() {
		return {
			main: {
				sapWCTimelineItem: true,
				sapUiSizeCompact: getCompactSize(),
			},
			indicator: {
				sapWCTimelineIndicator: true,
				sapWCTimelineIndicatorNoIcon: !this.icon,
			},
		};
	}

	get rtl() {
		return getEffectiveRTL() ? "rtl" : undefined;
	}

	static async define(...params) {
		await Promise.all([
			Icon.define(),
			Link.define(),
		]);

		super.define(...params);
	}
}

TimelineItem.define();

export default TimelineItem;
