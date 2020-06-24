import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js";

import FCLLayout from "./types/FCLLayout.js";

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
		return [
			960,
			1280,
		];
	}

	static get COLUMN_WIDTHS() {
		return {
			"OneColumn": ["100%", 0, 0],
			"TwoColumnsStartExpanded": ["67%", "33%", 0],
			"TwoColumnsMidExpanded": ["33%", "67%", 0],
			"ThreeColumnsStartExpanded": ["25%", "50%", "25%"],
			"ThreeColumnsMidExpanded": ["25%", "50%", "25%"],
			"ThreeColumnsEndExpanded": ["25%", "25%", "50%"],
			"ThreeColumnsStartExpandedEndHidden": ["67%", "33%", 0],
			"ThreeColumnsMidExpandedEndHidden": ["33%", "67%", 0],
		};
	}

	static get NEXT_LAYOUT_START_ARROW() {
		return {
			"TwoColumnsStartExpanded": "TwoColumnsMidExpanded",
			"TwoColumnsMidExpanded": "TwoColumnsStartExpanded",
			"ThreeColumnsMidExpanded": "ThreeColumnsStartExpandedEndHidden",
			"ThreeColumnsEndExpanded": "ThreeColumnsStartExpandedEndHidden",
			"ThreeColumnsStartExpandedEndHidden": "ThreeColumnsMidExpandedEndHidden",
			"ThreeColumnsMidExpandedEndHidden": "ThreeColumnsStartExpandedEndHidden",
		};
	}

	static get NEXT_LAYOUT_END_ARROW() {
		return {
			"ThreeColumnsMidExpanded": "ThreeColumnsEndExpanded",
			"ThreeColumnsEndExpanded": "ThreeColumnsMidExpanded",
			"ThreeColumnsStartExpandedEndHidden": "ThreeColumnsMidExpanded",
			"ThreeColumnsMidExpandedEndHidden": "ThreeColumnsMidExpanded",
		};
	}

	static get ARROWS() {
		return {
			"OneColumn": [
				{ visible: false, dir: null },
				{ visible: false, dir: null },
			],
			"TwoColumnsStartExpanded": [
				{ visible: true, dir: "mirror" },
				{ visible: false, dir: null },
			],
			"TwoColumnsMidExpanded": [
				{ visible: true, dir: null },
				{ visible: false, dir: null },
			],

			"ThreeColumnsMidExpanded": [
				{ visible: true, dir: null },
				{ visible: true, dir: null },
			],
			"ThreeColumnsEndExpanded": [
				{ visible: true, dir: null },
				{ visible: true, dir: "mirror" },
			],
			"ThreeColumnsStartExpandedEndHidden": [
				{ visible: true, dir: "mirror" },
				{ visible: true, dir: null },
			],
			"ThreeColumnsMidExpandedEndHidden": [
				{ visible: true, dir: null },
				{ visible: true, dir: null },
			],
		};
	}

	_startArrowClick() {
		const prevLayout = this.layout;
		this.layout = this.nextLayout(this.layout, { start: true, end: false });

		if (prevLayout !== this.layout) {
			this.fireEvent("layout-change");
		}
	}

	_endArrowClick() {
		const prevLayout = this.layout;
		this.layout = this.nextLayout(this.layout, { start: false, end: true });

		if (prevLayout !== this.layout) {
			this.fireEvent("layout-change");
		}
	}

	nextLayout(layout, arrowsInfo = {}) {
		if (arrowsInfo.start) {
			return FlexibleColumnLayout.NEXT_LAYOUT_START_ARROW[layout];
		}

		return FlexibleColumnLayout.NEXT_LAYOUT_END_ARROW[layout];
	}

	get startColumnWidth() {
		return FlexibleColumnLayout.COLUMN_WIDTHS[this.layout][0];
	}

	get midColumnWidth() {
		return FlexibleColumnLayout.COLUMN_WIDTHS[this.layout][1];
	}

	get endColumnWidth() {
		return FlexibleColumnLayout.COLUMN_WIDTHS[this.layout][2];
	}

	get showStartArrow() {
		if (this.noArrows) {
			return false;
		}

		const arrowInfo = FlexibleColumnLayout.ARROWS[this.layout][0];
		return arrowInfo.visible;
	}

	get showEndArrow() {
		if (this.noArrows) {
			return false;
		}

		const arrowInfo = FlexibleColumnLayout.ARROWS[this.layout][1];
		return arrowInfo.visible;
	}

	get startArrowDirection() {
		const arrowInfo = FlexibleColumnLayout.ARROWS[this.layout][0];
		return arrowInfo.dir;
	}

	get endArrowDirection() {
		const arrowInfo = FlexibleColumnLayout.ARROWS[this.layout][1];
		return arrowInfo.dir;
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
