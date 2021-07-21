import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slideDown from "@ui5/webcomponents-base/dist/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/dist/animations/slideUp.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Button from "./Button.js";
import TitleLevel from "./types/TitleLevel.js";
import PanelAccessibleRole from "./types/PanelAccessibleRole.js";
import PanelTemplate from "./generated/templates/PanelTemplate.lit.js";

import { PANEL_ICON } from "./generated/i18n/i18n-defaults.js";

// Styles
import panelCss from "./generated/themes/Panel.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-panel",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Panel.prototype */ {

		/**
		 * Defines the component header area.
		 * <br><br>
		 * <b>Note:</b> When a header is provided, the <code>headerText</code> property is ignored.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Determines the content of the component.
		 * The content is visible only when the component is expanded.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.Panel.prototype */ {

		/**
		 * This property is used to set the header text of the component.
		 * The text is visible in both expanded and collapsed states.
		 * <br><br>
		 * <b>Note:</b> This property is overridden by the <code>header</code> slot.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Determines whether the component is in a fixed state that is not
		 * expandable/collapsible by user interaction.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		fixed: {
			type: Boolean,
		},

		/**
		 * Indicates whether the component is collapsed and only the header is displayed.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * Sets the accessible aria role of the component.
		 * Depending on the usage, you can change the role from the default <code>Form</code>
		 * to <code>Region</code> or <code>Complementary</code>.
		 *
		 * @type {PanelAccessibleRole}
		 * @defaultvalue "Form"
		 * @public
		 */
		accessibleRole: {
			type: PanelAccessibleRole,
			defaultValue: PanelAccessibleRole.Form,
		},

		/**
		 * Defines the "aria-level" of component heading,
		 * set by the <code>headerText</code>.
		 * <br><br>
		 * Available options are: <code>"H6"</code> to <code>"H1"</code>.
		 * @type {TitleLevel}
		 * @defaultvalue "H2"
		 * @public
		*/
		headerLevel: {
			type: TitleLevel,
			defaultValue: TitleLevel.H2,
		},

		/**
		 * Sets the accessible aria name of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * When set to <code>true</code>, the <code>accessibleName</code> property will be
		 * applied not only on the panel root itself, but on its toggle button too.
		 * <b>Note:</b> This property only has effect if <code>accessibleName</code> is set and a header slot is provided.
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
 		 */
		useAccessibleNameForToggleButton: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_hasHeader: {
			type: Boolean,
		},

		_header: {
			type: Object,
		},

		_contentExpanded: {
			type: Boolean,
			noAttribute: true,
		},

		_animationRunning: {
			type: Boolean,
			noAttribute: true,
		},

		_buttonAccInfo: {
			type: Object,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Panel.prototype */ {

		/**
		 * Fired when the component is expanded/collapsed by user interaction.
		 *
		 * @event
		 * @public
		 */
		toggle: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-panel</code> component is a container which has a header and a
 * content area and is used
 * for grouping and displaying information. It can be collapsed to save space on the screen.
 *
 * <h3>Guidelines:</h3>
 * <ul>
 * <li>Nesting two or more panels is not recommended.</li>
 * <li>Do not stack too many panels on one page.</li>
 * </ul>
 *
 * <h3>Structure</h3>
 * A panel consists of a title bar with a header text or custom header.
 * <br>
 * The content area can contain an arbitrary set of controls.
 * The header is clickable and can be used to toggle between the expanded and collapsed state.
 * It includes an icon which rotates depending on the state.
 * <br>
 * The custom header can be set through the <code>header</code> slot and it may contain arbitraray content, such as: title, buttons or any other HTML elements.
 * <br><b>Note:</b> the custom header is not clickable out of the box, but in this case the icon is interactive and allows to show/hide the content area.
 *
 * <h3>Responsive Behavior</h3>
 * <ul>
 * <li>If the width of the panel is set to 100% (default), the panel and its children are
 * resized responsively,
 * depending on its parent container.</li>
 * <li>If the panel has a fixed height, it will take up the space even if the panel is
 * collapsed.</li>
 * <li>When the panel is expandable (the <code>fixed</code> property is set to <code>false</code>),
 * an arrow icon (pointing to the right) appears in front of the header.</li>
 * <li>When the animation is activated, expand/collapse uses a smooth animation to open or
 * close the content area.</li>
 * <li>When the panel expands/collapses, the arrow icon rotates 90 degrees
 * clockwise/counter-clockwise.</li>
 * </ul>
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-panel</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>content - Used to style the wrapper of the content</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Panel";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Panel
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-panel
 * @public
 */
class Panel extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return PanelTemplate;
	}

	static get styles() {
		return panelCss;
	}

	constructor() {
		super();

		this._header = {};
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		// If the animation is running, it will set the content expanded state at the end
		if (!this._animationRunning) {
			this._contentExpanded = !this.collapsed;
		}

		this._hasHeader = !!this.header.length;
	}

	shouldToggle(node) {
		const customContent = this.header.length;
		if (customContent) {
			return node.classList.contains("ui5-panel-header-button");
		}
		return true;
	}

	shouldAnimate() {
		return getAnimationMode() !== AnimationMode.None;
	}

	_headerClick(event) {
		if (!this.shouldToggle(event.target)) {
			return;
		}

		this._toggleOpen();
	}

	_toggleButtonClick(event) {
		if (event.x === 0 && event.y === 0) {
			event.stopImmediatePropagation();
		}
	}

	_headerKeyDown(event) {
		if (!this.shouldToggle(event.target)) {
			return;
		}

		if (isEnter(event)) {
			this._toggleOpen();
		}

		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	_headerKeyUp(event) {
		if (!this.shouldToggle(event.target)) {
			return;
		}

		if (isSpace(event)) {
			this._toggleOpen();
		}
	}

	_toggleOpen() {
		if (this.fixed) {
			return;
		}

		this.collapsed = !this.collapsed;

		if (!this.shouldAnimate()) {
			this.fireEvent("toggle");
			return;
		}

		this._animationRunning = true;

		const elements = this.getDomRef().querySelectorAll(".ui5-panel-content");
		const animations = [];

		[].forEach.call(elements, oElement => {
			if (this.collapsed) {
				animations.push(slideUp({
					element: oElement,
				}).promise());
			} else {
				animations.push(slideDown({
					element: oElement,
				}).promise());
			}
		});

		Promise.all(animations).then(_ => {
			this._animationRunning = false;
			this._contentExpanded = !this.collapsed;
			this.fireEvent("toggle");
		});
	}

	_headerOnTarget(target) {
		return target.classList.contains("sapMPanelWrappingDiv");
	}

	get classes() {
		return {
			headerBtn: {
				"ui5-panel-header-button-animated": this.shouldAnimate(),
			},
		};
	}

	get toggleButtonTitle() {
		return this.i18nBundle.getText(PANEL_ICON);
	}

	get expanded() {
		return !this.collapsed;
	}

	get accRole() {
		return this.accessibleRole.toLowerCase();
	}

	get effectiveAccessibleName() {
		return typeof this.accessibleName === "string" && this.accessibleName.length ? this.accessibleName : undefined;
	}

	get accInfo() {
		return {
			"button": {
				"ariaExpanded": this.expanded,
				"ariaControls": `${this._id}-content`,
				"title": this.toggleButtonTitle,
				"ariaLabelButton": !this.nonFocusableButton && this.useAccessibleNameForToggleButton ? this.effectiveAccessibleName : undefined,
			},
			"ariaExpanded": this.nonFixedInternalHeader ? this.expanded : undefined,
			"ariaControls": this.nonFixedInternalHeader ? `${this._id}-content` : undefined,
			"ariaLabelledby": this.nonFocusableButton ? this.ariaLabelledbyReference : undefined,
			"role": this.nonFixedInternalHeader ? "button" : undefined,
		};
	}

	get ariaLabelledbyReference() {
		return (this.nonFocusableButton && this.headerText) ? `${this._id}-header-title` : undefined;
	}

	get header() {
		return this.getDomRef().querySelector(`#${this._id}-header-title`);
	}

	get headerAriaLevel() {
		return this.headerLevel.slice(1);
	}

	get headerTabIndex() {
		return (this.header.length || this.fixed) ? "-1" : "0";
	}

	get nonFixedInternalHeader() {
		return !this._hasHeader && !this.fixed;
	}

	get nonFocusableButton() {
		return !this.header.length;
	}

	get shouldRenderH1() {
		return !this.header.length && (this.headerText || !this.fixed);
	}

	get styles() {
		return {
			content: {
				display: this._contentExpanded ? "block" : "none",
			},
		};
	}

	static get dependencies() {
		return [Button];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

Panel.define();

export default Panel;
