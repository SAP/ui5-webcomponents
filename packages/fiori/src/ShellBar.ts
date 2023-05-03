import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
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
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import List from "@ui5/webcomponents/dist/List.js";
import type { SelectionChangeEventDetail } from "@ui5/webcomponents/dist/List.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import type Input from "@ui5/webcomponents/dist/Input.js";
import HasPopup from "@ui5/webcomponents/dist/types/HasPopup.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents-icons/dist/bell.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import "@ui5/webcomponents-icons/dist/grid.js";
import type { Timeout, ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import type ShellBarItem from "./ShellBarItem.js";

// Templates
import ShellBarTemplate from "./generated/templates/ShellBarTemplate.lit.js";
import ShellBarPopoverTemplate from "./generated/templates/ShellBarPopoverTemplate.lit.js";

// Styles
import shellBarStyles from "./generated/themes/ShellBar.css.js";
import ShellBarPopoverCss from "./generated/themes/ShellBarPopover.css.js";

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

type AccessibilityRoles = {
	logoRole?: string;
};

type AccessibilityTexts = {
	logoTitle?: string;
	profileButtonTitle?: string;
};

type AccessibilityAttributesValue = {
	ariaHasPopup?: string;
	expanded?: boolean;
}

type AccessibilityAttributes = {
	notifications?: AccessibilityAttributesValue;
	profile?: AccessibilityAttributesValue;
	product?: AccessibilityAttributesValue;
	search?: AccessibilityAttributesValue;
	overflow?: AccessibilityAttributesValue;
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
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-shellbar</code> is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 * <br><br>
 *
 * <h3>Stable DOM Refs</h3>
 *
 * You can use the following stable DOM refs for the <code>ui5-shellbar</code>:
 * <ul>
 * <li>logo</li>
 * <li>copilot</li>
 * <li>notifications</li>
 * <li>overflow</li>
 * <li>profile</li>
 * <li>product-switch</li>
 * </ul>
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-shellbar</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the outermost wrapper of the <code>ui5-shellbar</code></li>
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
 * <code>import "@ui5/webcomponents-fiori/dist/ShellBar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.ShellBar
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-shellbar
 * @appenddocs sap.ui.webc.fiori.ShellBarItem
 * @public
 * @since 0.8.0
 */

@customElement({
	tag: "ui5-shellbar",
	fastNavigation: true,
	languageAware: true,
	renderer: litRender,
	template: ShellBarTemplate,
	staticAreaTemplate: ShellBarPopoverTemplate,
	styles: shellBarStyles,
	staticAreaStyles: [ShellBarPopoverCss],
	dependencies: [
		Button,
		List,
		Popover,
		StandardListItem,
	],
})
/**
 *
 * Fired, when the notification icon is activated.
 *
 * @event sap.ui.webc.fiori.ShellBar#notifications-click
 * @allowPreventDefault
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("notifications-click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})

/**
 * Fired, when the profile slot is present.
 *
 * @event sap.ui.webc.fiori.ShellBar#profile-click
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("profile-click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})

/**
 * Fired, when the product switch icon is activated.
 * <b>Note:</b> You can prevent closing of overflow popover by calling <code>event.preventDefault()</code>.
 *
 * @event sap.ui.webc.fiori.ShellBar#product-switch-click
 * @allowPreventDefault
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @public
 */
@event("product-switch-click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})

/**
 * Fired, when the logo is activated.
 *
 * @event sap.ui.webc.fiori.ShellBar#logo-click
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @since 0.10
 * @public
 */
@event("logo-click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})

/**
 * Fired, when the co pilot is activated.
 *
 * @event sap.ui.webc.fiori.ShellBar#co-pilot-click
 * @param {HTMLElement} targetRef dom ref of the activated element
 * @since 0.10
 * @public
 */
@event("co-pilot-click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})

/**
 * Fired, when a menu item is activated
 * <b>Note:</b> You can prevent closing of overflow popover by calling <code>event.preventDefault()</code>.
 *
 * @event sap.ui.webc.fiori.ShellBar#menu-item-click
 * @param {HTMLElement} item DOM ref of the activated list item
 * @since 0.10
 * @public
 */
@event("menu-item-click", {
	detail: {
		item: { type: HTMLElement },
	},
})

class ShellBar extends UI5Element {
	/**
	 * Defines the <code>primaryTitle</code>.
	 * <br><br>
	 * <b>Note:</b> The <code>primaryTitle</code> would be hidden on S screen size (less than approx. 700px).
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.ShellBar.prototype.primaryTitle
	 * @public
	 */
	@property()
	primaryTitle!: string;

	/**
	 * Defines the <code>secondaryTitle</code>.
	 * <br><br>
	 * <b>Note:</b> The <code>secondaryTitle</code> would be hidden on S and M screen sizes (less than approx. 1300px).
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.ShellBar.prototype.secondaryTitle
	 * @public
	 */
	@property()
	secondaryTitle!: string;

	/**
	 * Defines the <code>notificationsCount</code>,
	 * displayed in the notification icon top-right corner.
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.fiori.ShellBar.prototype.notificationsCount
	 * @public
	 */
	@property()
	notificationsCount!: string;

	/**
	 * Defines, if the notification icon would be displayed.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.ShellBar.prototype.showNotifications
	 * @public
	 */
	@property({ type: Boolean })
	showNotifications!: boolean;

	/**
	 * Defines, if the product switch icon would be displayed.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.ShellBar.prototype.showProductSwitch
	 * @public
	 */
	@property({ type: Boolean })
	showProductSwitch!: boolean;

	/**
	 * Defines, if the product CoPilot icon would be displayed.
	 * <br><b>Note:</b> By default the co-pilot is displayed as static SVG.
	 * If you need an animated co-pilot, you can import the <code>"@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js"</code> module as add-on feature.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.ShellBar.prototype.showCoPilot
	 * @public
	 */
	@property({ type: Boolean })
	showCoPilot!: boolean;

	/**
	 * Defines, if the Search Field would be displayed when there is a valid <code>searchField</code> slot.
	 * <br><b>Note:</b> By default the Search Field is not displayed.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.fiori.ShellBar.prototype.showSearchField
	 * @public
	 */
	@property({ type: Boolean })
	showSearchField!: boolean;

	/**
	 * An object of strings that defines additional accessibility roles for further customization.
	 *
	 * It supports the following fields:
	 *  - <code>logoRole</code>: the accessibility role for the <code>logo</code>
	 *
	 * @type {object}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.accessibilityRoles
	 * @public
	 * @since 1.6.0
	 */
	@property({ type: Object })
	accessibilityRoles!: AccessibilityRoles;

	/**
	 * An object of strings that defines several additional accessibility texts
	 * for even further customization.
	 *
	 * It supports the following fields:
	 * - <code>profileButtonTitle</code>: defines the tooltip for the profile button
	 * - <code>logoTitle</code>: defines the tooltip for the logo
	 *
	 * @type {object}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.accessibilityTexts
	 * @public
	 * @since 1.1.0
	 */
	@property({ type: Object })
	accessibilityTexts!: AccessibilityTexts;

	/**
	 * An object of strings that defines several additional accessibility attribute values
	 * for customization depending on the use case.
	 *
	 * It supports the following fields:
	 *
	 * <ul>
	 * 		<li><code>expanded</code>: Indicates whether the anchor element, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
	 *			<ul>
	 *				<li><code>true</code></li>
	 *				<li><code>false</code></li>
	 *			</ul>
	 * 		</li>
	 * 		<li><code>hasPopup</code>: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the anchor element. Accepts the following string values:
	 * 			<ul>
	 *				<li><code>Dialog</code></li>
	 *				<li><code>Grid</code></li>
	 *				<li><code>ListBox</code></li>
	 *				<li><code>Menu</code></li>
	 *				<li><code>Tree</code></li>
	 * 			</ul>
	 * 		</li>
	 * </ul>
	 * @type {object}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.accessibilityAttributes
	 * @public
	 * @since 1.10.0
	 */
	 @property({ type: Object })
	 accessibilityAttributes!: AccessibilityAttributes;

	/**
	 * @private
	 */
	@property()
	breakpointSize!: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	coPilotActive!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	withLogo!: boolean;

	@property({ type: Object })
	_itemsInfo!: Array<IShelBarItemInfo>;

	@property({ type: Object, multiple: true })
	_menuPopoverItems!: Array<HTMLElement>;

	@property({ type: Boolean, noAttribute: true })
	_menuPopoverExpanded!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_overflowPopoverExpanded!: boolean;

	@property({ type: Boolean, noAttribute: true })
	_fullWidthSearch!: boolean;

	/**
	 * Defines the <code>ui5-shellbar</code> aditional items.
	 * <br><br>
	 * <b>Note:</b>
	 * You can use the &nbsp;&lt;ui5-shellbar-item>&lt;/ui5-shellbar-item>.
	 *
	 * @type {sap.ui.webc.fiori.IShellBarItem[]}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
	items!: Array<ShellBarItem>;

	/**
	 * You can pass <code>ui5-avatar</code> to set the profile image/icon.
	 * If no profile slot is set - profile will be excluded from actions.
	 *
	 * Note: We recommend not using the <code>size</code> attribute of <code>ui5-avatar</code> because
	 * it should have specific size by design in the context of <code>ui5-shellbar</code> profile.
	 * @type {sap.ui.webc.main.IAvatar}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.profile
	 * @slot profile
	 * @since 1.0.0-rc.6
	 * @public
	 */
	@slot()
	profile!: Array<HTMLElement>;

	/**
	 * Defines the logo of the <code>ui5-shellbar</code>.
	 * For example, you can use <code>ui5-avatar</code> or <code>img</code> elements as logo.
	 * @type {sap.ui.webc.main.IAvatar}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.logo
	 * @slot
	 * @since 1.0.0-rc.8
	 * @public
	 */
	@slot()
	logo!: Array<HTMLElement>;

	/**
	 * Defines the items displayed in menu after a click on the primary title.
	 * <br><br>
	 * <b>Note:</b>
	 * You can use the &nbsp;&lt;ui5-li>&lt;/ui5-li> and its ancestors.
	 *
	 * @type {sap.ui.webc.main.IListItem[]}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.menuItems
	 * @slot
	 * @since 0.10
	 * @public
	 */
	@slot()
	menuItems!: Array<HTMLElement>;

	/**
	 * Defines the <code>ui5-input</code>, that will be used as a search field.
	 *
	 * @type {sap.ui.webc.main.IInput}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.searchField
	 * @slot
	 * @public
	 */
	@slot()
	searchField!: Array<Input>;

	/**
	 * Defines a <code>ui5-button</code> in the bar that will be placed in the beginning.
	 * We encourage this slot to be used for a back or home button.
	 * It gets overstyled to match ShellBar's styling.
	 *
	 * @type {sap.ui.webc.main.IButton}
	 * @name sap.ui.webc.fiori.ShellBar.prototype.startButton
	 * @slot
	 * @public
	 */
	@slot()
	startButton!: Array<Button>;

	static i18nBundle: I18nBundle;
	overflowPopover?: Popover | null;
	menuPopover?: Popover | null;
	_isInitialRendering: boolean;
	_defaultItemPressPrevented: boolean;
	menuItemsObserver: MutationObserver;
	coPilot?: ShellBarCoPilot;
	_debounceInterval?: Timeout | null;
	_hiddenIcons?: Array<IShelBarItemInfo>;
	_handleResize: ResizeObserverCallback;
	_headerPress: () => Promise<void>;

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

		this._itemsInfo = [];
		this._isInitialRendering = true;

		// marks if preventDefault() is called in item's press handler
		this._defaultItemPressPrevented = false;

		this.menuItemsObserver = new MutationObserver(() => {
			this._updateClonedMenuItems();
		});

		this._headerPress = async () => {
			this._updateClonedMenuItems();

			if (this.hasMenuItems) {
				const menuPopover = await this._getMenuPopover();
				menuPopover!.showAt(this.shadowRoot!.querySelector<Button>(".ui5-shellbar-menu-button")!, true);
			}
		};

		this._handleResize = () => {
			this._debounce(async () => {
				await this._getResponsivePopover();
				this.overflowPopover!.close();
				this._overflowActions();
			}, HANDLE_RESIZE_DEBOUNCE_RATE);
		};
	}

	_debounce(fn: () => Promise<void>, delay: number) {
		clearTimeout(this._debounceInterval!);
		this._debounceInterval = setTimeout(() => {
			this._debounceInterval = null;
			fn();
		}, delay);
	}

	_menuItemPress(e: CustomEvent<SelectionChangeEventDetail>) {
		this.menuPopover!.close();
		this.fireEvent<ShellBarMenuItemClickEventDetail>("menu-item-click", {
			item: e.detail.selectedItems[0],
		}, true);
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

	_fireCoPilotClick() {
		this.fireEvent<ShellBarCoPilotClickEventDetail>("co-pilot-click", {
			targetRef: this.shadowRoot!.querySelector(".ui5-shellbar-coPilot")!,
		});
	}

	_coPilotClick() {
		this._fireCoPilotClick();
	}

	_coPilotKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.coPilotActive = true;
			e.preventDefault();
			return;
		}

		if (isEnter(e)) {
			this.coPilotActive = true;
			this._fireCoPilotClick();
		}
	}

	_coPilotKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._fireCoPilotClick();
		}
		this.coPilotActive = false;
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
     * @method
     * @name sap.ui.webc.fiori.ShellBar#closeOverflow
	 */
	closeOverflow() {
		if (this.overflowPopover) {
			this.overflowPopover.close();
		}
	}

	_handleBarBreakpoints() {
		const width = this.getBoundingClientRect().width;
		const breakpoints = ShellBar.FIORI_3_BREAKPOINTS;

		const size = breakpoints.find(bp1 => width < bp1) || ShellBar.FIORI_3_BREAKPOINTS[ShellBar.FIORI_3_BREAKPOINTS.length - 1];
		const mappedSize = ShellBar.FIORI_3_BREAKPOINTS_MAP[size];

		if (this.breakpointSize !== mappedSize) {
			this.breakpointSize = mappedSize;
		}

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

	async _toggleActionPopover() {
		const overflowButton = this.shadowRoot!.querySelector<Button>(".ui5-shellbar-overflow-button")!;
		const overflowPopover = await this._getOverflowPopover();
		overflowPopover!.showAt(overflowButton, true);
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
	 * Returns the <code>logo</code> DOM ref.
	 * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.logoDomRef
	 * @public
	 * @readonly
	 * @since 1.0.0-rc.16
	 */
	get logoDomRef() {
		return this.shadowRoot!.querySelector<Button>(`*[data-ui5-stable="logo"]`);
	}

	/**
	 * Returns the <code>copilot</code> DOM ref.
	 * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.copilotDomRef
	 * @public
	 * @readonly
	 * @since 1.0.0-rc.16
	 */
	get copilotDomRef() {
		return this.shadowRoot!.querySelector<Button>(`*[data-ui5-stable="copilot"]`);
	}

	/**
	 * Returns the <code>notifications</code> icon DOM ref.
	 * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.notificationsDomRef
	 * @public
	 * @readonly
	 * @since 1.0.0-rc.16
	 */
	get notificationsDomRef() {
		return this.shadowRoot!.querySelector<Button>(`*[data-ui5-stable="notifications"]`);
	}

	/**
	 * Returns the <code>overflow</code> icon DOM ref.
	 * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.overflowDomRef
	 * @public
	 * @readonly
	 * @since 1.0.0-rc.16
	 */
	get overflowDomRef() {
		return this.shadowRoot!.querySelector<Button>(`*[data-ui5-stable="overflow"]`);
	}

	/**
	 * Returns the <code>profile</code> icon DOM ref.
	 * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.profileDomRef
	 * @public
	 * @readonly
	 * @since 1.0.0-rc.16
	 */
	get profileDomRef() {
		return this.shadowRoot!.querySelector<Button>(`*[data-ui5-stable="profile"]`);
	}

	/**
	 * Returns the <code>product-switch</code> icon DOM ref.
	 * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.productSwitchDomRef
	 * @public
	 * @readonly
	 * @since 1.0.0-rc.16
	 */
	get productSwitchDomRef() {
		return this.shadowRoot!.querySelector<Button>(`*[data-ui5-stable="product-switch"]`);
	}

	/**
	 * Returns all items that will be placed in the right of the bar as icons / dom elements.
	 * @param {boolean} showOverflowButton Determines if overflow button should be visible (not overflowing)
	 */
	_getAllItems(showOverflowButton: boolean) {
		let domOrder = -1;

		const items: Array<IShelBarItemInfo> = [
			{
				icon: "search",
				text: "Search",
				classes: `${this.searchField.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,
				priority: 4,
				domOrder: this.searchField.length ? (++domOrder) : -1,
				styles: {
					order: this.searchField.length ? 1 : -10,
				},
				id: `${this._id}-item-${1}`,
				press: this._handleSearchIconPress.bind(this),
				show: !!this.searchField.length,
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
				text: "Notifications",
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
				text: "Product Switch",
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

	async _getResponsivePopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		this.overflowPopover = staticAreaItem!.querySelector<Popover>(".ui5-shellbar-overflow-popover");
		this.menuPopover = staticAreaItem!.querySelector<Popover>(".ui5-shellbar-menu-popover");
	}

	async _getOverflowPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>(".ui5-shellbar-overflow-popover");
	}

	async _getMenuPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>(".ui5-shellbar-menu-popover");
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

	get popoverHorizontalAlign() {
		return this.effectiveDir === "rtl" ? "Left" : "Right";
	}

	get hasSearchField() {
		return !!this.searchField.length;
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
					hasPopup: this._notificationsHasPopup,
				},
			},
			profile: {
				"title": this._profileText,
				"accessibilityAttributes": {
					hasPopup: this._profileHasPopup,
				},
			},
			products: {
				"title": this._productsText,
				"accessibilityAttributes": {
					hasPopup: this._productsHasPopup,
				},
			},
			search: {
				"title": this._searchText,
				"accessibilityAttributes": {
					hasPopup: this._searchHasPopup,
					expanded: this.showSearchField,
				},
			},
			overflow: {
				"title": this._overflowText,
				"accessibilityAttributes": {
					hasPopup: this._overflowHasPopup,
					expanded: this._overflowPopoverExpanded,
				},
			},
		};
	}

	get _notificationsHasPopup() {
		const notificationsAccAttributes = this.accessibilityAttributes.notifications;
		return notificationsAccAttributes ? notificationsAccAttributes.ariaHasPopup : null;
	}

	get _profileHasPopup() {
		const profileAccAttributes = this.accessibilityAttributes.profile;
		return profileAccAttributes ? profileAccAttributes.ariaHasPopup : null;
	}

	get _productsHasPopup() {
		const productsAccAttributes = this.accessibilityAttributes.product;
		return productsAccAttributes ? productsAccAttributes.ariaHasPopup : null;
	}

	get _searchHasPopup() {
		const searcAccAttributes = this.accessibilityAttributes.search;
		return searcAccAttributes ? searcAccAttributes.ariaHasPopup : null;
	}

	get _overflowHasPopup() {
		const overflowAccAttributes = this.accessibilityAttributes.overflow;
		return overflowAccAttributes ? overflowAccAttributes.ariaHasPopup : HasPopup.Menu;
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
};
