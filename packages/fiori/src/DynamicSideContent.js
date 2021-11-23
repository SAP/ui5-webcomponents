import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import SideContentPosition from "./types/SideContentPosition.js";
import SideContentVisibility from "./types/SideContentVisibility.js";
import SideContentFallDown from "./types/SideContentFallDown.js";
import DynamicSideContentTemplate from "./generated/templates/DynamicSideContentTemplate.lit.js";

// Styles
import DynamicSideContentCss from "./generated/themes/DynamicSideContent.css.js";

// Texts
import {
	DSC_SIDE_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-dynamic-side-content",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.DynamicSideContent.prototype */ {

		/**
		 * Determines whether to hide the main content.
		 *
		 * @type {boolean}
		 * @public
		 *
		 */
		 hideMainContent: {
			type: Boolean,
		},

		/**
		 * Determines whether to hide the side content.
		 *
		 * <b>Note:</b> If both <code>hideSideContent</code> and <code>hideMainContent</code>
		 * properties are set to <code>false</code>, use the <code>toggleContents</code> method
		 * for showing the side content on phone.
		 *
		 * @type {boolean}
		 * @public
		 *
		 */
		hideSideContent: {
			type: Boolean,
		},

		/**
		 * Determines whether the side content is on the left or on the right side of the main content.
		 *
		 * @type {SideContentPosition}
		 * @defaultvalue "End"
		 * @public
		 *
		 */
		 sideContentPosition: {
			type: SideContentPosition,
			defaultValue: SideContentPosition.End,
		},

		/**
		 * Determines on which breakpoints the side content is visible.
		 *
		 * @type {SideContentVisibility}
		 * @defaultvalue "ShowAboveS"
		 * @public
		 *
		 */
		sideContentVisibility: {
			type: SideContentVisibility,
			defaultValue: SideContentVisibility.ShowAboveS,
		},

		/**
		 * Determines on which breakpoints the side content falls down below the main content.
		 *
		 * @type {SideContentFallDown}
		 * @defaultvalue "OnMinimumWidth"
		 * @public
		 *
		 */
		sideContentFallDown: {
			type: SideContentFallDown,
			defaultValue: SideContentFallDown.OnMinimumWidth,
		},

		/**
		 * Defines whether the control is in equal split mode. In this mode, the side and
		 * the main content take 50:50 percent of the container on all screen sizes
		 * except for phone, where the main and side contents are switching visibility
		 * using the toggle method.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 *
		 */
		equalSplit: {
			type: Boolean,
		},

		/**
		 * If set to TRUE, then not the media Query (device screen size) but the size of
		 * the container, surrounding the control, defines the current range.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 *
		 */
		containerQuery: {
			type: Boolean,
		},

		/**
 		 * @private
		 */
		_mcSpan: {
			type: String,
			defaultValue: "0",
			noAttribute: true,
		},

		/**
 		 * @private
		 */
		 _scSpan: {
			type: String,
			defaultValue: "0",
			noAttribute: true,
		},

		/**
 		 * @private
		 */
		 _toggled: {
			type: Boolean,
			noAttribute: true,
		},

		/**
 		 * @private
		 */
		 _currentBreakpoint: {
			type: String,
			noAttribute: true,
		},

	},
	slots: /** @lends sap.ui.webcomponents.main.DynamicSideContent.prototype */ {

		/**
		 * Main Content controls.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
		},

		/**
		 * Side Content controls.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		 "side-content": {
			type: HTMLElement,
		},

	},
	events: /** @lends sap.ui.webcomponents.main.DynamicSideContent.prototype */ {

		/**
		 * Fires when the current breakpoint has been changed.
		 * @event
		 * @public
		 */
		"layout-change": {
			details: {
				currentBreakpoint: {
					type: String,
				},
				previousBreakpoint: {
					type: String,
				},
				mainContentVisible: {
					type: Boolean,
				},
				sideContentVisible: {
					type: Boolean,
				},
			},
		},

	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * <code>ui5-dynamic-side-content</code> is a layout control that allows additional content
 * to be displayed in a way that flexibly adapts to different screen sizes. The side
 * content appears in a container next to or directly below the main content
 * (it doesn't overlay). When the side content is triggered, the main content becomes
 * narrower (if appearing side-by-side). The side content contains a separate scrollbar
 * when appearing next to the main content.
 *
 *
 * <h3>Usage</h3>
 *
 * <i>When to use?</i>
 *
 * Use this control if you want to display relevant information that is not critical
 * for users to complete a task. Users should have access to all the key functions and
 * critical information in the app even if they do not see the side content. This is
 * important because on smaller screen sizes it may be difficult to display the side
 * content in a way that is easily accessible for the user.
 *
 * <i>When not to use?</i>
 *
 * Don't use it if you want to display navigation or critical information that prevents
 * users from completing a task when they have no access to the side content.
 *
 *
 * <h3>Responsive Behavior</h3>
 *
 * Screen width > 1440px
 *
 * <ul><li>Main vs. side content ratio is 75 vs. 25 percent (with a minimum of 320px
 * each).</li>
 * <li>If the application defines a trigger, the side content can be hidden.</li></ul>
 *
 * Screen width <= 1440px and > 1024px
 *
 * <ul><li>Main vs. side content ratio is 66.666 vs. 33.333 percent (with a minimum of
 * 320px each). If the side content width falls below 320 px, it automatically slides
 * under the main content, unless the app development team specifies that it should
 * disappear.</li></ul>
 *
 * Screen width <= 1024px and > 720px
 *
 * <ul><li>If <code>sideContentFallDown</code> is not set to <code>OnMinimumWidth</code>,
 * side content ratio is fixed to 340px, and the main content takes the rest of the width,
 * otherwise the above ratios are valid only for screen width <= 1024px and > 960px, and
 * for screen width <= 960px and > 720px the side content falls below the main content.
 * </li></ul>
 *
 * Screen width <= 720px (for example on a mobile device)
 *
 * <ul><li>In this case, the side content automatically disappears from the screen (unless
 * specified to stay under the content by setting of <code>sideContentVisibility</code>
 * property to <code>AlwaysShow</code>) and can be triggered from a pre-set trigger
 * (specified within the app). When the side content is triggered, it replaces the main
 * content. We recommend that you always place the trigger for the side content in the
 * same location, such as in the app footer.</li></ul>
 *
 * A special case, allows for comparison mode between the main and side content. In
 * this case, the screen is split into 50:50 percent for main vs. side content. The
 * responsive behavior of the equal split is the same as in the standard view - the
 * side content disappears on screen widths of less than 720 px and can only be
 * viewed by triggering it.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/DynamicSideContent";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.DynamicSideContent
 * @extends UI5Element
 * @tagname ui5-dynamic-side-content
 * @public
 */
class DynamicSideContent extends UI5Element {
	constructor() {
		super();
		this._handleResizeBound = this.handleResize.bind(this);
	}

	static get metadata() {
		return metadata;
	}

	static get styles() {
		return DynamicSideContentCss;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return DynamicSideContentTemplate;
	}

	static async onDefine() {
		DynamicSideContent.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	get classes() {
		const gridPrefix = "ui5-dsc-span",
			mcSpan = this._toggled ? this._scSpan : this._mcSpan,
			scSpan = this._toggled ? this._mcSpan : this._scSpan,
			classes = {
				dynamicSideContentRoot: {
					"ui5-dsc-root": true,
				},
				mainContent: {
					"ui5-dsc-main": true,
				},
				sideContent: {
					"ui5-dsc-side": true,
				},
			};

		classes.mainContent[`${gridPrefix}-${mcSpan}`] = true;
		classes.sideContent[`${gridPrefix}-${scSpan}`] = true;

		return classes;
	}

	get styles() {
		const isToggled = this.breakpoint === this.sizeS && this._toggled,
			mcSpan = isToggled ? this._scSpan : this._mcSpan,
			scSpan = isToggled ? this._mcSpan : this._scSpan,
			contentHeight = this.breakpoint === this.sizeS && this.sideContentVisibility !== SideContentVisibility.AlwaysShow ? "100%" : "auto";

		return {
			dynamicSideContentRoot: {
				"height": "100%",
				"flex-wrap": this._mcSpan === "12" ? "wrap" : "nowrap",
			},
			mainContent: {
				"height": mcSpan === this.span12 ? contentHeight : "100%",
				"order": this.sideContentPosition === SideContentPosition.Begin ? 2 : 1,
			},
			sideContent: {
				"height": scSpan === this.span12 ? contentHeight : "100%",
				"order": this.sideContentPosition === SideContentPosition.Begin ? 1 : 2,
			},
		};
	}

	get accInfo() {
		return {
			"label": DynamicSideContent.i18nBundle.getText(DSC_SIDE_ARIA_LABEL),
		};
	}

	get sizeS() {
		return "S";
	}

	get sizeM() {
		return "M";
	}

	get sizeL() {
		return "L";
	}

	get sizeXL() {
		return "XL";
	}

	get span0() {
		return "0";
	}

	get span3() {
		return "3";
	}

	get span4() {
		return "4";
	}

	get span6() {
		return "6";
	}

	get span8() {
		return "8";
	}

	get span9() {
		return "9";
	}

	get span12() {
		return "12";
	}

	get spanFixed() {
		return "fixed";
	}

	get containerWidth() {
		return this.containerQuery ? this.getDomRef().clientWidth : window.innerWidth;
	}

	get breakpoint() {
		const S_M_BREAKPOINT = 720,	// Breakpoint between S and M screen size
			M_L_BREAKPOINT = 1024, // Breakpoint between M and L screen size
			L_XL_BREAKPOINT = 1440; // Breakpoint between L and XL screen size
		let size;

		if (this.containerWidth <= S_M_BREAKPOINT) {
			size = this.sizeS;
		} else if (this.containerWidth > S_M_BREAKPOINT && this.containerWidth <= M_L_BREAKPOINT) {
			size = this.sizeM;
		} else if (this.containerWidth > M_L_BREAKPOINT && this.containerWidth <= L_XL_BREAKPOINT) {
			size = this.sizeL;
		} else {
			size = this.sizeXL;
		}

		return size;
	}

	toggleContents() {
		if (this.breakpoint === this.sizeS && this.sideContentVisibility !== SideContentVisibility.AlwaysShow) {
			this._toggled = !this._toggled;
		}
	}

	handleResize() {
		this._resizeContents();
	}

	onAfterRendering() {
		this._resizeContents();
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}

	_resizeContents() {
		const contentWidth = Math.ceil((33.333 / 100) * this.containerWidth); // for SideContentFallDown.OnMinimumWidth case
		let mainSize,
			sideSize,
			sideVisible;

		// initial set contents sizes
		switch (this.breakpoint) {
		case this.sizeS:
			mainSize = this.span12;
			sideSize = this.span12;
			break;
		case this.sizeM:
			if (this.sideContentFallDown === SideContentFallDown.BelowXL
				|| this.sideContentFallDown === SideContentFallDown.BelowL
				|| (contentWidth <= 320 && this.sideContentFallDown === SideContentFallDown.OnMinimumWidth)) {
				mainSize = this.span12;
				sideSize = this.span12;
			} else {
				mainSize = this.equalSplit ? this.span6 : this.spanFixed;
				sideSize = this.equalSplit ? this.span6 : this.spanFixed;
			}
			sideVisible = this.sideContentVisibility === SideContentVisibility.ShowAboveS
				|| this.sideContentVisibility === SideContentVisibility.AlwaysShow;
			break;
		case this.sizeL:
			if (this.sideContentFallDown === SideContentFallDown.BelowXL) {
				mainSize = this.span12;
				sideSize = this.span12;
			} else {
				mainSize = this.equalSplit ? this.span6 : this.span8;
				sideSize = this.equalSplit ? this.span6 : this.span4;
			}
			sideVisible = this.sideContentVisibility === SideContentVisibility.ShowAboveS
				|| this.sideContentVisibility === SideContentVisibility.ShowAboveM
				|| this.sideContentVisibility === SideContentVisibility.AlwaysShow;
			break;
		case this.sizeXL:
			mainSize = this.equalSplit ? this.span6 : this.span9;
			sideSize = this.equalSplit ? this.span6 : this.span3;
			sideVisible = this.sideContentVisibility !== SideContentVisibility.NeverShow;
		}

		if (this.sideContentVisibility === SideContentVisibility.AlwaysShow) {
			sideVisible = true;
		}

		// modify sizes of the contents depending on hideMainContent and hideSideContent properties
		if (this.hideSideContent) {
			mainSize = this.hideMainContent ? this.span0 : this.span12;
			sideSize = this.span0;
			sideVisible = false;
		}

		if (this.hideMainContent) {
			mainSize = this.span0;
			sideSize = this.hideSideContent ? this.span0 : this.span12;
			sideVisible = true;
		}

		// set final sizes of the contents
		if (!sideVisible) {
			mainSize = this.span12;
			sideSize = this.span0;
		}

		// fire "layout-change" event
		if (this._currentBreakpoint !== this.breakpoint) {
			const eventParams = {
				currentBreakpoint: this.breakpoint,
				previousBreakpoint: this._currentBreakpoint,
				mainContentVisible: mainSize !== this.span0,
				sideContentVisible: sideSize !== this.span0,
			};
			this._currentBreakpoint = this.breakpoint;
			this.fireEvent("layout-change", eventParams);
		}

		// update contents sizes
		this._setSpanSizes(mainSize, sideSize);
	}

	_setSpanSizes(mainSize, sideSize) {
		this._mcSpan = mainSize;
		this._scSpan = sideSize;
		if (this.breakpoint !== this.sizeS) {
			this._toggled = false;
		}
	}
}

DynamicSideContent.define();

export default DynamicSideContent;
