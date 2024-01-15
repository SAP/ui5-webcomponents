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
import type { Timeout } from "@ui5/webcomponents-base/dist/types.js";

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

const SCROLL_DEBOUNCE_RATE = 0; // ms

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.DynamicPage
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-dynamic-page
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
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.DynamicPage.prototype.headerSnapped
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	headerSnapped!: boolean;

	/**
	 * Defines if the header is pinned.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.DynamicPage.prototype.headerPinned
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	headerPinned!: boolean;

	/**
	 * Defines if the footer is shown.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.DynamicPage.prototype.showFooter
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	showFooter!: boolean;

	/**
	 * Defines the current media query size.
	 *
	 * @type {string}
	 * @private
	 */
	@property()
	mediaRange!: string;

	/**
	 * Defines the content of the Dynamic Page.
	 *
	 * @name sap.ui.webc.fiori.DynamicPage.prototype.content
	 * @slot
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement })
	content!: HTMLElement[];

	/**
	 * Defines the title HTML Element.
	 *
	 * @type {sap.ui.webc.fiori.DynamicPageTitle}
	 * @name sap.ui.webc.fiori.DynamicPage.prototype.titleArea
	 * @slot
	 * @public
	 */
	@slot({ type: DynamicPageTitle })
	titleArea!: HTMLElement[];

	/**
	 * Defines the title HTML Element.
	 *
	 * @type {sap.ui.webc.fiori.DynamicPageHeader}
	 * @name sap.ui.webc.fiori.DynamicPage.prototype.headerArea
	 * @slot
	 * @public
	 */
	@slot({ type: DynamicPageHeader })
	headerArea!: HTMLElement[];

	/**
	 * Defines the title HTML Element.
	 *
	 * @type {sap.ui.webc.fiori.IBar}
	 * @name sap.ui.webc.fiori.DynamicPage.prototype.footer
	 * @slot
	 * @public
	 */
	@slot({ type: HTMLElement })
	footer!: HTMLElement[];

	isExpanding = false;
	iPreviousScrollAmount = 0;
	_debounceInterval?: Timeout | null;
	showHeaderInStickArea = false;
	_updateMediaRange: ResizeObserverCallback;

	onEnterDOM() {
		ResizeHandler.register(this, this._updateMediaRange);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._updateMediaRange);
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
		this._debounce(() => {
			if (!this.dynamicPageTitle || !this.dynamicPageHeader) {
				return;
			}

			const scrollTop = this.scrollContainer!.scrollTop;

			if (this.iPreviousScrollAmount === scrollTop) {
				return;
			}

			this.iPreviousScrollAmount = scrollTop;

			if (this.headerPinned) {
				return;
			}

			if (this.isExpanding) {
				this.isExpanding = false;
				return;
			}

			if (scrollTop > this.dynamicPageHeader.getBoundingClientRect().height) {
				this.headerSnapped = true;
				this.showHeaderInStickArea = false;
			} else {
				this.headerSnapped = false;
			}
			this.dynamicPageTitle.snapped = this.headerSnapped;
		}, SCROLL_DEBOUNCE_RATE);
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
		if (this.dynamicPageTitle) {
			this.dynamicPageTitle.snapped = this.headerSnapped;
		}

		this.isExpanding = true;
		this.headerPinned = false;
	}

	///

	_debounce(fn: () => void, delay: number) {
		clearTimeout(this._debounceInterval!);
		this._debounceInterval = setTimeout(() => {
			this._debounceInterval = null;
			fn();
		}, delay);
	}

	updateMediaRange() {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef()!.offsetWidth);
	}
}

DynamicPage.define();

export default DynamicPage;
