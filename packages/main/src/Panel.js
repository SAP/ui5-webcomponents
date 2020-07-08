import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import slideDown from "@ui5/webcomponents-base/dist/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/dist/animations/slideUp.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import getEffectiveAriaLabelText from "@ui5/webcomponents-base/dist/util/getEffectiveAriaLabelText.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/icons/navigation-right-arrow.js";
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
		 * Defines the <code>ui5-panel</code> header area.
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
		 * Determines the content of the <code>ui5-panel</code>.
		 * The content is visible only when the <code>ui5-panel</code> is expanded.
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
		 * This property is used to set the header text of the <code>ui5-panel</code>.
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
		 * Determines whether the <code>ui5-panel</code> is in a fixed state that is not
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
		 * Indicates whether the <code>ui5-panel</code> is collapsed and only the header is displayed.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * Sets the accessible aria role of the <code>ui5-panel</code>.
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
		 * Defines the "aria-level" of <code>ui5-panel</code> heading,
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
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabel: {
			type: String,
		},
		/**
		 * Receives id(or many ids) of the elements that label the panel
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @private
		 * @since 1.0.0-rc.8
		 */
		ariaLabelledby: {
			type: String,
			defaultValue: "",
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
	events: {

		/**
		 * Fired when the ui5-panel is expanded/collapsed by user interaction.
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

	get accInfo() {
		return {
			"button": {
				"ariaExpanded": this._hasHeader ? this.expanded : undefined,
				"ariaControls": this._hasHeader ? `${this._id}-content` : undefined,
				"title": this.toggleButtonTitle,
			},
			"ariaExpanded": this.nonFixedInternalHeader ? this.expanded : undefined,
			"ariaControls": this.nonFixedInternalHeader ? `${this._id}-content` : undefined,
			"ariaLabelledby": this.nonFocusableButton ? this.ariaLabelledbyReference : undefined,
			"ariaLabel": this.nonFocusableButton ? this.ariaLabelTxt : undefined,
			"ariaLabelledbyButton": this.nonFocusableButton ? undefined : this.ariaLabelledbyReference,
			"ariaLabelButton": this.nonFocusableButton ? undefined : this.ariaLabelTxt,
			"role": this.nonFixedInternalHeader ? "button" : undefined,
		};
	}

	get ariaLabelledbyReference() {
		if (this.ariaLabelledby || this.ariaLabel) {
			return undefined;
		}

		return (this.nonFocusableButton && this.headerText) ? `${this._id}-header-title` : undefined;
	}

	get ariaLabelTxt() {
		return getEffectiveAriaLabelText(this);
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

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
			Button.define(),
		]);
	}
}

Panel.define();

export default Panel;
