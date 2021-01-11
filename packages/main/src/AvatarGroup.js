import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import {
	isEnter,
	isSpace,
} from "@ui5/webcomponents-base/dist/Keys.js";

// Template
import AvatarGroupTemplate from "./generated/templates/AvatarGroupTemplate.lit.js";
// Styles
import AvatarGroupCss from "./generated/themes/AvatarGroup.css.js";

import Button from "./Button.js";
import AvatarSize from "./types/AvatarSize.js";
import AvatarGroupType from "./types/AvatarGroupType.js";
import AvatarBackgroundColor from "./types/AvatarBackgroundColor.js";

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
		[AvatarGroupType.Group]: "-1.62rem",
	},
	[AvatarSize.L]: {
		[AvatarGroupType.Individual]: "0.125rem",
		[AvatarGroupType.Group]: " -2rem",
	},
	[AvatarSize.XL]: {
		[AvatarGroupType.Individual]: "0.25rem",
		[AvatarGroupType.Group]: "-2.7rem",
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
		 * <ul>
		 * @type {AvatarGroupType}
		 * @defaultValue "Group"
		 * @public
		 */
		type: {
			type: String,
			defaultValue: AvatarGroupType.Group,
		},

		/**
		 * Defines predefined size of the <code>ui5-avatar</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>XS</code></li>
		 * <li><code>S</code></li>
		 * <li><code>M</code></li>
		 * <li><code>L</code></li>
		 * <li><code>XL</code></li>
		 * <ul>
		 * @type {AvatarSize}
		 * @defaultValue "S"
		 * @public
		 */
		avatarSize: {
			type: String,
			defaultValue: AvatarSize.S,
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
		 * Defines the items of the <code>ui5-avatar-group</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
			propertyName: "items",
		},
	},
	events: /** @lends sap.ui.webcomponents.main.AvatarGroup.prototype */ {
		/**
		* Fired when the <code>ui5-avatar-group</code> is activated either with a
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

	/**
	 * Returns an array containing the ui5-avatar instances that are currently not displayed due to lack of space.
	 * @readonly
	 * @type { Array }
	 * @defaultValue []
	 * @public
	 */
	get hiddenItems() {
		return this.items.slice(this._hiddenStartIndex);
	}

	/**
	 * Returns an array containing the <code>AvatarBackgroundColor</code> values that correspond to the avatars in the <code>items</code> array.
	 * @readonly
	 * @type { Array }
	 * @defaultValue []
	 * @public
	 */
	get colorScheme() {
		return this.items.map(avatar => avatar._effectiveBackgroundColor);
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

	get _overflowButtonTabIndex() {
		return this._isGroup ? "-1" : false;
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
		// if in "Group" mode overflow button size is equal to the offset from second item
		if (this._isGroup) {
			let item = this.items[1];

			// in some cases when second avatar is overflowed the offset of the button is the right one
			if (!item || item.hidden) {
				item = this._overflowButton;
			}

			return this.effectiveDir === "rtl" ? this._getWidthToItem(item) : item.offsetLeft;
		}

		return this._overflowButton.offsetWidth;
	}

	onAfterRendering() {
		this._overflowItems();
	}

	onBeforeRendering() {
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
		if (isEnter(event)) {
			this._fireGroupEvent(event.target);
		}

		if (isSpace(event)) {
			// prevent scrolling
			event.preventDefault();
		}
	}

	_onkeyup(event) {
		if (!event.shiftKey && isSpace(event)) {
			event.preventDefault();
			this._fireGroupEvent(event.target);
		}
	}

	_fireGroupEvent(targetRef) {
		const isOverflowButtonClicked = targetRef.classList.contains(OVERFLOW_BTN_CLASS);

		this.fireEvent("click", {
			targetRef,
			overflowButtonClicked: isOverflowButtonClicked,
		});
	}

	_onGroupClick(event) {
		event.stopPropagation();
		if (event.isMarked === "avatar" || event.isMarked === "button" || this._isGroup) {
			this._fireGroupEvent(event.target);
		}
	}

	_onUI5Click(event) {
		event.stopPropagation();
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

			if (!avatar.getAttribute("background-color")) {
				// AvatarGroup respects colors set to ui5-avatar
				avatar.setAttribute("_background-color", AvatarBackgroundColor[`Accent${colorIndex}`]);
			}

			if (!avatar.getAttribute("size")) {
				// AvatarGroup respects sizes set to ui5-avatar
				avatar.setAttribute("_size", this.avatarSize);
			}

			// last avatar should not be offset as it breaks the container width and focus styles are no set correctly
			if (index !== this._itemsCount - 1) {
				// based on RTL margin left or right is set to avatars
				avatar.style[`margin-${RTL ? "left" : "right"}`] = offsets[avatar._effectiveSize][this.type];
			}
		});
	}

	_onfocusin(event) {
		const target = event.target;
		this._itemNavigation.update(target);
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

			if (index !== this._itemsCount - 1) {
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
		this._hiddenItems = hiddenItems;

		this.items.forEach((item, index) => {
			item.hidden = index >= this._hiddenStartIndex;
		});

		this._overflowButtonText = `+${hiddenItems > 99 ? 99 : hiddenItems}`;
	}
}

AvatarGroup.define();

export default AvatarGroup;
