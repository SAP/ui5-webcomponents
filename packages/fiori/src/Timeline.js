import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import TimelineTemplate from "./generated/templates/TimelineTemplate.lit.js";
import { TIMELINE_ARIA_LABEL } from "./generated/i18n/i18n-defaults.js";
import TimelineItem from "./TimelineItem.js";

// Styles
import styles from "./generated/themes/Timeline.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-timeline",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.fiori.Timeline.prototype */ {
		/**
		 * Determines the content of the <code>ui5-timeline</code>.
		 *
		 * @type {sap.ui.webcomponents.fiori.ITimelineItem[]}
		 * @slot items
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			individualSlots: true,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-timeline</code> component can be used to display entries (such as objects, events, or posts) in chronological order.
 * A common use case is to provide information about changes to an object, or events related to an object.
 *
 * <h3>Usage</h3>
 * The component is composed of multiple timeline items.
 * To define an entry in the timeline use the <code>ui5-timeline-item</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.Timeline
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

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.items,
		});

		this.i18nBundle = getI18nBundle("@ui5/webcomponents-fiori");
	}

	static get dependencies() {
		return [TimelineItem];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents-fiori");
	}

	get ariaLabel() {
		return this.i18nBundle.getText(TIMELINE_ARIA_LABEL);
	}

	_onfocusin(event) {
		const target = event.target;

		this._itemNavigation.setCurrentItem(target);
	}
}

Timeline.define();

export default Timeline;
