import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap.js";
import { getIconURI } from "@ui5/webcomponents-base/src/IconPool.js";
import slideDown from "@ui5/webcomponents-base/src/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/src/animations/slideUp.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import Icon from "./Icon.js";
import PanelTemplateContext from "./PanelTemplateContext.js";
import PanelAccessibleRole from "./types/PanelAccessibleRole.js";
import PanelRenderer from "./build/compiled/PanelRenderer.lit.js";
import { fetchResourceBundle, getResourceBundle } from "./ResourceBundleProvider.js";

// Styles
import panelCss from "./themes/Panel.css.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-panel",
	defaultSlot: "content",
	slots: /** @lends sap.ui.webcomponents.main.Panel.prototype */ {

		/**
		 * Defines the <code>ui5-panel</code> header area.
		 * <br><br>
		 * <b>Note:</b> When a header is provided, the <code>headerText</code> property is ignored.
		 *
		 * @type {HTMLElement}
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
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: Node,
			multiple: true,
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
		 * @defaultvalue: ""
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
		 * @public
		 */
		accessibleRole: {
			type: PanelAccessibleRole,
			defaultValue: PanelAccessibleRole.Form,
		},

		_icon: {
			type: Object,
		},
		_header: {
			type: Object,
		},
		_contentExpanded: {
			type: Boolean,
		},
		_animationRunning: {
			type: Boolean,
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

	static get renderer() {
		return PanelRenderer;
	}

	static get calculateTemplateContext() {
		return PanelTemplateContext.calculate;
	}

	static get styles() {
		return panelCss;
	}

	constructor() {
		super();

		this.resourceBundle = getResourceBundle("@ui5/webcomponents");

		this._header = {};

		this._icon = {};
		this._icon.id = `${this.id}-CollapsedImg`;
		this._icon.src = getIconURI("navigation-right-arrow");
		this._icon.title = this.resourceBundle.getText("PANEL_ICON");
		this._icon.functional = true;

		this._toggle = event => { event.preventDefault(); this._toggleOpen(); };
		this._noOp = () => {};
	}

	onBeforeRendering() {
		// If the animation is running, it will set the content expanded state at the end
		if (!this._animationRunning) {
			this._contentExpanded = !this.collapsed;
		}

		const toggleWithInternalHeader = !this.header;
		this._header.press = toggleWithInternalHeader ? this._toggle : this._noOp;
		this._icon.press = !toggleWithInternalHeader ? this._toggle : this._noOp;
	}

	onkeydown(event) {
		const headerUsed = this._headerOnTarget(event.ui5target);

		if (isEnter(event) && headerUsed) {
			this._toggleOpen();
		}

		if (isSpace(event) && headerUsed) {
			event.preventDefault();
		}
	}

	onkeyup(event) {
		const headerUsed = this._headerOnTarget(event.ui5target);

		if (isSpace(event) && headerUsed) {
			this._toggleOpen();
		}
	}

	_toggleOpen() {
		if (this.fixed) {
			return;
		}

		this.collapsed = !this.collapsed;
		this._animationRunning = true;

		const elements = this.getDomRef().querySelectorAll(".sapMPanelExpandablePart");
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

	static async define(...params) {
		await Promise.all([
			fetchResourceBundle("@ui5/webcomponents"),
			Icon.define(),
		]);

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	Panel.define();
});

export default Panel;
