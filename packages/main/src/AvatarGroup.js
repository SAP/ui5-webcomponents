import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import {
	isEnter,
	isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";

import {
	AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL,
	AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL,
	AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL,
	AVATAR_GROUP_ARIA_LABEL_GROUP,
	AVATAR_GROUP_MOVE,
} from "./generated/i18n/i18n-defaults.js";

// Template
import AvatarGroupTemplate from "./generated/templates/AvatarGroupTemplate.lit.js";
// Styles
import AvatarGroupCss from "./generated/themes/AvatarGroup.css.js";

import Button from "./Button.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarGroupType from "./types/AvatarGroupType.js";
import AvatarColorScheme from "./types/AvatarColorScheme.js";

const OVERFLOW_BTN_CLASS = "ui5-avatar-group-overflow-btn";
const AVATAR_GROUP_OVERFLOW_BTN_SELECTOR = `.${OVERFLOW_BTN_CLASS}`;

// based on RTL/LTR a margin-left/right is set respectfully
const offsets = {
	[AvatarSize.XS]: {
		[AvatarGroupType.Individual]: "0.0625rem",
		[AvatarGroupType.Group]: "-0.75rem",
	},
	[AvatarSize.S]: {
		[AvatarGroupType.Individual]: "0.125rem",
		[AvatarGroupType.Group]: "-1.25rem",
	},
	[AvatarSize.M]: {
		[AvatarGroupType.Individual]: "0.125rem",
		[AvatarGroupType.Group]: "-1.625rem",
	},
	[AvatarSize.L]: {
		[AvatarGroupType.Individual]: "0.125rem",
		[AvatarGroupType.Group]: " -2rem",
	},
	[AvatarSize.XL]: {
		[AvatarGroupType.Individual]: "0.25rem",
		[AvatarGroupType.Group]: "-2.75rem",
	},
};

/**
 * @public
 */
const metadata = {
	tag: "ui5-avatar-group",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.main.AvatarGroup.prototype */  {

		/**
	 	 * Defines the mode of the <code>AvatarGroup</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Group</code></li>
		 * <li><code>Individual</code></li>
		 * </ul>
		 * @type {AvatarGroupType}
		 * @defaultValue "Group"
		 * @public
		 */
		type: {
			type: String,
			defaultValue: AvatarGroupType.Group,
		},

		/**
		 * Defines the aria-haspopup value of the component on:
		 * <br><br>
		 * <ul>
		 * <li> the whole container when <code>type</code> property is <code>Group</code></li>
		 * <li> the default "More" overflow button when <code>type</code> is <code>Individual</code></li>
		 * </ul>
		 * <br><br>
		 * @type String
		 * @since 1.0.0-rc.15
		 * @protected
		 */
		ariaHaspopup: {
			type: String,
		},

		/**
		 * @private
		 */
		_overflowButtonText: {
			type: String,
			noAttribute: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.AvatarGroup.prototype */ {
		/**
		 * Defines the items of the component. Use the <code>ui5-avatar</code> component as an item.
		 * <br><br>
		 * <b>Note:</b> The UX guidelines recommends using avatars with "Circle" shape.
		 * Moreover, if you use avatars with "Square" shape, there will be visual inconsistency
		 * as the built-in overflow action has "Circle" shape.
		 * @type {sap.ui.webcomponents.main.IAvatar[]}
		 * @slot items
		 * @public
		 */
		"default": {
			type: HTMLElement,
			propertyName: "items",
		},
		/**
		 * Defines the overflow button of the component.
		 * <b>Note:</b> We recommend using the <code>ui5-button</code> component.
		 * <br><br>
		 * <b>Note:</b> If this slot is not used, the component will
		 * display the built-in overflow button.
		 * @type {HTMLElement}
		 * @slot overflowButton
		 * @public
		 * @since 1.0.0-rc.13
		 */
		 overflowButton: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.AvatarGroup.prototype */ {
		/**
		* Fired when the component is activated either with a
		* click/tap or by using the Enter or Space key.
		* @param {HTMLElement} targetRef The DOM ref of the clicked item.
		* @param {boolean} overflowButtonClicked indicates if the overflow button is clicked
		* @event
		* @public
		* @since 1.0.0-rc.11
		*/
		click: {
			detail: {
				targetRef: { type: HTMLElement },
				overflowButtonClicked: { type: Boolean },
			},
		},
		/**
		* Fired when the count of visible <code>ui5-avatar</code> elements in the
		* component has changed
		* @event
		* @public
		* @since 1.0.0-rc.13
		*/
		overflow: {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Displays a group of avatars arranged horizontally. It is useful to visually
 * showcase a group of related avatars, such as, project team members or employees.
 *
 * The component allows you to display the avatars in different sizes,
 * depending on your use case.
 *
 * The <code>AvatarGroup</code> component has two group types:
 * <ul>
 * <li><code>Group</code> type: The avatars are displayed as partially overlapped on
 * top of each other and the entire group has one click/tap area.</li>
 * <li><code>Individual</code> type: The avatars are displayed side-by-side and each
 * avatar has its own click/tap area.</li>
 * </ul>
 *
 * <h3>Responsive Behavior</h3>
 *
 * When the available space is less than the width required to display all avatars,
 * an overflow visualization appears as a button placed at the end with the same shape
 * and size as the avatars. The visualization displays the number of avatars that have overflowed
 * and are not currently visible.
 *
 * <h3>Usage</h3>
 *
 * Use the <code>AvatarGroup</code> if:
 * <ul>
 * <li>You want to display a group of avatars.</li>
 * <li>You want to display several avatars which have something in common.</li>
 * </ul>
 *
 * Do not use the <code>AvatarGroup</code> if:
 * <ul>
 * <li>You want to display a single avatar.</li>
 * <li>You want to display a gallery for simple images.</li>
 * <li>You want to use it for other visual content than avatars.</li>
 * </ul>
 *
 * <h3>Keyboard Handling</h3>
 * The component provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * - <code>type</code> Individual:
 * <br>
 * <ul>
 * <li>[TAB] - Move focus to the overflow button</li>
 * <li>[LEFT] - Navigate one avatar to the left</li>
 * <li>[RIGHT] - Navigate one avatar to the right</li>
 * <li>[HOME] - Navigate to the first avatar</li>
 * <li>[END] - Navigate to the last avatar</li>
 * <li>[SPACE],[ENTER],[RETURN] - Trigger <code>ui5-click</code> event</li>
 * </ul>
 * <br>
 * - <code>type</code> Group:
 * <br>
 * <ul>
 * <li>[TAB] - Move focus to the next interactive element after the component</li>
 * <li>[SPACE],[ENTER],[RETURN] - Trigger <code>ui5-click</code> event</li>
 * </ul>
 * <br>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.AvatarGroup
 * @extends UI5Element
 * @tagname ui5-avatar-group
 * @since 1.0.0-rc.11
 * @public
 */
class AvatarGroup extends UI5Element {
	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => {
				return this._isGroup ? [] : this.items.slice(0, this._hiddenStartIndex);
			},
		});

		this._colorIndex = 0;
		this._hiddenItems = 0;
		this._onResizeHandler = this._onResize.bind(this);

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return AvatarGroupTemplate;
	}

	static get styles() {
		return AvatarGroupCss;
	}

	static get dependencies() {
		return [
			Button,
		];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}

	/**
	 * Returns an array containing the <code>ui5-avatar</code> instances that are currently not displayed due to lack of space.
	 * @readonly
	 * @type { Array }
	 * @defaultValue []
	 * @public
	 */
	get hiddenItems() {
		return this.items.slice(this._hiddenStartIndex);
	}

	/**
	 * Returns an array containing the <code>AvatarColorScheme</code> values that correspond to the avatars in the component.
	 * @readonly
	 * @type { Array }
	 * @defaultValue []
	 * @public
	 */
	get colorScheme() {
		return this.items.map(avatar => avatar._effectiveBackgroundColor);
	}

	get _customOverflowButton() {
		return this.overflowButton.length ? this.overflowButton[0] : undefined;
	}

	get _ariaLabelText() {
		const hiddenItemsCount = this.hiddenItems.length;
		const typeLabelKey = this._isGroup ? AVATAR_GROUP_ARIA_LABEL_GROUP : AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL;

		// avatar type label
		let text = this.i18nBundle.getText(typeLabelKey);

		// add displayed-hidden avatars label
		text += ` ${this.i18nBundle.getText(AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL, [this._itemsCount - hiddenItemsCount], [hiddenItemsCount])}`;

		if (this._isGroup) {
			// the container role is "button", add the message for complete list activation
			text += ` ${this.i18nBundle.getText(AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL)}`;
		} else {
			// the container role is "group", add the "how to navigate" message
			text += ` ${this.i18nBundle.getText(AVATAR_GROUP_MOVE)}`;
		}

		return text;
	}

	get _overflowButtonAriaLabelText() {
		return this._isGroup ? undefined : this.i18nBundle.getText(AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL);
	}

	get _containerAriaHasPopup() {
		return this._isGroup ? this._getAriaHasPopup() : undefined;
	}

	get _overflowButtonAccInfo() {
		return {
			ariaHaspopup: this._isGroup ? undefined : this._getAriaHasPopup(),
		};
	}

	get _role() {
		return this._isGroup ? "button" : "group";
	}

	get _hiddenStartIndex() {
		return this._itemsCount - this._hiddenItems;
	}

	get _overflowBtnHidden() {
		return this._hiddenItems === 0;
	}

	get _isGroup() {
		return this.type === AvatarGroupType.Group;
	}

	get _itemsCount() {
		return this.items.length;
	}

	get _groupTabIndex() {
		return this._isGroup ? "0" : "-1";
	}

	get _overflowButton() {
		return this.shadowRoot.querySelector(AVATAR_GROUP_OVERFLOW_BTN_SELECTOR);
	}

	/**
	 * Return the effective overflow button width
	 * Differences are that when in "Group" type the button is offset and overlaps the avatars
	 *
	 * 1) In case of "Group", (LTR/RTL aware) button width is qual to second item offset left/right
	 * 2) In case of "Individual" group type width is directly taken from button element
	 * @private
	 */
	get _overflowButtonEffectiveWidth() {
		const button = this._customOverflowButton ? this._customOverflowButton : this._overflowButton;
		// if in "Group" mode overflow button size is equal to the offset from second item
		if (this._isGroup) {
			let item = this.items[1];

			// in some cases when second avatar is overflowed the offset of the button is the right one
			if (!item || item.hidden) {
				item = button;
			}

			return this.effectiveDir === "rtl" ? this._getWidthToItem(item) : item.offsetLeft;
		}

		return button.offsetWidth;
	}

	get firstAvatarSize() {
		return this.items[0].size;
	}

	get classes() {
		return {
			overflowButton: {
				"ui5-avatar-group-overflow-btn": true,
				"ui5-avatar-group-overflow-btn-xs": this.firstAvatarSize === "XS",
				"ui5-avatar-group-overflow-btn-s": this.firstAvatarSize === "S",
				"ui5-avatar-group-overflow-btn-m": this.firstAvatarSize === "M",
				"ui5-avatar-group-overflow-btn-l": this.firstAvatarSize === "L",
				"ui5-avatar-group-overflow-btn-xl": this.firstAvatarSize === "XL",
			},
		};
	}

	onAfterRendering() {
		this._overflowItems();
	}

	onBeforeRendering() {
		if (this._customOverflowButton) {
			this._customOverflowButton.nonInteractive = this._isGroup;
		}

		this._prepareAvatars();
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._onResizeHandler);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onResizeHandler);
	}

	_onResize() {
		this._overflowItems();
	}

	_onkeydown(event) {
		// when type is "Individual" the ui5-avatar and ui5-button both
		// fire "click" event when SPACE or ENTER are pressed and
		// AvatarGroup "click" is fired in their handlers (_onClick, _onUI5Click).
		if (this._isGroup) {
			if (isEnter(event)) {
				this._fireGroupEvent(event.target);
			} else if (isSpace(event)) {
				// prevent scrolling
				event.preventDefault();
			}
		}
	}

	_onkeyup(event) {
		if (!event.shiftKey && isSpace(event) && this._isGroup) {
			this._fireGroupEvent(event.target);
			event.preventDefault();
		}
	}

	_fireGroupEvent(targetRef) {
		const isOverflowButtonClicked = targetRef.classList.contains(OVERFLOW_BTN_CLASS) || targetRef === this._customOverflowButton;

		this.fireEvent("click", {
			targetRef,
			overflowButtonClicked: isOverflowButtonClicked,
		});
	}

	_onClick(event) {
		// no matter the value of noConflict, the ui5-button and the group container (div) always fire a native click event
		const isButton = event.target.hasAttribute("ui5-button");
		event.stopPropagation();

		if (this._isGroup || isButton) {
			this._fireGroupEvent(event.target);
		}
	}

	_onUI5Click(event) {
		// when noConflict=true only ui5-avatar will fire ui5-click event
		const isAvatar = event.target.hasAttribute("ui5-avatar");
		event.stopPropagation();

		if (isAvatar) {
			this._fireGroupEvent(event.target);
		}
	}

	/**
	 * Modifies avatars to the needs of avatar group properties. Respects already set size and background color.
	 * Set the margins (offsets) based on RTL/LTR.
	 * @private
	 */
	_prepareAvatars() {
		const RTL = this.effectiveDir === "rtl";
		this._colorIndex = 0;

		this.items.forEach((avatar, index) => {
			const colorIndex = this._getNextBackgroundColor();
			avatar.interactive = !this._isGroup;

			if (!avatar.getAttribute("_color-scheme")) {
				// AvatarGroup respects colors set to ui5-avatar
				avatar.setAttribute("_color-scheme", AvatarColorScheme[`Accent${colorIndex}`]);
			}

			// last avatar should not be offset as it breaks the container width and focus styles are no set correctly
			if (index !== this._itemsCount - 1 || this._customOverflowButton) {
				// based on RTL margin left or right is set to avatars
				avatar.style[`margin-${RTL ? "left" : "right"}`] = offsets[avatar._effectiveSize][this.type];
			}
		});
	}

	_onfocusin(event) {
		const target = event.target;
		this._itemNavigation.setCurrentItem(target);
	}

	/**
	 * Returns the total width to item excluding the item width
	 * RTL/LTR aware
	 * @private
	 * @param {HTMLElement} item
	 */
	_getWidthToItem(item) {
		const isRTL = this.effectiveDir === "rtl";

		if (isRTL) {
			// in RTL the total width is equal to difference of the parent container width and
			// how much is the item offset to the left minus its offsetWidth
			return item.offsetParent.offsetWidth - item.offsetLeft - item.offsetWidth;
		}

		// in LTR the width is equal to item.offsetLeft
		return item.offsetLeft;
	}

	/**
	 * Overflows items that were not able to fit the container
	 * @private
	 */
	_overflowItems() {
		if (this.items.length < 2) {
			// no need to overflow avatars
			return;
		}

		let hiddenItems = 0;

		for (let index = 0; index < this._itemsCount; index++) {
			const item = this.items[index];

			// show item to determine if it will fit the new container size
			item.hidden = false;

			// container width to current item + item width (avatar)
			// used to determine whether the following items will fit the container or not
			let totalWidth = this._getWidthToItem(item) + item.offsetWidth;

			if (index !== this._itemsCount - 1 || this._customOverflowButton) {
				totalWidth += this._overflowButtonEffectiveWidth;
			}

			if (totalWidth > this.offsetWidth) {
				hiddenItems = this._itemsCount - index;
				break;
			}
		}

		// hide the items that did not fit the container size
		this._setHiddenItems(hiddenItems);
	}

	_getNextBackgroundColor() {
		// counter is to automatically assign background colors to avatars, `Accent10` is the highest color value
		if (++this._colorIndex > 10) {
			this._colorIndex = 1;
		}
		return this._colorIndex;
	}

	_setHiddenItems(hiddenItems) {
		const shouldFireEvent = this._hiddenItems !== hiddenItems;

		this._hiddenItems = hiddenItems;

		this.items.forEach((item, index) => {
			item.hidden = index >= this._hiddenStartIndex;
		});

		this._overflowButtonText = `+${hiddenItems > 99 ? 99 : hiddenItems}`;

		if (shouldFireEvent) {
			this.fireEvent("overflow");
		}
	}

	_getAriaHasPopup() {
		if (this.ariaHaspopup === "") {
			return;
		}

		return this.ariaHaspopup;
	}
}

AvatarGroup.define();

export default AvatarGroup;
