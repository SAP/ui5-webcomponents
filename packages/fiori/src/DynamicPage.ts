import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";

import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";

// Template
import DynamicPageTemplate from "./generated/templates/DynamicPageTemplate.lit.js";

// Styles
import DynamicPageCss from "./generated/themes/DynamicPage.css.js";

import DynamicPageHeader from "./DynamicPageHeader.js";
import DynamicPageTitle from "./DynamicPageTitle.js";
import DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";

// Texts
import {
	DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER,
	DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER,
} from "./generated/i18n/i18n-defaults.js";

const SCROLL_DEBOUNCE_RATE = 5; // ms
const SCROLL_THRESHOLD = 10; // px
/**
 * @class
 *
 * ### Overview
 *
 * A layout component, representing a web page, consisting of a title, header with dynamic behavior, a content area, and an optional floating footer.
 *
 * The component consist of several components:
 *
 * - `DynamicPageTitle` - a component, holding the title of the page, the navigation actions and the content. The displayed content changes based on the current mode of the `DynamicPageHeader`.
 * - `DynamicPageHeader` - a generic container, which can contain a single layout component and any other HTML elements. The header works in two modes - expanded and snapped and its behavior can be adjusted with the help of different properties.
 * - `Content area` - a generic container, which can have a single UI5 layout.
 * - `Footer` - positioned at the bottom with a small offset and used for additional actions, the footer floats above the content.
 *
 * ### Usage
 *
 * Use the `DynamicPage` if you need to have a title, that is always visible
 * and a header, that has configurable Expanding/Snapping functionality.
 * If you don't need the Expanding/Snapping functionality it is better to use the
 * `ui5-page` as a lighter component.
 *
 * The app can add to the `default` slot of the ui5-dynamic-page either content that is designed to fit its container (e.g. has 100% height),
 * or content with own height that may overflow its container. In the second case the `DynamicPage` will show a scrollbar that allows the user
 * scroll through the content.
 *
 * ## Notes:
 *
 * - Snapping of the `DynamicPageTitle` is not supported in the following case:
 *  - When the `DynamicPage` has a scroll bar, the component usually scrolls to the snapping point - the point, where the `DynamicPageHeader` is scrolled out completely. However, when there is a scroll bar, but not enough content to reach the snapping point, the snapping is not possible using scrolling.
 *
 * ### Responsive Behavior
 *
 * Dynamic page web component implements the responsive paddings design.
 *
 * ### Keyboard Handling
 *
 *
 * ### Basic Navigation
 *
 * - [SPACE, ENTER, RETURN] - If focus is on a button inside DynamicPageTitle its action is being triggered, once activated.
 * If focus is on the snap header button (arrow button), or on the header itself, once activated, it triggers the associated action (such as snap/expand the header).
 * If focus is on pin button (the button with pin icon on the bottom of the header), once activated, it triggers the associated action (pinning of the header).
 *
 * ### Fast Navigation
 * - This component provides a build in fast navigation group which can be used via `F6 / Shift + F6` or ` Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up`.
 * In order to use this functionality, you need to import the following module:
 *
 * - `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/DynamicPage.js";`
 *
 * @constructor
 * @extends UI5Element
 * @since 2.0.0
 * @public
 * @csspart content - Used to style the content of the component
 * @csspart fit-content - Used to style the fit content container of the component.
 * @csspart footer - Used to style the footer of the component
 */
@customElement({
	tag: "ui5-dynamic-page",
	renderer: litRender,
	styles: DynamicPageCss,
	template: DynamicPageTemplate,
	dependencies: [DynamicPageHeaderActions],
})

/**
 * Fired when the pin header button is toggled.
 *
 * @public
 */
@event("pin-button-toggle")

/**
 * Fired when the expand/collapse area of the title is toggled.
 *
 * @public
 */
@event("title-toggle")

class DynamicPage extends UI5Element {
	/**
	 * Defines if the pin button is hidden.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hidePinButton = false;

	/**
	 * Defines if the header is pinned.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	headerPinned = false;

	/**
	 * Defines if the footer is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showFooter = false;

	/**
	 * Defines the current media query size.
	 *
	 * @private
	 */
	@property()
	mediaRange?: string;

	/**
	 * Defines the content of the Dynamic Page.
	 *
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement })
	content!: HTMLElement[];

	/**
	 * Defines the title HTML Element.
	 *
	 * @public
	 */
	@slot({ type: DynamicPageTitle })
	titleArea!: Array<DynamicPageTitle>;

	/**
	 * Defines the header HTML Element.
	 *
	 * @public
	 */
	@slot({ type: DynamicPageHeader })
	headerArea!: Array<DynamicPageHeader>;

	/**
	 * Defines the footer HTML Element.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	footerArea!: HTMLElement[];

	static i18nBundle: I18nBundle;

	skipSnapOnScroll = false;
	showHeaderInStickArea = false;

	@property({ type: Boolean })
	_headerSnapped = false;

	_updateMediaRange: ResizeObserverCallback;

	@query(".ui5-dynamic-page-scroll-container")
	scrollContainer?: HTMLElement;

	@query("[ui5-dynamic-page-header-actions]")
	headerActions?: DynamicPageHeaderActions;

	constructor() {
		super();

		this._updateMediaRange = this.updateMediaRange.bind(this);
	}

	static async onDefine() {
		DynamicPage.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._updateMediaRange);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._updateMediaRange);
	}

	onBeforeRendering() {
		if (this.dynamicPageTitle) {
			this.dynamicPageTitle.snapped = this._headerSnapped;
			this.dynamicPageTitle.interactive = this.hasHeading;
		}
	}

	get dynamicPageTitle(): DynamicPageTitle | null {
		return this.querySelector<DynamicPageTitle>("[ui5-dynamic-page-title]");
	}

	get dynamicPageHeader(): DynamicPageHeader | null {
		return this.querySelector<DynamicPageHeader>("[ui5-dynamic-page-header]");
	}

	get actionsInTitle(): boolean {
		return this._headerSnapped || this.showHeaderInStickArea || this.headerPinned;
	}

	get headerInTitle(): boolean {
		return !this._headerSnapped && (this.showHeaderInStickArea || this.headerPinned);
	}

	get headerInContent(): boolean {
		return !this.showHeaderInStickArea && !this.headerInTitle;
	}

	get _headerLabel() {
		return this._headerSnapped
			? DynamicPage.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER)
			: DynamicPage.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER);
	}

	get _headerExpanded() {
		return !this._headerSnapped;
	}

	get _accAttributesForHeaderActions() {
		return {
			controls: `${this._id}-header`,
		};
	}

	get headerTabIndex() {
		return (this._headerSnapped || this.showHeaderInStickArea) ? -1 : 0;
	}

	get headerAriaHidden() {
		return (this._headerSnapped || this.showHeaderInStickArea);
	}

	get hasHeading() {
		return this.headerArea.length > 0;
	}

	get headerSnapped(): boolean {
		return this._headerSnapped;
	}

	get hasSnappedTitleOnMobile() {
		return isPhone()
			&& this.headerSnapped
			&& (this.dynamicPageTitle?.snappedTitleOnMobile ?? false);
	}

	/**
	 * Defines if the header is snapped.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	set headerSnapped(snapped: boolean) {
		if (snapped !== this._headerSnapped) {
			this._toggleHeader();
		}
	}

	snapOnScroll() {
		debounce(() => this.snapTitleByScroll(), SCROLL_DEBOUNCE_RATE);
	}

	snapTitleByScroll() {
		if (!this.dynamicPageTitle || !this.dynamicPageHeader || this.headerPinned) {
			return;
		}

		const scrollTop = this.scrollContainer!.scrollTop;
		const lastHeaderSnapped = this._headerSnapped;

		if (this.skipSnapOnScroll) {
			this.skipSnapOnScroll = false;
			return;
		}

		if (scrollTop > this.dynamicPageHeader.getBoundingClientRect().height) {
			this.showHeaderInStickArea = false;
			this._headerSnapped = true;
		} else {
			this._headerSnapped = false;
		}

		if (lastHeaderSnapped !== this._headerSnapped) {
			this.fireEvent("title-toggle");
		}

		this.dynamicPageTitle.snapped = this._headerSnapped;
	}

	async onExpandClick() {
		this._toggleHeader();
		this.fireEvent("title-toggle");
		await renderFinished();
		this.headerActions?.focusExpandButton();

		if (this.hasSnappedTitleOnMobile) {
			this.dynamicPageTitle?.focus();
		}

		announce(this._headerLabel, InvisibleMessageMode.Polite);
	}

	async onPinClick() {
		this.headerPinned = !this.headerPinned;
		this.fireEvent("pin-button-toggle");
		await renderFinished();
		this.headerActions?.focusPinButton();
	}

	async onToggleTitle() {
		if (!this.hasHeading) {
			return;
		}
		this._toggleHeader();
		this.fireEvent("title-toggle");
		await renderFinished();
		this.dynamicPageTitle!.focus();
	}

	async _toggleHeader() {
		if (this.scrollContainer!.scrollTop === SCROLL_THRESHOLD) {
			this.scrollContainer!.scrollTop = 0;
		}

		this.showHeaderInStickArea = !this.showHeaderInStickArea;
		this._headerSnapped = !this._headerSnapped;

		this.skipSnapOnScroll = true;

		await renderFinished();
		if (this._headerSnapped && this.scrollContainer!.scrollTop < SCROLL_THRESHOLD) {
			this.scrollContainer!.scrollTop = SCROLL_THRESHOLD;
		}
	}

	async onExpandHoverIn() {
		this.dynamicPageTitle?.setAttribute("hovered", "");
		await renderFinished();
	}

	async onExpandHoverOut() {
		this.dynamicPageTitle?.removeAttribute("hovered");
		await renderFinished();
	}

	updateMediaRange() {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef()!.offsetWidth);
	}
}

DynamicPage.define();

export default DynamicPage;
