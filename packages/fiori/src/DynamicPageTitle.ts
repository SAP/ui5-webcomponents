import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import type Toolbar from "@ui5/webcomponents/dist/Toolbar.js";
import type { ToolbarMinWidthChangeEventDetail } from "@ui5/webcomponents/dist/Toolbar.js";

// Template
import DynamicPageTitleTemplate from "./generated/templates/DynamicPageTitleTemplate.lit.js";

// Styles
import DynamicPageTitleCss from "./generated/themes/DynamicPageTitle.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
 * @alias sap.ui.webc.fiori.DynamicPageTitle
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-dynamic-page-title
 * @public
 */
@customElement({
	tag: "ui5-dynamic-page-title",
	fastNavigation: true,
	renderer: litRender,
	styles: DynamicPageTitleCss,
	template: DynamicPageTitleTemplate,
})
class DynamicPageTitle extends UI5Element {
	static i18nBundle: I18nBundle;

	static async onDefine() {
		DynamicPageTitle.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	@slot({ type: HTMLElement })
	heading!: HTMLElement[];

	@slot({ type: HTMLElement })
	snappedHeading!: HTMLElement[];

	@slot({ type: HTMLElement })
	expandedHeading!: HTMLElement[];

	@slot({ type: HTMLElement })
	actions!: HTMLElement[];

	@slot({ type: HTMLElement })
	navigationActions!: HTMLElement[];

	@slot({ "default": true, type: HTMLElement })
	content!: HTMLElement[];

	@slot({ type: HTMLElement })
	snappedContent!: HTMLElement[];

	@slot({ type: HTMLElement })
	expandedContent!: HTMLElement[];

	@slot({ type: HTMLElement })
	breadcrumbs!: HTMLElement[];

	@property({ type: Boolean })
	snapped!: boolean;

	/**
	 * Defines the current media query size.
	 *
	 * @type {string}
	 * @protected
	 */
	@property()
	mediaRange!: string;

	// private properties
	@property({ type: Boolean })
	mobileNavigationActions!: boolean;

	_handleResize: ResizeObserverCallback;
	minContentWidth?: number;
	minActionsWidth?: number;

	constructor() {
		super();
		this._handleResize = this.handleResize.bind(this);
	}

	get hasBreadcrumb() {
		return !!this.breadcrumbs.length;
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

	get classes() {
		return {
			root: {
				"ui5-dynamic-page-title-root": true,
			},
			topArea: {
				"ui5-dynamic-page-title--top-area": true,
			},
			breadcrumbs: {
				"ui5-dynamic-page-title--breadcrumbs": true,
			},
			wrapper: {
				"ui5-dynamic-page-title--wrapper": true,
			},
			heading: {
				"ui5-dynamic-page-title--heading": true,
			},
			content: {
				"ui5-dynamic-page-title--content": true,
			},
			actions: {
				"ui5-dynamic-page-title--actions": true,
			},
			actionsSeparator: {
				"ui5-dynamic-page-title--actions-separator": true,
			},
		};
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

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	onBeforeRendering(): void {
		this.prepareLayoutActions();
	}

	prepareLayoutActions() {
		// all navigation/layout actions should have the NeverOverflow behavior
		const navigationActions = this.querySelector<Toolbar>("[ui5-toolbar][slot='navigationActions']");
		if (!navigationActions) {
			return;
		}
		navigationActions.items.forEach(action => {
			action.overflowPriority = "NeverOverflow";
		});
	}

	handleResize() {
		this.mobileNavigationActions = this.offsetWidth < 1280;
	}

	onMinContentWidthChange(event: CustomEvent<ToolbarMinWidthChangeEventDetail>) {
		const slotName = (<HTMLElement>event.target)?.assignedSlot?.name;
		if (!slotName || slotName === "content") {
			this.minContentWidth = event.detail.minWidth;
		} else if (slotName === "actions") {
			this.minActionsWidth = event.detail.minWidth;
		}
	}

	_onclick(e: PointerEvent) {
		if (e.target === this.getDomRef()) {
			this.fireEvent("_toggle-title");
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (e.target === this.getDomRef() && (isEnter(e) || isSpace(e))) {
			e.preventDefault();
			this.fireEvent("_toggle-title");
		}
	}
}

DynamicPageTitle.define();

export default DynamicPageTitle;
