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
		 * Defines the columns layout and their proportion - which one to be expanded.
		 * <br><br>
		 * <b>Note:</b> The layout also depends on the screen size - one column for screens smaller than 900px,
		 * two columns between 900px and 1280px and three columns for sizes bigger than 1280px.
		 * <br><br>
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
		 * <br><br>
		 * <b>For example:</b> layout=<code>TwoColumnsStartExpanded</code> means the layout will display up to two columns
		 * in 67%/33% proportion.
		 * @type {FCLLayout}
		 * @defaultvalue "OneColumn"
		 * @public
		 */
		layout: {
			type: FCLLayout,
			defaultValue: FCLLayout.OneColumn,
		},

		/**
		* Defines the visibility of the arrows,
		* used for expanding and shrinking the columns.
		*
		* @type {boolean}
		* @defaultvalue false
		* @public
		*/
		noArrows: {
			type: Boolean,
		},

		/**
		* Defines the component width in px.
		*
		* @type {Float}
		* @defaultvalue 0
		* @private
		*/
		width: {
			type: Float,
			defaultValue: 0,
		},

		/**
		* Defines the effective columns layout,
		* based on both the <code>layout</code> property and the screen size.
		* Example: [67%, "33%, 0"], [25%, 50%, 25%], etc.
		*
		* @type {Object}
		* @defaultvalue undefined
		* @private
		*/
		_columnLayout: {
			type: Object,
			defaultValue: undefined,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.FlexibleColumnLayout.prototype */ {
		/**
		 * Defines the content in the start column.
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		startColumn: {
			type: HTMLElement,
		},

		/**
		 * Defines the content in the middle column.
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		midColumn: {
			type: HTMLElement,
		},

		/**
		 * Defines the content in the end column.
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		endColumn: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.FlexibleColumnLayout.prototype */ {
		/**
		 * Fired when the layout changes via user interaction by clicking the arrows
		 * or by changing the component size.
		 *
		 * @param {FCLLayout} layout the current layout set
		 * @param {Array} columnLayout the effective column layout, f.e [67%, 33%, 0]
		 * @param {boolean} startColumnVisible indicates if the start column is currently visible
		 * @param {boolean} midColumnVisible indicates if the middle column is currently visible
		 * @param {boolean} endColumnVisible indicates if the end column is currently visible
		 * @param {boolean} arrowsUsed the layout is changed via the arrows
		 * @param {boolean} resize the layout is changed via resizing
		 * @event sap.ui.webcomponents.fiori.FlexibleColumnLayout#layout-change
		 * @public
		 */
		"layout-change": {
			detail: {
				layout: { type: FCLLayout },
				columnLayout: { type: Array },
				startColumnVisible: { type: Boolean },
				midColumnVisible: { type: Boolean },
				endColumnVisible: { type: Boolean },
				arrowsUsed: { type: Boolean },
				resize: { type: Boolean },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>FlexibleColumnLayout</code> implements the master-detail-detail paradigm by displaying up to three pages in separate columns.
 * There are several possible layouts that can be changed either with the component API, or by pressing the arrows, displayed between the columns.
 *
 * <h3>Usage</h3>
 *
 * Use this component for applications that need to display several logical levels of related information side by side (e.g. list of items, item, sub-item, etc.).
 * The Component is flexible in a sense that the application can focus the user's attention on one particular column.
 *
 * <h3>Responsive Behavior</h3>
 *
 * The <code>FlexibleColumnLayout</code> automatically displays the maximum possible number of columns based on <code>layout</code> property and the window size.
 * The component would display 1 column for window size smaller than 900px, up to two columns between 900px and 1280px,
 * and 3 columns for sizes bigger than 1280px.
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

		this.initialRendering = true;
		this._handleResize = this.handleResize.bind(this);
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

	static get MEDIA() {
		return {
			PHONE: "phone",
			TABLET: "tablet",
			DESKTOP: "desktop",
		};
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	onAfterRendering() {
		if (!this.initialRendering) {
			return;
		}

		this.handleInitialRendering();
	}

	handleInitialRendering() {
		this.width = this.widthDOM;
		this._columnLayout = this.nextColumnLayout(this.layout);
		this.initialRendering = false;
	}

	handleResize() {
		if (this.initialRendering) {
			return;
		}

		this.width = this.widthDOM;
		const prevLayoutHash = this._columnLayout.join();
		this._columnLayout = this.nextColumnLayout(this.layout);

		if (prevLayoutHash !== this._columnLayout.join()) {
			this.fireEvent("layout-change", {
				layout: this.layout,
				columnLayout: this._columnLayout,
				startColumnVisible: this.startColumnVisible,
				midColumnVisible: this.midColumnVisible,
				endColumnVisible: this.endColumnVisible,
				arrowUsed: false,
				resize: true,
			});
		}
	}

	startArrowClick() {
		this.arrowClick({ start: true, end: false });
	}

	endArrowClick() {
		this.arrowClick({ start: false, end: true });
	}

	arrowClick({ start, end }) {
		this.layout = this.nextLayout(this.layout, { start, end });
		this._columnLayout = this.nextColumnLayout(this.layout);

		this.fireEvent("layout-change", {
			layout: this.layout,
			columnLayout: this._columnLayout,
			startColumnVisible: this.startColumnVisible,
			midColumnVisible: this.midColumnVisible,
			endColumnVisible: this.endColumnVisible,
			arrowUsed: true,
			resize: false,
		});
	}

	nextLayout(layout, arrowsInfo = {}) {
		if (arrowsInfo.start) {
			return getNextLayoutByStartArrow()[layout];
		}

		if (arrowsInfo.end) {
			return getNextLayoutByEndArrow()[layout];
		}
	}

	nextColumnLayout(layout) {
		return getLayoutsByMedia()[this.media][layout].layout;
	}

	/**
	 * Current column layout, based on both the <code>layout</code> property and the screen size.
	 * <b>For example:</b> ["67%", "33%", 0], ["100%", 0, 0], ["25%", "50%", "25%"], etc,
	 * where the numbers represents the width to the start, middle and end columns.
	 * @readonly
	 * @type { Array }
	 * @public
	 */
	get columnLayout() {
		return this._columnLayout;
	}

	/**
	 * Returns if the <code>start</code> column is visible.
	 * @readonly
	 * @type { boolean }
	 * @public
	 */
	get startColumnVisible() {
		if (this._columnLayout) {
			return this._columnLayout[0] !== 0;
		}

		return false;
	}

	/**
	 * Returns if the <code>middle</code> column is visible.
	 * @readonly
	 * @type { boolean }
	 * @public
	 */
	get midColumnVisible() {
		if (this._columnLayout) {
			return this._columnLayout[1] !== 0;
		}

		return false;
	}

	/**
	 * Returns if the <code>end</code> column is visible.
	 * @readonly
	 * @type { boolean }
	 * @public
	 */
	get endColumnVisible() {
		if (this._columnLayout) {
			return this._columnLayout[2] !== 0;
		}

		return false;
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

	get startColumnWidth() {
		return this._columnLayout ? this._columnLayout[0] : "100%";
	}

	get midColumnWidth() {
		return this._columnLayout ? this._columnLayout[1] : 0;
	}

	get endColumnWidth() {
		return this._columnLayout ? this._columnLayout[2] : 0;
	}

	get showStartArrow() {
		return this.noArrows ? false : this.startArrowVisibility;
	}

	get showEndArrow() {
		return this.noArrows ? false : this.endArrowVisibility;
	}

	get startArrowVisibility() {
		return this.effectiveArrowsInfo[0].visible;
	}

	get endArrowVisibility() {
		return this.effectiveArrowsInfo[1].visible;
	}

	get startArrowDirection() {
		return this.effectiveArrowsInfo[0].dir;
	}

	get endArrowDirection() {
		return this.effectiveArrowsInfo[1].dir;
	}

	get effectiveArrowsInfo() {
		return getLayoutsByMedia()[this.media][this.layout].arrows;
	}

	get media() {
		if (this.width <= FlexibleColumnLayout.BREAKPOINTS.M) {
			return FlexibleColumnLayout.MEDIA.PHONE;
		}

		if (this.width <= FlexibleColumnLayout.BREAKPOINTS.L) {
			return FlexibleColumnLayout.MEDIA.TABLET;
		}

		return FlexibleColumnLayout.MEDIA.DESKTOP;
	}

	get widthDOM() {
		return this.getBoundingClientRect().width;
	}
}

FlexibleColumnLayout.define();

export default FlexibleColumnLayout;
