import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js";
import FCLLayout from "./types/FCLLayout.js";
import {
	getLayoutsByMedia,
	getNextLayoutByStartArrow,
	getNextLayoutByEndArrow,
} from "./fcl-utils/FCLLayout.js";

// Template
import FlexibleColumnLayoutTemplate from "./generated/templates/FlexibleColumnLayoutTemplate.lit.js";

// Styles
import FlexibleColumnLayoutCss from "./generated/themes/FlexibleColumnLayout.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-flexible-column-layout",
	properties: /** @lends sap.ui.webcomponents.fiori.FlexibleColumnLayout.prototype */ {
		/**
		 * Defines the number of columns.
		 *
		 * Available options are:
		 * <ul>
		 * <li><code>OneColumn</code></li>
		 * <li><code>TwoColumnsStartExpanded</code></li>
		 * <li><code>TwoColumnsMidExpanded</code></li>
		 * <li><code>ThreeColumnsMidExpanded</code></li>
		 * <li><code>ThreeColumnsEndExpanded</code></li>
		 * <li><code>ThreeColumnsStartExpandedEndHidden</code></li>
		 * <li><code>ThreeColumnsMidExpandedEndHidden</code></li>
		 * </ul>
		 *
		 * @type {FCLLayout}
		 * @defaultvalue "OneColumn"
		 * @public
		 */
		layout: {
			type: FCLLayout,
			defaultValue: FCLLayout.OneColumn,
		},

		/**
		* Defines the visibility of the arrows.
		*
		* @type {boolean}
		* @defaultvalue false
		* @public
		*/
		noArrows: {
			type: Boolean,
		},

		/**
		* Defines the width.
		*
		* @type {Float}
		* @private
		*/
		_width: {
			type: Float,
			defaultValue: 0,
		},

		/**
		* Defines the effective layout.
		*
		* @type {Object}
		* @private
		*/
		_layout: {
			type: Object,
			defaultValue: undefined,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.FlexibleColumnLayout.prototype */ {
		/**
		 * Defines the content in the start column.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */

		startColumn: {
			type: HTMLElement,
		},

		/**
		 * Defines the content in the middle column.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		midColumn: {
			type: HTMLElement,
		},

		/**
		 * Defines the content in the end column.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */

		endColumn: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.FlexibleColumnLayout.prototype */ {
		/**
		 *
		 * Fired when the layout is changed via user interaction by clicking the arrow keys,
		 * or by changing the component size.
		 *
		 * @event sap.ui.webcomponents.fiori.FlexibleColumnLayout#layout-change
		 * @public
		 */
		"layout-change": {

		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The FlexibleColumnLayout implements the master-detail-detail paradigm by displaying up to three pages in separate columns.
 * There are several possible layouts that can be changed either with the control's API, or by the user with the help of layout arrows.
 *
 * <h3>Usage</h3>
 *
 * Use this component for applications that need to display several logical levels of related information side by side (e.g. list of items, item, sub-item, etc.).
 * The Component is flexible in a sense that the application can focus the user's attention on one particular column by making it larger or even fullscreen.
 *
 * <h3>Responsive Behavior</h3>
 *
 * The component automatically displays the maximum possible number of columns based on the device size.
 * The app does not need to take into consideration the current device/screen size.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.FlexibleColumnLayout
 * @extends UI5Element
 * @tagname ui5-flexible-column-layout
 * @public
 * @since 1.0.0-rc.8
 */
class FlexibleColumnLayout extends UI5Element {
	constructor() {
		super();

		this._handleResize = () => {
			this._width = this.getBoundingClientRect().width;
		};
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return FlexibleColumnLayoutCss;
	}

	static get template() {
		return FlexibleColumnLayoutTemplate;
	}

	static async onDefine() {
		await Button.define();
	}

	static get BREAKPOINTS() {
		return {
			"M": 960,
			"L": 1280,
		};
	}

	static get NEXT_LAYOUT_START_ARROW() {
		return getNextLayoutByStartArrow();
	}

	static get NEXT_LAYOUT_END_ARROW() {
		return getNextLayoutByEndArrow();
	}

	static get LAYOUT_BY_MEDIA() {
		return getLayoutsByMedia();
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	nextLayout(layout, arrowsInfo = {}) {
		if (arrowsInfo.start) {
			return FlexibleColumnLayout.NEXT_LAYOUT_START_ARROW[layout];
		}

		if (arrowsInfo.end) {
			return FlexibleColumnLayout.NEXT_LAYOUT_END_ARROW[layout];
		}
	}

	_startArrowClick() {
		this._arrowClick({ start: true, end: false });
	}

	_endArrowClick() {
		this._arrowClick({ start: false, end: true });
	}

	_arrowClick({ start, end }) {
		this.layout = this.nextLayout(this.layout, { start, end });
		this.fireEvent("layout-change", { layout: this.layout });
	}

	getEffectiveColumnLayout(layout) {
		return FlexibleColumnLayout.LAYOUT_BY_MEDIA[this.getMedia()][layout].layout;
	}

	get startColumnWidth() {
		return this.getEffectiveColumnLayout(this.layout)[0];
	}

	get midColumnWidth() {
		return this.getEffectiveColumnLayout(this.layout)[1];
	}

	get endColumnWidth() {
		return this.getEffectiveColumnLayout(this.layout)[2];
	}

	get effectiveArrowsInfo() {
		return FlexibleColumnLayout.LAYOUT_BY_MEDIA[this.getMedia()][this.layout].arrows;
	}

	get showStartArrow() {
		if (this.noArrows) {
			return false;
		}

		return this.effectiveArrowsInfo[0].visible;
	}

	get showEndArrow() {
		if (this.noArrows) {
			return false;
		}

		return this.effectiveArrowsInfo[1].visible;
	}

	get startArrowDirection() {
		return this.effectiveArrowsInfo[0].dir;
	}

	get endArrowDirection() {
		return this.effectiveArrowsInfo[1].dir;
	}

	getMedia() {
		if (this._width <= FlexibleColumnLayout.BREAKPOINTS.M) {
			return "phone";
		}

		if (this._width <= FlexibleColumnLayout.BREAKPOINTS.L) {
			return "tablet";
		}

		return "desktop";
	}

	get classes() {
		return {
			columns: {
				start: {
					"ui5-fcl-column": true,
					"ui5-fcl-column--start": true,
					"ui5-fcl-column--hidden": this.startColumnWidth === 0,
				},
				middle: {
					"ui5-fcl-column": true,
					"ui5-fcl-column--middle": true,
					"ui5-fcl-column--hidden": this.midColumnWidth === 0,
				},
				end: {
					"ui5-fcl-column": true,
					"ui5-fcl-column--end": true,
					"ui5-fcl-column--hidden": this.endColumnWidth === 0,
				},
			},
		};
	}

	get styles() {
		return {
			columns: {
				start: {
					width: this.startColumnWidth,
				},
				middle: {
					width: this.midColumnWidth,
				},
				end: {
					width: this.endColumnWidth,
				},
			},
			arrowsContainer: {
				start: {
					display: this.showStartArrow ? "flex" : "none",
				},
				end: {
					display: this.showEndArrow ? "flex" : "none",
				},
			},
			arrows: {
				start: {
					transform: this.startArrowDirection === "mirror" ? "rotate(180deg)" : "",
				},
				end: {
					transform: this.endArrowDirection === "mirror" ? "rotate(180deg)" : "",
				},
			},
		};
	}
}

FlexibleColumnLayout.define();

export default FlexibleColumnLayout;
