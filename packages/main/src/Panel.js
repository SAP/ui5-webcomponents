import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import IconPool from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/IconPoolProxy";
import slideDown from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/animations/slideDown";
import slideUp from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/animations/slideUp";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import PanelTemplateContext from "./PanelTemplateContext";
import BackgroundDesign from "./types/BackgroundDesign";
import PanelAccessibleRole from "./types/PanelAccessibleRole";
import PanelRenderer from "./build/compiled/PanelRenderer.lit";
import { fetchResourceBundle, getResourceBundle } from "./ResourceBundleProvider";

// Styles
import belize from "./themes/sap_belize/Panel.less";
import belizeHcb from "./themes/sap_belize_hcb/Panel.less";
import fiori3 from "./themes/sap_fiori_3/Panel.less";

ShadowDOM.registerStyle("sap_belize", "Panel.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Panel.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Panel.css", fiori3);

/**
 * @public
 */
const metadata = {
	tag: "ui5-panel",
	styleUrl: [
		"Panel.css",
	],
	defaultSlot: "content",
	slots: /** @lends sap.ui.webcomponents.main.Panel.prototype */ {

		/**
		 * Defines the <code>ui5-panel</code> header area.
		 * For example, you can use <code>ui5-toolbar</code> and add extra
		 * components for user interactions.
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
			type: HTMLElement,
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
		 * @public
		 */
		headerText: {
			type: String,
			defaultValue: "",
		},

		/**
		 * Determines whether the <code>ui5-panel</code> is in a fixed state that is not
		 * expandable/collapsible by user interaction.
		 *
		 * @type {boolean}
		 * @public
		 */
		fixed: {
			type: Boolean,
		},

		/**
		 * Indicates whether the <code>ui5-panel</code> is collapsed and only the header is displayed.
		 *
		 * @type {boolean}
		 * @public
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * Determines the background color of the <code>ui5-panel</code>.
		 * Available options are <code>Solid</code> and <code>Transparent</code>.
		 *
		 * @type {BackgroundDesign}
		 * @public
		 */
		backgroundDesign: {
			type: BackgroundDesign,
			defaultValue: BackgroundDesign.Solid,
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
		expand: {},
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
 * A panel consists of a title bar with a header text or header toolbar and a content area.
 * <br>
 * The content area can contain an arbitrary set of controls.
 * The header can contain a title with text and icons, buttons, and a
 * collapse icon, which allows to show/hide the content area.
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
 * @extends sap.ui.webcomponents.base.WebComponent
 * @tagname ui5-panel
 * @public
 */
class Panel extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return PanelRenderer;
	}

	static get calculateTemplateContext() {
		return PanelTemplateContext.calculate;
	}

	constructor(state) {
		super(state);

		this.resourceBundle = getResourceBundle("@ui5/webcomponents");

		this._icon = {};
		this._icon.id = `${this.id}-CollapsedImg`;
		this._icon.src = IconPool.getIconURI("navigation-right-arrow");
		this._icon.title = this.resourceBundle.getText("PANEL_ICON");
		this._icon.functional = true;
	}

	onBeforeRendering() {
		// If the animation is running, it will set the content expanded state at the end
		if (!this._animationRunning) {
			this._contentExpanded = !this.collapsed;
		}
	}

	ontap(event) {
		const icon = this.shadowRoot.querySelector("ui5-icon");
		const isIconTab = (event.ui5target === icon);

		if (icon && (isIconTab || event.ui5target.contains(icon.getDomRef()))) {
			this._toggleOpen();
		}
	}

	_toggleOpen() {
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
			this._fireExpandEvent();
		});
	}

	_fireExpandEvent() {
		this.fireEvent("expand", {});
	}

	onsapspace(event) {
		if (event.ui5target.classList.contains("sapMPanelIcon")) {
			event.preventDefault();
			this._toggleOpen();
		}
	}

	onsapenter(event) {
		this.onsapspace.call(this, event);
	}

	static async define(...params) {
		await fetchResourceBundle("@ui5/webcomponents");

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	Panel.define();
});

export default Panel;
