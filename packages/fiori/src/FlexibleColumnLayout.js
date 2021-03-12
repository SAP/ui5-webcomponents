import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import FCLLayout from "./types/FCLLayout.js";
import {
	getLayoutsByMedia,
	getNextLayoutByStartArrow,
	getNextLayoutByEndArrow,
} from "./fcl-utils/FCLLayout.js";

// Texts
import {
	FCL_START_COLUMN_TXT,
	FCL_MIDDLE_COLUMN_TXT,
	FCL_END_COLUMN_TXT,
	FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP,
	FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP,
	FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP,
	FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP,
} from "./generated/i18n/i18n-defaults.js";

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
		 * Defines the columns layout and their proportion.
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
		 * <li><code>MidColumnFullScreen</code></li>
		 * <li><code>EndColumnFullScreen</code></li>
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
		 * On object of strings that defines several additional accessibility texts for even further customization.
		 *
		 * It supports the following fields:
		 *  - <code>startColumnAccessibleName</code>: the accessibility name for the <code>startColumn</code> region
		 *  - <code>midColumnAccessibleName</code>: the accessibility name for the <code>midColumn</code> region
		 *  - <code>endColumnAccessibleName</code>: the accessibility name for the <code>endColumn</code> region
		 *  - <code>startArrowLeftText</code>: the text that the first arrow (between the <code>begin</code> and <code>mid</code> columns) will have when pointing to the left
		 *  - <code>startArrowRightText</code>: the text that the first arrow (between the <code>begin</code> and <code>mid</code> columns) will have when pointing to the right
		 *  - <code>endArrowLeftText</code>: the text that the second arrow (between the <code>mid</code> and <code>end</code> columns) will have when pointing to the left
		 *  - <code>endArrowRightText</code>: the text that the second arrow (between the <code>mid</code> and <code>end</code> columns) will have when pointing to the right
		 *
		 * @type {object}
		 * @public
		 * @since 1.0.0-rc.11
		 */
		accessibilityTexts: {
			type: Object,
		},

		/**
		* Defines the component width in px.
		*
		* @type {Float}
		* @defaultvalue 0
		* @private
		*/
		_width: {
			type: Float,
			defaultValue: 0,
		},

		/**
		* Defines the effective columns layout,
		* based on both the <code>layout</code> property and the screen size.
		* Example: [67%, 33%, 0], [25%, 50%, 25%], etc.
		*
		* @type {Object}
		* @defaultvalue undefined
		* @private
		*/
		_columnLayout: {
			type: Object,
			defaultValue: undefined,
		},

		/**
		* Defines the visible columns count - 1, 2 or 3.
		*
		* @type {Integer}
		* @defaultvalue 1
		* @private
		*/
		_visibleColumns: {
			type: Integer,
			defaultValue: 0,
		},

		/**
		 * Allows the user to replace the whole layouts configuration
		 *
		 * @type {Object}
		 * @private
		 * @sap-restricted
		 */
		_layoutsConfiguration: {
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
		 * or by changing the component size due to resizing.
		 *
		 * @param {FCLLayout} layout the current layout
		 * @param {Array} columnLayout the effective column layout, f.e [67%, 33%, 0]
		 * @param {boolean} startColumnVisible indicates if the start column is currently visible
		 * @param {boolean} midColumnVisible indicates if the middle column is currently visible
		 * @param {boolean} endColumnVisible indicates if the end column is currently visible
		 * @param {boolean} arrowsUsed indicates if the layout is changed via the arrows
		 * @param {boolean} resize indicates if the layout is changed via resizing
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

		this._prevLayout = null;
		this.initialRendering = true;
		this._handleResize = this.handleResize.bind(this);
		this.i18nBundle = getI18nBundle("@ui5/webcomponents-fiori");
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

	static get dependencies() {
		return [Button];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents-fiori");
	}

	static get BREAKPOINTS() {
		return {
			"PHONE": 599,
			"TABLET": 1023,
		};
	}

	static get MEDIA() {
		return {
			PHONE: "phone",
			TABLET: "tablet",
			DESKTOP: "desktop",
		};
	}

	static get ANIMATION_DURATION() {
		return getAnimationMode() !== AnimationMode.None ? 560 : 0;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	onAfterRendering() {
		if (this.initialRendering) {
			this.handleInitialRendering();
			return;
		}

		this.syncLayout();
	}

	handleInitialRendering() {
		this._prevLayout = this.layout;
		this.updateLayout();
		this.initialRendering = false;
	}

	handleResize() {
		if (this.initialRendering) {
			return;
		}

		// store the previous layout
		const prevLayoutHash = this.columnLayout.join();

		// update the column layout, based on the current width
		this.updateLayout();

		// fire layout-change if the column layout changed
		if (prevLayoutHash !== this.columnLayout.join()) {
			this.fireLayoutChange(false, true);
		}
	}

	startArrowClick() {
		this.arrowClick({ start: true, end: false });
	}

	endArrowClick() {
		this.arrowClick({ start: false, end: true });
	}

	arrowClick({ start, end }) {
		// update public property
		this.layout = this.nextLayout(this.layout, { start, end });

		// update layout
		this.updateLayout();

		// fire layout-change
		this.fireLayoutChange(true, false);
	}

	updateLayout() {
		this._width = this.widthDOM;
		this._columnLayout = this.nextColumnLayout(this.layout);
		this._visibleColumns = this.calcVisibleColumns(this._columnLayout);
		this.toggleColumns();
	}

	syncLayout() {
		if (this._prevLayout !== this.layout) {
			this.updateLayout();
			this._prevLayout = this.layout;
		}
	}

	toggleColumns() {
		this.toggleColumn("start");
		this.toggleColumn("mid");
		this.toggleColumn("end");
	}

	toggleColumn(column) {
		const columnWidth = this[`${column}ColumnWidth`];
		const columnDOM = this[`${column}ColumnDOM`];
		const currentlyHidden = columnWidth === 0;
		const previouslyHidden = columnDOM.style.width === "0px";

		// no change
		if (currentlyHidden && previouslyHidden) {
			return;
		}

		// column resizing: from 33% to 67%, from 25% to 50%, etc.
		if (!currentlyHidden && !previouslyHidden) {
			columnDOM.style.width = columnWidth;
			return;
		}

		// hide column: 33% to 0, 25% to 0, etc .
		if (currentlyHidden) {
			// animate the width
			columnDOM.style.width = columnWidth;

			// hide column with delay to allow the animation runs entirely
			setTimeout(() => {
				columnDOM.classList.add("ui5-fcl-column--hidden");
			}, FlexibleColumnLayout.ANIMATION_DURATION);

			return;
		}

		// show column: from 0 to 33%, from 0 to 25%, etc.
		if (previouslyHidden) {
			columnDOM.classList.remove("ui5-fcl-column--hidden");
			columnDOM.style.width = columnWidth;
		}
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
		return this._effectiveLayoutsByMedia[this.media][layout].layout;
	}

	calcVisibleColumns(colLayot) {
		return colLayot.filter(col => col !== 0).length;
	}

	fireLayoutChange(arrowUsed, resize) {
		this.fireEvent("layout-change", {
			layout: this.layout,
			columnLayout: this._columnLayout,
			startColumnVisible: this.startColumnVisible,
			midColumnVisible: this.midColumnVisible,
			endColumnVisible: this.endColumnVisible,
			arrowUsed,
			resize,
		});
	}

	/**
	 * Returns the current column layout, based on both the <code>layout</code> property and the screen size.
	 * <br><br>
	 * <b>For example:</b> ["67%", "33%", 0], ["100%", 0, 0], ["25%", "50%", "25%"], etc,
	 * where the numbers represents the width of the start, middle and end columns.
	 * @readonly
	 * @type { Array }
	 * @defaultvalue ["100%", 0, 0]
	 * @public
	 */
	get columnLayout() {
		return this._columnLayout;
	}

	/**
	 * Returns if the <code>start</code> column is visible.
	 * @readonly
	 * @defaultvalue true
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
	 * @defaultvalue false
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
	 * @defaultvalue false
	 * @public
	 */
	get endColumnVisible() {
		if (this._columnLayout) {
			return this._columnLayout[2] !== 0;
		}

		return false;
	}

	/**
	 * Returns the number of currently visible columns.
	 * @readonly
	 * @type { Integer }
	 * @defaultvalue 1
	 * @public
	 */
	get visibleColumns() {
		return this._visibleColumns;
	}

	get classes() {
		const hasAnimation = getAnimationMode() !== AnimationMode.None;

		return {
			root: {
				"ui5-fcl-root": true,
				"ui5-fcl--ie": isIE(),
			},
			columns: {
				start: {
					"ui5-fcl-column": true,
					"ui5-fcl-column-animation": hasAnimation,
					"ui5-fcl-column--start": true,
				},
				middle: {
					"ui5-fcl-column": true,
					"ui5-fcl-column-animation": hasAnimation,
					"ui5-fcl-column--middle": true,
				},
				end: {
					"ui5-fcl-column": true,
					"ui5-fcl-column-animation": hasAnimation,
					"ui5-fcl-column--end": true,
				},
			},
		};
	}

	get styles() {
		return {
			arrowsContainer: {
				start: {
					display: this.showStartSeparator ? "flex" : "none",
				},
				end: {
					display: this.showEndSeparator ? "flex" : "none",
				},
			},
			arrows: {
				start: {
					display: this.showStartArrow ? "inline-block" : "none",
					transform: this.startArrowDirection === "mirror" ? "rotate(180deg)" : "",
				},
				end: {
					display: this.showEndArrow ? "inline-block" : "none",
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

	get showStartSeparator() {
		return this.effectiveArrowsInfo[0].separator || this.startArrowVisibility;
	}

	get showEndSeparator() {
		return this.effectiveArrowsInfo[1].separator || this.endArrowVisibility;
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
		return this._effectiveLayoutsByMedia[this.media][this.layout].arrows;
	}

	get media() {
		if (this._width <= FlexibleColumnLayout.BREAKPOINTS.PHONE) {
			return FlexibleColumnLayout.MEDIA.PHONE;
		}

		if (this._width <= FlexibleColumnLayout.BREAKPOINTS.TABLET) {
			return FlexibleColumnLayout.MEDIA.TABLET;
		}

		return FlexibleColumnLayout.MEDIA.DESKTOP;
	}

	get widthDOM() {
		return this.getBoundingClientRect().width;
	}

	get startColumnDOM() {
		return this.shadowRoot.querySelector(".ui5-fcl-column--start");
	}

	get midColumnDOM() {
		return this.shadowRoot.querySelector(".ui5-fcl-column--middle");
	}

	get endColumnDOM() {
		return this.shadowRoot.querySelector(".ui5-fcl-column--end");
	}

	get accStartColumnText() {
		return this.accessibilityTexts.startColumnAccessibleName || this.i18nBundle.getText(FCL_START_COLUMN_TXT);
	}

	get accMiddleColumnText() {
		return this.accessibilityTexts.midColumnAccessibleName || this.i18nBundle.getText(FCL_MIDDLE_COLUMN_TXT);
	}

	get accEndColumnText() {
		return this.accessibilityTexts.endColumnAccessibleName || this.i18nBundle.getText(FCL_END_COLUMN_TXT);
	}

	get _effectiveLayoutsByMedia() {
		return this._layoutsConfiguration || getLayoutsByMedia();
	}

	get accStartArrowText() {
		const customTexts = this.accessibilityTexts;

		if (this.startArrowDirection === "mirror") {
			return customTexts.startArrowLeftText || this.i18nBundle.getText(FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP);
		}

		return customTexts.startArrowRightText || this.i18nBundle.getText(FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP);
	}

	get accEndArrowText() {
		const customTexts = this.accessibilityTexts;

		if (this.endArrowDirection === "mirror") {
			return customTexts.endArrowRightText || this.i18nBundle.getText(FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP);
		}

		return customTexts.endArrowLeftText || this.i18nBundle.getText(FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP);
	}
}

FlexibleColumnLayout.define();

export default FlexibleColumnLayout;
