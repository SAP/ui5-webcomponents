import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import fastNavigation from "@ui5/webcomponents-base/dist/decorators/fastNavigation.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import BarDesign from "./types/BarDesign.js";

// Template
import BarTemplate from "./generated/templates/BarTemplate.lit.js";

// Styles
import BarCss from "./generated/themes/Bar.css.js";

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
 * @alias sap.ui.webc.fiori.Bar
 * @implements sap.ui.webc.fiori.IBar
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-bar
 * @public
 * @since 1.0.0-rc.11
 */
@customElement("ui5-bar")
@fastNavigation
class Bar extends UI5Element {
	/**
	 * Defines the component's design.
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
	 * @type {sap.ui.webc.fiori.types.BarDesign}
	 * @name sap.ui.webc.fiori.Bar.prototype.design
	 * @defaultvalue "Header"
	 * @public
	 */
	@property({ type: BarDesign, defaultValue: BarDesign.Header })
	design!: BarDesign

	/**
	* Defines the content at the start of the bar
	* @type {HTMLElement[]}
	* @name sap.ui.webc.fiori.Bar.prototype.startContent
	* @slot
	* @public
	*/
	@slot({ type: HTMLElement })
	startContent!: Array<HTMLElement>;

	/**
	* Defines the content in the middle of the bar
	* @type {HTMLElement[]}
	* @name sap.ui.webc.fiori.Bar.prototype.default
	* @slot middleContent
	* @public
	*/
	@slot({ type: HTMLElement, "default": true })
	middleContent!: Array<HTMLElement>

	/**
	* Defines the content at the end of the bar
	* @type {HTMLElement[]}
	* @name sap.ui.webc.fiori.Bar.prototype.endContent
	* @slot
	* @public
	*/
	@slot({ type: HTMLElement })
	endContent!: Array<HTMLElement>

	_handleResizeBound: () => void;

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
		const bar = this.getDomRef()!;
		const barWidth = bar.offsetWidth;
		const needShrinked = Array.from(bar.children).some(child => {
			return (child as HTMLElement).offsetWidth > barWidth / 3;
		});

		bar.classList.toggle("ui5-bar-root-shrinked", needShrinked);
	}

	get classes() {
		return {
			root: {
				"ui5-bar-root": true,
			},
		};
	}

	onBeforeRendering() {
		// Next row is specific for IE11. Please remove after stop support and edit css file
		[...this.startContent, ...this.middleContent, ...this.endContent].forEach(element => element.classList.add("ui5-bar-content"));
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResizeBound);

		this.getDomRef()!.querySelectorAll(".ui5-bar-content-container").forEach(child => {
			ResizeHandler.register(child as HTMLElement, this._handleResizeBound);
		}, this);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResizeBound);

		this.getDomRef()!.querySelectorAll(".ui5-bar-content-container").forEach(child => {
			ResizeHandler.deregister(child as HTMLElement, this._handleResizeBound);
		}, this);
	 }
}

Bar.define();

export default Bar;
