import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import slideDown from "@ui5/webcomponents-base/dist/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/dist/animations/slideUp.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import {
	isSpace,
	isEnter,
	isDown,
	isRight,
	isLeft,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import {
	TABCONTAINER_PREVIOUS_ICON_ACC_NAME,
	TABCONTAINER_NEXT_ICON_ACC_NAME,
	TABCONTAINER_OVERFLOW_MENU_TITLE,
	TABCONTAINER_END_OVERFLOW,
	TABCONTAINER_POPOVER_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import List from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TabContainerTabsPlacement from "./types/TabContainerTabsPlacement.js";
import SemanticColor from "./types/SemanticColor.js";

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

const PAGE_UP_DOWN_SIZE = 5;

/**
 * @public
 */
const metadata = {
	tag: "ui5-tabcontainer",
	languageAware: true,
	managedSlots: true,
	fastNavigation: true,
	slots: /** @lends sap.ui.webcomponents.main.TabContainer.prototype */ {
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
		 * Defines the button which will open the overflow menu. If nothing is provided to this slot,
		 * the default button will be used.
		 *
		 * @type {sap.ui.webcomponents.main.IButton}
		 * @public
		 * @slot
		 * @since 1.0.0-rc.9
		 */
		overflowButton: {
			type: HTMLElement,
		},

		/**
		 * Defines the button which will open the start overflow menu if available. If nothing is provided to this slot,
		 * the default button will be used.
		 *
		 * @type {sap.ui.webcomponents.main.IButton}
		 * @public
		 * @slot
		 * @since 1.1.0
		 */
		startOverflowButton: {
			type: HTMLElement,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.TabContainer.prototype */ {
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
		 * Defines the placement of the tab strip relative to the actual tabs' content.
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
		 * @type {sap.ui.webcomponents.main.types.TabContainerTabsPlacement}
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
		 * The overflow select list represents a list, where all tabs are displayed
		 * so that it's easier for the user to select a specific tab.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @deprecated Since the introduction of TabsOverflowMode, overflows will always be visible if there is not enough space for all tabs,
		 * all hidden tabs are moved to a select list in the respective overflows and are accessible via the <code>overflowButton</code> and / or <code>startOverflowButton</code> slots.
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
		 * @type {sap.ui.webcomponents.main.types.TabLayout}
		 * @defaultvalue "Standard"
		 * @public
		 */
		tabLayout: {
			type: String,
			defaultValue: TabLayout.Standard,
		},

		/**
		 * Defines the overflow mode of the tab strip. If you have a large number of tabs, only the tabs that can fit on screen will be visible.
		 * All other tabs that can 't fit on the screen are available in an overflow tab "More".
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * Only one overflow at the end would be displayed by default,
		 * but when set to <code>StartAndEnd</code>, there will be two overflows on both ends, and tab order will not change on tab selection.
		 *
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>End</code></li>
		 * <li><code>StartAndEnd</code></li>
		 * </ul>
		 *
		 * @type {sap.ui.webcomponents.main.types.TabsOverflowMode}
		 * @defaultvalue "End"
		 * @since 1.1.0
		 * @public
		 */
		tabsOverflowMode: {
			type: TabsOverflowMode,
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

		_startOverflowText: {
			type: String,
			noAttribute: true,
			defaultValue: "0",
		},

		_endOverflowText: {
			type: String,
			noAttribute: true,
			defaultValue: "More",
		},

		_overflowItems: {
			type: Object,
			multiple: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.TabContainer.prototype */ {

		/**
		 * Fired when a tab is selected.
		 *
		 * @event sap.ui.webcomponents.main.TabContainer#tab-select
		 * @param {HTMLElement} tab The selected <code>tab</code>.
		 * @param {Integer} tabIndex The selected <code>tab</code> index in the flattened array of all tabs and their subTabs, provided by the <code>allItems</code> getter.
		 * @public
		 * @allowPreventDefault
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
 * <li><code>ui5-tab-separator</code> - used to separate tabs with a line</li>
 * </ul>
 *
 * <h3>Hierarchies</h3>
 * Multiple sub tabs could be placed underneath one main tab. Nesting allows deeper hierarchies with indentations
 * to indicate the level of each nested tab. When a tab has both sub tabs and own content its click area is split
 * to allow the user to display the content or alternatively to expand / collapse the list of sub tabs.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-tabcontainer</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>content - Used to style the content of the component</li>
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
			getItemsCallback: () => this._getFocusableRefs(),
			skipItemsSize: PAGE_UP_DOWN_SIZE,
		});
	}

	onBeforeRendering() {
		this._allItemsAndSubItems = this._getAllSubItems(this.items);
		if (!this._allItemsAndSubItems.length) {
			return;
		}

		// update selected tab
		const selectedTabs = this._allItemsAndSubItems.filter(tab => tab.selected);
		if (selectedTabs.length) {
			this._selectedTab = selectedTabs[0];
		} else {
			this._selectedTab = this._allItemsAndSubItems[0];
			this._selectedTab._selected = true;
		}

		this._setItemsPrivateProperties(this.items);

		if (!this._animationRunning) {
			this._contentCollapsed = this.collapsed;
		}

		if (this.showOverflow) {
			console.warn(`The "show-overflow" property is deprecated and will be removed in a future release.`); // eslint-disable-line
		}
	}

	onAfterRendering() {
		if (!this.items.length) {
			return;
		}

		this._setItemsForStrip();

		if (!this.shadowRoot.contains(document.activeElement)) {
			const focusStart = this._getRootTab(this._selectedTab);
			this._itemNavigation.setCurrentItem(focusStart);
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this._getHeader(), this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this._getHeader(), this._handleResize);
	}

	async _handleResize() {
		if (this.responsivePopover && this.responsivePopover.opened) {
			this.responsivePopover.close();
		}
		this._updateMediaRange();

		await renderFinished(); // await the tab container to have rendered its representation of tabs
		this._setItemsForStrip();
	}

	_updateMediaRange() {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
	}

	_setItemsPrivateProperties(items) {
		// set real dom ref to all items, then return only the tabs for further processing
		const allTabs = items.filter(item => {
			item._getElementInStrip = () => this.getDomRef().querySelector(`*[data-ui5-stable=${item.stableDomRef}]`);
			return !item.isSeparator;
		});

		allTabs.forEach((tab, index, arr) => {
			tab._isInline = this.tabLayout === TabLayout.Inline;
			tab._mixedMode = this.mixedMode;
			tab._posinset = index + 1;
			tab._setsize = arr.length;
			tab._realTab = this._selectedTab;
			tab._isTopLevelTab = items.some(i => i === tab);
			walk(items, _tab => {
				_tab._realTab = tab._realTab;
			});
		});
	}

	_onHeaderFocusin(event) {
		let target = event.target;

		const tab = getTab(target);
		if (tab) {
			target = tab._realTab;
		}

		this._itemNavigation.setCurrentItem(target);
	}

	async _onTabStripClick(event) {
		const tab = getTab(event.target);
		if (!tab || tab._realTab.disabled) {
			return;
		}

		event.stopPropagation();
		event.preventDefault();
		if (event.target.hasAttribute("ui5-button")) {
			this._onTabExpandButtonClick(event);
			return;
		}

		if (!tab._realTab._hasOwnContent && tab._realTab.tabs.length) {
			this._overflowItems = tab._realTab.subTabs;
			this._addStyleIndent(this._overflowItems);

			this.responsivePopover = await this._respPopover();
			if (this.responsivePopover.opened) {
				this.responsivePopover.close();
			} else {
				this._setPopoverInitialFocus();
			}

			this.responsivePopover.showAt(tab._realTab.getTabInStripDomRef());
			return;
		}
		this._onHeaderItemSelect(tab);
	}

	async _onTabExpandButtonClick(event) {
		event.stopPropagation();
		event.preventDefault();
		let button = event.target;
		let tabInstance = button.tab;

		if (tabInstance) {
			tabInstance.focus();
		}

		if ((event.type === "keydown") && !event.target._realTab.isSingleClickArea) {
			button = event.target.querySelectorAll(".ui5-tab-expand-button")[0];
			tabInstance = event.target._realTab;
		}

		// if clicked between the expand button and the tab
		if (!tabInstance) {
			this._onHeaderItemSelect(button.parentElement);
			return;
		}

		this._overflowItems = tabInstance.subTabs;
		this._addStyleIndent(this._overflowItems);

		this.responsivePopover = await this._respPopover();
		if (this.responsivePopover.isOpen()) {
			this.responsivePopover.close();
		} else {
			this._setPopoverInitialFocus();
		}
		this.responsivePopover.showAt(button);
	}

	async _setPopoverInitialFocus() {
		const selectedTabInOverflow = this._getSelectedTabInOverflow();
		const tab = selectedTabInOverflow || this._getFirstFocusableItemInOverflow();

		this.responsivePopover.initialFocus = `${tab._realTab._id}-li`;
	}

	_getSelectedTabInOverflow() {
		return this.responsivePopover.content[0].items.find(item => (item._realTab && item._realTab.selected));
	}

	_getFirstFocusableItemInOverflow() {
		return this.responsivePopover.content[0].items.find(item => item.classList.contains("ui5-tab-overflow-item"));
	}

	_onTabStripKeyDown(event) {
		const tab = getTab(event.target);
		if (!tab || tab._realTab.disabled) {
			return;
		}

		if (isEnter(event)) {
			if (tab._realTab.isSingleClickArea) {
				this._onTabStripClick(event);
			} else {
				this._onHeaderItemSelect(tab);
			}
		}

		if (isSpace(event)) {
			event.preventDefault(); // prevent scrolling
		}

		if (isDown(event) || isUp(event)) {
			if (tab._realTab.requiresExpandButton) {
				this._onTabExpandButtonClick(event);
			}
			if (tab._realTab.isSingleClickArea) {
				this._onTabStripClick(event);
			}
		}
	}

	_onTabStripKeyUp(event) {
		const tab = getTab(event.target);
		if (!tab || tab._realTab.disabled) {
			return;
		}

		if (isSpace(event)) {
			event.preventDefault();
			if (tab._realTab.isSingleClickArea) {
				this._onTabStripClick(event);
			} else {
				this._onHeaderItemSelect(tab);
			}
		}
	}

	_onHeaderItemSelect(tab) {
		if (!tab.hasAttribute("disabled")) {
			this._onItemSelect(tab.id);
		}
	}

	async _onOverflowListItemClick(event) {
		event.preventDefault(); // cancel the item selection

		this._onItemSelect(event.detail.item.id.slice(0, -3)); // strip "-li" from end of id

		this.responsivePopover.close();
		await renderFinished();

		const selectedTopLevel = this._getRootTab(this._selectedTab);
		selectedTopLevel.getTabInStripDomRef().focus();
	}

	/**
	 * Returns all slotted tabs and their subTabs in a flattened array.
	 * The order of tabs is depth-first. For example, given the following slotted elements:
	 * <code>
	 * 	<ui5-tabcontainer>
	 * 		<ui5-tab id="First">
	 * 			...
	 * 			<ui5-tab slot="subTabs" id="Nested">...</ui5-tab>
	 * 		</ui5-tab>
	 * 		<ui5-tab id="Second">...</ui5-tab>
	 * 		<ui5-tab-separator id="sep"></ui5-tab-separator>
	 * 		<ui5-tab id="Third">...</ui5-tab>
	 * 	</ui5-tabcontainer>
	 * </code>
	 * Calling <code>allItems</code> on this TabContainer will return the instances in the following order:
	 * <code>[ ui5-tab#First, ui5-tab#Nested, ui5-tab#Second, ui5-tab-separator#sep, ui5-tab#Third ]</code>
	 * @public
	 * @readonly
	 *
	 * @returns {sap.ui.webcomponents.main.ITab[]}
	 */
	get allItems() {
		return this._getAllSubItems(this.items);
	}

	_getAllSubItems(items, result = [], level = 1) {
		items.forEach(item => {
			if (item.hasAttribute("ui5-tab") || item.hasAttribute("ui5-tab-separator")) {
				item._level = level;
				result.push(item);
				if (item.subTabs) {
					this._getAllSubItems(item.subTabs, result, level + 1);
				}
			}
		});
		return result;
	}

	_onItemSelect(selectedTabId) {
		const previousTab = this._selectedTab;
		const selectedTabIndex = this._allItemsAndSubItems.findIndex(item => item.__id === selectedTabId);
		const selectedTab = this._allItemsAndSubItems[selectedTabIndex];

		const selectionSuccessful = this.selectTab(selectedTab, selectedTabIndex);
		if (!selectionSuccessful) {
			return;
		}

		// update selected property on all items
		this._allItemsAndSubItems.forEach((item, index) => {
			const selected = selectedTabIndex === index;
			item.selected = selected;

			if (item._selected) {
				item._selected = false;
			}
		});

		if (this.fixed) {
			return;
		}

		if (!this.animate) {
			this.toggle(selectedTab, previousTab);
		} else {
			this.toggleAnimated(selectedTab, previousTab);
		}
	}

	async toggleAnimated(selectedTab, previousTab) {
		const content = this.shadowRoot.querySelector(".ui5-tc__content");
		let animationPromise = null;

		this._animationRunning = true;

		if (selectedTab === previousTab) {
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

	toggle(selectedTab, previousTab) {
		if (selectedTab === previousTab) {
			this.collapsed = !this.collapsed;
		} else {
			this.collapsed = false;
		}
	}

	/**
	 * Fires the <code>tab-select</code> event and changes the internal reference for the currently selected tab.
	 * If the event is prevented, the current tab is not changed.
	 * @private
	 *
	 * @param {object} selectedTab selected tab instance
	 * @param {number} selectedTabIndex selected tab index for an array containing all tabs and sub tabs. <b>Note:</b> Use the method <code>allTabs</code> to get this array.
	 * @returns {boolean} true if the tab selection is successful, false if it was prevented
	 */
	selectTab(selectedTab, selectedTabIndex) {
		if (!this.fireEvent("tab-select", { tab: selectedTab, tabIndex: selectedTabIndex }, true)) {
			return false;
		}

		// select the tab
		this._selectedTab = selectedTab;
		return true;
	}

	slideContentDown(element) {
		return slideDown({ element }).promise();
	}

	slideContentUp(element) {
		return slideUp({ element }).promise();
	}

	async _onOverflowClick(event) {
		if (event.target.classList.contains("ui5-tc__overflow")) {
			// the empty area in the overflow was clicked
			return;
		}

		const overflow = event.currentTarget;
		const isEndOverflow = overflow.classList.contains("ui5-tc__overflow--end");
		const isStartOverflow = overflow.classList.contains("ui5-tc__overflow--start");
		const overflowAttr = isEndOverflow ? "end-overflow" : "start-overflow";

		this._overflowItems = this.items.filter(item => {
			const stripRef = item.getTabInStripDomRef();

			return stripRef && stripRef.hasAttribute(overflowAttr);
		});

		this._addStyleIndent(this._overflowItems);

		let opener;
		if (isEndOverflow) {
			opener = this.overflowButton[0] || this._getEndOverflowBtnDOM();
		}

		if (isStartOverflow) {
			opener = this.startOverflowButton[0] || this._getStartOverflowBtnDOM();
		}

		this.responsivePopover = await this._respPopover();
		if (this.responsivePopover.opened) {
			this.responsivePopover.close();
		} else {
			this._setPopoverInitialFocus();
			this.responsivePopover.showAt(opener);
		}
	}

	_addStyleIndent(tabs) {
		const extraIndent = this._getAllSubItems(tabs)
			.filter(tab => !tab.isSeparator)
			.some(tab => tab.design !== SemanticColor.Default && tab.design !== SemanticColor.Neutral);

		walk(tabs, tab => {
			let level = tab._level - 1;

			if (tab.isSeparator) {
				level += 1;
			}

			tab._style = {
				"--_ui5-tab-indentation-level": level,
				"--_ui5-tab-extra-indent": extraIndent ? 1 : null,
			};
		});
	}

	async _onOverflowKeyDown(event) {
		const overflow = event.currentTarget;
		const isEndOverflow = overflow.classList.contains("ui5-tc__overflow--end");
		const isStartOverflow = overflow.classList.contains("ui5-tc__overflow--start");

		if (isDown(event) || (isStartOverflow && isLeft(event)) || (isEndOverflow && isRight(event))) {
			event.stopPropagation();
			event.preventDefault();
			await this._onOverflowClick(event);
		}
	}

	_setItemsForStrip() {
		const tabStrip = this._getTabStrip();
		let allItemsWidth = 0;

		if (!this._selectedTab) {
			return;
		}

		const itemsDomRefs = this.items.map(item => item.getTabInStripDomRef());

		// make sure the overflows are hidden
		this._getStartOverflow().setAttribute("hidden", "");
		this._getEndOverflow().setAttribute("hidden", "");

		// show all tabs
		for (let i = 0; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].removeAttribute("hidden");
			itemsDomRefs[i].removeAttribute("start-overflow");
			itemsDomRefs[i].removeAttribute("end-overflow");
		}

		itemsDomRefs.forEach(item => {
			allItemsWidth += this._getItemWidth(item);
		});

		const hasOverflow = tabStrip.offsetWidth < allItemsWidth;
		if (!hasOverflow) {
			return;
		}

		if (this.isModeStartAndEnd) {
			this._updateStartAndEndOverflow(itemsDomRefs);
			this._updateOverflowCounters();
		} else {
			this._updateEndOverflow(itemsDomRefs);
		}
	}

	_getRootTab(tab) {
		while (tab.hasAttribute("ui5-tab")) {
			if (tab.parentElement.hasAttribute("ui5-tabcontainer")) {
				break;
			}
			tab = tab.parentElement;
		}
		return tab;
	}

	_updateEndOverflow(itemsDomRefs) {
		// show end overflow
		this._getEndOverflow().removeAttribute("hidden");
		const selectedTab = this._getRootTab(this._selectedTab);
		const selectedTabDomRef = selectedTab.getTabInStripDomRef();
		const containerWidth = this._getTabStrip().offsetWidth;

		const selectedItemIndexAndWidth = this._getSelectedItemIndexAndWidth(itemsDomRefs, selectedTabDomRef);
		const lastVisibleTabIndex = this._findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width);

		for (let i = lastVisibleTabIndex + 1; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].setAttribute("hidden", "");
			itemsDomRefs[i].setAttribute("end-overflow", "");
		}

		this._endOverflowText = this.overflowButtonText;
	}

	_updateStartAndEndOverflow(itemsDomRefs) {
		let containerWidth = this._getTabStrip().offsetWidth;
		const selectedTab = this._getRootTab(this._selectedTab);
		const selectedTabDomRef = selectedTab.getTabInStripDomRef();
		const selectedItemIndexAndWidth = this._getSelectedItemIndexAndWidth(itemsDomRefs, selectedTabDomRef);
		const hasStartOverflow = this._hasStartOverflow(containerWidth, itemsDomRefs, selectedItemIndexAndWidth);
		const hasEndOverflow = this._hasEndOverflow(containerWidth, itemsDomRefs, selectedItemIndexAndWidth);
		let firstVisible;
		let lastVisible;

		// has "end", but no "start" overflow
		if (!hasStartOverflow) {
			// show "end" overflow
			this._getEndOverflow().removeAttribute("hidden");
			// width is changed
			containerWidth = this._getTabStrip().offsetWidth;

			lastVisible = this._findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width);

			for (let i = lastVisible + 1; i < itemsDomRefs.length; i++) {
				itemsDomRefs[i].setAttribute("hidden", "");
				itemsDomRefs[i].setAttribute("end-overflow", "");
			}

			return;
		}

		// has "start", but no "end" overflow
		if (!hasEndOverflow) {
			// show "start" overflow
			this._getStartOverflow().removeAttribute("hidden");
			// width is changed
			containerWidth = this._getTabStrip().offsetWidth;

			firstVisible = this._findFirstVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width);

			for (let i = firstVisible - 1; i >= 0; i--) {
				itemsDomRefs[i].setAttribute("hidden", "");
				itemsDomRefs[i].setAttribute("start-overflow", "");
			}

			return;
		}

		// show "start" overflow
		this._getStartOverflow().removeAttribute("hidden");
		// show "end" overflow
		this._getEndOverflow().removeAttribute("hidden");
		// width is changed
		containerWidth = this._getTabStrip().offsetWidth;

		firstVisible = this._findFirstVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width, selectedItemIndexAndWidth.index - 1);
		lastVisible = this._findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemIndexAndWidth.width, firstVisible);

		for (let i = firstVisible - 1; i >= 0; i--) {
			itemsDomRefs[i].setAttribute("hidden", "");
			itemsDomRefs[i].setAttribute("start-overflow", "");
		}

		for (let i = lastVisible + 1; i < itemsDomRefs.length; i++) {
			itemsDomRefs[i].setAttribute("hidden", "");
			itemsDomRefs[i].setAttribute("end-overflow", "");
		}
	}

	_hasStartOverflow(containerWidth, itemsDomRefs, selectedItemIndexAndWidth) {
		if (selectedItemIndexAndWidth.index === 0) {
			return false;
		}

		let leftItemsWidth = 0;

		for (let i = selectedItemIndexAndWidth.index - 1; i >= 0; i--) {
			leftItemsWidth += this._getItemWidth(itemsDomRefs[i]);
		}

		let hasStartOverflow = containerWidth < leftItemsWidth + selectedItemIndexAndWidth.width;

		// if there is no "start" overflow, it has "end" overflow
		// check it again with the "end" overflow
		if (!hasStartOverflow) {
			this._getEndOverflow().removeAttribute("hidden");
			containerWidth = this._getTabStrip().offsetWidth;
			hasStartOverflow = containerWidth < leftItemsWidth + selectedItemIndexAndWidth.width;
			this._getEndOverflow().setAttribute("hidden", "");
		}

		return hasStartOverflow;
	}

	_hasEndOverflow(containerWidth, itemsDomRefs, selectedItemIndexAndWidth) {
		if (selectedItemIndexAndWidth.index >= itemsDomRefs.length) {
			return false;
		}

		let rightItemsWidth = 0;

		for (let i = selectedItemIndexAndWidth.index; i < itemsDomRefs.length; i++) {
			rightItemsWidth += this._getItemWidth(itemsDomRefs[i]);
		}

		let hasEndOverflow = containerWidth < rightItemsWidth + selectedItemIndexAndWidth.width;

		// if there is no "end" overflow, it has "start" overflow
		// check it again with the "start" overflow
		if (!hasEndOverflow) {
			this._getStartOverflow().removeAttribute("hidden");
			containerWidth = this._getTabStrip().offsetWidth;
			hasEndOverflow = containerWidth < rightItemsWidth + selectedItemIndexAndWidth.width;
			this._getStartOverflow().setAttribute("hidden", "");
		}

		return hasEndOverflow;
	}

	_getItemWidth(itemDomRef) {
		const styles = window.getComputedStyle(itemDomRef);
		const margins = Number.parseInt(styles.marginLeft) + Number.parseInt(styles.marginRight);

		return itemDomRef.offsetWidth + margins;
	}

	_getSelectedItemIndexAndWidth(itemsDomRefs, selectedTabDomRef) {
		let index = itemsDomRefs.indexOf(selectedTabDomRef);
		let width = selectedTabDomRef.offsetWidth;
		let selectedSeparator;

		if (itemsDomRefs[index - 1] && itemsDomRefs[index - 1].isSeparator) {
			selectedSeparator = itemsDomRefs[index - 1];
			width += this._getItemWidth(selectedSeparator);
		}

		itemsDomRefs.splice(index, 1);

		// if previous item is a separator - remove it
		if (selectedSeparator) {
			itemsDomRefs.splice(index - 1, 1);
			index--;
		}

		return {
			index,
			width,
		};
	}

	_findFirstVisibleItem(itemsDomRefs, containerWidth, selectedItemWidth, startIndex) {
		if (startIndex === undefined) {
			startIndex = itemsDomRefs.length - 1;
		}

		let lastVisible = startIndex + 1;

		for (let index = startIndex; index >= 0; index--) {
			const itemWidth = this._getItemWidth(itemsDomRefs[index]);

			if (containerWidth < selectedItemWidth + itemWidth) {
				break;
			}

			selectedItemWidth += itemWidth;
			lastVisible = index;
		}

		return lastVisible;
	}

	_findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemWidth, startIndex) {
		startIndex = startIndex || 0;

		let lastVisibleIndex = startIndex - 1;
		let index = startIndex;

		for (; index < itemsDomRefs.length; index++) {
			const itemWidth = this._getItemWidth(itemsDomRefs[index]);

			if (containerWidth < selectedItemWidth + itemWidth) {
				break;
			}

			selectedItemWidth += itemWidth;
			lastVisibleIndex = index;
		}

		// if prev item is separator - hide it
		const prevItem = itemsDomRefs[index - 1];
		if (prevItem && prevItem.isSeparator) {
			lastVisibleIndex -= 1;
		}

		return lastVisibleIndex;
	}

	get isModeStartAndEnd() {
		return this.tabsOverflowMode === TabsOverflowMode.StartAndEnd;
	}

	_updateOverflowCounters() {
		let startOverflowItemsCount = 0;
		let endOverflowItemsCount = 0;

		this._getTabs()
			.map(tab => tab.getTabInStripDomRef())
			.forEach(tab => {
				if (tab.hasAttribute("start-overflow")) {
					startOverflowItemsCount++;
				}

				if (tab.hasAttribute("end-overflow")) {
					endOverflowItemsCount++;
				}
			});

		this._startOverflowText = `+${startOverflowItemsCount}`;
		this._endOverflowText = `+${endOverflowItemsCount}`;
	}

	_getFocusableRefs() {
		if (!this.getDomRef()) {
			return [];
		}

		const focusableRefs = [];

		if (!this._getStartOverflow().hasAttribute("hidden")) {
			focusableRefs.push(this.startOverflowButton[0] || this._getStartOverflowBtnDOM());
		}

		this._getTabs().forEach(tab => {
			const ref = tab.getTabInStripDomRef();
			const focusable = ref && !ref.hasAttribute("hidden");

			if (focusable) {
				focusableRefs.push(tab);
			}
		});

		if (!this._getEndOverflow().hasAttribute("hidden")) {
			focusableRefs.push(this.overflowButton[0] || this._getEndOverflowBtnDOM());
		}

		return focusableRefs;
	}

	_getHeader() {
		return this.shadowRoot.querySelector(`#${this._id}-header`);
	}

	_getTabs() {
		return this.items.filter(item => !item.isSeparator);
	}

	_getTabStrip() {
		return this.shadowRoot.querySelector(`#${this._id}-tabStrip`);
	}

	_getStartOverflow() {
		return this.shadowRoot.querySelector(".ui5-tc__overflow--start");
	}

	_getEndOverflow() {
		return this.shadowRoot.querySelector(".ui5-tc__overflow--end");
	}

	_getStartOverflowBtnDOM() {
		return this._getStartOverflow().querySelector("[ui5-button]");
	}

	_getEndOverflowBtnDOM() {
		return this._getEndOverflow().querySelector("[ui5-button]");
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(`#${this._id}-overflowMenu`);
	}

	async _closeRespPopover() {
		this.responsivePopover = await this._respPopover();
		this.responsivePopover.close();
	}

	get classes() {
		return {
			root: {
				"ui5-tc-root": true,
				"ui5-tc--textOnly": this.textOnly,
				"ui5-tc--withAdditionalText": this.withAdditionalText,
				"ui5-tc--standardTabLayout": this.standardTabLayout,
			},
			header: {
				"ui5-tc__header": true,
			},
			tabStrip: {
				"ui5-tc__tabStrip": true,
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

	get withAdditionalText() {
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

	get overflowButtonText() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_END_OVERFLOW);
	}

	get popoverCancelButtonText() {
		return TabContainer.i18nBundle.getText(TABCONTAINER_POPOVER_CANCEL_BUTTON);
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

const isTabDiv = el => el.localName === "div" && el.getAttribute("role") === "tab";

const getTab = el => {
	while (el) {
		if (isTabDiv(el)) {
			return el;
		}

		el = el.parentElement;
	}

	return false;
};

const walk = (tabs, callback) => {
	[...tabs].forEach(tab => {
		callback(tab);
		if (tab.subTabs) {
			walk(tab.subTabs, callback);
		}
	});
};

TabContainer.define();

export default TabContainer;
