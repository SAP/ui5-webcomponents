import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import TimelineItemTemplate from "./generated/templates/TimelineItemTemplate.lit.js";
import TimelineLayout from "./types/TimelineLayout.js";
// Styles
import styles from "./generated/themes/TimelineItem.css.js";

const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An entry posted on the timeline.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.TimelineItem
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-timeline-item
 * @implements sap.ui.webc.fiori.ITimelineItem
 * @public
 */
@customElement("ui5-timeline-item")
/**
 * Fired when the item name is pressed either with a
 * click/tap or by using the Enter or Space key.
 * <br><br>
 * <b>Note:</b> The event will not be fired if the <code>name-clickable</code>
 * attribute is not set.
 *
 * @event sap.ui.webc.fiori.TimelineItem#name-click
 * @public
 */
@event("name-click")
class TimelineItem extends UI5Element implements ITabbable {
	/**
	 * Defines the icon to be displayed as graphical element within the <code>ui5-timeline-item</code>.
	 * SAP-icons font provides numerous options.
	 * <br><br>
	 *
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.TimelineItem.prototype.icon
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the name of the item, displayed before the <code>title-text</code>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.TimelineItem.prototype.name
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines if the <code>name</code> is clickable.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.TimelineItem.prototype.nameClickable
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	nameClickable!: boolean;

	/**
	 * Defines the title text of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.TimelineItem.prototype.titleText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	titleText!: string;

	/**
	 * Defines the subtitle text of the component.
	 * @type {string}
	 * @name sap.ui.webc.fiori.TimelineItem.prototype.subtitleText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	subtitleText!: string;

	@property({ defaultValue: "-1", noAttribute: true })
	_tabIndex!: string;

	/**
	 * Defines the items orientation.
	 *
	 * @type {sap.ui.webc.fiori.types.TimelineLayout}
	 * @defaultvalue "Vertical"
	 * @private
	 */
	@property({ type: TimelineLayout, defaultValue: TimelineLayout.Vertical })
	layout!: TimelineLayout;

	/**
	 * Defines the indicator line width.
	 *
	 * @type {string}
	 * @private
	 */
	@property()
	_lineWidth!: string;

	/**
	 * Determines the description of the <code>ui5-timeline-item</code>.
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.fiori.TimelineItem.prototype.default
	 * @slot
	 * @public
	 */

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

	onNamePress() {
		this.fireEvent("name-click", {});
	}

	static get dependencies() {
		return [
			Icon,
			Link,
		];
	}

	/**
	 * Focus the internal link.
	 * @protected
	 */
	focusLink() {
		this.shadowRoot!.querySelector<Link>("[ui5-link]")?.focus();
	}

	get classes() {
		return {
			indicator: {
				"ui5-tli-indicator": true,
				"ui5-tli-indicator-short-line": this._lineWidth === SHORT_LINE_WIDTH,
				"ui5-tli-indicator-large-line": this._lineWidth === LARGE_LINE_WIDTH,
			},
			bubbleArrowPosition: {
				"ui5-tli-bubble-arrow": true,
				"ui5-tli-bubble-arrow--left": this.layout === TimelineLayout.Vertical,
				"ui5-tli-bubble-arrow--top": this.layout === TimelineLayout.Horizontal,
			},
		};
	}
}

TimelineItem.define();

export default TimelineItem;
