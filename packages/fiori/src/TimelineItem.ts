import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import type { ITimelineItem } from "./Timeline.js";
import TimelineItemTemplate from "./generated/templates/TimelineItemTemplate.lit.js";
import TimelineLayout from "./types/TimelineLayout.js";
// Styles
import TimelineItemCss from "./generated/themes/TimelineItem.css.js";

const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";

/**
 * @class
 *
 * ### Overview
 *
 * An entry posted on the timeline.
 * @constructor
 * @extends UI5Element
 * @implements { ITimelineItem }
 * @public
 */
@customElement({
	tag: "ui5-timeline-item",
	renderer: litRender,
	styles: TimelineItemCss,
	template: TimelineItemTemplate,
	dependencies: [
		Icon,
		Link,
	],
})
/**
 * Fired when the item name is pressed either with a
 * click/tap or by using the Enter or Space key.
 *
 * **Note:** The event will not be fired if the `name-clickable`
 * attribute is not set.
 * @public
 */
@event("name-click")
class TimelineItem extends UI5Element implements ITimelineItem {
	/**
	 * Defines the icon to be displayed as graphical element within the `ui5-timeline-item`.
	 * SAP-icons font provides numerous options.
	 *
	 * See all the available icons in the [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default undefined
	 * @public
	 */
	@property()
	icon?: string;

	/**
	 * Defines the name of the item, displayed before the `title-text`.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines if the `name` is clickable.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	nameClickable = false;

	/**
	 * Defines the title text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	titleText?: string;

	/**
	 * Defines the subtitle text of the component.
	 * @default undefined
	 * @public
	 */
	@property()
	subtitleText?: string;

	/**
	 * Defines the content of the `ui5-timeline-item`.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	@property({ type: Boolean })
	_firstItemInTimeline = false;

	@property({ type: Boolean })
	_isNextItemGroup = false;

	@property({ noAttribute: true })
	forcedTabIndex: string = "-1";

	/**
	 * Defines the items orientation.
	 * @default "Vertical"
	 * @private
	 */
	@property()
	layout: `${TimelineLayout}` = "Vertical";

	/**
	 * Defines the indicator line width.
	 * @private
	 */
	@property({ noAttribute: true })
	forcedLineWidth?: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	hideBubble = false;

	/**
	 * Marks the last `<ui5-timeline-item>`
	 * @private
	 */
	@property({ type: Boolean })
	_lastItem = false;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	hidden = false;

	/**
	 * Defines the position of the item in a group.
	 * @private
	 */
	@property({ type: Number })
	positionInGroup?: number;

	constructor() {
		super();
	}

	onNamePress() {
		this.fireEvent("name-click", {});
	}

	/**
	 * Focus the internal link.
	 */
	focusLink() {
		this.shadowRoot!.querySelector<Link>("[ui5-link]")?.focus();
	}

	get classes() {
		return {
			indicator: {
				"ui5-tli-indicator": true,
				"ui5-tli-indicator-short-line": this.forcedLineWidth === SHORT_LINE_WIDTH,
				"ui5-tli-indicator-large-line": this.forcedLineWidth === LARGE_LINE_WIDTH,
			},
			bubbleArrowPosition: {
				"ui5-tli-bubble-arrow": true,
				"ui5-tli-bubble-arrow--left": this.layout === TimelineLayout.Vertical,
				"ui5-tli-bubble-arrow--top": this.layout === TimelineLayout.Horizontal,
			},
		};
	}

	get isGroupItem() {
		return false;
	}
}

TimelineItem.define();

export default TimelineItem;
