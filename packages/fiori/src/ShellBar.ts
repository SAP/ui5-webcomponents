import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import {
	isSpace,
	isEnter,
	isLeft,
	isRight,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard.js";
import List from "@ui5/webcomponents/dist/List.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Menu from "@ui5/webcomponents/dist/Menu.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/grid.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import type {
	ClassMap,
	AccessibilityAttributes,
	AriaRole,
} from "@ui5/webcomponents-base";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import throttle from "@ui5/webcomponents-base/dist/util/throttle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import getActiveElement from "@ui5/webcomponents-base/dist/util/getActiveElement.js";

import type ShellBarItem from "./ShellBarItem.js";

// Templates
import ShellBarTemplate from "./generated/templates/ShellBarTemplate.lit.js";

// Styles
import shellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";

import {
	SHELLBAR_LABEL,
	SHELLBAR_LOGO,
	SHELLBAR_NOTIFICATIONS,
	SHELLBAR_NOTIFICATIONS_NO_COUNT,
	SHELLBAR_CANCEL,
	SHELLBAR_PROFILE,
	SHELLBAR_PRODUCTS,
	SHELLBAR_SEARCH,
	SHELLBAR_SEARCH_FIELD,
	SHELLBAR_OVERFLOW,
	SHELLBAR_LOGO_AREA,
	SHELLBAR_ADDITIONAL_CONTEXT,
	SHELLBAR_SEARCHFIELD_DESCRIPTION,
	SHELLBAR_SEARCH_BTN_OPEN,
	SHELLBAR_PRODUCT_SWITCH_BTN,
} from "./generated/i18n/i18n-defaults.js";

type ShellBarLogoAccessibilityAttributes = {
	role?: Extract<AriaRole, "button" | "link">,
	name?: string,
}
type ShellBarProfileAccessibilityAttributes = Pick<AccessibilityAttributes, "name" | "expanded" | "hasPopup">;
type ShellBarAreaAccessibilityAttributes = Pick<AccessibilityAttributes, "hasPopup" | "expanded">;
type ShellBarAccessibilityAttributes = {
	logo?: ShellBarLogoAccessibilityAttributes
	notifications?: ShellBarAreaAccessibilityAttributes
	profile?: ShellBarProfileAccessibilityAttributes,
	product?: ShellBarAreaAccessibilityAttributes
	search?: ShellBarAreaAccessibilityAttributes
	overflow?: ShellBarAreaAccessibilityAttributes
};

type ShellBarNotificationsClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarProfileClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarProductSwitchClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarLogoClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarMenuItemClickEventDetail = {
	item: HTMLElement;
};

type ShellBarContentItemVisibilityChangeEventDetail = {
	items: Array<HTMLElement>
};

type ShellBarSearchButtonEventDetail = {
	targetRef: HTMLElement;
	searchFieldVisible: boolean;
};

interface IShelBarItemInfo {
	id: string,
	icon?: string,
	text?: string,
	show: boolean,
	count?: string,
	custom?: boolean,
	title?: string,
	stableDomRef?: string,
	refItemid?: string,
	press: (e: MouseEvent) => void,
	domOrder: number,
	classes: string,
	order?: number,
	profile?: boolean,
	tooltip?: string,
}

const RESIZE_THROTTLE_RATE = 40; // ms

// actions always visible in lean mode, order is important
const PREDEFINED_PLACE_ACTIONS = ["feedback", "sys-help"];

/**
 * @class
 * ### Overview
 *
 * The `ui5-shellbar` is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 *
 * ### Stable DOM Refs
 *
 * You can use the following stable DOM refs for the `ui5-shellbar`:
 *
 * - logo
 * - notifications
 * - overflow
 * - profile
 * - product-switch
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`
 * @csspart root - Used to style the outermost wrapper of the `ui5-shellbar`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 */

@customElement({
	tag: "ui5-shellbar",
	fastNavigation: true,
	languageAware: true,
	renderer: litRender,
	template: ShellBarTemplate,
	styles: [shellBarStyles, ShellBarPopoverCss],
	dependencies: [
		Button,
		Icon,
		List,
		Popover,
		ListItemStandard,
		Menu,
	],
})
/**
 *
 * Fired, when the notification icon is activated.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("notifications-click", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when the profile slot is present.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("profile-click", {
	bubbles: true,
})

/**
 * Fired, when the product switch icon is activated.
 *
 * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("product-switch-click", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when the logo is activated.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @since 0.10
 * @public
 */
@event("logo-click", {
	bubbles: true,
})

/**
 * Fired, when a menu item is activated
 *
 * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
 * @param {HTMLElement} item DOM ref of the activated list item
 * @since 0.10
 * @public
 */
@event("menu-item-click", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired, when the search button is activated.
 *
 * **Note:** You can prevent expanding/collapsing of the search field by calling `event.preventDefault()`.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @param {Boolean} searchFieldVisible whether the search field is visible
 * @public
 */

@event("search-button-click", {
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when an item from the startContent or endContent slots is hidden or shown.
 * **Note:** The `content-item-visibility-change` event is in an experimental state and is a subject to change.
 *
 * @param {Array<HTMLElement>} array of all the items that are hidden
 * @public
 * @since 2.7.0
 */
@event("content-item-visibility-change", {
	bubbles: true,
})

class ShellBar extends UI5Element {
	eventDetails!: {
		"notifications-click": ShellBarNotificationsClickEventDetail,
		"profile-click": ShellBarProfileClickEventDetail,
		"product-switch-click": ShellBarProductSwitchClickEventDetail,
		"logo-click": ShellBarLogoClickEventDetail,
		"menu-item-click": ShellBarMenuItemClickEventDetail,
		"search-button-click": ShellBarSearchButtonEventDetail,
		"content-item-visibility-change": ShellBarContentItemVisibilityChangeEventDetail
	}
	/**
	 * Defines the `primaryTitle`.
	 *
	 * **Note:** The `primaryTitle` would be hidden on S screen size (less than approx. 700px).
	 * @default undefined
	 * @public
	 */
	@property()
	primaryTitle?: string;

	/**
	 * Defines the `secondaryTitle`.
	 *
	 * **Note:** The `secondaryTitle` would be hidden on S and M screen sizes (less than approx. 1300px).
	 * @default undefined
	 * @public
	 */
	@property()
	secondaryTitle?: string;

	/**
	 * Defines the `notificationsCount`,
	 * displayed in the notification icon top-right corner.
	 * @default undefined
	 * @public
	 */
	@property()
	notificationsCount?: string;

	/**
	 * Defines, if the notification icon would be displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showNotifications = false;

	/**
	 * Defines, if the product switch icon would be displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showProductSwitch = false;

	/**
	 * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
	 *
	 * **Note:** By default the Search Field is not displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField = false;

	/**
	 * Defines additional accessibility attributes on different areas of the component.
	 *
	 * The accessibilityAttributes object has the following fields,
	 * where each field is an object supporting one or more accessibility attributes:
	 *
	 * - **logo** - `logo.role` and `logo.name`.
	 * - **notifications** - `notifications.expanded` and `notifications.hasPopup`.
	 * - **profile** - `profile.expanded`, `profile.hasPopup` and `profile.name`.
	 * - **product** - `product.expanded` and `product.hasPopup`.
	 * - **search** - `search.hasPopup`.
	 * - **overflow** - `overflow.expanded` and `overflow.hasPopup`.
	 *
	 * The accessibility attributes support the following values:
	 *
	 * - **role**: Defines the accessible ARIA role of the logo area.
	 * Accepts the following string values: `button` or `link`.
	 *
	 * - **expanded**: Indicates whether the button, or another grouping element it controls,
	 * is currently expanded or collapsed.
	 * Accepts the following string values: `true` or `false`.
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element,
	 * such as menu or dialog, that can be triggered by the button.
	 *
	 * Accepts the following string values: `dialog`, `grid`, `listbox`, `menu` or `tree`.
	 * - **name**: Defines the accessible ARIA name of the area.
	 * Accepts any string.
	 *
	 * @default {}
	 * @public
	 * @since 1.10.0
	 */
	@property({ type: Object })
	accessibilityAttributes: ShellBarAccessibilityAttributes = {};

	/**
	 * @private
	 */
	@property()
	breakpointSize = "S";

	/**
	 * @private
	 */
	@property({ type: Boolean })
	withLogo = false;

	@property({ type: Object })
	_itemsInfo!: Array<IShelBarItemInfo>;

	@property({ type: Array, noAttribute: true })
	_menuPopoverItems: Array<HTMLElement> = [];

	@property({ type: Boolean, noAttribute: true })
	_menuPopoverExpanded = false;

	@property({ type: Boolean, noAttribute: true })
	_overflowPopoverExpanded = false;

	@property({ type: Boolean, noAttribute: true })
	hasVisibleStartContent = false;

	@property({ type: Boolean, noAttribute: true })
	hasVisibleEndContent = false;

	_cachedHiddenContent: Array<HTMLElement> = [];

	/**
	 * Defines the assistant slot.
	 *
	 * @since 2.0.0
	 * @public
	 */
	@slot()
	assistant!: Array<IButton>;

	/**
	 * Defines the `ui5-shellbar` additional items.
	 *
	 * **Note:**
	 * You can use the `<ui5-shellbar-item></ui5-shellbar-item>`.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
	items!: Array<ShellBarItem>;

	/**
	 * You can pass `ui5-avatar` to set the profile image/icon.
	 * If no profile slot is set - profile will be excluded from actions.
	 *
	 * **Note:** We recommend not using the `size` attribute of `ui5-avatar` because
	 * it should have specific size by design in the context of `ui5-shellbar` profile.
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@slot()
	profile!: Array<HTMLElement>;

	/**
	 * Defines the logo of the `ui5-shellbar`.
	 * For example, you can use `ui5-avatar` or `img` elements as logo.
	 * @since 1.0.0-rc.8
	 * @public
	 */
	@slot()
	logo!: Array<HTMLElement>;

	/**
	 * Defines the items displayed in menu after a click on a start button.
	 *
	 * **Note:** You can use the  `<ui5-li></ui5-li>` and its ancestors.
	 * @since 0.10
	 * @public
	 */
	@slot()
	menuItems!: Array<ListItemBase>;

	/**
	 * Defines the `ui5-input`, that will be used as a search field.
	 * @public
	 */
	@slot()
	searchField!: Array<Input>;

	/**
	 * Defines a `ui5-button` in the bar that will be placed in the beginning.
	 * We encourage this slot to be used for a menu button.
	 * It gets overstyled to match ShellBar's styling.
	 * @public
	 */
	@slot()
	startButton!: Array<IButton>;

	/**
	 * The container is positioned in the center of the `ui5-shellbar` and occupies one-third of the total length of the `ui5-shellbar`.
	 *
	 * **Note:** If set, the `searchField` slot is not rendered.
	 * @private
	 */
	@slot()
	midContent!: Array<HTMLElement>;

	/**
	 * Define the items displayed in the additional content area.
	 * **Note:** The `content` slot is in an experimental state and is a subject to change.
	 *
	 * @public
	 * @since 2.7.0
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	content!: Array<HTMLElement>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;
	overflowPopover?: Popover | null;
	menuPopover?: Popover | null;
	_isInitialRendering: boolean;
	_defaultItemPressPrevented: boolean;
	menuItemsObserver: MutationObserver;
	additionalContextObserver: MutationObserver;
	_hiddenIcons: Array<IShelBarItemInfo>;
	_handleResize: ResizeObserverCallback;
	_overflowNotifications: string | null;
	_lastOffsetWidth = 0;
	_observableContent: Array<HTMLElement> = [];
	_searchBarAutoOpen: boolean = false;
	_searchBarAutoClosed: boolean = false;
	_searchIconPressed: boolean = false;

	_headerPress: () => void;

	static get FIORI_3_BREAKPOINTS() {
		return [
			599,
			1023,
			1439,
			1919,
			10000,
		];
	}

	static get FIORI_3_BREAKPOINTS_MAP(): Record<string, string> {
		return {
			"599": "S",
			"1023": "M",
			"1439": "L",
			"1919": "XL",
			"10000": "XXL",
		};
	}

	constructor() {
		super();

		this._menuPopoverItems = [];
		this._hiddenIcons = [];
		this._itemsInfo = [];
		this._isInitialRendering = true;
		this._overflowNotifications = null;

		// marks if preventDefault() is called in item's press handler
		this._defaultItemPressPrevented = false;

		this.menuItemsObserver = new MutationObserver(() => {
			this._updateClonedMenuItems();
		});

		this.additionalContextObserver = new MutationObserver(() => {
			this._updateAdditionalContextItems();
		});

		this._headerPress = () => {
			this._updateClonedMenuItems();

			if (this.hasMenuItems) {
				const menuPopover = this._getMenuPopover();
				menuPopover.opener = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-menu-button")!;
				menuPopover.open = true;
			}
		};

		this._handleResize = throttle(() => {
			this.menuPopover = this._getMenuPopover();
			this.overflowPopover = this._getOverflowPopover();
			this.overflowPopover.open = false;
			if (this._lastOffsetWidth !== this.offsetWidth) {
				this._overflowActions();
				if (this._searchBarAutoOpen) {
					this._searchBarInitialState();
				}
			}
		}, RESIZE_THROTTLE_RATE);
	}

	_searchBarInitialState() {
		const spacerWidth = this.shadowRoot!.querySelector(".ui5-shellbar-spacer") ? this.shadowRoot!.querySelector(".ui5-shellbar-spacer")!.getBoundingClientRect().width : 0;
		const searchFieldWidth = this.domCalculatedValues("--_ui5_shellbar_search_field_width");
		if (this._searchIconPressed || document.activeElement === this.searchField[0]) {
			return;
		}
		if (this._showFullWidthSearch) {
			this.showSearchField = false;
			this._searchBarAutoClosed = true;
			return;
		}
		if ((spacerWidth <= 0 || this.additionalContextHidden.length !== 0) && this.showSearchField === true) {
			this.showSearchField = false;
			this._searchBarAutoClosed = true;
		}
		if (spacerWidth > searchFieldWidth && this.additionalContextHidden.length === 0 && this.showSearchField === false) {
			this.showSearchField = true;
			this._searchBarAutoClosed = false;
		}
	}

	_onKeyDown(e: KeyboardEvent) {
		const items = this._getVisibleAndInteractiveItems();
		const activeElement = getActiveElement();
		const currentIndex = items.findIndex(el => el === activeElement);

		if (isLeft(e) || isRight(e)) {
			e.preventDefault();// Prevent the default behavior to avoid any further automatic focus movemen

			// Focus navigation based on the key pressed
			if (isLeft(e)) {
				this._focusPreviousItem(items, currentIndex);
			} else if (isRight(e)) {
				this._focusNextItem(items, currentIndex);
			}
		}
	}

	_focusNextItem(items: HTMLElement[], currentIndex: number) {
		if (currentIndex < items.length - 1) {
			(items[currentIndex + 1]).focus(); // Focus the next element
		}
	}

	_focusPreviousItem(items: HTMLElement[], currentIndex: number) {
		if (currentIndex > 0) {
			(items[currentIndex - 1]).focus(); // Focus the previous element
		}
	}

	_isVisible(element: HTMLElement): boolean {
		const style = getComputedStyle(element);

		return style.display !== "none" && style.visibility !== "hidden" && element.offsetWidth > 0 && element.offsetHeight > 0;
	}

	_isInteractive(element: HTMLElement | UI5Element): boolean {
		const component = element as UI5Element;
		if (component.isUI5Element) {
			const dom = component.getFocusDomRef();
			return dom?.tabIndex === 0;
		}
		return element.tabIndex === 0;
	}

	_getNavigableContent() {
		return [
			...this.startButton,
			...this.logo,
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-logo"),
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-logo-area"),
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-menu-button"),
			...this.additionalContext,
			...this._getRightChildItems(),
		] as HTMLElement[];
	}

	_getRightChildItems() {
		return [
			...this.searchField,
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-search-item-for-arrow-nav"),
			...this.assistant,
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-items-for-arrow-nav"),
		] as HTMLElement[];
	}

	_getVisibleAndInteractiveItems() {
		const items = this._getNavigableContent();
		const visibleAndInteractiveItems = items.filter(item => {
			return this._isVisible(item) && this._isInteractive(item);
		});

		return visibleAndInteractiveItems;
	}

	_menuItemPress(e: CustomEvent<ListSelectionChangeEventDetail>) {
		const shouldContinue = this.fireDecoratorEvent("menu-item-click", {
			item: e.detail.selectedItems[0],
		});
		if (shouldContinue) {
			this.menuPopover!.open = false;
		}
	}

	_logoPress() {
		this.fireDecoratorEvent("logo-click", {
			targetRef: this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-logo")!,
		});
	}

	_menuPopoverBeforeOpen() {
		this._menuPopoverExpanded = true;
		if (this.menuPopover!.content && this.menuPopover!.content.length) {
			(<List> this.menuPopover!.content[0]).focusFirstItem();
		}
	}

	_menuPopoverAfterClose() {
		this._menuPopoverExpanded = false;
	}

	_overflowPopoverBeforeOpen() {
		this._overflowPopoverExpanded = true;
		if (this.overflowPopover!.content && this.overflowPopover!.content.length) {
			(<List> this.overflowPopover!.content[0]).focusFirstItem();
		}
	}

	_overflowPopoverAfterClose() {
		this._overflowPopoverExpanded = false;
	}

	_logoKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._logoPress();
		}
	}

	_logoKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			return;
		}

		if (isEnter(e)) {
			this._logoPress();
		}
	}

	_calculateCSSREMValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
		return Number(styleSet.getPropertyValue(propertyName).replace("rem", "")) * parseInt(getComputedStyle(document.body).getPropertyValue("font-size"));
	}

	_parsePxValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
		return Number(styleSet.getPropertyValue(propertyName).replace("px", ""));
	}

	domCalculatedValues(cssVar: string): number {
		const shellbarComputerStyle = getComputedStyle(this.getDomRef()!);
		return this._calculateCSSREMValue(shellbarComputerStyle, getScopedVarName(cssVar)); // px
	}

	onBeforeRendering() {
		this.withLogo = this.hasLogo;

		this._hiddenIcons = this._itemsInfo.filter(info => {
			const isHidden = (info.classes.indexOf("ui5-shellbar-hidden-button") !== -1);
			const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
			const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);

			return isHidden && isSet && !shouldStayOnScreen;
		});

		this._observeMenuItems();
		this._observeAdditionalContextItems();
		this._updateSeparatorsVisibility();
	}

	get additionalContextSorted() {
		return this.additionalContext.sort((a, b) => {
			return parseInt(a.getAttribute("data-hide-order") || "0") - parseInt(b.getAttribute("data-hide-order") || "0");
		}).map(item => this.shadowRoot!.querySelector<HTMLElement>(`#${item.slot}`)).filter(item => item !== null);
	}

	get additionalContextContainer() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-overflow-container-additional-content");
	}

	onAfterRendering() {
		requestAnimationFrame(() => {
			this._lastOffsetWidth = this.offsetWidth;
			this._overflowActions();
		});
		this._searchBarAutoOpen = this._searchBarAutoClosed || (this.showSearchField && !this._searchIconPressed);
	}

	/**
	 * Closes the overflow area.
	 * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
	 * @public
	 */
	closeOverflow(): void {
		if (this.overflowPopover) {
			this.overflowPopover.open = false;
		}
	}

	_handleBarBreakpoints() {
		const width = this.getBoundingClientRect().width;
		const breakpoints = ShellBar.FIORI_3_BREAKPOINTS;

		const size = breakpoints.find(bp1 => width <= bp1) || ShellBar.FIORI_3_BREAKPOINTS[ShellBar.FIORI_3_BREAKPOINTS.length - 1];
		const mappedSize = ShellBar.FIORI_3_BREAKPOINTS_MAP[size];

		if (this.breakpointSize !== mappedSize) {
			this.breakpointSize = mappedSize;
		}
	}

	_hideOverflowItems(hiddenItems: number, items: IShelBarItemInfo[]) {
		for (let i = 0; hiddenItems > 0 && i < items.length; i++) {
			// start from last item
			const item = items[items.length - 1 - i];
			if (item.classes.indexOf("ui5-shellbar-no-overflow-button") === -1) {
				item.classes = `${item.classes} ui5-shellbar-hidden-button`;
				hiddenItems--;
			}
		}

		// assistant is a slot, still described in the itemsInfo for the purpose of the overflow
		// so if marked as hidden, it should be hidden separately
		this._updateAssistantIconVisibility(items);

		return hiddenItems;
	}

	_hideAdditionalContext() {
		const container = this.additionalContextContainer;
		const totalWidth = container?.offsetWidth || 0;

		const additionalContextSorted = this.additionalContextSorted.toReversed();

		let usedWidth = 0;

		for (let i = 0; i < additionalContextSorted.length; i++) {
			const item = additionalContextSorted[i];
			item.classList.remove("ui5-shellbar-hidden-button");

			const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).getPropertyValue("margin-inline-start"));
			usedWidth += itemWidth;

			if (usedWidth > totalWidth) {
				item.classList.add("ui5-shellbar-hidden-button");
			}
		}
	}

	_handleActionsOverflow() {
		const itemsToOverflow = this.itemsToOverflow;
		const container = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-overflow-container-right")!;
		const searchFieldWidth = this.searchField[0] ? this.searchField[0].offsetWidth : 0;
		const nonDisappearingItems = Array.from(container.querySelectorAll<HTMLElement>(".ui5-shellbar-no-overflow-button"));
		const nonDisappearingItemsWidth = nonDisappearingItems.reduce((acc, el) => acc + el.offsetWidth + this.domCalculatedValues("--_ui5-shellbar-overflow-button-margin"), 0);
		let totalWidth = container.offsetWidth - nonDisappearingItemsWidth - this.separatorsWidth;
		if (this.additionalContext.length === 0) {
			totalWidth -= searchFieldWidth;
		}

		let usedWidth = 0;
		let hiddenItems = 0;
		let restoreVisibility = false;

		// first check how many items can fit without overflowing
		for (let i = 0; i < itemsToOverflow.length; i++) {
			// reset item visibility before calculating
			const item = itemsToOverflow[i];
			const isAdditionalContext = this.additionalContextSorted.includes(item);

			if (item.classList.contains("ui5-shellbar-hidden-button")) {
				item.classList.remove("ui5-shellbar-hidden-button");
				restoreVisibility = true;
			}
			// exlcude the gap if an item is in the additional context as the wrapped element's width is already including the gap
			const gap = isAdditionalContext ? 0 : parseInt(getComputedStyle(item).getPropertyValue("margin-inline-start"));
			const itemWidth = item.offsetWidth + gap;
			if (restoreVisibility) {
				item.classList.add("ui5-shellbar-hidden-button");
				restoreVisibility = false;
			}
			usedWidth += itemWidth;

			if (usedWidth > totalWidth) {
				// as soon as we find an item that doesn't fit, we stop
				// and sum the rest of the items as hidden
				hiddenItems = itemsToOverflow.length - i;
				break;
			}
		}

		// never show only one item in the overflow
		if (hiddenItems === 1) {
			hiddenItems++;
		}

		const showOverflowButton = hiddenItems > 0;
		const items = this._getAllItems(showOverflowButton, hiddenItems === itemsToOverflow.length).filter(item => item.show && item.classes.indexOf("ui5-shellbar-no-overflow-button") === -1);
		// start hiding the actions on the right (overflow actions) first
		this._hideOverflowItems(hiddenItems, items);
		// last, start hiding the items that are in the additional context
		this._hideAdditionalContext();

		if (JSON.stringify(this.additionalContextHidden) !== JSON.stringify(this._cachedHiddenContent)) {
			this.fireDecoratorEvent("content-item-visibility-change", { items: this.additionalContextHidden });
		}

		this._cachedHiddenContent = this.additionalContextHidden;

		return items;
	}

	_overflowActions() {
		this._handleBarBreakpoints();

		const newItems = this._handleActionsOverflow();
		this._updateSeparatorsVisibility();
		this._updateItemsInfo(newItems);
		this._updateOverflowNotifications();
	}

	_updateAssistantIconVisibility(items: IShelBarItemInfo[]) {
		if (this.assistant.length) {
			const assistantWrapper = this.shadowRoot!.getElementById("assistant");
			const assistantInfo = items.find(item => item.text === "Assistant");
			assistantWrapper && assistantWrapper.classList.remove("ui5-shellbar-hidden-button");
			if (assistantInfo && assistantInfo.classes.indexOf("ui5-shellbar-hidden-button") > 0) {
				assistantWrapper && assistantWrapper.classList.add("ui5-shellbar-hidden-button");
			}
		}
	}

	_updateSeparatorsVisibility() {
		this.hasVisibleStartContent = this._hasVisibleStartContent;
		this.hasVisibleEndContent = this._hasVisibleEndContent;
	}

	_toggleActionPopover() {
		const overflowButton = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-overflow-button")!;
		const overflowPopover = this._getOverflowPopover();
		overflowPopover.opener = overflowButton;
		overflowPopover.open = true;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
		if (isDesktop()) {
			this.setAttribute("desktop", "");
		}
		if (this._searchBarAutoOpen) {
			setTimeout(() => this._searchBarInitialState(), 100);
		}
	}

	onExitDOM() {
		this.menuItemsObserver.disconnect();
		this.additionalContextObserver.disconnect();
		this._observableContent = [];
		ResizeHandler.deregister(this, this._handleResize);
	}

	_handleSearchIconPress() {
		const searchButtonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button")!;
		const defaultPrevented = !this.fireDecoratorEvent("search-button-click", {
			targetRef: searchButtonRef,
			searchFieldVisible: this.showSearchField,
		});
		this._searchIconPressed = true;
		if (defaultPrevented) {
			return;
		}
		this.showSearchField = !this.showSearchField;
		this._searchBarAutoOpen = this.showSearchField;

		if (!this.showSearchField) {
			return;
		}

		const input = this.searchField[0];

		// update the state immediately
		if (input) {
			input.focused = true;
		}

		// move the focus later
		setTimeout(() => {
			if (input) {
				input.focus();
			}
		}, 100);
	}

	async _handleActionListClick() {
		if (!this._defaultItemPressPrevented) {
			this.closeOverflow();
			// wait for DOM to be updated when ui5-popover is closed, otherwise if Enter key is hold
			// there will be no visual indication that this has happened
			await renderFinished();
		}

		this._defaultItemPressPrevented = false;
	}

	_handleCustomActionPress(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const refItemId = target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			const shellbarItem = this.items.find(item => {
				return item._id === refItemId;
			});

			const prevented = shellbarItem!.fireClickEvent(e);

			this._defaultItemPressPrevented = prevented;
		}
	}

	_handleOverflowPress() {
		this._toggleActionPopover();
	}

	_handleNotificationsPress(e: MouseEvent) {
		const notificationIconRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-bell-button")!,
			target = e.target as HTMLElement;

		this._defaultItemPressPrevented = !this.fireDecoratorEvent("notifications-click", {
			targetRef: notificationIconRef.classList.contains("ui5-shellbar-hidden-button") ? target : notificationIconRef,
		});
	}

	_handleProfilePress() {
		this.fireDecoratorEvent("profile-click", {
			targetRef: this.shadowRoot!.querySelector<Button>(".ui5-shellbar-image-button")!,
		});
	}

	_handleCancelButtonPress() {
		this.showSearchField = false;
	}

	_handleProductSwitchPress(e: MouseEvent) {
		const buttonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-button-product-switch")!,
			target = e.target as HTMLElement;

		this._defaultItemPressPrevented = !this.fireDecoratorEvent("product-switch-click", {
			targetRef: buttonRef.classList.contains("ui5-shellbar-hidden-button") ? target : buttonRef,
		});
	}

	/**
	 * Returns the `logo` DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get logoDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="logo"]`);
	}

	/**
	 * Returns the `notifications` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get notificationsDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="notifications"]`);
	}

	/**
	 * Returns the `overflow` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get overflowDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="overflow"]`);
	}

	/**
	 * Returns the `profile` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get profileDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="profile"]`);
	}

	/**
	 * Returns the `product-switch` icon DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get productSwitchDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="product-switch"]`);
	}

	/**
	 * Returns all items that will be placed in the right of the bar as icons / dom elements.
	 * @param showOverflowButton Determines if overflow button should be visible (not overflowing)
	 */
	_getAllItems(showOverflowButton: boolean, showSearchButton = true): Array<IShelBarItemInfo> {
		let domOrder = -1;

		const items: Array<IShelBarItemInfo> = [
			{
				icon: "search",
				text: this._searchText,
				classes: `${this.searchField.length ? "" : "ui5-shellbar-invisible-button"} ${showSearchButton ? "" : "ui5-shellbar-no-overflow-button"} ui5-shellbar-search-button ui5-shellbar-button`,
				domOrder: this.searchField.length ? (++domOrder) : -1,
				id: `${this._id}-item-${1}`,
				press: this._handleSearchIconPress.bind(this),
				show: !!this.searchField.length,
				tooltip: this._searchText,
			},
			{
				icon: "da",
				text: "Assistant",
				classes: `${this.assistant.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-button`,
				id: `${this._id}-item-${4}`,
				show: !!this.assistant.length,
				domOrder: this.assistant.length ? (++domOrder) : -1,
				press: () => { },
				tooltip: this.assistant.length ? (this.assistant[0].getAttribute("text") || this.assistant[0].getAttribute("title") || undefined) : undefined,
			},
			{
				icon: "bell",
				title: this._notificationsText,
				text: ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS_NO_COUNT),
				count: this.notificationsCount,
				classes: `${this.showNotifications ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,
				id: `${this._id}-item-${2}`,
				show: this.showNotifications,
				domOrder: this.showNotifications ? (++domOrder) : -1,
				press: this._handleNotificationsPress.bind(this),
				tooltip: this._notificationsText,
			},
			// sort feedback and help to always be last
			...this.items.sort((a, b) => {
				const aIndex = PREDEFINED_PLACE_ACTIONS.indexOf(a.icon || "");
				const bIndex = PREDEFINED_PLACE_ACTIONS.indexOf(b.icon || "");
				return aIndex - bIndex;
			}).map((item: ShellBarItem) => {
				item._getRealDomRef = () => this.getDomRef()!.querySelector(`*[data-ui5-stable=${item.stableDomRef}]`)!;
				// check if included for lean mode
				const show = !!item.icon || false;
				return {
					icon: item.icon,
					id: item._id,
					count: item.count || undefined,
					refItemid: item._id,
					text: item.text,
					classes: "ui5-shellbar-custom-item ui5-shellbar-button",
					domOrder: (++domOrder),
					show,
					press: this._handleCustomActionPress.bind(this),
					custom: true,
					title: item.title,
					stableDomRef: item.stableDomRef,
					tooltip: item.title || item.text,
				};
			}),
			{
				icon: "overflow",
				text: "Overflow",
				classes: `${showOverflowButton ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-no-overflow-button ui5-shellbar-overflow-button ui5-shellbar-button`,
				domOrder: showOverflowButton ? (++domOrder) : -1,
				id: `${this.id}-item-${5}`,
				press: this._handleOverflowPress.bind(this),
				show: true,
				tooltip: this._overflowText,
			},
			{
				text: "Person",
				classes: `${this.hasProfile ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-no-overflow-button ui5-shellbar-image-button ui5-shellbar-button`,
				profile: true,
				id: `${this._id}-item-${3}`,
				domOrder: this.hasProfile ? (++domOrder) : -1,
				show: this.hasProfile,
				press: this._handleProfilePress.bind(this),
				tooltip: this._profileText,
			},
			{
				icon: "grid",
				text: this._productsText,
				classes: `${this.showProductSwitch ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-no-overflow-button ui5-shellbar-button ui5-shellbar-image-button ui5-shellbar-button-product-switch`,
				id: `${this._id}-item-${4}`,
				show: this.showProductSwitch,
				domOrder: this.showProductSwitch ? (++domOrder) : -1,
				press: this._handleProductSwitchPress.bind(this),
				tooltip: this._productsText,
			},
		];

		return items;
	}

	_updateItemsInfo(newItems: Array<IShelBarItemInfo>) {
		const isDifferent = JSON.stringify(this._itemsInfo) !== JSON.stringify(newItems);
		if (isDifferent) {
			this._itemsInfo = newItems;
		}
	}

	_updateOverflowNotifications() {
		const notificationsArr: Array<string> = [];
		let overflowNotifications = null;

		this._itemsInfo.forEach(item => {
			if (item.count && this.isIconHidden(item.icon!)) {
				notificationsArr.push(item.count);
			}
		});

		if (notificationsArr.length === 1) {
			overflowNotifications = notificationsArr[0];
		} else if (notificationsArr.length > 1) {
			overflowNotifications = " ";
		}

		this._overflowNotifications = overflowNotifications;
	}

	_updateClonedMenuItems() {
		this._menuPopoverItems = [];

		this.menuItems.forEach(item => {
			// clone the menuItem and remove the slot="menuItems",
			// otherwise would not be slotted in the internal ui5-li
			const clonedItem = item.cloneNode(true) as HTMLElement;
			clonedItem.removeAttribute("slot");

			this._menuPopoverItems.push(clonedItem);
		});
	}

	_updateAdditionalContextItems() {
		this._handleActionsOverflow();
	}

	_observeMenuItems() {
		this.menuItems.forEach(item => {
			this.menuItemsObserver.observe(item, {
				characterData: true,
				childList: true,
				subtree: true,
				attributes: true,
			});
		});
	}

	_observeAdditionalContextItems() {
		if (JSON.stringify(this.additionalContext) === JSON.stringify(this._observableContent)) {
			return false;
		}
		this.additionalContext.forEach(item => {
			if (!this._observableContent.includes(item)) {
				this.additionalContextObserver.observe(item, {
					characterData: false,
					childList: false,
					subtree: false,
					attributes: true,
					attributeFilter: ["data-hide-order"],
				});
			}
		});
		this._observableContent = this.additionalContext;
	}

	_getOverflowPopover() {
		return this.shadowRoot!.querySelector<Popover>(".ui5-shellbar-overflow-popover")!;
	}

	_getMenuPopover() {
		return this.shadowRoot!.querySelector<Popover>(".ui5-shellbar-menu-popover")!;
	}

	isIconHidden(name: string) {
		const itemInfo = this._itemsInfo.find(item => item.icon === name);

		if (!itemInfo) {
			return false;
		}

		return itemInfo.classes.indexOf("ui5-shellbar-hidden-button") !== -1;
	}

	get classes(): ClassMap {
		return {
			wrapper: {
				"ui5-shellbar-root": true,
				"ui5-shellbar-with-searchfield": this.hasSearchField,
				"ui5-shellbar-with-full-searchfield": this.hasSearchField && this.showSearchField && this._showFullWidthSearch,
			},
			button: {
				"ui5-shellbar-menu-button--interactive": this.hasMenuItems,
				"ui5-shellbar-menu-button": true,
			},
			items: {
				notification: {
					"ui5-shellbar-hidden-button": this.isIconHidden("bell"),
				},
				product: {

				},
				search: {
					"ui5-shellbar-hidden-button": this.isIconHidden("search"),
					"ui5-shellbar-no-overflow-button": this.breakpointSize !== "S",
				},
				overflow: {
					"ui5-shellbar-hidden-button": this._hiddenIcons.length === 0,
					"ui5-shellbar-no-overflow-button": true,
				},
				assistant: {
					"ui5-shellbar-hidden-button": this.isIconHidden("assistant"),
				},
			},
		};
	}

	get styles() {
		return {
			searchField: {
				"display": this.correctSearchFieldStyles,
			},
			additionalContext: {
				start: {
					separator: {
						"visibility": this.hasVisibleStartContent ? "" : "hidden",
					},
				},
				end: {
					separator: {
						"visibility": this.hasVisibleEndContent ? "" : "hidden",
					},
				},
			},
		};
	}

	get correctSearchFieldStyles() {
		if (this.showSearchField) {
			return "flex";
		}

		return "none";
	}

	get customItemsInfo() {
		return this._itemsInfo.filter(itemInfo => !!itemInfo.custom);
	}

	get hasLogo() {
		return !!this.logo.length;
	}

	get showLogoInMenuButton() {
		return this.hasLogo && (this.breakpointSize === "S");
	}

	get showTitleInMenuButton() {
		return this.primaryTitle && !(this.showLogoInMenuButton);
	}

	get showMenuButton() {
		return this.primaryTitle || this.showLogoInMenuButton;
	}

	get popoverHorizontalAlign(): `${PopoverHorizontalAlign}` {
		return this.effectiveDir === "rtl" ? "Start" : "End";
	}

	get hasAssistant() {
		return !!this.assistant.length;
	}

	get hasSearchField() {
		return !!this.searchField.length;
	}

	get hasMidContent() {
		return !!this.midContent.length;
	}

	get hasProfile() {
		return !!this.profile.length;
	}

	get hasMenuItems() {
		return this.menuItems.length > 0;
	}

	get imageBtnText() {
		return getEffectiveAriaLabelText(this);
	}

	get _shellbarText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_LABEL);
	}

	get _logoText() {
		return this.accessibilityAttributes.logo?.name || ShellBar.i18nBundle.getText(SHELLBAR_LOGO);
	}

	get _notificationsText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount || 0);
	}

	get _cancelBtnText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_CANCEL);
	}

	get _logoAreaText() {
		const primaryTitle = this.primaryTitle ?? "";
		const secondaryTitle = this.secondaryTitle ?? "";

		return ShellBar.i18nBundle.getText(SHELLBAR_LOGO_AREA, primaryTitle, secondaryTitle);
	}

	get _additionalContextText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_ADDITIONAL_CONTEXT);
	}

	get _searchFieldDescription() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCHFIELD_DESCRIPTION);
	}

	get _additionalContextRole() {
		if (this.additionalContext.length === 1) {
			return;
		}

		return "group";
	}

	get additionalContext() {
		return [...this.startContent, ...this.endContent];
	}

	get startContent() {
		// return all items before the ui5-shellbar-spacer
		const startContent = [];
		for (let i = 0; i < this.content.length; i++) {
			const child = this.content[i];
			if (child.hasAttribute("ui5-shellbar-spacer")) {
				break;
			}
			startContent.push(child);
		}
		return startContent;
	}

	get endContent() {
		// return all items after the ui5-shellbar-spacer
		const endContent = [];
		let spacerFound = false;
		for (let i = 0; i < this.content.length; i++) {
			const child = this.content[i];
			if (spacerFound) {
				endContent.push(child);
			}
			if (child.hasAttribute("ui5-shellbar-spacer")) {
				spacerFound = true;
			}
		}
		return endContent;
	}

	get _rightChildRole() {
		const items = this._getRightChildItems();
		const visibleItems = items.filter(item => {
			return this._isVisible(item);
		});

		if (visibleItems.length === 1) {
			return;
		}

		return "toolbar";
	}

	get _searchFieldExpanded() {
		return this.showSearchField;
	}

	get _searchFieldText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCH_FIELD);
	}

	get _searchBtnOpen() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCH_BTN_OPEN);
	}

	get _productSwitchBtnText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_PRODUCT_SWITCH_BTN);
	}

	get _showFullWidthSearch() {
		const size = this.breakpointSize;
		const searchBtnHidden = !!this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button.ui5-shellbar-hidden-button");

		return size === "S" || searchBtnHidden || this._lessSearchSpace;
	}

	get isSearchFieldVisible() {
		return this.searchField[0]?.offsetWidth || 0;
	}

	get _profileText() {
		return this.accessibilityAttributes.profile?.name as string || ShellBar.i18nBundle.getText(SHELLBAR_PROFILE);
	}

	get _productsText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_PRODUCTS);
	}

	get _searchText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_SEARCH);
	}

	get _overflowText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_OVERFLOW);
	}

	get hasAdditionalContext() {
		return this.additionalContext.length > 0;
	}

	get _hasVisibleStartContent() {
		return this.startContent.some(item => this.shadowRoot!.getElementById(item.slot) && !this.shadowRoot!.getElementById(item.slot)!.classList.contains("ui5-shellbar-hidden-button"));
	}

	get _hasVisibleEndContent() {
		return this.endContent.some(item => this.shadowRoot!.getElementById(item.slot) && !this.shadowRoot!.getElementById(item.slot)!.classList.contains("ui5-shellbar-hidden-button"));
	}

	get itemsToOverflow(): HTMLElement [] {
		const overflowActions = Array.from(this.shadowRoot!.querySelectorAll<HTMLElement>(".ui5-shellbar-button:not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-invisible-button):not(.ui5-shellbar-cancel-button):not(.ui5-shellbar-no-overflow-button)"));
		return [...this.additionalContextSorted.toReversed(), this.assistant[0], ...overflowActions.toReversed()].filter(Boolean);
	}

	get separatorsWidth() {
		const separatorsWidth = this.separators.reduce((acc, el) => acc + (el?.offsetWidth + this.domCalculatedValues("--_ui5-shellbar-content-margin-start")) || 0, 0);
		return separatorsWidth;
	}

	get searchFieldActualWidth() {
		return this.shadowRoot!.querySelector<HTMLElement>("[ui5-input]")?.offsetWidth || 0;
	}

	get separators() {
		const start = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-separator-start")!;
		const end = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-separator-end")!;
		return [start, end];
	}

	get additionalContextHidden() {
		return [...this.endContent, ...this.startContent].filter(item => this.shadowRoot!.getElementById(item.slot)! && this.shadowRoot!.getElementById(item.slot)!.classList.contains("ui5-shellbar-hidden-button"));
	}

	get _lessSearchSpace() {
		const targetContainer = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-spacer");
		const targetWidth = targetContainer?.offsetWidth || 0;
		const searchFieldWidth = this.domCalculatedValues("--_ui5_shellbar_search_field_width");
		const isFullSearchOpen = this.classList.contains("ui5-shellbar-with-full-searchfield");
		return this.breakpointSize === "M" && ((this.hasAdditionalContext && targetWidth <= 0) || (!isFullSearchOpen && targetWidth <= searchFieldWidth));
	}

	get accInfo() {
		const overflowExpanded = this.accessibilityAttributes.overflow?.expanded;

		return {
			notifications: {
				"title": this._notificationsText,
				"accessibilityAttributes": {
					expanded: this.accessibilityAttributes.notifications?.expanded,
					hasPopup: this.accessibilityAttributes.notifications?.hasPopup,
				},
			},
			profile: {
				"title": this._profileText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.profile?.hasPopup,
					expanded: this.accessibilityAttributes.profile?.expanded,
				},
			},
			products: {
				"title": this._productsText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.product?.hasPopup,
					expanded: this.accessibilityAttributes.product?.expanded,
				},
			},
			search: {
				"title": this._searchText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.search?.hasPopup,
				},
			},
			overflow: {
				"title": this._overflowText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.overflow?.hasPopup || "menu" as const,
					expanded: overflowExpanded === undefined ? this._overflowPopoverExpanded : overflowExpanded,
				},
			},
		};
	}

	get accLogoRole() {
		return this.accessibilityAttributes.logo?.role as string || "link";
	}

	get isSBreakPoint() {
		return this.breakpointSize === "S";
	}
}

ShellBar.define();

export default ShellBar;

export type {
	ShellBarContentItemVisibilityChangeEventDetail,
	ShellBarNotificationsClickEventDetail,
	ShellBarProfileClickEventDetail,
	ShellBarProductSwitchClickEventDetail,
	ShellBarLogoClickEventDetail,
	ShellBarMenuItemClickEventDetail,
	ShellBarAccessibilityAttributes,
	ShellBarSearchButtonEventDetail,
};
