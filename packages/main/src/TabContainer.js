import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/Bootstrap";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler";
import ScrollEnablement from "@ui5/webcomponents-base/src/delegate/ScrollEnablement";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation";
import { addCustomCSS } from "@ui5/webcomponents-base/src/theming/CustomStyle";
import TabContainerTemplateContext from "./TabContainerTemplateContext";
import TabContainerRenderer from "./build/compiled/TabContainerRenderer.lit";
import Button from "./Button";
import CustomListItem from "./CustomListItem";
import Icon from "./Icon";
import List from "./List";
import Popover from "./Popover";
import TabBase from "./TabBase";

// Styles
import buttonCss from "./themes-next/TabContainer.css";

addCustomCSS("ui5-tabcontainer", "sap_fiori_3", buttonCss);
addCustomCSS("ui5-tabcontainer", "sap_belize", buttonCss);
addCustomCSS("ui5-tabcontainer", "sap_belize_hcb", buttonCss);

const SCROLL_STEP = 128;

/**
 * @public
 */
const metadata = {
	tag: "ui5-tabcontainer",
	defaultSlot: "items",
	slots: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {
		/**
		 * Defines the tabs.
		 * <br><b>Note:</b> Only <code>ui5-tab</code> and <code>ui5-tab-separator</code> are allowed.
		 *
		 * @type {TabBase[]}
		 * @public
		 * @slot
		 */
		items: {
			type: TabBase,
			multiple: true,
			listenFor: { include: ["*"] },
		},
	},
	styleUrl: [
		"TabContainer.css",
	],
	properties: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {
		/**
		 * Determines whether the tabs are in a fixed state that is not
		 * expandable/collapsible by user interaction.
		 *
		 * @type {Boolean}
		 * @public
		 */
		fixed: {
			type: Boolean,
		},

		/**
		 * Determines whether the tab content is collapsed.
		 *
		 * @type {Boolean}
		 * @public
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * Specifies if the overflow select list is displayed.
		 * <br><br>
		 * The overflow select list represents a list, where all tab filters are displayed
		 * so that it's easier for the user to select a specific tab filter.
		 *
		 * @type {Boolean}
		 * @public
		 */
		showOverflow: {
			type: Boolean,
		 },

		_headerItem: {
			type: Object,
		},

		_overflowButton: {
			type: Object,
		},

		_headerBackArrow: {
			type: Object,
		},

		_headerForwardArrow: {
			type: Object,
		},

		_overflowList: {
			type: Object,
		},

		_selectedTab: {
			type: TabBase,
			association: true,
		},

		_scrollable: {
			type: Boolean,
		},

		_scrollableBack: {
			type: Boolean,
		},

		_scrollableForward: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {
		/**
		 * Fired when an item is selected.
		 *
		 * @event
		 * @param {HTMLElement} item The selected <code>item</code>.
		 * @public
		 */
		itemSelect: {
			item: { type: HTMLElement },
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-tabcontainer</code> represents a collection of tabs with associated content.
 * Navigation through the tabs changes the content display of the currently active content area.
 * A tab can be labeled with text only, or icons with text.
 *
 * <h3>Structure</h3>
 *
 * The <code>ui5-tabcontainer</code> can hold two types of entities:
 * <ul>
 * <li><code>ui5-tab</code> - contains all the information on an item (text and icon)</li>
 * <li><code>ui5-tab-separator</code> - used to separate tabs with a vertical line</li>
 * </ul>
 *
 * <h3>ES6 import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/TabContainer";</code>
 * <br>
 * <b>Note:</b> This also includes the <code>ui5-tab</code> and <code>ui5-tab-separator</code> Web Components.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TabContainer
 * @extends sap.ui.webcomponents.base.WebComponent
 * @appenddocs Tab TabSeparator
 * @tagname ui5-tabcontainer
 * @public
 */
class TabContainer extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static get renderer() {
		return TabContainerRenderer;
	}

	constructor() {
		super();

		this._onTabItemSelect = this._onTabItemSelect.bind(this);
		this._onOverflowListItemSelect = this._onOverflowListItemSelect.bind(this);
		this._onOverflowButtonClick = this._onOverflowButtonClick.bind(this);
		this._onHeaderBackArrowClick = this._onHeaderBackArrowClick.bind(this);
		this._onHeaderForwardArrowClick = this._onHeaderForwardArrowClick.bind(this);
		this._handleHeaderResize = this._handleHeaderResize.bind(this);
		this._updateScrolling = this._updateScrolling.bind(this);

		this._headerItem = {
			click: this._onTabItemSelect,
		};

		this._overflowButton = {
			click: this._onOverflowButtonClick,
		};

		this._headerBackArrow = {
			click: this._onHeaderBackArrowClick,
		};

		this._headerForwardArrow = {
			click: this._onHeaderForwardArrowClick,
		};

		this._overflowList = {
			click: this._onOverflowListItemSelect,
		};

		// Init ScrollEnablement
		this._scrollEnablement = new ScrollEnablement();
		this._scrollEnablement.attachEvent("scroll", this._updateScrolling);
		this._delegates.push(this._scrollEnablement);

		// Init ItemNavigation
		this._initItemNavigation();
	}

	onBeforeRendering() {
		this.items.forEach(item => {
			if (!item.isSeparator()) {
				item._getTabContainerHeaderItemCallback = _ => {
					return this.getDomRef().querySelector(`#ui5-tc-headerItem-${item._id}`);
				};
			}
		});
	}

	onAfterRendering() {
		this._scrollEnablement.scrollContainer = this._getHeaderScrollContainer();
		this._updateScrolling();
	}

	onEnterDOM() {
		ResizeHandler.register(this._getHeader(), this._handleHeaderResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this._getHeader(), this._handleHeaderResize);
	}

	_initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this);
		this._itemNavigation.getItemsCallback = () => this.items.filter(item => !item.isSeparator());

		this._delegates.push(this._itemNavigation);
	}

	_onTabItemSelect(event) {
		if (!event.target.getAttribute("disabled")) {
			this._onItemSelect(event.target);
		}
	}

	_onOverflowListItemSelect(event) {
		this._onItemSelect(event.detail.item);
		this._getPopover().close();
	}

	_onItemSelect(target) {
		const selectedIndex = parseInt(target.getAttribute("data-position")) - 1;
		const currentSelectedTab = this.items[selectedIndex];

		// update selected items
		this.items.forEach((item, index) => {
			item.selected = selectedIndex === index;
		});

		// update collapsed state
		if (!this.fixed) {
			if (currentSelectedTab === this._selectedTab) {
				this.collapsed = !this.collapsed;
			} else {
				this.collapsed = false;
			}
		}

		// select the tab
		this._selectedTab = currentSelectedTab;
		this.fireEvent("itemSelect", {
			item: currentSelectedTab,
		});
	}

	_onOverflowButtonClick(event) {
		this._getPopover().openBy(event.target);
	}

	_onHeaderBackArrowClick() {
		this._scrollEnablement.move(-SCROLL_STEP, 0).promise()
			.then(_ => this._updateScrolling());
	}

	_onHeaderForwardArrowClick() {
		this._scrollEnablement.move(SCROLL_STEP, 0).promise()
			.then(_ => this._updateScrolling());
	}

	_handleHeaderResize() {
		this._updateScrolling();
	}

	_updateScrolling() {
		const headerScrollContainer = this._getHeaderScrollContainer();

		this._scrollable = headerScrollContainer.offsetWidth < headerScrollContainer.scrollWidth;
		this._scrollableBack = headerScrollContainer.scrollLeft > 0;
		this._scrollableForward = Math.ceil(headerScrollContainer.scrollLeft) < headerScrollContainer.scrollWidth - headerScrollContainer.offsetWidth;
	}

	_getHeader() {
		return this.shadowRoot.querySelector(`#${this._id}-header`);
	}

	_getHeaderScrollContainer() {
		return this.shadowRoot.querySelector(`#${this._id}-headerScrollContainer`);
	}

	_getPopover() {
		return this.shadowRoot.querySelector(`#${this._id}-overflowMenu`);
	}

	static get calculateTemplateContext() {
		return TabContainerTemplateContext.calculate;
	}

	static async define(...params) {
		await Promise.all([
			Button.define(),
			CustomListItem.define(),
			Icon.define(),
			List.define(),
			Popover.define(),
		]);

		super.define(...params);
	}
}

Bootstrap.boot().then(_ => {
	TabContainer.define();
});

export default TabContainer;
