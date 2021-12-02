import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import slideDown from "@ui5/webcomponents-base/dist/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/dist/animations/slideUp.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import { TABCONTAINER_PREVIOUS_ICON_ACC_NAME, TABCONTAINER_NEXT_ICON_ACC_NAME, TABCONTAINER_OVERFLOW_MENU_TITLE } from "./generated/i18n/i18n-defaults.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import List from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TabContainerTabsPlacement from "./types/TabContainerTabsPlacement.js";

// Templates
import TabContainerTemplate from "./generated/templates/TabContainerTemplate.lit.js";
import TabContainerPopoverTemplate from "./generated/templates/TabContainerPopoverTemplate.lit.js";

// Styles
import tabContainerCss from "./generated/themes/TabContainer.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import TabLayout from "./types/TabLayout.js";
import TabsOverflowMode from "./types/TabsOverflowMode.js";

const tabStyles = [];
const staticAreaTabStyles = [];

/**
 * @public
 */
const metadata = {
	tag: "ui5-tabcontainer",
	languageAware: true,
	managedSlots: true,
	slots: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {
		/**
		 * Defines the tabs.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-tab</code> and <code>ui5-tab-separator</code> for the intended design.
		 *
		 * @type {sap.ui.webcomponents.main.ITab[]}
		 * @public
		 * @slot items
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			individualSlots: true,
			invalidateOnChildChange: {
				properties: true,
				slots: false,
			},
		},

		/**
		 * Defines the button which will open the overflow menu. If nothing is provided to this slot, the default button will be used.
		 *
		 * @type {sap.ui.webcomponents.main.IButton}
		 * @public
		 * @slot
		 * @since 1.0.0-rc.9
		 */
		overflowButton: {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {
		/**
		 * Defines whether the tabs are in a fixed state that is not
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
		 * Defines whether the tab content is collapsed.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		collapsed: {
			type: Boolean,
		},

		/**
		 * Defines the placement of the tab strip (tab buttons area) relative to the actual tabs' content.
		 * <br><br>
		 * <b>Note:</b> By default the tab strip is displayed above the tabs' content area and this is the recommended
		 * layout for most scenarios. Set to <code>Bottom</code> only when the component is at the
		 * bottom of the page and you want the tab strip to act as a menu.
		 *
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Top</code></li>
		 * <li><code>Bottom</code></li>
		 * </ul>
		 *
		 * @type {TabContainerTabsPlacement}
		 * @defaultvalue "Top"
		 * @since 1.0.0-rc.7
		 * @private
		 */
		tabsPlacement: {
			type: TabContainerTabsPlacement,
			defaultValue: TabContainerTabsPlacement.Top,
		},

		/**
		 * Defines whether the overflow select list is displayed.
		 * <br><br>
		 * The overflow select list represents a list, where all tab filters are displayed
		 * so that it's easier for the user to select a specific tab filter.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		showOverflow: {
			type: Boolean,
		},

		/**
		 * Defines the alignment of the content and the <code>additionalText</code> of a tab.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * The content and the <code>additionalText</code> would be displayed vertically by defualt,
		 * but when set to <code>Inline</code>, they would be displayed horizontally.
		 *
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Standard</code></li>
		 * <li><code>Inline</code></li>
		 * </ul>
		 *
		 * @type {TabLayout}
		 * @defaultvalue "Standard"
		 * @public
		 */
		tabLayout: {
			type: String,
			defaultValue: TabLayout.Standard,
		},

		/**
		 * Defines the overflow mode of the tab strip.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * Only one overflow  at the end would be displayed by default,
		 * but when set to <code>StartAndEnd</code>, there will be two overflows on both ends.
		 *
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Standard</code></li>
		 * <li><code>Inline</code></li>
		 * </ul>
		 *
		 * @type {TabsOverflowMode}
		 * @defaultvalue "End"
		 * @public
		 */
		tabsOverflowMode: {
			type: String,
			defaultValue: TabsOverflowMode.End,
		},

		/**
		 * Defines the current media query size.
		 *
		 * @type {string}
		 * @private
		 */
		mediaRange: {
			type: String,
		},

		_selectedTab: {
			type: Object,
		},

		_animationRunning: {
			type: Boolean,
			noAttribute: true,
		},

		_contentCollapsed: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {

		/**
		 * Fired when a tab is selected.
		 *
		 * @event sap.ui.webcomponents.main.TabContainer#tab-select
		 * @param {HTMLElement} tab The selected <code>tab</code>.
		 * @param {Integer} tabIndex The selected <code>tab</code> index.
		 * @public
		 */
		"tab-select": {
			detail: {
				tab: { type: HTMLElement },
				tabIndex: { type: Number },
			},
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
 * <h3>ES6 Module Import</h3>
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
		return [tabStyles, tabContainerCss];
	}

	static get staticAreaStyles() {
		return [ResponsivePopoverCommonCss, staticAreaTabStyles];
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return TabContainerTemplate;
	}

	static get staticAreaTemplate() {
		return TabContainerPopoverTemplate;
	}

	static registerTabStyles(styles) {
		tabStyles.push(styles);
	}

	static registerStaticAreaTabStyles(styles) {
		staticAreaTabStyles.push(styles);
	}

	constructor() {
		super();

		this._handleResize = this._handleResize.bind(this);

		// Init ItemNavigation
		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this._getTabs(),
		});
	}

	onBeforeRendering() {
		// update selected tab
		const tabs = this._getTabs();
		if (tabs.length) {
			const selectedTabs = this._getTabs().filter(tab => tab.selected);
			if (selectedTabs.length) {
				this._selectedTab = selectedTabs[0];
			} else {
				this._selectedTab = tabs[0];
				this._selectedTab.selected = true;
			}
		}

		// Set external properties to items
		this.items.filter(item => !item.isSeparator).forEach((item, index, arr) => {
			item._isInline = this.tabLayout === TabLayout.Inline;
			item._mixedMode = this.mixedMode;
			item._posinset = index + 1;
			item._setsize = arr.length;
			item._getTabContainerHeaderItemCallback = _ => {
				return this.getDomRef().querySelector(`#${item._id}`);
			};
			item._itemSelectCallback = this._onItemSelect.bind(this);
			item._getRealDomRef = () => this.getDomRef().querySelector(`*[data-ui5-stable=${item.stableDomRef}]`);
		});

		if (!this._animationRunning) {
			this._contentCollapsed = this.collapsed;
		}
	}

	onAfterRendering() {
		this.items.forEach(item => {
			item._getTabInStripDomRef = this.getDomRef().querySelector(`*[data-ui5-stable="${item.stableDomRef}"]`);
		});
	}

	onEnterDOM() {
		ResizeHandler.register(this._getHeader(), this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this._getHeader(), this._handleResize);
	}

	_onHeaderClick(event) {
		const tab = getTab(event.target);
		if (!tab) {
			return;
		}

		this._onHeaderItemSelect(tab);
	}

	_onHeaderKeyDown(event) {
		const tab = getTab(event.target);
		if (!tab) {
			return;
		}

		if (isEnter(event)) {
			this._onHeaderItemSelect(tab);
		}

		// Prevent Scrolling
		if (isSpace(event)) {
			event.preventDefault();
		}
	}

	_onHeaderKeyUp(event) {
		const tab = getTab(event.target);
		if (!tab) {
			return;
		}

		if (isSpace(event)) {
			this._onHeaderItemSelect(tab);
		}
	}

	_onHeaderItemSelect(tab) {
		if (!tab.hasAttribute("disabled")) {
			this._onItemSelect(tab);
		}
	}

	_onOverflowListItemSelect(event) {
		this._onItemSelect(event.detail.item);
		this.responsivePopover.close();
		this.shadowRoot.querySelector(`#${event.detail.item.id}`).focus();
	}

	_onItemSelect(target) {
		const selectedIndex = findIndex(this.items, item => item._id === target.id);
		const selectedTabIndex = findIndex(this._getTabs(), item => item._id === target.id);
		const selectedTab = this.items[selectedIndex];

		// update selected items
		this.items.forEach((item, index) => {
			if (!item.isSeparator) {
				const selected = selectedIndex === index;
				item.selected = selected;

				if (selected) {
					this._itemNavigation.setCurrentItem(item);
				}
			}
		}, this);

		if (this.fixed) {
			this.selectTab(selectedTab, selectedTabIndex);
			return;
		}

		if (!this.animate) {
			this.toggle(selectedTab);
			this.selectTab(selectedTab, selectedTabIndex);
			return;
		}

		this.toggleAnimated(selectedTab);
		this.selectTab(selectedTab, selectedTabIndex);
	}

	async toggleAnimated(selectedTab) {
		const content = this.shadowRoot.querySelector(".ui5-tc__content");
		let animationPromise = null;

		this._animationRunning = true;

		if (selectedTab === this._selectedTab) {
			// click on already selected tab - animate both directions
			this.collapsed = !this.collapsed;
			animationPromise = this.collapsed ? this.slideContentUp(content) : this.slideContentDown(content);
		} else {
			// click on new tab - animate if the content is currently collapsed
			animationPromise = this.collapsed ? this.slideContentDown(content) : Promise.resolve();
			this.collapsed = false;
		}

		await animationPromise;
		this._contentCollapsed = this.collapsed;
		this._animationRunning = false;
	}

	toggle(selectedTab) {
		if (selectedTab === this._selectedTab) {
			this.collapsed = !this.collapsed;
		} else {
			this.collapsed = false;
		}
	}

	selectTab(selectedTab, selectedTabIndex) {
		// select the tab
		this._selectedTab = selectedTab;
		this.fireEvent("tab-select", {
			tab: selectedTab,
			tabIndex: selectedTabIndex,
		});
	}

	slideContentDown(element) {
		return slideDown({ element }).promise();
	}

	slideContentUp(element) {
		return slideUp({ element }).promise();
	}

	async _onOverflowButtonClick(event) {
		const button = this.overflowButton[0] || this.getDomRef().querySelector(".ui5-tc__overflowButton > [ui5-button]");

		if (event.target !== button) {
			return;
		}

		this.responsivePopover = await this._respPopover();
		if (this.responsivePopover.opened) {
			this.responsivePopover.close();
		} else {
			this.responsivePopover.showAt(button);
		}
	}

	_handleResize() {
		this._updateMediaRange();
		this._setItemsForStrip();
	}

	_setItemsForStrip() {
		const headerScrollContainer = this._getHeaderScrollContainer();
		const endOverflowButton = this._getHeaderOverflowButton();
		let allItemsWidth = 0;

		if (!this._selectedTab) {
			return;
		}

		const itemsDomRefs = this.items.map(function (item) { return item.getTabInStripDomRef(); });

		// make sure the end overflow is hidden
		endOverflowButton.setAttribute("hidden", "");

		// show all tabs
		for (let i = 0; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].removeAttribute("hidden");
		}

		itemsDomRefs.forEach(item => {
			allItemsWidth += this._getItemWidth(item);
		});

		let showEndOverflow = headerScrollContainer.offsetWidth < allItemsWidth;

		if (showEndOverflow) {
			this._updateEndOverflow(itemsDomRefs);
		} else {
			this._closeRespPopover();
		}
	}

	_updateEndOverflow(itemsDomRefs) {
		// show end overflow button
		this._getHeaderOverflowButton().removeAttribute("hidden");

		const selectedTabDomRef = this._selectedTab.getTabInStripDomRef();
		const containerWidth = this._getHeaderScrollContainer().offsetWidth;

		const selectedItemIndexAndWidth = this._getSelectedItemIndexAndWidth(itemsDomRefs, selectedTabDomRef);
		const lastVisibleTabIndex = this._findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width);

		for (let i = lastVisibleTabIndex + 1; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].setAttribute("hidden", "");
		}
	}

	_getItemWidth(itemDomRef) {
		const styles = window.getComputedStyle(itemDomRef);
		const margins = Number.parseInt(styles.marginLeft) + Number.parseInt(styles.marginRight);

		return itemDomRef.offsetWidth + margins;
	}

	_getSelectedItemIndexAndWidth(itemsDomRefs, selectedTabDomRef) {
		const index = itemsDomRefs.indexOf(selectedTabDomRef);
		let width = selectedTabDomRef.offsetWidth;
		let selectedSeparator;

		if (itemsDomRefs[index - 1] && itemsDomRefs[index - 1].classList.contains("ui5-tc__separator")) {
			selectedSeparator = itemsDomRefs[index - 1];
			width += this._getItemWidth(selectedSeparator);
		}

		itemsDomRefs.splice(index, 1);

		// if previous item is a separator - remove it
		if (selectedSeparator) {
			itemsDomRefs.splice(index - 1, 1);
		}

		return {
			index: index,
			width: width
		};
	}

	_findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemWidth, startIndex) {
		startIndex = startIndex || 0;

		let lastVisibleIndex = -1;
		let index = startIndex;

		for (; index < itemsDomRefs.length; index++) {
			let itemWidth = this._getItemWidth(itemsDomRefs[index]);

			if (containerWidth < selectedItemWidth + itemWidth) {
				break;
			}

			selectedItemWidth += itemWidth;
			lastVisibleIndex = index;
		}

		// if prev item is separator - hide it
		let prevItem = itemsDomRefs[index - 1];
		if (prevItem && prevItem.classList.contains("ui5-tc__separator")) {
			lastVisibleIndex -= 1;
		}

		return lastVisibleIndex;
	}

	async _closeRespPopover() {
		this.responsivePopover = await this._respPopover();
		this.responsivePopover.close();
	}

	_updateMediaRange() {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
	}

	_getHeader() {
		return this.shadowRoot.querySelector(`#${this._id}-header`);
	}

	_getTabs() {
		return this.items.filter(item => !item.isSeparator);
	}

	_getHeaderScrollContainer() {
		return this.shadowRoot.querySelector(`#${this._id}-headerScrollContainer`);
	}

	_getHeaderOverflowButton() {
		return this.shadowRoot.querySelector(".ui5-tc__overflowButton");
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(`#${this._id}-overflowMenu`);
	}

	get classes() {
		return {
			root: {
				"ui5-tc-root": true,
				"ui5-tc--textOnly": this.textOnly,
				"ui5-tc--withAdditonalText": this.withAdditonalText,
				"ui5-tc--standardTabLayout": this.standardTabLayout,
			},
			header: {
				"ui5-tc__header": true,
			},
			headerInnerContainer: {
				"ui5-tc__headerInnerContainer": true,
			},
			headerScrollContainer: {
				"ui5-tc__headerScrollContainer": true,
			},
			headerList: {
				"ui5-tc__headerList": true,
			},
			separator: {
				"ui5-tc__separator": true,
			},
			content: {
				"ui5-tc__content": true,
				"ui5-tc__content--collapsed": this._contentCollapsed,
			},
		};
	}

	get mixedMode() {
		return this.items.some(item => item.icon) && this.items.some(item => item.text);
	}

	get textOnly() {
		return this.items.every(item => !item.icon);
	}

	get withAdditonalText() {
		return this.items.some(item => !!item.additionalText);
	}

	get standardTabLayout() {
		return this.tabLayout === TabLayout.Standard;
	}

	get previousIconACCName() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_PREVIOUS_ICON_ACC_NAME);
	}

	get nextIconACCName() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_NEXT_ICON_ACC_NAME);
	}

	get overflowMenuTitle() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_OVERFLOW_MENU_TITLE);
	}

	get tabsAtTheBottom() {
		return this.tabsPlacement === TabContainerTabsPlacement.Bottom;
	}

	get overflowMenuIcon() {
		return this.tabsAtTheBottom ? "slim-arrow-up" : "slim-arrow-down";
	}

	get animate() {
		return getAnimationMode() !== AnimationMode.None;
	}

	static get dependencies() {
		return [
			Button,
			Icon,
			List,
			ResponsivePopover,
		];
	}

	static async onDefine() {
		TabContainer.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

const isTabLi = el => el.localName === "li" && el.getAttribute("role") === "tab";

const getTab = el => {
	while (el) {
		if (isTabLi(el)) {
			return el;
		}

		el = el.parentElement;
	}

	return false;
};

const findIndex = (arr, predicate) => {
	for (let i = 0; i < arr.length; i++) {
		const result = predicate(arr[i]);

		if (result) {
			return i;
		}
	}

	return -1;
};

TabContainer.define();

export default TabContainer;
