import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/src/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler.js";
import ScrollEnablement from "@ui5/webcomponents-base/src/delegate/ScrollEnablement.js";
import ItemNavigation from "@ui5/webcomponents-base/src/delegate/ItemNavigation.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/events/PseudoEvents.js";
import { getCompactSize } from "@ui5/webcomponents-base/src/Configuration.js";
import getEffectiveRTL from "@ui5/webcomponents-base/src/util/getEffectiveRTL.js";
import TabContainerTemplate from "./build/compiled/TabContainerTemplate.lit.js";
import Button from "./Button.js";
import CustomListItem from "./CustomListItem.js";
import Icon from "./Icon.js";
import List from "./List.js";
import Popover from "./Popover.js";
import TabBase from "./TabBase.js";
import SemanticColor from "./types/SemanticColor.js";

// Styles
import tabContainerCss from "./themes/TabContainer.css.js";


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
			individualSlots: true,
			listenFor: { include: ["*"] },
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {
		/**
		 * Determines whether the tabs are in a fixed state that is not
		 * expandable/collapsible by user interaction.
		 *
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		fixed: {
			type: Boolean,
		},

		/**
		 * Determines whether the tab content is collapsed.
		 *
		 * @type {Boolean}
		 * @defaultvalue false
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
		 * @defaultvalue false
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
 * <code>import "@ui5/webcomponents/dist/Tab";</code> (for <code>ui5-tab</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/TabSeparator";</code> (for <code>ui5-tab-separator</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.TabContainer
 * @extends sap.ui.webcomponents.base.UI5Element
 * @appenddocs Tab TabSeparator
 * @tagname ui5-tabcontainer
 * @public
 */
class TabContainer extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return tabContainerCss;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TabContainerTemplate;
	}

	constructor() {
		super();

		this._onHeaderItemSelect = this._onHeaderItemSelect.bind(this);
		this._onHeaderItemKeyDown = this._onHeaderItemKeyDown.bind(this);
		this._onHeaderItemKeyUp = this._onHeaderItemKeyUp.bind(this);
		this._onOverflowListItemSelect = this._onOverflowListItemSelect.bind(this);
		this._onOverflowButtonClick = this._onOverflowButtonClick.bind(this);
		this._onHeaderBackArrowClick = this._onHeaderBackArrowClick.bind(this);
		this._onHeaderForwardArrowClick = this._onHeaderForwardArrowClick.bind(this);
		this._handleHeaderResize = this._handleHeaderResize.bind(this);
		this._updateScrolling = this._updateScrolling.bind(this);

		this._headerItem = {
			click: this._onHeaderItemSelect,
			keydown: this._onHeaderItemKeyDown,
			keyup: this._onHeaderItemKeyUp,
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
		const hasSelected = this.items.some(item => item.selected);
		this.items.forEach(item => {
			item._getTabContainerHeaderItemCallback = _ => {
				return this.getDomRef().querySelector(`#${item._id}`);
			};
		});

		if (!hasSelected) {
			this.items[0].selected = true;
		}

		this.calculateRenderItems();

		this._itemNavigation.init();
	}

	calculateRenderItems() {
		this.renderItems = this.items.map((item, index) => {
			const isSeparator = item.isSeparator();

			if (isSeparator) {
				return { isSeparator, _tabIndex: item._tabIndex, _id: item._id };
			}

			return {
				item,
				isMixedModeTab: !item.icon && this.mixedMode,
				isTextOnlyTab: !item.icon && !this.mixedMode,
				isIconTab: item.icon,
				position: index + 1,
				disabled: item.disabled || undefined,
				selected: item.selected || false,
				hidden: !item.selected,
				ariaLabelledBy: calculateAriaLabelledBy(item),
				contentItemClasses: calculateContentItemClasses(item),
				headerItemClasses: calculateHeaderItemClasses(item, this.mixedMode),
				headerItemContentClasses: calculateHeaderItemContentClasses(item),
				headerItemIconClasses: calculateHeaderItemIconClasses(item),
				headerItemSemanticIconClasses: calculateHeaderItemSemanticIconClasses(item),
				headerItemTextClasses: calculateHeaderItemTextClasses(item),
				headerItemAdditionalTextClasses: calculateHeaderItemAdditionalTextClasses(item),
				overflowItemClasses: calculateOverflowItemClasses(item),
				overflowItemContentClasses: calculateOverflowItemContentClasses(item),
				overflowItemState: calculateOverflowItemState(item),
			};
		}, this);
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

	_onHeaderItemKeyDown(event) {
		if (isEnter(event)) {
			this._onHeaderItemSelect(event);
		}

		// Prevent Scrolling
		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	_onHeaderItemKeyUp(event) {
		if (isSpace(event)) {
			this._onHeaderItemSelect(event);
		}
	}

	_initItemNavigation() {
		this._itemNavigation = new ItemNavigation(this);
		this._itemNavigation.getItemsCallback = () => this._getTabs();

		this._delegates.push(this._itemNavigation);
	}

	_onHeaderItemSelect(event) {
		if (!event.target.hasAttribute("disabled")) {
			this._onItemSelect(event.target);
		}
	}

	_onOverflowListItemSelect(event) {
		this._onItemSelect(event.detail.item);
		this._getPopover().close();
		this.shadowRoot.querySelector(`#${event.detail.item.id}`).focus();
	}

	_onItemSelect(target) {
		const selectedIndex = findIndex(this.items, item => item._id === target.id);
		const selectedTabIndex = findIndex(this._getTabs(), item => item._id === target.id);
		const currentSelectedTab = this.items[selectedIndex];

		// update selected items
		this.items.forEach((item, index) => {
			if (!item.isSeparator()) {
				const selected = selectedIndex === index;
				item.selected = selected;

				if (selected) {
					this._itemNavigation.current = selectedTabIndex;
				}
			}
		}, this);

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

	_getTabs() {
		return this.items.filter(item => !item.isSeparator());
	}

	_getHeaderScrollContainer() {
		return this.shadowRoot.querySelector(`#${this._id}-headerScrollContainer`);
	}

	_getPopover() {
		return this.shadowRoot.querySelector(`#${this._id}-overflowMenu`);
	}

	get classes() {
		return {
			main: {
				"ui5-tab-container": true,
				"sapUiSizeCompact": getCompactSize(),
			},
			header: {
				"ui5-tc__header": true,
				"ui5-tc__header--scrollable": this._scrollable,
			},
			headerScrollContainer: {
				"ui-tc__headerScrollContainer": true,
			},
			headerList: {
				"ui5-tc__headerList": true,
			},
			separator: {
				"ui5-tc__separator": true,
			},
			headerBackArrow: {
				"ui5-tc__headerArrow": true,
				"ui5-tc__headerArrowLeft": true,
				"ui5-tc__headerArrow--visible": this._scrollableBack,
			},
			headerForwardArrow: {
				"ui5-tc__headerArrow": true,
				"ui5-tc__headerArrowRight": true,
				"ui5-tc__headerArrow--visible": this._scrollableForward,
			},
			overflowButton: {
				"ui-tc__overflowButton": true,
				"ui-tc__overflowButton--visible": this._scrollable,
			},
			content: {
				"ui5-tc__content": true,
				"ui5-tc__content--collapsed": this.collapsed,
			},
		};
	}

	get mixedMode() {
		return this.items.some(item => item.icon) && this.items.some(item => item.text);
	}

	get rtl() {
		return getEffectiveRTL() ? "rtl" : undefined;
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

const findIndex = (arr, predicate) => {
	for (let i = 0; i < arr.length; i++) {
		const result = predicate(arr[i]);

		if (result) {
			return i;
		}
	}

	return -1;
};

/* CSS classes calculation helpers */

const calculateAriaLabelledBy = item => {
	const labels = [];

	if (item.text) {
		labels.push(`${item._id}-text`);
	}

	if (item.additionalText) {
		labels.push(`${item._id}-additionalText`);
	}

	if (item.icon) {
		labels.push(`${item._id}-icon`);
	}

	return labels.join(" ");
};

const calculateHeaderItemClasses = (item, mixedMode) => {
	const classes = ["ui5-tc__headerItem"];

	if (item.selected) {
		classes.push("ui5-tc__headerItem--selected");
	}

	if (item.disabled) {
		classes.push("ui5-tc__headerItem--disabled");
	}

	if (!item.icon && !mixedMode) {
		classes.push("ui5-tc__headerItem--textOnly");
	}

	if (item.icon) {
		classes.push("ui5-tc__headerItem--withIcon");
	}

	if (!item.icon && mixedMode) {
		classes.push("ui5-tc__headerItem--mixedMode");
	}

	if (item.semanticColor !== SemanticColor.Default) {
		classes.push(`ui5-tc__headerItem--${item.semanticColor.toLowerCase()}`);
	}

	return classes.join(" ");
};

const calculateHeaderItemContentClasses = item => {
	const classes = ["ui5-tc__headerItemContent"];

	return classes.join(" ");
};

const calculateHeaderItemIconClasses = item => {
	const classes = ["ui5-tc-headerItemIcon"];

	return classes.join(" ");
};

const calculateHeaderItemSemanticIconClasses = item => {
	const classes = ["ui5-tc-headerItemSemanticIcon"];

	if (item.semanticColor !== SemanticColor.Default) {
		classes.push(`ui5-tc-headerItemSemanticIcon--${item.semanticColor.toLowerCase()}`);
	}

	return classes.join(" ");
};

const calculateHeaderItemTextClasses = item => {
	const classes = ["ui5-tc__headerItemText"];

	return classes.join(" ");
};

const calculateHeaderItemAdditionalTextClasses = item => {
	const classes = ["ui5-tc__headerItemAdditionalText"];

	return classes.join(" ");
};

const calculateOverflowItemClasses = item => {
	const classes = ["ui5-tc__overflowItem"];

	if (item.semanticColor !== SemanticColor.Default) {
		classes.push(`ui5-tc__overflowItem--${item.semanticColor.toLowerCase()}`);
	}

	if (item.disabled) {
		classes.push("ui5-tc__overflowItem--disabled");
	}

	return classes.join(" ");
};

const calculateOverflowItemContentClasses = item => {
	const classes = ["ui5-tc__overflowItemContent"];

	return classes.join(" ");
};

const calculateOverflowItemState = item => {
	return item.disabled ? "Inactive" : "Active";
};

const calculateContentItemClasses = item => {
	const classes = ["ui5-tc__contentItem"];

	return classes.join(" ");
};

TabContainer.define();

export default TabContainer;
