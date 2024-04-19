import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import List from "@ui5/webcomponents/dist/List.js";
import type { ListSelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import type { IButton } from "@ui5/webcomponents/dist/Button.js";
import HasPopup from "@ui5/webcomponents/dist/types/HasPopup.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/grid.js";
import type { Timeout, ClassMap, AccessibilityAttributes } from "@ui5/webcomponents-base/dist/types.js";
import type ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import PopoverHorizontalAlign from "@ui5/webcomponents/dist/types/PopoverHorizontalAlign.js";
import type ShellBarItem from "./ShellBarItem.js";

// Templates
import ShellBarTemplate from "./generated/templates/ShellBarTemplate.lit.js";

// Styles
import shellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";

// Icons
import "@ui5/webcomponents-icons/dist/da.js";
import "@ui5/webcomponents-icons/dist/da-2.js";

import {
	SHELLBAR_LABEL,
	SHELLBAR_LOGO,
	SHELLBAR_COPILOT,
	SHELLBAR_NOTIFICATIONS,
	SHELLBAR_CANCEL,
	SHELLBAR_PROFILE,
	SHELLBAR_PRODUCTS,
	SHELLBAR_SEARCH,
	SHELLBAR_OVERFLOW,
} from "./generated/i18n/i18n-defaults.js";

type ShellBarAccessibilityRoles = {
	logoRole?: string;
};

type ShellBarAccessibilityTexts = {
	logoTitle?: string;
	profileButtonTitle?: string;
};

type ShellBarAccessibilityAttributesValue = Pick<AccessibilityAttributes, "expanded" | "hasPopup">;

type ShellBarAccessibilityAttributes = {
	notifications?: ShellBarAccessibilityAttributesValue;
	profile?: ShellBarAccessibilityAttributesValue;
	product?: ShellBarAccessibilityAttributesValue;
	search?: ShellBarAccessibilityAttributesValue;
	overflow?: ShellBarAccessibilityAttributesValue;
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

type ShellBarCoPilotClickEventDetail = {
	targetRef: HTMLElement;
};

type ShellBarMenuItemClickEventDetail = {
	item: HTMLElement;
};

type ShellBarSearchButtonEventDetail = {
	targetRef: HTMLElement;
	searchFieldVisible: boolean;
};

type ShellBarCoPilot = {
	animated?: boolean,
	animationValues?: string,
};

interface IShelBarItemInfo {
	id: string,
	icon?: string,
	text: string,
	priority: number,
	show: boolean,
	count?: string,
	custom?: boolean,
	title?: string,
	stableDomRef?: string,
	refItemid?: string,
	press: (e: MouseEvent) => void,
	styles: object,
	domOrder: number,
	classes: string,
	order?: number,
	profile?: boolean,
}

const HANDLE_RESIZE_DEBOUNCE_RATE = 200; // ms

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
 * - copilot
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
		StandardListItem,
	],
})
/**
 *
 * Fired, when the notification icon is activated.
 * @allowPreventDefault
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
})

/**
 * Fired, when the product switch icon is activated.
 *
 * **Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.
 * @allowPreventDefault
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
})

/**
 * Fired, when the co pilot is activated.
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @since 0.10
 * @public
 */
@event<ShellBarCoPilotClickEventDetail>("co-pilot-click", {
	detail: {
		/**
		 * @public
		 */
		targetRef: { type: HTMLElement },
	},
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
})

/**
 * Fired, when the search button is activated.
 *
 * **Note:** You can prevent expanding/collapsing of the search field by calling `event.preventDefault()`.
 * @allowPreventDefault
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @param {Boolean} searchFieldVisible whether the search field is visible
 * @public
 */

@event<ShellBarSearchButtonEventDetail>("search-button-click", {
	detail: {
		targetRef: { type: HTMLElement },
		searchFieldVisible: { type: Boolean },
	},
})

class ShellBar extends UI5Element {
	/**
	 * Defines the `primaryTitle`.
	 *
	 * **Note:** The `primaryTitle` would be hidden on S screen size (less than approx. 700px).
	 * @default ""
	 * @public
	 */
	@property()
	primaryTitle!: string;

	/**
	 * Defines the `secondaryTitle`.
	 *
	 * **Note:** The `secondaryTitle` would be hidden on S and M screen sizes (less than approx. 1300px).
	 * @default ""
	 * @public
	 */
	@property()
	secondaryTitle!: string;

	/**
	 * Defines the `notificationsCount`,
	 * displayed in the notification icon top-right corner.
	 * @default ""
	 * @public
	 */
	@property()
	notificationsCount!: string;

	/**
	 * Defines, if the notification icon would be displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showNotifications!: boolean;

	/**
	 * Defines, if the product switch icon would be displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showProductSwitch!: boolean;

	/**
	 * Defines, if the product CoPilot icon would be displayed.
	 *
	 * **Note:** By default the co-pilot is displayed as static SVG.
	 * If you need an animated co-pilot, you can import the `"@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js"` module as add-on feature.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showCoPilot!: boolean;

	/**
	 * Defines, if the Search Field would be displayed when there is a valid `searchField` slot.
	 *
	 * **Note:** By default the Search Field is not displayed.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField!: boolean;

	/**
	 * An object of strings that defines additional accessibility roles for further customization.
	 *
	 * It supports the following fields:
	 *  - `logoRole`: the accessibility role for the `logo`
	 * @default {}
	 * @public
	 * @since 1.6.0
	 */
	@property({ type: Object })
	accessibilityRoles!: ShellBarAccessibilityRoles;

	/**
	 * An object of strings that defines several additional accessibility texts
	 * for even further customization.
	 *
	 * It supports the following fields:
	 * - `profileButtonTitle`: defines the tooltip for the profile button
	 * - `logoTitle`: defines the tooltip for the logo
	 * @default {}
	 * @public
	 * @since 1.1.0
	 */
	@property({ type: Object })
	accessibilityTexts!: ShellBarAccessibilityTexts;

	/**
	 * Defines additional accessibility attributes for the following areas of the component:
	 * - notifications
	 * - profile
	 * - product
	 * - search
	 * - overflow
	 *
	 * The following accessibility attributes are available for each area, described above:
	 *
	 * - **expanded**: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed.
	 * Accepts the following string values: `true` | `false`
	 *
	 * - **hasPopup**: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button.
	 * Accepts the following string values: `dialog` | `grid` | listbox` | `menu` | `tree`.
	 *
	 * **Example:**
	 * myShellBarRef.accessibilityAttributes = {
	 *  notifications: {
	 *     hasPopup: "menu"
	 *  }
	 * }
	 *
	 * @default {}
	 * @public
	 * @since 1.10.0
	 */
	 @property({ type: Object })
	 accessibilityAttributes!: ShellBarAccessibilityAttributes;

	/**
	 * @private
	 */
	@property()
	breakpointSize!: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	withLogo!: boolean;

	@property({ type: Object })
	_itemsInfo!: Array<IShelBarItemInfo>;

	@property({ type: Object, multiple: true })
	_menuPopoverItems: Array<HTMLElement>;

	@property({ type: Boolean, noAttribute: true })
	_menuPopoverExpanded!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_overflowPopoverExpanded!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_fullWidthSearch!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_coPilotPressed!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_isXXLBreakpoint!: boolean;

	/**
	 * Defines the `ui5-shellbar` aditional items.
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
	 * Defines the items displayed in menu after a click on the primary title.
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
	 * We encourage this slot to be used for a back or home button.
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

	static i18nBundle: I18nBundle;
	overflowPopover?: Popover | null;
	menuPopover?: Popover | null;
	_isInitialRendering: boolean;
	_defaultItemPressPrevented: boolean;
	menuItemsObserver: MutationObserver;
	coPilot?: ShellBarCoPilot;
	_coPilotIcon: string;
	_debounceInterval?: Timeout | null;
	_hiddenIcons: Array<IShelBarItemInfo>;
	_handleResize: ResizeObserverCallback;
	_headerPress: () => void;

	static get CO_PILOT_ICON_PRESSED() {
		return "sap-icon://da-2";
	}

	static get CO_PILOT_ICON_UNPRESSED() {
		return "sap-icon://da";
	}

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
		this._coPilotIcon = ShellBar.CO_PILOT_ICON_UNPRESSED;

		// marks if preventDefault() is called in item's press handler
		this._defaultItemPressPrevented = false;

		this.menuItemsObserver = new MutationObserver(() => {
			this._updateClonedMenuItems();
		});

		this._headerPress = () => {
			this._updateClonedMenuItems();

			if (this.hasMenuItems) {
				const menuPopover = this._getMenuPopover();
				menuPopover.showAt(this.shadowRoot!.querySelector<Button>(".ui5-shellbar-menu-button")!, true);
			}
		};

		this._handleResize = () => {
			this._debounce(() => {
				this.menuPopover = this._getMenuPopover();
				this.overflowPopover = this._getOverflowPopover();
				this.overflowPopover.close();
				this._overflowActions();
			}, HANDLE_RESIZE_DEBOUNCE_RATE);
		};
	}

	_toggleCoPilotIcon(button: ToggleButton) {
		this._coPilotIcon = !this._coPilotPressed ? ShellBar.CO_PILOT_ICON_PRESSED : ShellBar.CO_PILOT_ICON_UNPRESSED;
		button.icon = this._coPilotIcon;
		this._coPilotPressed = !this._coPilotPressed;
	}

	_debounce(fn: () => void, delay: number) {
		clearTimeout(this._debounceInterval!);
		this._debounceInterval = setTimeout(() => {
			this._debounceInterval = null;
			fn();
		}, delay);
	}

	_menuItemPress(e: CustomEvent<ListSelectionChangeEventDetail>) {
		const shouldContinue = this.fireEvent<ShellBarMenuItemClickEventDetail>("menu-item-click", {
			item: e.detail.selectedItems[0],
		}, true);
		if (shouldContinue) {
			this.menuPopover!.close();
		}
	}

	_logoPress() {
		this.fireEvent<ShellBarLogoClickEventDetail>("logo-click", {
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

	_fireCoPilotClick(e: Event) {
		this.fireEvent<ShellBarCoPilotClickEventDetail>("co-pilot-click", {
			targetRef: this.shadowRoot!.querySelector(".ui5-shellbar-coPilot")!,
		});
		this._toggleCoPilotIcon(e.target as ToggleButton);
	}

	_coPilotClick(e: MouseEvent) {
		this._fireCoPilotClick(e);
	}

	onBeforeRendering() {
		const animationsOn = getAnimationMode() === AnimationMode.Full;
		const coPilotAnimation = getFeature("CoPilotAnimation");
		this.coPilot = coPilotAnimation && animationsOn ? coPilotAnimation : { animated: false };
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
	}

	onAfterRendering() {
		this._overflowActions();

		this._fullWidthSearch = this._showFullWidthSearch;
	}

	/**
	 * Closes the overflow area.
	 * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
	 * @public
	 */
	closeOverflow(): void {
		if (this.overflowPopover) {
			this.overflowPopover.close();
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
		return mappedSize;
	}

	_handleSizeS() {
		const hasIcons = this.showNotifications || this.showProductSwitch || !!this.searchField.length || !!this.items.length;

		const newItems = this._getAllItems(hasIcons).map((info): IShelBarItemInfo => {
			const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
			const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
			const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);

			return {
				...info,
				classes: `${info.classes} ${shouldStayOnScreen ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-button`,
				styles: {
					order: shouldStayOnScreen ? 1 : -1,
				},
			};
		});

		this._updateItemsInfo(newItems);
	}

	_handleActionsOverflow() {
		const rightContainerRect = this.shadowRoot!.querySelector(".ui5-shellbar-overflow-container-right")!.getBoundingClientRect();
		let overflowSelector = ".ui5-shellbar-button:not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-invisible-button)";

		if (this.showSearchField) {
			overflowSelector += ",.ui5-shellbar-search-field";
		}

		const elementsToOverflow = this.shadowRoot!.querySelectorAll<Button>(overflowSelector);
		const isRTL = this.effectiveDir === "rtl";

		const overflowButtons = [...elementsToOverflow].filter(icon => {
			const iconRect = (icon).getBoundingClientRect();

			if (isRTL) {
				return (iconRect.left + iconRect.width) > (rightContainerRect.left + rightContainerRect.width);
			}

			return iconRect.left < rightContainerRect.left;
		});
		const showOverflowButton = !!overflowButtons.length;

		const items = this._getAllItems(showOverflowButton).filter(item => item.show);

		const itemsByPriority = items.sort((item1, item2) => {
			if (item1.priority > item2.priority) {
				return 1;
			}

			if (item1.priority < item2.priority) {
				return -1;
			}

			return 0;
		});

		for (let i = 0; i < itemsByPriority.length; i++) {
			if (i < overflowButtons.length) {
				itemsByPriority[i].classes = `${itemsByPriority[i].classes} ui5-shellbar-hidden-button`;
				itemsByPriority[i].styles = {
					order: -1,
				};
			}
		}

		return itemsByPriority;
	}

	_overflowActions() {
		const size = this._handleBarBreakpoints();

		if (size === "S") {
			return this._handleSizeS();
		}

		const newItems = this._handleActionsOverflow();
		this._updateItemsInfo(newItems);
	}

	_toggleActionPopover() {
		const overflowButton = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-overflow-button")!;
		const overflowPopover = this._getOverflowPopover();
		overflowPopover.showAt(overflowButton, true);
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		this.menuItemsObserver.disconnect();
		ResizeHandler.deregister(this, this._handleResize);
		clearTimeout(this._debounceInterval!);
		this._debounceInterval = null;
	}

	_handleSearchIconPress() {
		const searchButtonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button")!;
		const defaultPrevented = !this.fireEvent<ShellBarSearchButtonEventDetail>("search-button-click", {
			targetRef: searchButtonRef,
			searchFieldVisible: this.showSearchField,
		}, true);

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

		this._defaultItemPressPrevented = !this.fireEvent<ShellBarNotificationsClickEventDetail>("notifications-click", {
			targetRef: notificationIconRef.classList.contains("ui5-shellbar-hidden-button") ? target : notificationIconRef,
		}, true);
	}

	_handleProfilePress() {
		this.fireEvent<ShellBarProfileClickEventDetail>("profile-click", {
			targetRef: this.shadowRoot!.querySelector<Button>(".ui5-shellbar-image-button")!,
		});
	}

	_handleCancelButtonPress() {
		this.showSearchField = false;
	}

	_handleProductSwitchPress(e: MouseEvent) {
		const buttonRef = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-button-product-switch")!,
			target = e.target as HTMLElement;

		this._defaultItemPressPrevented = !this.fireEvent<ShellBarProductSwitchClickEventDetail>("product-switch-click", {
			targetRef: buttonRef.classList.contains("ui5-shellbar-hidden-button") ? target : buttonRef,
		}, true);
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
	 * Returns the `copilot` DOM ref.
	 * @public
	 * @default null
	 * @since 1.0.0-rc.16
	 */
	get copilotDomRef(): HTMLElement | null {
		return this.shadowRoot!.querySelector<HTMLElement>(`*[data-ui5-stable="copilot"]`);
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
	_getAllItems(showOverflowButton: boolean) {
		let domOrder = -1;
		const search = {
			icon: "search",
			text: this._searchText,
			classes: `${this.searchField.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,
			priority: 4,
			domOrder: this.searchField.length ? (++domOrder) : -1,
			styles: {
				order: this.searchField.length ? 1 : -10,
			},
			id: `${this._id}-item-${1}`,
			press: this._handleSearchIconPress.bind(this),
			show: !!this.searchField.length,
		};

		const items: Array<IShelBarItemInfo> = [
			{
				icon: this._coPilotIcon,
				text: this._copilotText,
				classes: `${this.showCoPilot ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,
				priority: 4,
				domOrder: this.showCoPilot ? (++domOrder) : -1,
				styles: {
					order: this.showCoPilot ? 1 : -10,
				},
				id: `${this.id}-item-coPilot`,
				press: this._coPilotClick.bind(this),
				show: !!this.showCoPilot,
			},
			...this.items.map((item: ShellBarItem) => {
				item._getRealDomRef = () => this.getDomRef()!.querySelector(`*[data-ui5-stable=${item.stableDomRef}]`)!;
				return {
					icon: item.icon,
					id: item._id,
					count: item.count || undefined,
					refItemid: item._id,
					text: item.text,
					classes: "ui5-shellbar-custom-item ui5-shellbar-button",
					priority: 1,
					domOrder: (++domOrder),
					styles: {
						order: 2,
					},
					show: true,
					press: this._handleCustomActionPress.bind(this),
					custom: true,
					title: item.title,
					stableDomRef: item.stableDomRef,
				};
			}),
			{
				icon: "bell",
				text: this._notificationsText,
				classes: `${this.showNotifications ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,
				priority: 3,
				styles: {
					order: this.showNotifications ? 3 : -10,
				},
				id: `${this._id}-item-${2}`,
				show: this.showNotifications,
				domOrder: this.showNotifications ? (++domOrder) : -1,
				press: this._handleNotificationsPress.bind(this),
			},
			{
				icon: "overflow",
				text: "Overflow",
				classes: `${showOverflowButton ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-overflow-button-shown ui5-shellbar-overflow-button ui5-shellbar-button`,
				priority: 5,
				order: 4,
				styles: {
					order: showOverflowButton ? 4 : -1,
				},
				domOrder: showOverflowButton ? (++domOrder) : -1,
				id: `${this.id}-item-${5}`,
				press: this._handleOverflowPress.bind(this),
				show: true,
			},
			{
				text: "Person",
				classes: `${this.hasProfile ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-image-button ui5-shellbar-button`,
				priority: 4,
				styles: {
					order: this.hasProfile ? 5 : -10,
				},
				profile: true,
				id: `${this._id}-item-${3}`,
				domOrder: this.hasProfile ? (++domOrder) : -1,
				show: this.hasProfile,
				press: this._handleProfilePress.bind(this),
			},
			{
				icon: "grid",
				text: this._productsText,
				classes: `${this.showProductSwitch ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-button ui5-shellbar-button-product-switch`,
				priority: 2,
				styles: {
					order: this.showProductSwitch ? 6 : -10,
				},
				id: `${this._id}-item-${4}`,
				show: this.showProductSwitch,
				domOrder: this.showProductSwitch ? (++domOrder) : -1,
				press: this._handleProductSwitchPress.bind(this),
			},
		];
		if (this.midContent.length < 1 && items[0].text !== this._searchText) {
			items.unshift(search);
		}
		return items;
	}

	_updateItemsInfo(newItems: Array<IShelBarItemInfo>) {
		const isDifferent = JSON.stringify(this._itemsInfo) !== JSON.stringify(newItems);
		if (isDifferent) {
			this._itemsInfo = newItems;
		}
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
					"ui5-shellbar-hidden-button": this.isIconHidden("grid"),
				},
				search: {
					"ui5-shellbar-hidden-button": this.isIconHidden("search"),
				},
				copilot: {
					"ui5-shellbar-hidden-button": this.isIconHidden(this._coPilotIcon),
					"ui5-shellbar-coPilot-pressed": this._coPilotPressed,
				},
				overflow: {
					"ui5-shellbar-hidden-button": this.isIconHidden("overflow"),
				},
			},
		};
	}

	get styles() {
		return {
			items: {
				notification: {
					"order": this.isIconHidden("bell") ? "-1" : "3",
				},
				overflow: {
					"order": this.isIconHidden("overflow") ? "-1" : "4",
				},
				profile: {
					"order": this.hasProfile ? "5" : "-1",
				},
				product: {
					"order": this.isIconHidden("grid") ? "-1" : "6",
				},
			},
			searchField: {
				"display": this.correctSearchFieldStyles,
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
		return this.hasLogo && this.breakpointSize === "S";
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

	get _shellbarText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_LABEL);
	}

	get _logoText() {
		return this.accessibilityTexts.logoTitle || ShellBar.i18nBundle.getText(SHELLBAR_LOGO);
	}

	get _copilotText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_COPILOT);
	}

	get _notificationsText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount);
	}

	get _cancelBtnText() {
		return ShellBar.i18nBundle.getText(SHELLBAR_CANCEL);
	}

	get _showFullWidthSearch() {
		const size = this._handleBarBreakpoints();
		const searchBtnHidden = !!this.shadowRoot!.querySelector<Button>(".ui5-shellbar-search-button.ui5-shellbar-hidden-button");

		return ((size === "S") || searchBtnHidden);
	}

	get _profileText() {
		return this.accessibilityTexts.profileButtonTitle || ShellBar.i18nBundle.getText(SHELLBAR_PROFILE);
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

	get accInfo() {
		return {
			notifications: {
				"title": this._notificationsText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.notifications?.hasPopup,
				},
			},
			profile: {
				"title": this._profileText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.profile?.hasPopup,
				},
			},
			products: {
				"title": this._productsText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.product?.hasPopup,
				},
			},
			search: {
				"title": this._searchText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.search?.hasPopup,
					expanded: this.showSearchField,
				},
			},
			overflow: {
				"title": this._overflowText,
				"accessibilityAttributes": {
					hasPopup: this.accessibilityAttributes.overflow?.hasPopup || HasPopup.Menu.toLowerCase(),
					expanded: this._overflowPopoverExpanded,
				},
			},
		};
	}

	get accLogoRole() {
		return this.accessibilityRoles.logoRole || "button";
	}

	static async onDefine() {
		ShellBar.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}
}

ShellBar.define();

export default ShellBar;

export type {
	ShellBarNotificationsClickEventDetail,
	ShellBarProfileClickEventDetail,
	ShellBarProductSwitchClickEventDetail,
	ShellBarLogoClickEventDetail,
	ShellBarCoPilotClickEventDetail,
	ShellBarMenuItemClickEventDetail,
	ShellBarAccessibilityAttributes,
	ShellBarAccessibilityRoles,
	ShellBarAccessibilityTexts,
	ShellBarSearchButtonEventDetail,
};
