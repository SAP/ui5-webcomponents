import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isSpace,
	isShow,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import BreadcrumbsDesign from "./types/BreadcrumbsDesign.js";
import BreadcrumbsSeparatorStyle from "./types/BreadcrumbsSeparatorStyle.js";

// Template
import BreadcrumbsTemplate from "./generated/templates/BreadcrumbsTemplate.lit.js";
import BreadcrumbsPopoverTemplate from "./generated/templates/BreadcrumbsPopoverTemplate.lit.js";

import {
	BREADCRUMBS_ARIA_LABEL,
	BREADCRUMBS_OVERFLOW_ARIA_LABEL,
	BREADCRUMBS_CANCEL_BUTTON,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import breadcrumbsCss from "./generated/themes/Breadcrumbs.css.js";
import breadcrumbsPopoverCss from "./generated/themes/BreadcrumbsPopover.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-breadcrumbs",
	managedSlots: true,
	languageAware: true,
	slots: /** @lends sap.ui.webcomponents.main.Breadcrumbs.prototype */ {

		/**
		 * Defines the links of the <code>ui5-breadcrumbs</code>.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-link</code> component to define the required anchors.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "links",
			type: HTMLElement,
			individualSlots: true,
			invalidateOnChildChange: {
				properties: false,
				slots: true,
			},
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Breadcrumbs.prototype */ {

		/**
		 * Defines the visual indication and behavior of the breadcrumbs.
		 * Available options are <code>Standard</code> (by default) and <code>NoCurrentPage</code>.
		 * <br><br>
		 * <b>Note:</b> The <code>Standard</code> breadcrumbs show the current page as the last item in the trail.
		 * The last item contains only plain text and not a link.
		 *
		 * @type {BreadcrumbsDesign}
		 * @defaultvalue "Standard"
		 * @public
		*/
		design: {
			type: BreadcrumbsDesign,
			defaultValue: BreadcrumbsDesign.Standard,
		},

		/**
		 * Determines the visual style of the separator between the Breadcrumbs elements.
		 *
		 * @type {BreadcrumbsSeparatorStyle}
		 * @defaultvalue "Slash"
		 * @public
		 */
		separatorStyle: {
			type: BreadcrumbsSeparatorStyle,
			defaultValue: BreadcrumbsSeparatorStyle.Slash,
		},

		/**
		 * Defines the <code>ui5-breadcrumbs</code> current location text.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @private
		 */
		_endingLabelText: {
			type: String,
			noAttribute: true,
			defaultValue: "",
		},

		/**
		 * Holds the number of link-items in the overflow
		 *
		 * @type {string}
		 * @defaultvalue "0"
		 * @private
		 */
		_countLinksInOverflow: {
			type: Integer,
			noAttribute: true,
			defaultValue: 0,
		},

	},
	events: /** @lends  sap.ui.webcomponents.main.Breadcrumbs.prototype */ {

		/**
		 * Fired when a link is activated.
		 *
		 * @event sap.ui.webcomponents.main.Breadcrumbs#item-click
		 * @param {HTMLElement} item The clicked item.
		 * @public
		 */
		"link-click": {
			detail: {
				link: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Breadcrumbs
 * @extends UI5Element
 * @tagname ui5-breadcrumbs
 * @public
 */
class Breadcrumbs extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get template() {
		return BreadcrumbsTemplate;
	}

	static get staticAreaTemplate() {
		return BreadcrumbsPopoverTemplate;
	}

	static get styles() {
		return breadcrumbsCss;
	}

	static get staticAreaStyles() {
		return breadcrumbsPopoverCss;
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this.initItemNavigation();

		this._onContainerResizeHandler = this._onContainerResize.bind(this);
		this._onContentResizeHandler = this._onContentResize.bind(this);

		// maps links to their widths
		this._linkWidths = new WeakMap();
		// the width of the interactive element that opens the overflow
		this._overflowBtnWidth = 0;
		// a list of the two elements that wrap the breadcrumps content
		// and allow to monitor content-resize
		this._contentWrappers = null;
	}

	onAfterRendering() {
		this._endingLabelText = this._parseEndingLabelText();
		this._contentWrappers = this.shadowRoot.querySelectorAll(".ui5-breadcrumbs-root > ol");
		this._cacheWidths();
		this._updateOverflow();
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._onContainerResizeHandler);
		this._contentWrappers.forEach(el => ResizeHandler.register(el, this._onContentResizeHandler));
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onContainerResizeHandler);
		if (this._contentWrappers) {
			this._contentWrappers.forEach(el => ResizeHandler.deregister(el, this._onContentResizeHandler));
		}
	}

	initItemNavigation() {
		if (!this._itemNavigation) {
			this._itemNavigation = new ItemNavigation(this, {
				navigationMode: NavigationMode.Horizontal,
				getItemsCallback: () => this._getFocusableItems(),
			});
		}
	}

	/**
	 * Obtains the items for navigation via keyboard
	 * @private
	 */
	_getFocusableItems() {
		const items = this._nonOverflowingLinks;

		if (this._hasLinksInOverflow) {
			items.unshift(this._overflowBtn);
		}
		if (this._endingLabelComponent) {
			items.push(this._endingLabelComponent);
		}
		return items;
	}

	_onfocusin(event) {
		this._itemNavigation.setCurrentItem(event.target);
	}

	_onkeydown(event) {
		if (isShow(event)) {
			event.preventDefault();
			this._toggleRespPopover();
		}
		if (isSpace(event) && !this._isPickerOpen) {
			event.preventDefault();
		}
	}

	_onkeyup(event) {
		if (isSpace(event) && !this._isPickerOpen) {
			this._toggleRespPopover();
		}
	}

	_onContainerResize() {
		this._updateOverflow();
	}

	_onContentResize() {
		this._endingLabelText = this._parseEndingLabelText();
		this._cacheWidths();
		this._updateOverflow();
	}

	/**
	 * Caches the space required to render the content
	 * @private
	 */
	_cacheWidths() {
		const map = this._linkWidths;
		const linkItems = this.shadowRoot.querySelectorAll(".ui5-breadcrumbs-link-wrapper");

		for (let i = 0; i < linkItems.length; i++) {
			const link = linkItems[i].querySelector("slot").assignedElements()[0];
			map.set(link, this._getElementWidth(linkItems[i]));
		}

		if (this._hasLinksInOverflow) {
			const overflow = this.shadowRoot.querySelector(".ui5-breadcrumbs-overflow-opener");
			this._overflowBtnWidth = this._getElementWidth(overflow);
		}
	}

	_updateOverflow() {
		const links = this._interactiveLinks.filter(link => !link.hidden),
			availableWidth = this.shadowRoot.querySelector(".ui5-breadcrumbs-root").offsetWidth;
		let requiredWidth = this._getTotalContentWidth(),
			countLinksInOverflow = 0;

		if (requiredWidth > availableWidth) {
			// need to show the overflow button as well
			requiredWidth += this._overflowBtnWidth;
		}

		while ((requiredWidth > availableWidth) && (countLinksInOverflow < this._maxCountLinksInOverflow)) {
			const linkToOverflow = links[countLinksInOverflow],
				linkWidth = this._linkWidths.get(linkToOverflow) || 0;

			// move the link to the overflow
			requiredWidth -= linkWidth;
			countLinksInOverflow++;
		}

		this._countLinksInOverflow = countLinksInOverflow;

		// if overflow was emptied while picker was open => close redundant view
		if (this._countLinksInOverflow === 0 && this._isPickerOpen) {
			this._toggleRespPopover();
		}

		// if the last focused link has done into the overflow =>
		// ensure the first visible link is focusable
		const focusableItems = this._getFocusableItems();
		if (!focusableItems.some(x => x._tabIndex === "0")) {
			this._itemNavigation.setCurrentItem(focusableItems[0]);
		}

		links.forEach(link => link.classList.toggle("ui5-breadcrumbs-empty-link", !link.innerHTML));
	}

	_getElementWidth(element) {
		return Math.ceil(element.getBoundingClientRect().width);
	}

	_getTotalContentWidth() {
		const links = this._interactiveLinks,
			map = this._linkWidths,
			totalLinksWidth = links.reduce((sum, link) => sum + map.get(link), 0),
			currentLocationWidth = this._endingLabelComponent ? this._getElementWidth(this._endingLabelComponent) : 0;

		return totalLinksWidth + currentLocationWidth;
	}

	_parseEndingLabelText() {
		const link = this._endingLabelLink;
		return (link) ? link.innerText : "";
	}

	_onLinkClick(event) {
		const link = event.target;
		this.fireEvent("link-click", { link });
	}

	_getSelectedItemIndex(item) {
		return [].indexOf.call(item.parentElement.children, item);
	}

	_onOverflowListItemSelect(event) {
		const item = event.detail.item,
			selectedItemIndex = this._getSelectedItemIndex(item),
			selectedLink = this._overflowingLinks[selectedItemIndex],
			selectedLinkTarget = selectedLink.target || "_self",
			windowFeatures = (selectedLinkTarget !== "_self") ? "noopener,noreferrer" : "";

		window.open(selectedLink.href, selectedLinkTarget, windowFeatures);
		this._toggleRespPopover();
		this.fireEvent("link-click", { link: selectedLink });
	}

	/**
	 * Returns all slotted links except the link that represents the ending label
	 */
	get _interactiveLinks() {
		const links = this.getSlottedNodes("links");
		if (this._endsWithCurrentLocationLabel) {
			links.pop();
		}
		return links;
	}

	get _endsWithCurrentLocationLabel() {
		return this.design === BreadcrumbsDesign.Standard;
	}

	get _endingLabelComponent() {
		return this.shadowRoot.querySelector(".ui5-breadcrumbs-current-location ui5-label");
	}

	/**
	 * Returns the maximum allowed count of links in the overflow
	 */
	get _maxCountLinksInOverflow() {
		const interactiveLinks = this._interactiveLinks.filter(link => !link.hidden);
		// UX requirement: the last visible breadcrumbs item should never overflow
		// so all items before the last visible are allowed to overflow
		if (this.design === BreadcrumbsDesign.Standard) {
			// the last visible item is the label 
			// => all interactive links are allowed to overflow
			return interactiveLinks.length;
		}
		return interactiveLinks.length - 1;
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector("[ui5-responsive-popover]");
	}

	async _toggleRespPopover() {
		this.responsivePopover = await this._respPopover();

		if (this._isPickerOpen) {
			this.responsivePopover.close();
		} else {
			this.responsivePopover.openBy(this);
		}
	}

	get _endingLabelLink() {
		let lastLink;
		if (this._endsWithCurrentLocationLabel) {
			const links = this.getSlottedNodes("links");
			lastLink = links[links.length - 1];
		}
		return lastLink;
	}

	get _endingLabelLinkIndividualSlot() {
		const link = this._endingLabelLink;
		if (link) {
			return link._individualSlot;
		}
		return null;
	}

	/**
	 * Getter for the interactive element that opens the overflow
	 * @private
	 */
	get _overflowBtn() {
		return this.shadowRoot.querySelector(".ui5-breadcrumbs-overflow-opener ui5-link");
	}

	/**
	 * Getter for the list of links to be rendered outside the overflow
	 */
	get _nonOverflowingLinks() {
		const links = this._interactiveLinks,
			indexOfLastOveflowingLink = this._indexOfLastOveflowingLink;

		// if there is at least one overflowing link
		// => extract the remaining and return as non-overflowing
		if (indexOfLastOveflowingLink > -1) {
			return links.slice(indexOfLastOveflowingLink + 1);
		}
		return links;
	}

	/**
	 * Getter for the list of links to be rendered inside the overflow
	 */
	get _overflowingLinks() {
		const indexOfLastOveflowingLink = this._indexOfLastOveflowingLink;

		if (indexOfLastOveflowingLink > -1) {
			return this._interactiveLinks
				.slice(0, indexOfLastOveflowingLink + 1)
				.reverse();
		}
		return [];
	}

	/**
	 * Getter for the list of non-hidden links to be rendered inside the overflow
	 */
	get _visibleOverflowingLinks() {
		return this._interactiveLinks
			.filter(link => !link.hidden)
			.slice(0, this._countLinksInOverflow)
			.reverse();
	}

	get _indexOfLastOveflowingLink() {
		const visibleOverflowingLinks = this._visibleOverflowingLinks;
		let lastVisibleOverflowingLink;

		if (visibleOverflowingLinks.length) {
			// visible links appear in reverse order in the dropdown
			// => we obtain the first item
			lastVisibleOverflowingLink = visibleOverflowingLinks[0];
			return this._getSelectedItemIndex(lastVisibleOverflowingLink);
		}

		return -1;
	}

	get _ariaHasPopup() {
		if (this._hasLinksInOverflow) {
			return "listbox";
		}
		return undefined;
	}

	get _isPickerOpen() {
		return !!this.responsivePopover && this.responsivePopover.opened;
	}

	get _hasLinksInOverflow() {
		return this._countLinksInOverflow > 0;
	}

	get _isOverflowEmpty() {
		return !this._countLinksInOverflow;
	}

	get _accessibleNameText() {
		return this.i18nBundle.getText(BREADCRUMBS_ARIA_LABEL);
	}

	get _overflowAccessibleNameText() {
		return this.i18nBundle.getText(BREADCRUMBS_OVERFLOW_ARIA_LABEL);
	}

	get _cancelButtonText() {
		return this.i18nBundle.getText(BREADCRUMBS_CANCEL_BUTTON);
	}

	static get dependencies() {
		return [];
	}
}

Breadcrumbs.define();

export default Breadcrumbs;
