import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type AriaRole from "@ui5/webcomponents-base/dist/types/AriaRole.js";
import AriaHasPopup from "@ui5/webcomponents-base/dist/types/AriaHasPopup.js";
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
import type { ClassMap, AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import throttle from "@ui5/webcomponents-base/dist/util/throttle.js";
import type ShellBarVariant from "./types/ShellBarVariant.js";
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

type LowercaseString<T> = T extends string ? Lowercase<T> : never;
type ShellBarLogoAccessibilityAttributes = {
	role?: Extract<LowercaseString<AriaRole>, "button" | "link">,
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

type ShellBarAdditionalContextItemDisappearsEventDetail = {
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

const ADDITIONAL_CONTEXT_ITEM_MARGIN = 16; // px
const SEPARATOR_MARGIN = 16; // px
const OVERFLOW_ITEM_MARGIN = 8; // px

// actions always visible in lean mode, order is important
const INCLUDED_LEAN_MODE_ACTIONS = ["feedback", "sys-help"];

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
@event<ShellBarNotificationsClickEventDetail>("notifications-click", {
	detail: {
		/**
		 * @public
		 */
		targetRef: { type: HTMLElement },
	},
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when the profile slot is present.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event<ShellBarProfileClickEventDetail>("profile-click", {
	detail: {
		/**
		 * @public
		 */
		targetRef: { type: HTMLElement },
	},
	bubbles: true,
})

/**
 * Fired, when the product switch icon is activated.
 *
 * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event<ShellBarProductSwitchClickEventDetail>("product-switch-click", {
	detail: {
		/**
		 * @public
		 */
		targetRef: { type: HTMLElement },
	},
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when the logo is activated.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @since 0.10
 * @public
 */
@event<ShellBarLogoClickEventDetail>("logo-click", {
	detail: {
		/**
		 * @public
		 */
		targetRef: { type: HTMLElement },
	},
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
@event<ShellBarMenuItemClickEventDetail>("menu-item-click", {
	detail: {
		/**
		 * @public
		 */
		item: { type: HTMLElement },
	},
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

@event<ShellBarSearchButtonEventDetail>("search-button-click", {
	detail: {
		targetRef: { type: HTMLElement },
		searchFieldVisible: { type: Boolean },
	},
	cancelable: true,
	bubbles: true,
})

/**
 * Fired, when an additional context item disappears
 *
 * @param {Array<HTMLElement>} array of all the items that disappeared from additional context slot
 * @public
 */
@event<ShellBarAdditionalContextItemDisappearsEventDetail>("additional-context-disappears", {
	detail: {
		/**
		 * @public
		 */
		items: { type: Array<HTMLElement> },
	},
	bubbles: true,
	cancelable: true,
})

class ShellBar extends UI5Element {
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
	 * Defines the mode Shellbar is presented in.
	 *
	 * @default false
	 * @public
	 * @since 2.5.0
	 */
	@property()
	variant: `${ShellBarVariant}` = "Full"

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
	breakpointSize?: string;

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
	_isXXLBreakpoint = false;

	@property({ type: Boolean, noAttribute: true })
	_isSBreakpoint = false;

	@property({ type: Boolean, noAttribute: true })
	hasVisibleAdditionalContextStart = false;

	@property({ type: Boolean, noAttribute: true })
	hasVisibleAdditionalContextEnd = false;

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
	 * Define the items displayed in the start of the additional content area.
	 * @public
	 * @since 2.5.0
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	additionalContextStart!: Array<HTMLElement>;

	/**
	 * Define the items displayed in the end of the additional content area.
	 * @public
	 * @since 2.5.0
	 */
	@slot({ type: HTMLElement, individualSlots: true })
	additionalContextEnd!: Array<HTMLElement>;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;
	overflowPopover?: Popover | null;
	menuPopover?: Popover | null;
	_isInitialRendering: boolean;
	_defaultItemPressPrevented: boolean;
	menuItemsObserver: MutationObserver;
	_hiddenIcons: Array<IShelBarItemInfo>;
	_handleResize: ResizeObserverCallback;
	_overflowNotifications: string | null;
	_showSearchField = false;
	_skipLayout = false;
	_lastOffsetWidth = 0;
	_lessSearchSpace = false;

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
				this.showSearchField = false;
				this._overflowActions();
			}
		}, RESIZE_THROTTLE_RATE);
	}

	_onKeyDown(e: KeyboardEvent) {
		const items = this._getVisibleAndInteractiveItems();
		const activeElement = this._getActiveElement();
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

	_getActiveElement() {
		const activeElement = document.activeElement;

		if (activeElement === this) {
			return activeElement.shadowRoot!.activeElement;
		}

		return activeElement;
	}

	_getNavigableContent() {
		return [
			...this.startButton,
			...this.logo,
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-logo"),
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-logo-area"),
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-menu-button"),
			...this.additionalContextStart,
			...this.additionalContextEnd,
			...this._getRightChildItems(),
		] as HTMLElement[];
	}

	_getRightChildItems() {
		return [
			...this.shadowRoot!.querySelectorAll(".ui5-shellbar-search-item-for-arrow-nav"),
			...this.searchField,
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
		const shouldContinue = this.fireDecoratorEvent<ShellBarMenuItemClickEventDetail>("menu-item-click", {
			item: e.detail.selectedItems[0],
		});
		if (shouldContinue) {
			this.menuPopover!.open = false;
		}
	}

	_logoPress() {
		this.fireDecoratorEvent<ShellBarLogoClickEventDetail>("logo-click", {
			targetRef: this.shadowRoot!.querySelector(".ui5-shellbar-logo")!,
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

	onBeforeRendering() {
		const input = this.searchField[0]?.shadowRoot!.querySelector(".ui5-input-inner");

		this.withLogo = this.hasLogo;

		this._hiddenIcons = this._itemsInfo.filter(info => {
			const isHidden = (info.classes.indexOf("ui5-shellbar-hidden-button") !== -1);
			const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
			const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);

			return isHidden && isSet && !shouldStayOnScreen;
		});

		if (input) {
			input.role = "searchbox";
			// Temporary workaround: Adding aria-description to the aria-label since the input element lacks an aria-description.
			input.ariaLabel = `${this._searchFieldText} ${this._searchFieldDescription}`;
		}

		this._observeMenuItems();
		this._updateSeparatorsVisibility();
	}

	get additionalContextSorted() {
		return [...this.additionalContextStart, ...this.additionalContextEnd].sort((a, b) => {
			return parseInt(a.getAttribute("data-priority") || "0") - parseInt(b.getAttribute("data-priority") || "0");
		});
	}

	get additionalContextContainer() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-overflow-container-additional-content");
	}

	get spacerWidth() {
		return this.spacer?.offsetWidth || 0;
	}

	get spacer() {
		return this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-spacer")!;
	}

	onAfterRendering() {
		requestAnimationFrame(() => {
			this._lastOffsetWidth = this.offsetWidth;
			this._overflowActions();

			const targetContainer = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-overflow-container-additional-content");
			const targetWidth = targetContainer?.offsetWidth || 0;
			this._lessSearchSpace = this.hasAdditionalContext && targetWidth <= 0;
		});
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

		this._isXXLBreakpoint = this.breakpointSize === "XXL";
		this._isSBreakpoint = this.breakpointSize === "S";
		return mappedSize;
	}

	_handleSizeS() {
		const hasIcons = [this.showNotifications, this.searchField.length, this.items.length].reduce((acc: number, val) => {
			return acc + Number(val);
		}, 0);

		const newItems = this._getAllItems(hasIcons > 1).filter(i => i.show).map((info): IShelBarItemInfo => {
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
			const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile) || !this._isFullVariant;

			return {
				...info,
				classes: `${info.classes} ${shouldStayOnScreen ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-button`,
			};
		});

		this._updateItemsInfo(newItems);
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
		if (this.assistant.length) {
			const assistantInfo = items.find(item => item.text === "Assistant");
			this.assistant[0].classList.remove("ui5-shellbar-hidden-button");
			if (assistantInfo && assistantInfo.classes.indexOf("ui5-shellbar-hidden-button") > 0) {
				this.assistant[0].classList.add("ui5-shellbar-hidden-button");
			}
		}

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

			const itemWidth = item.offsetWidth + ADDITIONAL_CONTEXT_ITEM_MARGIN;
			usedWidth += itemWidth;

			if (usedWidth > totalWidth) {
				item.classList.add("ui5-shellbar-hidden-button");
			}
		}
	}

	_handleActionsOverflow() {
		const itemsToOverflow = this.itemsToOverflow;
		const container = this.shadowRoot!.querySelector<HTMLElement>(".ui5-shellbar-overflow-container-right")!;
		const nonDisappearingItems = Array.from(container.querySelectorAll<HTMLElement>(".ui5-shellbar-no-overflow-button"));
		const nonDisappearingItemsWidth = nonDisappearingItems.reduce((acc, el) => acc + el.offsetWidth + OVERFLOW_ITEM_MARGIN, 0);
		const totalWidth = container.offsetWidth - nonDisappearingItemsWidth - this.separatorsWidth;


		let usedWidth = 0;
		let hiddenItems = 0;
		let restoreVisibility = false;

		// first check how many items can fit without overflowing
		for (let i = 0; i < itemsToOverflow.length; i++) {
			// reset item visibility before calculating
			const item = itemsToOverflow[i];
			if (item.classList.contains("ui5-shellbar-hidden-button")) {
				item.classList.remove("ui5-shellbar-hidden-button");
				restoreVisibility = true;
			}
			const isAdditionalContext = this.additionalContextSorted.includes(item);
			const gap = isAdditionalContext ? ADDITIONAL_CONTEXT_ITEM_MARGIN : OVERFLOW_ITEM_MARGIN;
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
		if (!this._isFullVariant) {
			return items;
		}
		// start hiding the actions on the right (overflow actions) first
		this._hideOverflowItems(hiddenItems, items);
		// last, start hiding the items that are in the additional context
		this._hideAdditionalContext();

		if (this.additionalCoontextHidden && JSON.stringify(this.additionalCoontextHidden) !== JSON.stringify(this._cachedHiddenContent)) {
			this.fireDecoratorEvent("additional-context-disappears", { items: this.additionalCoontextHidden });
		}

		this._cachedHiddenContent = this.additionalCoontextHidden;

		return items;
	}

	_overflowActions() {
		const size = this._handleBarBreakpoints();

		if (size === "S") {
			return this._handleSizeS();
		}

		const newItems = this._handleActionsOverflow();
		this._updateSeparatorsVisibility();
		this._updateItemsInfo(newItems);
		this._updateOverflowNotifications();
	}

	_updateSeparatorsVisibility() {
		this.hasVisibleAdditionalContextStart = this._hasVisibleAdditionalContextStart;
		this.hasVisibleAdditionalContextEnd = this._hasVisibleAdditionalContextEnd;
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
	}

	onExitDOM() {
		this.menuItemsObserver.disconnect();
		ResizeHandler.deregister(this, this._handleResize);
	}

	_handleSearchIconPress() {
		const searchButtonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button")!;
		const defaultPrevented = !this.fireDecoratorEvent<ShellBarSearchButtonEventDetail>("search-button-click", {
			targetRef: searchButtonRef,
			searchFieldVisible: this.showSearchField,
		});

		if (defaultPrevented) {
			return;
		}
		this.showSearchField = !this.showSearchField;

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

		this._defaultItemPressPrevented = !this.fireDecoratorEvent<ShellBarNotificationsClickEventDetail>("notifications-click", {
			targetRef: notificationIconRef.classList.contains("ui5-shellbar-hidden-button") ? target : notificationIconRef,
		});
	}

	_handleProfilePress() {
		this.fireDecoratorEvent<ShellBarProfileClickEventDetail>("profile-click", {
			targetRef: this.shadowRoot!.querySelector<Button>(".ui5-shellbar-image-button")!,
		});
	}

	_handleCancelButtonPress() {
		this.showSearchField = false;
	}

	_handleProductSwitchPress(e: MouseEvent) {
		const buttonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-button-product-switch")!,
			target = e.target as HTMLElement;

		this._defaultItemPressPrevented = !this.fireDecoratorEvent<ShellBarProductSwitchClickEventDetail>("product-switch-click", {
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
				show: !!this.searchField.length && this._isFullVariant,
				tooltip: this._searchText,
			},
			{
				icon: "da",
				text: "Assistant",
				classes: `${this.assistant.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-button`,
				id: `${this._id}-item-${4}`,
				show: !!this.assistant.length && this._isFullVariant,
				domOrder: this.assistant.length ? (++domOrder) : -1,
				press: () => { },
			},
			{
				icon: "bell",
				title: this._notificationsText,
				text: ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS_NO_COUNT),
				count: this.notificationsCount,
				classes: `${this.showNotifications ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,
				id: `${this._id}-item-${2}`,
				show: this.showNotifications && this._isFullVariant,
				domOrder: this.showNotifications ? (++domOrder) : -1,
				press: this._handleNotificationsPress.bind(this),
			},
			// sort feedback and help to always be last
			...this.items.sort((a, b) => {
				const aIndex = INCLUDED_LEAN_MODE_ACTIONS.indexOf(a.icon || "");
				const bIndex = INCLUDED_LEAN_MODE_ACTIONS.indexOf(b.icon || "");
				return aIndex - bIndex;
			}).map((item: ShellBarItem) => {
				item._getRealDomRef = () => this.getDomRef()!.querySelector(`*[data-ui5-stable=${item.stableDomRef}]`)!;
				// check if included for lean mode
				const show = this._isFullVariant || (item.icon && INCLUDED_LEAN_MODE_ACTIONS.includes(item.icon)) || false;
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
					tooltip: this._notificationsText,
				};
			}),
			{
				icon: "overflow",
				text: "Overflow",
				classes: `${showOverflowButton ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-no-overflow-button ui5-shellbar-overflow-button ui5-shellbar-button`,
				domOrder: showOverflowButton ? (++domOrder) : -1,
				id: `${this.id}-item-${5}`,
				press: this._handleOverflowPress.bind(this),
				show: this._isFullVariant,
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
				show: this.showProductSwitch && this._isFullVariant,
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
				},
				overflow: {
					"ui5-shellbar-hidden-button": this._hiddenIcons.length === 0,
					"ui5-shellbar-no-overflow-button": true,
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
						"visibility": this.hasVisibleAdditionalContextStart ? "" : "hidden",
					},
				},
				end: {
					separator: {
						"visibility": this.hasVisibleAdditionalContextEnd ? "" : "hidden",
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
		const additionalContext = [...this.additionalContextEnd, ...this.additionalContextStart];

		if (additionalContext.length === 1) {
			return;
		}

		return "group";
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
		const size = this._handleBarBreakpoints();
		const searchBtnHidden = !!this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button.ui5-shellbar-hidden-button");

		return size === "S" || searchBtnHidden || this._lessSearchSpace;
	}

	get isSearchFieldVisible() {
		return this.searchField[0]?.offsetWidth || 0;
	}

	get _profileText() {
		return this.accessibilityAttributes.profile?.name || ShellBar.i18nBundle.getText(SHELLBAR_PROFILE);
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

	get _isFullVariant() {
		return this.variant === "Full";
	}

	get hasAdditionalContext() {
		return this.additionalContextStart.length > 0 || this.additionalContextEnd.length > 0;
	}

	get showAdditionalContext() {
		return this._isFullVariant && !this._isSBreakpoint && this.hasAdditionalContext;
	}

	get _hasVisibleAdditionalContextStart() {
		return this.additionalContextStart.some(item => !item.classList.contains("ui5-shellbar-hidden-button"));
	}

	get _hasVisibleAdditionalContextEnd() {
		return this.additionalContextEnd.some(item => !item.classList.contains("ui5-shellbar-hidden-button"));
	}

	get itemsToOverflow(): HTMLElement [] {
		const overflowActions = Array.from(this.shadowRoot!.querySelectorAll<HTMLElement>(".ui5-shellbar-button:not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-invisible-button):not(.ui5-shellbar-cancel-button):not(.ui5-shellbar-no-overflow-button)"));
		return [...this.additionalContextSorted.toReversed(), this.assistant[0], ...overflowActions.toReversed()].filter(Boolean);
	}

	get separatorsWidth() {
		const separatorsWidth = this.separators.reduce((acc, el) => acc + (el?.offsetWidth + SEPARATOR_MARGIN) || 0, 0);
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

	get additionalCoontextHidden() {
		return [...this.additionalContextEnd, ...this.additionalContextStart].filter(item => item.classList.contains("ui5-shellbar-hidden-button"));
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
					hasPopup: this.accessibilityAttributes.overflow?.hasPopup || AriaHasPopup.Menu.toLowerCase(),
					expanded: overflowExpanded === undefined ? this._overflowPopoverExpanded : overflowExpanded,
				},
			},
		};
	}

	get accLogoRole() {
		return this.accessibilityAttributes.logo?.role || "link";
	}
}

ShellBar.define();

export default ShellBar;

export type {
	ShellBarAdditionalContextItemDisappearsEventDetail,
	ShellBarNotificationsClickEventDetail,
	ShellBarProfileClickEventDetail,
	ShellBarProductSwitchClickEventDetail,
	ShellBarLogoClickEventDetail,
	ShellBarMenuItemClickEventDetail,
	ShellBarAccessibilityAttributes,
	ShellBarSearchButtonEventDetail,
};
