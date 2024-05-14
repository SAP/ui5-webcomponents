import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import type Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import type { ToolbarMinWidthChangeEventDetail } from "@ui5/webcomponents/dist/Toolbar.js";
import ToolbarItemOverflowBehavior from "@ui5/webcomponents/dist/types/ToolbarItemOverflowBehavior.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";

// Template
import DynamicPageTitleTemplate from "./generated/templates/DynamicPageTitleTemplate.lit.js";

// Styles
import DynamicPageTitleCss from "./generated/themes/DynamicPageTitle.css.js";

// Texts
import {
	DYNAMIC_PAGE_ARIA_DESCR_TOGGLE_HEADER,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @class
 *
 * ### Overview
 *
 * Title of the `DynamicPage`.
 *
 * The `DynamicPageTitle` component is part of the `DynamicPage`
 * family and is used to serve as title of the `DynamicPage`.
 *
 * ### Usage
 *
 * The `DynamicPageTitle` can hold any component and displays the most important
 * information regarding the object that will always remain visible while scrolling.
 *
 * **Note:** The `actions` slot accepts any UI5 web component, but it's
 * recommended to use `ui5-toolbar`.
 *
 * The user can switch between the expanded/collapsed states of the
 * `DynamicPage` by clicking on the `DynamicPageTitle`
 * or by using the expand/collapse visual indicators, positioned at the bottom of the
 * `DynamicPageTitle` and the `DynamicPageHeader` inside `ui5-dynamic-page-header-actions`.
 *
 * ### Responsive Behavior
 *
 * The responsive behavior of the `DynamicPageTitle` depends on the behavior of the
 * content that is displayed.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-dynamic-page-title",
	fastNavigation: true,
	renderer: litRender,
	styles: DynamicPageTitleCss,
	template: DynamicPageTitleTemplate,
})

/**
 * Event is fired when the title is toggled.
 * @private
 */
@event("_toggle-title")

class DynamicPageTitle extends UI5Element {
	/**
	 * Defines if the title is snapped.
	 *
	 * @protected
	 * @default false
	 */
	@property({ type: Boolean })
	snapped!: boolean;

	/**
	 * Defines if the mobileNavigationActions are shown.
	 *
	 * @private
	 */
	@property({ type: Boolean })
	mobileNavigationActions!: boolean;

	/**
	 * Indicates if the elements is on focus
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * Defines the content of the Heading of the Dynamic Page.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	heading!: HTMLElement[];

	/**
	 * Defines the heading that is shown only when the header is snapped.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	snappedHeading!: HTMLElement[];

	/**
	 * Defines the heading that is shown only when the header is expanded.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	expandedHeading!: HTMLElement[];

	/**
	 * Defines the actions in the Dynamic page title.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	actions!: HTMLElement[];

	/**
	 * Defines the navigation actions in the Dynamic page title.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	navigationActions!: Array<Toolbar>;

	/**
	 * Defines the content of the Dynamic page title.
	 *
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement })
	content!: HTMLElement[];

	/**
	 * Defines the content of the title that is shown only when the header is snapped.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	snappedContent!: HTMLElement[];

	/**
	 * Defines the content of the title that is shown only when the header is expanded.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	expandedContent!: HTMLElement[];

	/**
	 * Defines the content of the breadcrumbs inside Dynamic Page Title.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	breadcrumbs!: HTMLElement[];

	static i18nBundle: I18nBundle;

	_handleResize: ResizeObserverCallback;
	minContentWidth?: number;
	minActionsWidth?: number;

	constructor() {
		super();
		this._handleResize = this.handleResize.bind(this);
	}

	static async onDefine() {
		DynamicPageTitle.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	onBeforeRendering() {
		this.prepareLayoutActions();
	}

	get styles() {
		return {
			content: {
				"min-width": `${this.minContentWidth || 0}px`,
			},
			actions: {
				"min-width": `${this.minActionsWidth || 0}px`,
			},
		};
	}

	get hasContent() {
		return !!this.content.length;
	}

	get hasHeading() {
		return !!this.heading.length;
	}

	get headingSlotName() {
		if (this.hasHeading) {
			return "heading";
		}
		if (!this.snapped) {
			return "expandedHeading";
		}
		return "snappedHeading";
	}

	get contentSlotName() {
		return !this.snapped ? "expandedContent" : "snappedContent";
	}

	get _headerExpanded() {
		return !this.snapped;
	}

	get _ariaDescribedbyText() {
		return DynamicPageTitle.i18nBundle.getText(DYNAMIC_PAGE_ARIA_DESCR_TOGGLE_HEADER);
	}

	get _ariaLabelledBy() {
		const hasAnyHeading = this[this.headingSlotName].length;
		if (hasAnyHeading) {
			return `${this._id}-heading`;
		}
	}

	prepareLayoutActions() {
		// all navigation/layout actions should have the NeverOverflow behavior
		const navigationActions = this.querySelector<Toolbar>("[ui5-toolbar][slot='navigationActions']");
		if (!navigationActions) {
			return;
		}
		navigationActions.items.forEach(action => {
			action.overflowPriority = ToolbarItemOverflowBehavior.NeverOverflow;
		});
	}

	handleResize() {
		this.mobileNavigationActions = this.offsetWidth < 1280;
	}

	onMinContentWidthChange(e: CustomEvent<ToolbarMinWidthChangeEventDetail>) {
		const slotName = (<HTMLElement>e.target)?.assignedSlot?.name;
		if (!slotName || slotName === "content") {
			this.minContentWidth = e.detail.minWidth;
		} else if (slotName === "actions") {
			this.minActionsWidth = e.detail.minWidth;
		}
	}

	onTitleClick() {
		this.fireEvent("_toggle-title");
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e) || isSpace(e)) {
			e.preventDefault();
			this.fireEvent("_toggle-title");
		}
	}
}

DynamicPageTitle.define();

export default DynamicPageTitle;
