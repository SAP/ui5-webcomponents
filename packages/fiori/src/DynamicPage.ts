import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import InvisibleMessageMode from "@ui5/webcomponents-base/dist/types/InvisibleMessageMode.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";

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

const SCROLL_DEBOUNCE_RATE = 25; // ms

/**
 * @class
 *
 * <h3>Overview</h3>
 *
 * A layout component, representing a web page, consisting of a title, header with dynamic behavior, a content area, and an optional floating footer.
 *
 * The component consist of several components:
 *
 * <ul><li><code>DynamicPageTitle</code> consists of a heading
 * on the left side, content in the middle, and actions on the right. The displayed
 * content changes based on the current mode of the DynamicPageHeader.</li>
 * <li><code>DynamicPageHeader</code> is a generic container, which
 * can contain a single layout component. The header works in two modes - expanded and snapped and its
 * behavior can be adjusted with the help of different properties.</li>
 * <li><code>Content area</code> is a generic container, which can have a single UI5 layout.</li>
 * <li><code>Footer</code> is positioned at the bottom with a small offset and used for additional
 * actions, the footer floats above the content.</li></ul>
 *
 * <h3>Usage</h3>
 *
 * Use the <code>DynamicPage</code> if you need to have a title, that is always visible
 * and a header, that has configurable Expanding/Snapping functionality.
 * If you don't need the Expanding/Snapping functionality it is better to use the
 * <code>ui5-page</code> as a lighter component.
 *
 * The app can add to the <code>default</code> slot of the ui5-dynamic-page either content that is designed to fit its container (e.g. has 100% height),
 * or content with own height that may overflow its container. In the second case the <code>DynamicPage</code> will show a scrollbar that allows the user
 * scroll through the content.
 *
 * <ul><b>Notes:</b>
 * <li>Snapping of the <code>DynamicPageTitle</code> is not supported in the following case:
 * When the <code>DynamicPage</code> has a scroll bar, the component usually scrolls to the snapping point - the point,
 * where the <code>DynamicPageHeader</code> is scrolled out completely.
 * However, when there is a scroll bar, but not enough content to reach the snapping point,
 * the snapping is not possible using scrolling.</li>
 * </ul>
 *
 * <h3>Responsive Behavior</h3>
 *
 * Dynamic page web component implements the resposive paddings design.
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Basic Navigation</h4>
 * <ul>
 * <li>[SPACE, ENTER, RETURN] - If focus is on a button inside DynamicPageTitle its action is being triggered, once activated.
 * If focus is on the snap header button (arrow button), or on the header itself, once activated, it triggers the associated action (such as snap/expand the header).
 * If focus is on pin button (the button with pin icon on the bottom of the header), once activated, it triggers the associated action (pinning of the header). </li>
 * </ul>
 *
 * <h4>Fast Navigation</h4>
 * <ul>
 * <li>This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code></li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/DynamicPage.js";</code>
 *
 * @constructor
 * @extends sap.ui.webc.base.UI5Element
 * @since 1.122
 * @public
 */
@customElement({
	tag: "ui5-dynamic-page",
	renderer: litRender,
	styles: DynamicPageCss,
	template: DynamicPageTemplate,
	dependencies: [DynamicPageHeader, DynamicPageTitle, DynamicPageHeaderActions],
})

class DynamicPage extends UI5Element {
	static i18nBundle: I18nBundle;

	constructor() {
		super();

		this._updateMediaRange = this.updateMediaRange.bind(this);
	}

	static async onDefine() {
		DynamicPage.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	/**
	 * Defines if the header is snapped.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	headerSnapped!: boolean;

	/**
	 * Defines if the header is pinned.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	headerPinned!: boolean;

	/**
	 * Defines if the footer is shown.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showFooter!: boolean;

	/**
	 * Defines the current media query size.
	 *
	 * @private
	 */
	@property()
	mediaRange!: string;

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
	titleArea!: HTMLElement[];

	/**
	 * Defines the title HTML Element.
	 *
	 * @public
	 */
	@slot({ type: DynamicPageHeader })
	headerArea!: HTMLElement[];

	/**
	 * Defines the title HTML Element.
	 *
	 * @public
	 */
	@slot({ type: HTMLElement })
	footer!: HTMLElement[];

	skipSnapOnScroll = false;
	showHeaderInStickArea = false;
	_updateMediaRange: ResizeObserverCallback;

	onEnterDOM() {
		ResizeHandler.register(this, this._updateMediaRange);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._updateMediaRange);
	}

	onBeforeRendering(): void {
		if (this.dynamicPageTitle) {
			this.dynamicPageTitle.snapped = this.headerSnapped;
		}
	}

	get classes() {
		return {
			root: {
				"ui5-dynamic-page-root": true,
			},
			scrollContainer: {
				"ui5-dynamic-page-scroll-container": true,
			},
			headerWrapper: {
				"ui5-dynamic-page-title-header-wrapper": true,
			},
			content: {
				"ui5-dynamic-page-content": true,
			},
			fitContent: {
				"ui5-dynamic-page-fit-content": true,
			},
			footer: {
				"ui5-dynamic-page-footer": true,
			},
			spacer: {
				"ui5-dynamic-page-spacer": true,
			},
		};
	}

	get dynamicPageTitle(): DynamicPageTitle | null {
		return this.querySelector<DynamicPageTitle>("[ui5-dynamic-page-title]");
	}

	get dynamicPageHeader(): DynamicPageHeader | null {
		return this.querySelector<DynamicPageHeader>("[ui5-dynamic-page-header]");
	}

	get scrollContainer(): HTMLElement | null | undefined {
		return this.getDomRef()?.querySelector(".ui5-dynamic-page-scroll-container");
	}

	get headerActions(): DynamicPageHeaderActions | null | undefined {
		return this.getDomRef()?.querySelector("ui5-dynamic-page-header-actions");
	}

	get actionsInTitle(): boolean {
		return this.headerSnapped || this.showHeaderInStickArea || this.headerPinned;
	}
	get headerInTitle(): boolean {
		return !this.headerSnapped && (this.showHeaderInStickArea || this.headerPinned);
	}
	get headerInContent(): boolean {
		return !this.headerSnapped && !this.headerInTitle;
	}

	get _headerLabel() {
		return this.headerSnapped
			? DynamicPage.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_SNAPPED_HEADER)
			: DynamicPage.i18nBundle.getText(DYNAMIC_PAGE_ARIA_LABEL_EXPANDED_HEADER);
	}

	get _headerExpanded() {
		return !this.headerSnapped;
	}

	get _accAttributesForHeaderActions() {
		return {
			controls: `${this._id}-header`,
		};
	}

	snapOnScroll() {
		debounce(() => this.snapTitleByScroll(), SCROLL_DEBOUNCE_RATE);
	}

	snapTitleByScroll() {
		if (!this.dynamicPageTitle || !this.dynamicPageHeader || this.headerPinned) {
			return;
		}

		const scrollTop = this.scrollContainer!.scrollTop;

		if (this.skipSnapOnScroll) {
			this.skipSnapOnScroll = false;
			return;
		}

		if (scrollTop > this.dynamicPageHeader.getBoundingClientRect().height) {
			this.headerSnapped = true;
			this.showHeaderInStickArea = false;
		} else {
			this.headerSnapped = false;
		}

		this.dynamicPageTitle.snapped = this.headerSnapped;
	}

	async onExpandClick() {
		this._toggleHeader();
		await renderFinished();
		this.headerActions?.focusExpandButton();
		announce(this._headerLabel, InvisibleMessageMode.Polite);
	}

	async onPinClick() {
		this.headerPinned = !this.headerPinned;
		await renderFinished();
		this.headerActions?.focusPinButton();
	}

	async onToggleTitle() {
		this._toggleHeader();
		await renderFinished();
		this.dynamicPageTitle!.focus();
	}

	_toggleHeader() {
		this.showHeaderInStickArea = !this.showHeaderInStickArea;
		this.headerSnapped = !this.headerSnapped;

		this.skipSnapOnScroll = true;
		this.headerPinned = false;
	}

	updateMediaRange() {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef()!.offsetWidth);
	}
}

DynamicPage.define();

export default DynamicPage;
