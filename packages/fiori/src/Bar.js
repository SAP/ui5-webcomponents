import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import BarTemplate from "./generated/templates/BarTemplate.lit.js";
import BarDesign from "./types/BarDesign.js";

// Styles
import BarCss from "./generated/themes/Bar.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-bar",
	managedSlots: true,
	fastNavigation: true,
	properties: /** @lends sap.ui.webcomponents.fiori.Bar.prototype */ {
		/**
		 * Defines the <code>ui5-bar</code> design.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * Available options are:
		 * <ul>
		 * <li><code>Header</code></li>
		 * <li><code>Subheader</code></li>
		 * <li><code>Footer</code></li>
		 * <li><code>FloatingFooter</code></li>
		 * </ul>
		 *
		 * @type {BarDesign}
		 * @defaultvalue "Header"
		 * @public
		 */
		design: {
			type: BarDesign,
			defaultValue: BarDesign.Header,
		},

		/**
		 * Defines if the component middle area needs to be centered between start and end area
		 * @type {boolean}
		 * @private
		 */
		_shrinked: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.Bar.prototype */ {
		/**
		 * Defines the content at the start of the bar
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		startContent: {
			type: HTMLElement,
		},

		/**
		 * Defines the content in the middle of the bar
		 * @type {HTMLElement[]}
		 * @slot middleContent
		 * @public
		 */
		"default": {
			type: HTMLElement,
			propertyName: "middleContent",
		},

		/**
		 * Defines the content at the end of the bar
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		endContent: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.Bar.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The Bar is a container which is primarily used to hold titles, buttons and input elements
 * and its design and functionality is the basis for page headers and footers.
 * The component consists of three areas to hold its content - startContent slot, default slot and endContent slot.
 * It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * <h3>Usage</h3>
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 * <br>
 * <b>Note:</b> Do not place a Bar inside another Bar or inside any bar-like component. Doing so may cause unpredictable behavior.
 *
 * <h3>Responsive Behavior</h3>
 * The default slot will be centered in the available space between the startContent and the endContent areas,
 * therefore it might not always be centered in the entire bar.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-bar</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>bar - Used to style the wrapper of the content of the component</li>
 * </ul>
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/Bar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.Bar
 * @implements sap.ui.webcomponents.fiori.IBar
 * @extends UI5Element
 * @tagname ui5-bar
 * @public
 * @since 1.0.0-rc.11
 */
class Bar extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return BarCss;
	}

	static get template() {
		return BarTemplate;
	}

	get accInfo() {
		return {
			"label": this.design,
		};
	}

	constructor() {
		super();

		this._handleResizeBound = this.handleResize.bind(this);
	}

	handleResize() {
		const bar = this.getDomRef();
		const barWidth = bar.offsetWidth;

		this._shrinked = Array.from(bar.children).some(element => {
			return barWidth / 3 < element.offsetWidth;
		});
	}

	get classes() {
		return {
			root: {
				"ui5-bar-root": true,
				"ui5-bar-root-shrinked": this._shrinked,
			},
		};
	}

	onBeforeRendering() {
		// Next row is specific for IE11. Please remove after stop support and edit css file
		[...this.startContent, ...this.middleContent, ...this.endContent].forEach(element => element.classList.add("ui5-bar-content"));
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);
	}
}

Bar.define();

export default Bar;
