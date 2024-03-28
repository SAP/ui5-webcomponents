var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TabContainer_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import slideDown from "@ui5/webcomponents-base/dist/animations/slideDown.js";
import slideUp from "@ui5/webcomponents-base/dist/animations/slideUp.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import { isSpace, isEnter, isDown, isRight, isLeft, isUp, } from "@ui5/webcomponents-base/dist/Keys.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-up.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";
import findClosestPosition from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import longDragOverHandler from "@ui5/webcomponents-base/dist/util/dragAndDrop/longDragOverHandler.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import { TABCONTAINER_PREVIOUS_ICON_ACC_NAME, TABCONTAINER_NEXT_ICON_ACC_NAME, TABCONTAINER_OVERFLOW_MENU_TITLE, TABCONTAINER_END_OVERFLOW, TABCONTAINER_POPOVER_CANCEL_BUTTON, TABCONTAINER_SUBTABS_DESCRIPTION, } from "./generated/i18n/i18n-defaults.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import List from "./List.js";
import DropIndicator from "./DropIndicator.js";
import ResponsivePopover from "./ResponsivePopover.js";
import TabContainerTabsPlacement from "./types/TabContainerTabsPlacement.js";
import SemanticColor from "./types/SemanticColor.js";
import TabContainerBackgroundDesign from "./types/TabContainerBackgroundDesign.js";
import TabLayout from "./types/TabLayout.js";
import TabsOverflowMode from "./types/TabsOverflowMode.js";
// Templates
import TabContainerTemplate from "./generated/templates/TabContainerTemplate.lit.js";
import TabContainerPopoverTemplate from "./generated/templates/TabContainerPopoverTemplate.lit.js";
// Styles
import tabContainerCss from "./generated/themes/TabContainer.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
const tabStyles = [];
const staticAreaTabStyles = [];
const PAGE_UP_DOWN_SIZE = 5;
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-tabcontainer` represents a collection of tabs with associated content.
 * Navigation through the tabs changes the content display of the currently active content area.
 * A tab can be labeled with text only, or icons with text.
 *
 * ### Structure
 *
 * The `ui5-tabcontainer` can hold two types of entities:
 *
 * - `ui5-tab` - contains all the information on an item (text and icon)
 * - `ui5-tab-separator` - used to separate tabs with a line
 *
 * ### Hierarchies
 * Multiple sub tabs could be placed underneath one main tab. Nesting allows deeper hierarchies with indentations
 * to indicate the level of each nested tab. When a tab has both sub tabs and own content its click area is split
 * to allow the user to display the content or alternatively to expand / collapse the list of sub tabs.
 *
 * ### Keyboard Handling
 *
 * #### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/TabContainer.js";`
 *
 * `import "@ui5/webcomponents/dist/Tab.js";` (for `ui5-tab`)
 *
 * `import "@ui5/webcomponents/dist/TabSeparator.js";` (for `ui5-tab-separator`)
 * @constructor
 * @extends UI5Element
 * @public
 * @csspart content - Used to style the content of the component
 * @csspart tabstrip - Used to style the tabstrip of the component
 */
let TabContainer = TabContainer_1 = class TabContainer extends UI5Element {
    static registerTabStyles(styles) {
        tabStyles.push(styles);
    }
    static registerStaticAreaTabStyles(styles) {
        staticAreaTabStyles.push(styles);
    }
    constructor() {
        super();
        this._hasScheduledPopoverOpen = false;
        this._handleResizeBound = this._handleResize.bind(this);
        // Init ItemNavigation
        this._itemNavigation = new ItemNavigation(this, {
            getItemsCallback: () => this._getFocusableRefs(),
            skipItemsSize: PAGE_UP_DOWN_SIZE,
        });
    }
    onBeforeRendering() {
        this._itemsFlat = this._flatten(this.items);
        if (!this._itemsFlat.length) {
            return;
        }
        // update selected tab
        const selectedTabs = this._itemsFlat.filter(tab => tab.selected);
        if (selectedTabs.length) {
            this._selectedTab.forcedSelected = false;
            this._selectedTab = selectedTabs[0];
        }
        else {
            this._selectedTab = this._itemsFlat[0];
            this._selectedTab.forcedSelected = true;
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
        if (this.responsivePopover?.opened) {
            const popoverItems = this._getPopoverItemsFor(this._getPopoverOwner(this.responsivePopover._opener));
            if (popoverItems.length) {
                this._setPopoverItems(popoverItems);
            }
            else {
                this._closePopover();
            }
        }
    }
    onEnterDOM() {
        ResizeHandler.register(this._getHeader(), this._handleResizeBound);
        DragRegistry.subscribe(this);
        this._setDraggedElement = DragRegistry.addSelfManagedArea(this);
    }
    onExitDOM() {
        ResizeHandler.deregister(this._getHeader(), this._handleResizeBound);
        DragRegistry.unsubscribe(this);
        DragRegistry.removeSelfManagedArea(this);
        this._setDraggedElement = undefined;
        if (this.staticAreaItem && this._setDraggedElementInStaticArea) {
            DragRegistry.removeSelfManagedArea(this.staticAreaItem);
            this._setDraggedElementInStaticArea = undefined;
        }
    }
    _handleResize() {
        if (this.responsivePopover && this.responsivePopover.opened) {
            this._closePopover();
        }
        // invalidate
        this._width = this.offsetWidth;
        this._updateMediaRange(this._width);
    }
    _updateMediaRange(width) {
        this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, width);
    }
    _setItemsPrivateProperties(items) {
        // set real dom ref to all items, then return only the tabs for further processing
        const allTabs = items.filter(item => {
            item.getElementInStrip = () => this.getDomRef().querySelector(`[id="${item._id}"]`);
            return !item.isSeparator;
        });
        allTabs.forEach((tab, index, arr) => {
            tab.isInline = this.tabLayout === TabLayout.Inline;
            tab.forcedMixedMode = this.mixedMode;
            tab.forcedPosinset = index + 1;
            tab.forcedSetsize = arr.length;
            tab.isTopLevelTab = items.some(i => i === tab);
        });
        walk(items, item => {
            if (!item.isSeparator) {
                item._selectedTabReference = this._selectedTab;
            }
        });
        this._setIndentLevels(items);
    }
    _onHeaderFocusin(e) {
        const tab = getTab(e.target);
        if (tab) {
            this._itemNavigation.setCurrentItem(tab.realTabReference);
        }
    }
    _onHeaderDragStart(e) {
        if (!e.dataTransfer || !(e.target instanceof HTMLElement)) {
            return;
        }
        this._setDraggedElement(e.target.realTabReference);
    }
    _onHeaderDragEnter(e) {
        e.preventDefault();
    }
    _onHeaderDragOver(e, isLongDragOver) {
        if (!(e.target instanceof HTMLElement) || !e.target.closest("[data-ui5-stable=overflow-start],[data-ui5-stable=overflow-end],[role=tab],[role=separator]")) {
            this.dropIndicatorDOM.targetReference = null;
            return;
        }
        const draggedElement = DragRegistry.getDraggedElement();
        const closestPosition = findClosestPosition([...this._getTabStrip().querySelectorAll(`[role="tab"]:not([hidden])`)], e.clientX, Orientation.Horizontal);
        const overflowButton = e.target.closest("[data-ui5-stable=overflow-start],[data-ui5-stable=overflow-end]");
        let popoverTarget = null;
        if (overflowButton) {
            popoverTarget = overflowButton;
            e.preventDefault();
        }
        else if (closestPosition) {
            const dropTarget = closestPosition.element.realTabReference;
            let placements = closestPosition.placements;
            if (dropTarget === draggedElement) {
                placements = placements.filter(placement => placement !== MovePlacement.On);
            }
            const acceptedPlacement = placements.find(placement => {
                const dragOverPrevented = !this.fireEvent("move-over", {
                    source: {
                        element: draggedElement,
                    },
                    destination: {
                        element: dropTarget,
                        placement,
                    },
                }, true);
                if (dragOverPrevented) {
                    e.preventDefault();
                    this.dropIndicatorDOM.targetReference = closestPosition.element;
                    this.dropIndicatorDOM.placement = placement;
                    return true;
                }
                return false;
            });
            if (acceptedPlacement === MovePlacement.On && closestPosition.element.realTabReference.subTabs.length) {
                popoverTarget = closestPosition.element;
            }
            else if (!acceptedPlacement) {
                this.dropIndicatorDOM.targetReference = null;
            }
        }
        if (popoverTarget && isLongDragOver) {
            this._showPopoverAt(popoverTarget, false, true);
        }
        else {
            this._closePopover();
        }
    }
    _onHeaderDrop(e) {
        e.preventDefault();
        const draggedElement = DragRegistry.getDraggedElement();
        this.fireEvent("move", {
            source: {
                element: draggedElement,
            },
            destination: {
                element: this.dropIndicatorDOM.targetReference.realTabReference,
                placement: this.dropIndicatorDOM.placement,
            },
        });
        this.dropIndicatorDOM.targetReference = null;
        draggedElement.focus();
    }
    _onHeaderDragLeave(e) {
        if (e.relatedTarget instanceof Node && this.shadowRoot.contains(e.relatedTarget)) {
            return;
        }
        this.dropIndicatorDOM.targetReference = null;
    }
    _onPopoverListMoveOver(e) {
        const { destination } = e.detail;
        const draggedElement = DragRegistry.getDraggedElement();
        const dropTarget = destination.element.realTabReference;
        if (destination.placement === MovePlacement.On && (dropTarget.isSeparator || draggedElement === dropTarget)) {
            return;
        }
        const placementAccepted = !this.fireEvent("move-over", {
            source: {
                element: draggedElement,
            },
            destination: {
                element: dropTarget,
                placement: destination.placement,
            },
        }, true);
        if (placementAccepted) {
            e.preventDefault();
        }
        else {
            this.dropIndicatorDOM.targetReference = null;
        }
    }
    _onPopoverListMove(e) {
        const { destination } = e.detail;
        const draggedElement = DragRegistry.getDraggedElement();
        e.preventDefault();
        this.fireEvent("move", {
            source: {
                element: draggedElement,
            },
            destination: {
                element: destination.element.realTabReference,
                placement: destination.placement,
            },
        }, true);
        this.dropIndicatorDOM.targetReference = null;
        draggedElement.focus();
    }
    async _onTabStripClick(e) {
        const tab = getTab(e.target);
        if (!tab || tab.realTabReference.disabled) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        if (e.target.hasAttribute("ui5-button")) {
            this._onTabExpandButtonClick(e);
            return;
        }
        if (!tab.realTabReference.hasOwnContent && tab.realTabReference.tabs.length) {
            await this._togglePopover(tab);
            return;
        }
        this._onHeaderItemSelect(tab);
    }
    async _onTabExpandButtonClick(e) {
        e.stopPropagation();
        e.preventDefault();
        let tabInstance;
        if (isTabInStrip(e.target)) {
            tabInstance = e.target;
        }
        else {
            tabInstance = e.target.tab;
        }
        let opener = e.target;
        if (tabInstance) {
            tabInstance.focus();
        }
        if (e.type === "keydown" && !e.target.realTabReference.isSingleClickArea) {
            opener = e.target.querySelector(".ui5-tab-expand-button [ui5-button]");
            tabInstance = e.target.realTabReference;
        }
        // if clicked between the expand button and the tab
        if (!tabInstance) {
            this._onHeaderItemSelect(opener.parentElement);
            return;
        }
        await this._togglePopover(opener, true);
    }
    _setPopoverInitialFocus() {
        const selectedTabInOverflow = this._getSelectedTabInOverflow();
        const tab = selectedTabInOverflow || this._getFirstFocusableItemInOverflow();
        this.responsivePopover.initialFocus = `${tab.realTabReference._id}-li`;
    }
    _getSelectedTabInOverflow() {
        return this.responsivePopover.content[0].items.find(item => {
            return item.realTabReference && item.realTabReference.selected;
        });
    }
    _getFirstFocusableItemInOverflow() {
        return this.responsivePopover.content[0].items.find(item => item.classList.contains("ui5-tab-overflow-item"));
    }
    _onTabStripKeyDown(e) {
        const tab = getTab(e.target);
        if (!tab || tab.realTabReference.disabled) {
            return;
        }
        if (isEnter(e)) {
            if (tab.realTabReference.isSingleClickArea) {
                this._onTabStripClick(e);
            }
            else {
                this._onHeaderItemSelect(tab);
            }
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
        if (isDown(e) || isUp(e)) {
            if (tab.realTabReference.requiresExpandButton) {
                this._onTabExpandButtonClick(e);
            }
            if (tab.realTabReference.isSingleClickArea) {
                this._onTabStripClick(e);
            }
        }
    }
    _onTabStripKeyUp(e) {
        const tab = getTab(e.target);
        if (!tab || tab.realTabReference.disabled) {
            return;
        }
        if (isSpace(e)) {
            e.preventDefault();
            if (tab.realTabReference.isSingleClickArea) {
                this._onTabStripClick(e);
            }
            else {
                this._onHeaderItemSelect(tab);
            }
        }
    }
    _onHeaderItemSelect(tab) {
        if (!tab.hasAttribute("disabled")) {
            this._onItemSelect(tab.id);
        }
    }
    async _onOverflowListItemClick(e) {
        e.preventDefault(); // cancel the item selection
        this._onItemSelect(e.detail.item.id.slice(0, -3)); // strip "-li" from end of id
        this._closePopover();
        await renderFinished();
        const selectedTopLevel = this._getRootTab(this._selectedTab);
        selectedTopLevel.getTabInStripDomRef().focus();
    }
    /**
     * Returns all slotted tabs and their subTabs in a flattened array.
     * The order of tabs is depth-first.
     *
     * @public
     * @default []
     */
    get allItems() {
        return this._flatten(this.items);
    }
    _setIndentLevels(items, level = 1) {
        items.forEach(item => {
            if (item.hasAttribute("ui5-tab") || item.hasAttribute("ui5-tab-separator")) {
                item.forcedLevel = level;
                if (item.subTabs) {
                    this._setIndentLevels(item.subTabs, level + 1);
                }
            }
        });
    }
    _flatten(items) {
        const result = [];
        walk(items, item => {
            if (item.hasAttribute("ui5-tab") || item.hasAttribute("ui5-tab-separator")) {
                result.push(item);
            }
        });
        return result;
    }
    _onItemSelect(selectedTabId) {
        const previousTab = this._selectedTab;
        const selectedTabIndex = this._itemsFlat.findIndex(item => item.__id === selectedTabId);
        const selectedTab = this._itemsFlat[selectedTabIndex];
        const selectionSuccessful = this.selectTab(selectedTab, selectedTabIndex);
        if (!selectionSuccessful) {
            return;
        }
        // update selected property on all items
        this._itemsFlat.forEach((item, index) => {
            const selected = selectedTabIndex === index;
            item.selected = selected;
            if (item.forcedSelected) {
                item.forcedSelected = false;
            }
        });
        if (this.fixed) {
            return;
        }
        if (!this.shouldAnimate) {
            this.toggle(selectedTab, previousTab);
        }
        else {
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
        }
        else {
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
        }
        else {
            this.collapsed = false;
        }
    }
    /**
     * Fires the `tab-select` event and changes the internal reference for the currently selected tab.
     * If the event is prevented, the current tab is not changed.
     * @private
     * @param selectedTab selected tab instance
     * @param selectedTabIndex selected tab index for an array containing all tabs and sub tabs. **Note:** Use the method `allTabs` to get this array.
     * @returns true if the tab selection is successful, false if it was prevented
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
        return slideDown(element).promise();
    }
    slideContentUp(element) {
        return slideUp(element).promise();
    }
    async _onOverflowClick(e) {
        if (e.target.classList.contains("ui5-tc__overflow")) {
            // the empty area in the overflow was clicked
            return;
        }
        const overflow = e.currentTarget;
        const isEndOverflow = overflow.classList.contains("ui5-tc__overflow--end");
        let opener;
        if (isEndOverflow) {
            opener = this.overflowButton[0] || this._getEndOverflowBtnDOM();
        }
        else {
            opener = this.startOverflowButton[0] || this._getStartOverflowBtnDOM();
        }
        await this._togglePopover(opener, true);
    }
    _addStyleIndent(itemsFlat) {
        const extraIndent = itemsFlat
            .filter(tab => !tab.isSeparator)
            .some(tab => tab.design !== SemanticColor.Default && tab.design !== SemanticColor.Neutral);
        itemsFlat.forEach(item => {
            let level = item.forcedLevel - 1;
            if (item.isSeparator) {
                level += 1;
            }
            item.forcedStyle = {
                [getScopedVarName("--_ui5-tab-indentation-level")]: level,
                [getScopedVarName("--_ui5-tab-extra-indent")]: extraIndent ? 1 : null,
            };
        });
    }
    async _onOverflowKeyDown(e) {
        const overflow = e.currentTarget;
        const isEndOverflow = overflow.classList.contains("ui5-tc__overflow--end");
        const isStartOverflow = overflow.classList.contains("ui5-tc__overflow--start");
        if (isDown(e) || (isStartOverflow && isLeft(e)) || (isEndOverflow && isRight(e))) {
            e.stopPropagation();
            e.preventDefault();
            await this._onOverflowClick(e);
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
        }
        else {
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
    _findLastVisibleItem(itemsDomRefs, containerWidth, selectedItemWidth, startIndex = 0) {
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
        return this.items.filter((item) => !item.isSeparator);
    }
    _getPopoverOwner(opener) {
        if (opener === this._getStartOverflowBtnDOM() || opener.slot === "startOverflowButton") {
            return "start-overflow";
        }
        if (opener === this._getEndOverflowBtnDOM() || opener.slot === "overflowButton") {
            return "end-overflow";
        }
        if (opener instanceof Button) {
            return opener.tab;
        }
        return opener;
    }
    _getPopoverItemsFor(targetOwner) {
        if (targetOwner === "start-overflow") {
            return this.items.filter(item => {
                const stripRef = item.getTabInStripDomRef();
                return stripRef && stripRef.hasAttribute("start-overflow");
            });
        }
        if (targetOwner === "end-overflow") {
            return this.items.filter(item => {
                const stripRef = item.getTabInStripDomRef();
                return stripRef && stripRef.hasAttribute("end-overflow");
            });
        }
        if (isTabInStrip(targetOwner)) {
            return targetOwner.realTabReference.subTabs;
        }
        return targetOwner.subTabs;
    }
    _setPopoverItems(items) {
        const newItemsFlat = this._flatten(items);
        if (!arraysAreEqual(this._popoverItemsFlat, newItemsFlat)) {
            this._popoverItemsFlat = newItemsFlat;
            this._addStyleIndent(this._popoverItemsFlat);
        }
    }
    async _togglePopover(opener, setInitialFocus = false) {
        this.responsivePopover = await this._respPopover();
        if (this.responsivePopover.isOpen()) {
            this._closePopover();
        }
        else {
            await this._showPopoverAt(opener, setInitialFocus);
        }
    }
    async _showPopoverAt(opener, setInitialFocus = false, preventInitialFocus = false) {
        this._hasScheduledPopoverOpen = true;
        this._setPopoverItems(this._getPopoverItemsFor(this._getPopoverOwner(opener)));
        this.responsivePopover = await this._respPopover();
        if (setInitialFocus) {
            this._setPopoverInitialFocus();
        }
        if (this._hasScheduledPopoverOpen) {
            await this.responsivePopover.showAt(opener, preventInitialFocus);
        }
    }
    get hasSubTabs() {
        const tabs = this._getTabs();
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].subTabs.length > 0) {
                return true;
            }
        }
        return false;
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
        const staticAreaItemDomRef = await this.getStaticAreaItemDomRef();
        if (!this._setDraggedElementInStaticArea) {
            this._setDraggedElementInStaticArea = DragRegistry.addSelfManagedArea(this.staticAreaItem);
            staticAreaItemDomRef.addEventListener("dragstart", e => {
                this._setDraggedElementInStaticArea(e.target.realTabReference);
            });
        }
        return staticAreaItemDomRef.querySelector(`#${this._id}-overflowMenu`);
    }
    _closePopover() {
        this._hasScheduledPopoverOpen = false;
        this.responsivePopover?.close();
    }
    get dropIndicatorDOM() {
        return this.shadowRoot.querySelector("[ui5-drop-indicator]");
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
        return TabContainer_1.i18nBundle.getText(TABCONTAINER_PREVIOUS_ICON_ACC_NAME);
    }
    get nextIconACCName() {
        return TabContainer_1.i18nBundle.getText(TABCONTAINER_NEXT_ICON_ACC_NAME);
    }
    get overflowMenuTitle() {
        return TabContainer_1.i18nBundle.getText(TABCONTAINER_OVERFLOW_MENU_TITLE);
    }
    get tabsAtTheBottom() {
        return this.tabsPlacement === TabContainerTabsPlacement.Bottom;
    }
    get overflowMenuIcon() {
        return this.tabsAtTheBottom ? "slim-arrow-up" : "slim-arrow-down";
    }
    get overflowButtonText() {
        return TabContainer_1.i18nBundle.getText(TABCONTAINER_END_OVERFLOW);
    }
    get popoverCancelButtonText() {
        return TabContainer_1.i18nBundle.getText(TABCONTAINER_POPOVER_CANCEL_BUTTON);
    }
    get accInvisibleText() {
        return TabContainer_1.i18nBundle.getText(TABCONTAINER_SUBTABS_DESCRIPTION);
    }
    get tablistAriaDescribedById() {
        return this.hasSubTabs ? `${this._id}-invisibleText` : undefined;
    }
    get shouldAnimate() {
        return getAnimationMode() !== AnimationMode.None;
    }
    static async onDefine() {
        TabContainer_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property({ type: Boolean })
], TabContainer.prototype, "fixed", void 0);
__decorate([
    property({ type: Boolean })
], TabContainer.prototype, "collapsed", void 0);
__decorate([
    property({ type: Boolean })
], TabContainer.prototype, "showOverflow", void 0);
__decorate([
    property({ type: TabLayout, defaultValue: TabLayout.Standard })
], TabContainer.prototype, "tabLayout", void 0);
__decorate([
    property({ type: TabsOverflowMode, defaultValue: TabsOverflowMode.End })
], TabContainer.prototype, "tabsOverflowMode", void 0);
__decorate([
    property({ type: TabContainerBackgroundDesign, defaultValue: TabContainerBackgroundDesign.Solid })
], TabContainer.prototype, "headerBackgroundDesign", void 0);
__decorate([
    property({ type: TabContainerBackgroundDesign, defaultValue: TabContainerBackgroundDesign.Solid })
], TabContainer.prototype, "contentBackgroundDesign", void 0);
__decorate([
    property({ type: TabContainerTabsPlacement, defaultValue: TabContainerTabsPlacement.Top })
], TabContainer.prototype, "tabsPlacement", void 0);
__decorate([
    property()
], TabContainer.prototype, "mediaRange", void 0);
__decorate([
    property({ type: Object })
], TabContainer.prototype, "_selectedTab", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TabContainer.prototype, "_animationRunning", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], TabContainer.prototype, "_contentCollapsed", void 0);
__decorate([
    property({ noAttribute: true, defaultValue: "0" })
], TabContainer.prototype, "_startOverflowText", void 0);
__decorate([
    property({ noAttribute: true, defaultValue: "More" })
], TabContainer.prototype, "_endOverflowText", void 0);
__decorate([
    property({ type: Object, multiple: true })
], TabContainer.prototype, "_popoverItemsFlat", void 0);
__decorate([
    property({ validator: Integer, noAttribute: true })
], TabContainer.prototype, "_width", void 0);
__decorate([
    slot({
        "default": true,
        type: HTMLElement,
        individualSlots: true,
        invalidateOnChildChange: {
            properties: true,
            slots: true,
        },
    })
], TabContainer.prototype, "items", void 0);
__decorate([
    slot()
], TabContainer.prototype, "overflowButton", void 0);
__decorate([
    slot()
], TabContainer.prototype, "startOverflowButton", void 0);
__decorate([
    longDragOverHandler("[data-ui5-stable=overflow-start],[data-ui5-stable=overflow-end],[role=tab]")
], TabContainer.prototype, "_onHeaderDragOver", null);
TabContainer = TabContainer_1 = __decorate([
    customElement({
        tag: "ui5-tabcontainer",
        languageAware: true,
        fastNavigation: true,
        styles: [tabStyles, tabContainerCss],
        staticAreaStyles: [ResponsivePopoverCommonCss, staticAreaTabStyles],
        renderer: litRender,
        template: TabContainerTemplate,
        staticAreaTemplate: TabContainerPopoverTemplate,
        dependencies: [
            Button,
            Icon,
            List,
            ResponsivePopover,
            DropIndicator,
        ],
    })
    /**
     * Fired when a tab is selected.
     * @param {ITab} tab The selected `tab`.
     * @param {Integer} tabIndex The selected `tab` index in the flattened array of all tabs and their subTabs, provided by the `allItems` getter.
     * @public
     * @allowPreventDefault
     */
    ,
    event("tab-select", {
        detail: {
            /**
             * @public
             */
            tab: { type: HTMLElement },
            /**
             * @public
             */
            tabIndex: { type: Number },
        },
    })
], TabContainer);
const isTabInStrip = (el) => el.localName === "div" && el.getAttribute("role") === "tab";
const getTab = (el) => {
    while (el) {
        if (isTabInStrip(el)) {
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
//# sourceMappingURL=TabContainer.js.map