import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import TimelineItem from "./TimelineItem.js";
import TimelineTemplate from "./generated/templates/TimelineTemplate.lit.js";

// Styles
import styles from "./generated/themes/Timeline.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-timeline",
	slots: /** @lends sap.ui.webcomponents.main.Timeline.prototype */ {
		/**
		 * Determines the content of the <code>ui5-timeline</code>.
		 *
		 * @type {TimelineItem[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: TimelineItem,
			individualSlots: true,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The timeline control shows entries (such as objects, events, or posts) in chronological order.
 * A common use case is to provide information about changes to an object, or events related to an object.
 * These entries can be generated by the system (for example, value XY changed from A to B), or added manually.
 * There are two distinct variants of the timeline: basic and social. The basic timeline is read-only,
 * while the social timeline offers a high level of interaction and collaboration, and is integrated within SAP Jam.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Timeline
 * @extends UI5Element
 * @tagname ui5-timeline
 * @appenddocs TimelineItem
 * @public
 * @since 0.8.0
 */
class Timeline extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return styles;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TimelineTemplate;
	}

	constructor() {
		super();

		this.initItemNavigation();
	}

	onBeforeRendering() {
		this._itemNavigation.init();
	}

	initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this);
		this._itemNavigation.getItemsCallback = () => this.items;

		this._delegates.push(this._itemNavigation);
	}
}

Timeline.define();

export default Timeline;
