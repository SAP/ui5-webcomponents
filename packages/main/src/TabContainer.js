import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-down.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js";
import { TABCONTAINER_PREVIOUS_ICON_ACC_NAME, TABCONTAINER_NEXT_ICON_ACC_NAME, TABCONTAINER_OVERFLOW_MENU_TITLE } from "./generated/i18n/i18n-defaults.js";
import Button from "./Button.js";
import CustomListItem from "./CustomListItem.js";
import Icon from "./Icon.js";
import List from "./List.js";
import ResponsivePopover from "./ResponsivePopover.js";
import SemanticColor from "./types/SemanticColor.js";

// Templates
import TabContainerTemplate from "./generated/templates/TabContainerTemplate.lit.js";
import TabContainerPopoverTemplate from "./generated/templates/TabContainerPopoverTemplate.lit.js";

// Styles
import tabContainerCss from "./generated/themes/TabContainer.css.js";
import tabContainerPopoverCss from "./generated/themes/TabContainerPopup.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import TabLayout from "./types/TabLayout.js";

const SCROLL_STEP = 128;

/**
 * @public
 */
const metadata = {
	tag: "ui5-tabcontainer",
	managedSlots: true,
	slots: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {
		/**
		 * Defines the tabs.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-tab</code> and <code>ui5-tab-separator</code> for the intended design.
		 *
		 * @type {HTMLElement[]}
		 * @public
		 * @slot
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			individualSlots: true,
			listenFor: { include: ["*"] },
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
		 * Defines the alignment of the <code>main text</code> and the <code>additionalText</code> of a tab.
		 *
		 * <br><br>
		 * <b>Note:</b>
		 * The <code>main text</code> and the <code>additionalText</code> would be displayed vertically by defualt,
		 * but when set to <code>Inline</code>, they would be displayed horizontally.
		 *
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Standard</code></li>
		 * <li><code>Inline</code></li>
		 * <ul>
		 *
		 * @type {string}
		 * @defaultvalue "Standard"
		 * @public
		 */
		tabLayout: {
			type: String,
			defaultValue: TabLayout.Standard,
		},

		_selectedTab: {
			type: Object,
		},

		_scrollable: {
			type: Boolean,
			noAttribute: true,
		},

		_scrollableBack: {
			type: Boolean,
			noAttribute: true,
		},

		_scrollableForward: {
			type: Boolean,
			noAttribute: true,
		},
		_textOnly: {
			type: Boolean,
			noAttribute: true,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.TabContainer.prototype */ {

		/**
		 * Fired when a tab is selected.
		 *
		 * @event
		 * @param {HTMLElement} tab The selected <code>tab</code>.
		 * @param {Number} tabIndex The selected <code>tab</code> index.
		 * @public
		 */
		tabSelect: {
			tab: { type: HTMLElement },
			tabIndex: { type: Number },
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

	static get staticAreaStyles() {
		return [tabContainerPopoverCss, ResponsivePopoverCommonCss];
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

	constructor() {
		super();

		this._handleHeaderResize = this._handleHeaderResize.bind(this);

		// Init ScrollEnablement
		this._scrollEnablement = new ScrollEnablement(this);
		this._scrollEnablement.attachEvent("scroll", this._updateScrolling.bind(this));

		// Init ItemNavigation
		this._initItemNavigation();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onBeforeRendering() {
		const hasSelected = this.items.some(item => item.selected);
		this._textOnly = this.items.every(item => !item.icon);

		this.items.forEach(item => {
			item._getTabContainerHeaderItemCallback = _ => {
				return this.getDomRef().querySelector(`#${item._id}`);
			};
		});
		if (this.items.length && !hasSelected) {
			this.items[0].selected = true;
		}

		this.calculateRenderItems();
	}

	calculateRenderItems() {
		this.renderItems = this.items.map((item, index) => {
			const isSeparator = item.isSeparator;

			if (isSeparator) {
				return { isSeparator, _tabIndex: item._tabIndex, _id: item._id };
			}

			return {
				item,
				isInline: this.tabLayout === TabLayout.Inline,
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
	}

	_onHeaderItemSelect(event) {
		if (!event.target.hasAttribute("disabled")) {
			this._onItemSelect(event.target);
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
					this._itemNavigation.current = selectedTabIndex;
				}
			}
		}, this);

		// update collapsed state
		if (!this.fixed) {
			if (selectedTab === this._selectedTab) {
				this.collapsed = !this.collapsed;
			} else {
				this.collapsed = false;
			}
		}

		// select the tab
		this._selectedTab = selectedTab;
		this.fireEvent("tabSelect", {
			tab: selectedTab,
			tabIndex: selectedTabIndex,
		});
	}

	async _onOverflowButtonClick(event) {
		this.responsivePopover = await this._respPopover();
		this.updateStaticAreaItemContentDensity();
		this.responsivePopover.open(this.getDomRef().querySelector(".ui-tc__overflowButton"));
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

	_closeRespPopover() {
		this.responsivePopover.close();
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
		return this.items.filter(item => !item.isSeparator);
	}

	_getHeaderScrollContainer() {
		return this.shadowRoot.querySelector(`#${this._id}-headerScrollContainer`);
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(`#${this._id}-overflowMenu`);
	}

	get classes() {
		return {
			root: {
				"ui5-tc-root": true,
				"ui5-tc--textOnly": this._textOnly,
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

	get previousIconACCName() {
		return this.i18nBundle.getText(TABCONTAINER_PREVIOUS_ICON_ACC_NAME);
	}

	get nextIconACCName() {
		return this.i18nBundle.getText(TABCONTAINER_NEXT_ICON_ACC_NAME);
	}

	get overflowMenuTitle() {
		return this.i18nBundle.getText(TABCONTAINER_OVERFLOW_MENU_TITLE);
	}

	get rtl() {
		return getRTL() ? "rtl" : undefined;
	}

	static async onDefine() {
		await Promise.all([
			Button.define(),
			CustomListItem.define(),
			Icon.define(),
			List.define(),
			ResponsivePopover.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
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

	if (item.tabLayout === TabLayout.Inline) {
		classes.push("ui5-tc__headerItem--inline");
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
