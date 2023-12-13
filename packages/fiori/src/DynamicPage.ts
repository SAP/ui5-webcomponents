import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
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

const SCROLL_DEBOUNCE_RATE = 0; // ms

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
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
		DynamicPage.i18nBundle = await getI18nBundle("INIT_PACKAGE_VAR_NAME");
	}

	@property({ type: Boolean })
	headerSnapped!: boolean;

	@property({ type: Boolean })
	headerPinned!: boolean;

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

	@slot({ "default": true, type: HTMLElement })
	content!: HTMLElement[];

	@slot({ type: DynamicPageTitle })
	titleArea!: HTMLElement[];

	@slot({ type: DynamicPageHeader })
	headerArea!: HTMLElement[];

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
			footer: {
				"ui5-dynamic-page-footer": true,
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

	get actionsInTitle(): boolean {
		return this.headerSnapped || this.showHeaderInStickArea || this.headerPinned;
	}
	get headerInTitle(): boolean {
		return !this.headerSnapped && (this.showHeaderInStickArea || this.headerPinned);
	}
	get headerInContent(): boolean {
		return !this.headerSnapped && !this.headerInTitle;
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

	onExpandClick() {
		this.showHeaderInStickArea = !this.showHeaderInStickArea;
		this.headerSnapped = !this.headerSnapped;
		if (this.dynamicPageTitle) {
			this.dynamicPageTitle.snapped = this.headerSnapped;
		}

		this.isExpanding = true;
		this.headerPinned = false;
	}

	onPinClick() {
		this.headerPinned = !this.headerPinned;
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
