import WebComponent from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/WebComponent";
import Bootstrap from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Bootstrap";
import ScrollEnablement from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/delegate/ScrollEnablement";
import ItemNavigation from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/delegate/ItemNavigation";
import ResizeHandler from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/delegate/ResizeHandler";
import ShadowDOM from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/compatibility/ShadowDOM";
import { isSpace, isEnter } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/events/PseudoEvents";
import TabContainerTemplateContext from "./TabContainerTemplateContext";
import TabBase from "./TabBase";
import Tab from "./Tab";
import TabSeparator from "./TabSeparator";
import Popover from "./Popover";
import List from "./List";
import CustomListItem from "./CustomListItem";
import Icon from "./Icon";
import Button from "./Button";

import TabDesignMode from "./types/TabDesignMode";
import IconColor from "./types/IconColor";
import BackgroundDesign from "./types/BackgroundDesign";
import TabContainerHeaderMode from "./types/TabContainerHeaderMode";
import ListItemType from "./types/ListItemType";
import TabContainerRenderer from "./build/compiled/TabContainerRenderer.lit";


// Styles
import belize from "./themes/sap_belize/TabContainer.less";
import belizeHcb from "./themes/sap_belize_hcb/TabContainer.less";
import fiori3 from "./themes/sap_fiori_3/TabContainer.less";

ShadowDOM.registerStyle("sap_belize", "TabContainer.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "TabContainer.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "TabContainer.css", fiori3);

const _convertSingleClass = (oClass, customStyleClasses) => {
	// Push all custom classes first, if any
	if (Array.isArray(customStyleClasses)) {
		customStyleClasses.forEach(sClassName => {
			oClass[sClassName] = true;
		});
	}

	return Object.keys(oClass).filter(className => oClass[className]).join(" ");
};

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
			listenFor: { exclude: ["content"] },
		},

		/**
		 * Defines the default container content.
		 *
		 * @type {HTMLElement[]}
		 * @public
		 * @slot
		 */
		content: {
			type: HTMLElement,
			multiple: true,
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
		 * Defines the selected tab item by refering its index, following the zero based numbering.
		 * For example, the first item is under <code>index="0"</code>.
		 *
		 * @type {String}
		 * @public
		 */
		selectedIndex: {
			type: String,
			defaultValue: null,
		},

		/**
		 * Specifies the background color of the IconTabBar.
		 * <br><br>
		 * Depending on the theme, you can change the state of
		 * the background color to <code>Solid</code> (default), <code>Translucent</code>, or <code>Transparent</code>.
		 *
		 * @type {BackgroundDesign}
		 * @public
		 * @defaultvalue BackgroundDesign.Solid
		 */
		backgroundDesign: {
			type: BackgroundDesign,
			defaultValue: BackgroundDesign.Solid,
		},

		/**
		 * Specifies the header mode. Available options are: <code>Standard</code> and <code>Inline</code>.
		 * <br><br>
		 * In <code>Standard</code> mode the <code>count</code> and the <code>text</code>
		 * are displayed in two separate lines.
		 * In <code>Inline</code> mode the <code>count</code> and the <code>text</code>
		 * are displayed in single line.
		 * <br><br>
		 * <b>Note:</b> The <code>Inline</code> mode works only when no icons are set.
		 *
		 * @type {TabContainerHeaderMode}
		 * @public
		 */
		headerMode: {
			type: TabContainerHeaderMode,
			defaultValue: TabContainerHeaderMode.Standard,
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

		/**
		 * Specifies the background color of the header.
		 * <br><br>
		 * Depending on the theme, you can change the state of
		 * the background color to <code>Solid</code> (default), <code>Translucent</code>, or <code>Transparent</code>.
		 *
		 * @type {BackgroundDesign}
		 * @public
		 */
		headerBackgroundDesign: {
			type: BackgroundDesign,
			defaultValue: BackgroundDesign.Solid,
		},

		_selectedContent: {
			type: HTMLElement,
			multiple: true,
			association: true,
		},

		_selectedTab: {
			type: Tab,
			association: true,
		},

		_scrollable: { type: Boolean },
		_scrollForward: { type: Boolean },
		_scrollBack: { type: Boolean },

		_isNoIcon: { type: Boolean },
		_isNoText: { type: Boolean },
		_isNoIconAndCount: { type: Boolean },

		_isInline: { type: Boolean },

		_leftArrow: { type: Object },
		_rightArrow: { type: Object },

		_overflowButton: { type: Object },
		_overflowList: { type: Object },

		_headerItems: { type: Object, multiple: true },

		_navigationItems: { type: Object, multiple: true },
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

const scrollStep = 128;

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

	static _checkIfNoIcon(tabs) {
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].icon) {
				return false;
			}
		}

		return true;
	}

	static _checkIfNoText(tabs) {
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].text) {
				return false;
			}
		}

		return true;
	}

	static _checkIfNoIconAndCount(tabs) {
		let tab;

		for (let i = 0; i < tabs.length; i++) {
			tab = tabs[i];
			if (tab.icon || tab.count) {
				return false;
			}
		}

		return true;
	}

	static _findClosestTab(target) {
		let maxLevel = 4;

		while (target && maxLevel) {
			if (target.classList.contains("sapMITBItem")) {
				return target;
			}

			target = target.parentElement;
			maxLevel--;
		}
	}

	constructor() {
		super();

		this._updateScrollingHandler = this._updateScrolling.bind(this);

		this._scrollEnablement = new ScrollEnablement();
		this._scrollEnablement.attachEvent("scroll", this._updateScrollingHandler);
		this._delegates.push(this._scrollEnablement);

		this._leftArrow = {
			onPress: this._scrollLeft.bind(this),
			classes: "sapMITBArrowScroll sapMITHVerticallyCenteredArrow sapMITBArrowScrollLeft",
		};

		this._rightArrow = {
			onPress: this._scrollRight.bind(this),
			classes: "sapMITBArrowScroll sapMITHVerticallyCenteredArrow sapMITBArrowScrollRight",
		};

		this._overflowButton = {
			_customAttributes: {
				tabindex: -1,
			},
			onPress: this._openOverflowList.bind(this),
			classes: "",
		};

		this._overflowList = {
			onItemPress: this._overflowItemSelected.bind(this),
			items: [],
		};

		this._itemNavigation = new ItemNavigation(this, {
			cyclic: false,
		});
		this._delegates.push(this._itemNavigation);

		this._itemNavigation.getItemsCallback = function getItemsCallback() {
			return this._navigationItems;
		}.bind(this);

		this._itemNavigation.setItemsCallback = function setItemsCallback(items) {
			this._navigationItems = items;
		}.bind(this);
	}


	onBeforeRendering() {
		const tabs = this.getTabs();

		if (!tabs.length) {
			return;
		}

		this._initSelectedTab();

		this._isNoIcon = TabContainer._checkIfNoIcon(tabs);
		this._isNoText = TabContainer._checkIfNoText(tabs);
		this._isNoIconAndCount = TabContainer._checkIfNoIconAndCount(tabs);
		this._isInline = this._isNoIconAndCount
			|| (this._isNoIcon && this.headerMode === TabContainerHeaderMode.Inline);

		const suffix = this._isNoIcon ? "TextOnly" : "";

		this._leftArrow.classes = `sapMITBArrowScroll sapMITHVerticallyCenteredArrow sapMITBArrowScrollLeft${suffix}`;
		this._rightArrow.classes = `sapMITBArrowScroll sapMITHVerticallyCenteredArrow sapMITBArrowScrollRight${suffix}`;

		if (this.showOverflow) {
			let buttonCustomClass = "";

			if (this._isInline) {
				buttonCustomClass = "sapMBtnInline";
			} else if (this._isNoIconAndCount) {
				buttonCustomClass = "sapMBtnTextOnly";
			} else if (this._isNoText) {
				buttonCustomClass = "sapMBtnNoText";
			}

			this._overflowButton.classes = `sapMITHBtn sapMITHVerticallyCenteredArrow ${buttonCustomClass}`;
		}

		this._prepareHeaderTabs();
		this._prepareOverflowList();

		this._itemNavigation.init();
	}

	onAfterRendering() {
		this._scrollEnablement.scrollContainer = this._getScrollContainer();

		if (!this._isFirstAfterRendering) {
			this._updateScrolling();
			this._scrollIntoView();
			this._isFirstAfterRendering = true;
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this._getScrollContainer(), this._updateScrollingHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this._getScrollContainer(), this._updateScrollingHandler);
	}

	_initSelectedTab() {
		const tabs = this.getTabs();
		const selectedTab = tabs[this._normalizeSelectedIndex(this.selectedIndex)];
		this.setSelectedTab(selectedTab);
	}

	_normalizeSelectedIndex(index) {
		const tabs = this.getTabs();
		const parsedIndex = Number.parseInt(index);

		if (Number.isNaN(parsedIndex)) {
			return 0;
		}
		if (parsedIndex < 0 || parsedIndex > tabs.length - 1) {
			return 0;
		}

		return parsedIndex;
	}

	_prepareHeaderTabs() {
		const items = this.items;
		const tabs = this.getTabs();

		let ariaIndex = 1;
		const length = tabs.length;
		const contentId = `${this._id}-content`;

		const headerItems = [];
		const navigationItems = [];

		items.forEach(tab => {
			if (tab instanceof TabSeparator) {
				headerItems.push({
					isSeparator: true,
				});

				return;
			}

			const isIconColorRead = tab.iconColor === IconColor.Positive
				|| tab.iconColor === IconColor.Critical
				|| tab.iconColor === IconColor.Negative;

			const isHorizontalDesign = tab.design === TabDesignMode.Horizontal;

			let displayText = tab.text;
			if (this._isInline && tab.count) {
				displayText += ` (${tab.count})`;
			}

			const ids = [];

			if (tab.text) {
				ids.push(`${tab._id}-text`);
			}
			if (tab.count) {
				ids.push(`${tab._id}-count`);
			}
			if (tab.icon) {
				ids.push(`${tab._id}-icon`);
			}
			if (isIconColorRead) {
				ids.push(`${tab._id}-iconColor`);
			}

			const labelledbyControls = ids.join(" ");
			const showAll = !this._isNoIcon && !tab.icon;

			const mainClasses = {
				sapMITBItem: true,
				sapMITBSelected: tab._isSelected,
				sapMITBItemNoCount: !tab.count,
				sapMITBHorizontal: isHorizontalDesign,
				sapMITBVertical: !isHorizontalDesign,
				sapMITBAll: showAll,
				sapMITBFilter: !showAll,
				sapMITBDisabled: !!tab.disabled,
			};

			if (isIconColorRead) {
				mainClasses[`sapMITBFilter${tab.iconColor}`] = true;
			}

			const headerItem = {

				id: `${tab._id}-header`,
				_tabIndex: this._navigationItems[ariaIndex - 1]
					? this._navigationItems[ariaIndex - 1]._tabIndex : -1,

				isIconColorRead,
				labelledbyControls,
				displayText,
				isDisabled: tab.disabled ? true : undefined,
				isHorizontalDesign,

				text: tab.text,
				count: tab.count,
				icon: tab.icon,
				iconColor: tab.iconColor,

				isInline: this._isInline,
				isNoIcon: this._isNoIcon,
				isNoText: this._isNoText,
				isInlineOrTextOnly: this._isInline || this._isNoIcon,

				showAll,

				posinset: ariaIndex++,
				setsize: length,
				contentId,
				classes: {
					main: _convertSingleClass(mainClasses),
				},
			};

			headerItems.push(headerItem);
			navigationItems.push(headerItem);
		});

		this._headerItems = headerItems;
		this._navigationItems = navigationItems;
	}

	_prepareOverflowList() {
		if (!this.showOverflow) {
			return;
		}

		const tabs = this.getTabs();
		const listItems = [];

		tabs.forEach(tab => {
			const isIconColorRead = tab.iconColor === IconColor.Positive
				|| tab.iconColor === IconColor.Critical
				|| tab.iconColor === IconColor.Negative;

			let displayText = tab.text;
			if (tab.count) {
				displayText += ` (${tab.count})`;
			}

			const overflowTab = {
				id: `${tab._id}-overflow`,

				isIconColorRead,
				displayText,

				text: tab.text,
				count: tab.count,
				icon: tab.icon,
				iconColor: tab.iconColor,

				_isInline: this._isInline,
				_isNoIcon: this._isNoIcon,
				_isNoText: this._isNoText,
			};

			const listItem = {
				id: tab._id,
				type: tab.disabled ? ListItemType.Inactive : ListItemType.Active,
				selected: tab._isSelected,
				content: overflowTab,
				classes: `sapMITBFilter${tab.iconColor}`,
				innerClasses: tab.disabled ? "sapMITBOverflowItem sapMITBDisabled" : "sapMITBOverflowItem",
			};

			listItems.push(listItem);
		});

		this._overflowList.items = listItems;
	}

	_getScrollContainer() {
		const domRef = this.getDomRef();
		return domRef && domRef.querySelector(".sapMITBScrollContainer");
	}

	_openOverflowList() {
		const popover = this.getDomRef().querySelector("ui5-popover");
		const overflowButton = this.getDomRef().querySelector("ui5-button");

		popover.openBy(overflowButton);
	}

	_overflowItemSelected(event) {
		const pressedItem = event.detail.item;
		const tabs = this.getTabs();
		const selectedTab = tabs.filter(item => item._id === pressedItem.id)[0];

		this.setSelectedTab(selectedTab, true /* user interaction */);

		const popover = this.getDomRef().querySelector("ui5-popover");
		popover.close();

		const headerTab = this.getDomRef().querySelector(`#${pressedItem.id}-header`);
		if (headerTab) {
			headerTab.focus();
		}
	}

	_scrollIntoView() {
		if (!this._scrollable) {
			return;
		}

		const selectedTab = this.getSelectedTab();
		if (!selectedTab) {
			return;
		}

		const scrollContainer = this._getScrollContainer();
		const scrollContainerWidth = scrollContainer.offsetWidth;

		const tabContainerDomRef = this.getDomRef();
		const headerTabDomRef = tabContainerDomRef.querySelector(`#${selectedTab._id}-header`);

		const itemLeft = headerTabDomRef.offsetLeft - scrollContainer.scrollLeft;
		const itemRight = itemLeft + headerTabDomRef.offsetWidth;

		if (itemLeft < 0) {
			scrollContainer.scrollLeft += itemLeft;
		} else if (itemRight > scrollContainerWidth) {
			scrollContainer.scrollLeft += itemRight - scrollContainerWidth;
		}

		this._updateScrolling();
	}

	_updateScrolling() {
		const scrollContainer = this._getScrollContainer();
		if (!scrollContainer) {
			return;
		}

		const scrollContainerContent = scrollContainer.querySelector(".sapMITBHead");

		const scrollContainerWidth = scrollContainer.offsetWidth;
		const scrollContainerContentWidth = scrollContainerContent.offsetWidth;

		if (scrollContainerWidth >= scrollContainerContentWidth) {
			this._scrollable = false;
			this._scrollForward = false;
			this._scrollBack = false;
		} else {
			this._scrollable = true;
			this._scrollForward = scrollContainer.scrollLeft
				+ scrollContainerWidth < scrollContainerContentWidth;
			this._scrollBack = scrollContainer.scrollLeft > 0;
		}
	}

	_scrollLeft() {
		this._scrollEnablement.move(-scrollStep, 0).promise()
			.then(_ => this._updateScrolling());
	}

	_scrollRight() {
		this._scrollEnablement.move(scrollStep, 0).promise()
			.then(_ => this._updateScrolling());
	}

	_findSelectedTab(event) {
		const tabElement = TabContainer._findClosestTab(event.ui5target);
		if (!tabElement) {
			return;
		}

		const tabs = this.getTabs();
		return tabs.filter(item => `${item._id}-header` === tabElement.id)[0];
	}

	setSelectedTab(tab, userInteraction) {
		if (!tab || tab.disabled) {
			return;
		}

		const tabs = this.getTabs();

		if (!tabs.length) {
			return;
		}

		this._selectedContent = tab._state.content.length ? [tab] : this._state.content;

		if (this._selectedTab === tab) {
			if (userInteraction && !this.fixed) {
				this.collapsed = !this.collapsed;
			}
			return;
		}

		if (!this.fixed) {
			this.collapsed = false;
		}

		this.selectedIndex = tabs.indexOf(tab);
		this._itemNavigation.currentIndex = tabs.indexOf(this.selectedIndex);

		this._selectedTab = tab;

		tabs.forEach(item => {
			item._isSelected = item === tab;
		});

		if (userInteraction) {
			this.fireEvent("itemSelect", {
				item: this._selectedTab,
			});
		}

		this._scrollIntoView();
	}

	getSelectedTab() {
		return this._selectedTab;
	}

	getTabs() {
		const items = this.items || [];

		return items.filter(item => item instanceof Tab);
	}

	onkeydown(event) {
		if (isSpace(event) || isEnter(event)) {
			const selectedTab = this._findSelectedTab(event);
			this.setSelectedTab(selectedTab, true);
			event.preventDefault();
		}
	}

	onclick(event) {
		const icon = event.composedPath().filter(element => {
			return element.classList && element.classList.contains("sapMITBArrowScroll");
		})[0];

		if (icon) {
			this._navigationIconPress(icon);
		}

		const selectedTab = this._findSelectedTab(event);
		this.setSelectedTab(selectedTab, true);
	}

	_navigationIconPress(icon) {
		if (icon.classList.contains("sapMITBArrowScrollLeft") || icon.classList.contains("sapMITBArrowScrollLeftTextOnly")) {
			this._leftArrow.onPress();
		} else {
			this._rightArrow.onPress();
		}
	}

	static get calculateTemplateContext() {
		return TabContainerTemplateContext.calculate;
	}

	static async define(...params) {
		await Promise.all([
			Icon.define(),
			Button.define(),
			CustomListItem.define(),
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
