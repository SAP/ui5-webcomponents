import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
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
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An entry posted on the timeline.
 *
 * @constructor
 * @extends UI5Element
 * @implements { ITimelineItem }
 * @public
 * @slot {Node[]} default - Determines the description of the <code>ui5-timeline-item</code>.
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
 * <br><br>
 * <b>Note:</b> The event will not be fired if the <code>name-clickable</code>
 * attribute is not set.
 *
 * @public
 */
@event("name-click")
class TimelineItem extends UI5Element implements ITimelineItem {
	/**
	 * Defines the icon to be displayed as graphical element within the <code>ui5-timeline-item</code>.
	 * SAP-icons font provides numerous options.
	 * <br><br>
	 *
	 * See all the available icons in the <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html">Icon Explorer</ui5-link>.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines the name of the item, displayed before the <code>title-text</code>.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	name!: string;

	/**
	 * Defines if the <code>name</code> is clickable.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	nameClickable!: boolean;

	/**
	 * Defines the title text of the component.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	titleText!: string;

	/**
	 * Defines the subtitle text of the component.
	 * @default ""
	 * @public
	 */
	@property()
	subtitleText!: string;

	@property({ defaultValue: "-1", noAttribute: true })
	forcedTabIndex!: string;

	/**
	 * Defines the items orientation.
	 *
	 * @default "Vertical"
	 * @private
	 */
	@property({ type: TimelineLayout, defaultValue: TimelineLayout.Vertical })
	layout!: `${TimelineLayout}`;

	/**
	 * Defines the indicator line width.
	 *
	 * @private
	 */
	@property()
	forcedLineWidth!: string;

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

	get itemContent() {
		return this.childNodes.length > 0;
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
}

TimelineItem.define();

export default TimelineItem;
