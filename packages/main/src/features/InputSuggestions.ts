import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { registerFeature } from "@ui5/webcomponents-base/dist/FeaturesRegistry.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
// @ts-ignore
import encodeXML from "@ui5/webcomponents-base/dist/sap/base/security/encodeXML.js";
import generateHighlightedMarkup from "@ui5/webcomponents-base/dist/util/generateHighlightedMarkup.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import List from "../List.js";
import type { ListItemClickEventDetail, ListSelectionChangeEventDetail } from "../List.js";
import ResponsivePopover from "../ResponsivePopover.js";
import SuggestionItem from "../SuggestionItem.js";
import SuggestionGroupItem from "../SuggestionGroupItem.js";
import Button from "../Button.js";
import Icon from "../Icon.js";
import ListItemGroupHeader from "../ListItemGroupHeader.js";
import SuggestionListItem from "../SuggestionListItem.js";

import {
	LIST_ITEM_POSITION,
	LIST_ITEM_GROUP_HEADER,
} from "../generated/i18n/i18n-defaults.js";
import type ListItemType from "../types/ListItemType.js";
import type ListItemBase from "../ListItemBase.js";
import type { IInputSuggestionItem } from "../Input.js";

interface SuggestionComponent extends UI5Element {
	_isValueStateFocused: boolean;
	focused: boolean;
	hasSuggestionItemSelected: boolean;
	value: string;
	typedInValue: string;
	hasValueStateMessage: boolean;
	suggestionItems: Array<IInputSuggestionItem>;
	open: boolean;
	onItemMouseOver: (e: MouseEvent) => void;
	onItemMouseOut: (e: MouseEvent) => void;
	onItemSelected: (pressedItem: SuggestionItem, listItem: SuggestionListItem | null, keyboardUsed: boolean) => void;
	onItemSelect: (item: SuggestionListItem) => void;
}

type InputSuggestion = {
	text: string;
	description?: string;
	image?: string;
	icon?: string;
	type?: `${ListItemType}`;
	additionalText?: string;
	additionalTextState?: `${ValueState}`;
	groupItem: boolean;
	key: number;
}

type SuggestionsAccInfo = {
	isGroup: boolean,
	currentPos: number;
	listSize: number;
	itemText: string;
	description: string;
	additionalText: string;
}

/**
 * A class to manage the `Input` suggestion items.
 * @class
 * @private
 */
class Suggestions {
	component: SuggestionComponent;
	slotName: string;
	handleFocus: boolean;
	highlight: boolean;
	selectedItemIndex: number;
	accInfo?: SuggestionsAccInfo;
	_scrollContainer?: HTMLElement;
	_handledPress?: boolean;
	attachedAfterOpened?: boolean;
	attachedAfterClose?: boolean;
	fnOnSuggestionItemPress: (e: CustomEvent<ListItemClickEventDetail | ListSelectionChangeEventDetail>) => void;
	fnOnSuggestionItemMouseOver: (e: MouseEvent) => void;
	fnOnSuggestionItemMouseOut: (e: MouseEvent) => void;
	static i18nBundle: I18nBundle;
	static SCROLL_STEP = 60;

	constructor(component: SuggestionComponent, slotName: string, highlight: boolean, handleFocus: boolean) {
		// The component, that the suggestion would plug into.
		this.component = component;

		// Defines the items` slot name.
		this.slotName = slotName;

		// Defines, if the focus will be moved via the arrow keys.
		this.handleFocus = handleFocus;

		// Defines, if the suggestions should highlight.
		this.highlight = highlight;

		// Press and Focus handlers
		this.fnOnSuggestionItemPress = this.onItemPress.bind(this);
		this.fnOnSuggestionItemMouseOver = this.onItemMouseOver.bind(this);
		this.fnOnSuggestionItemMouseOut = this.onItemMouseOut.bind(this);

		// An integer value to store the currently selected item position,
		// that changes due to user interaction.
		this.selectedItemIndex = -1;
	}

	/* Public methods */
	defaultSlotProperties(hightlightValue: string) {
		const inputSuggestionItems = this._getComponent().suggestionItems;
		const highlight = this.highlight && !!hightlightValue;
		const suggestions: Array<InputSuggestion> = [];

		inputSuggestionItems.map((suggestion: IInputSuggestionItem, idx: number) => {
			const text = highlight ? this.getHighlightedText(suggestion, hightlightValue) : this.getRowText(suggestion);
			const description = highlight ? this.getHighlightedDesc(suggestion, hightlightValue) : this.getRowDesc(suggestion);

			return suggestions.push({
				text,
				description,
				image: suggestion.image || undefined,
				icon: suggestion.icon || undefined,
				type: suggestion.type || undefined,
				additionalText: suggestion.additionalText || undefined,
				additionalTextState: suggestion.additionalTextState,
				groupItem: suggestion.groupItem,
				key: idx,
			});
		});

		return suggestions;
	}

	onUp(e: KeyboardEvent) {
		e.preventDefault();
		this._handleItemNavigation(false /* forward */);
		return true;
	}

	onDown(e: KeyboardEvent) {
		e.preventDefault();
		this._handleItemNavigation(true /* forward */);
		return true;
	}

	onSpace(e: KeyboardEvent) {
		if (this._isItemOnTarget()) {
			e.preventDefault();
			this.onItemSelected(null, true /* keyboardUsed */);
			return true;
		}
		return false;
	}

	onEnter(e: KeyboardEvent) {
		if (this._isGroupOrInactiveItem) {
			e.preventDefault();
			return false;
		}

		if (this._isItemOnTarget()) {
			this.onItemSelected(null, true /* keyboardUsed */);
			return true;
		}

		return false;
	}

	onPageUp(e: KeyboardEvent) {
		e.preventDefault();

		const isItemIndexValid = this.selectedItemIndex - 10 > -1;

		if (this._hasValueState && !isItemIndexValid) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex,
			isItemIndexValid ? this.selectedItemIndex -= 10 : this.selectedItemIndex = 0);
		return true;
	}

	onPageDown(e: KeyboardEvent) {
		e.preventDefault();

		const items = this._getItems();
		const lastItemIndex = items.length - 1;
		const isItemIndexValid = this.selectedItemIndex + 10 <= lastItemIndex;

		if (this._hasValueState && !items) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex,
			isItemIndexValid ? this.selectedItemIndex += 10 : this.selectedItemIndex = lastItemIndex);
		return true;
	}

	onHome(e: KeyboardEvent) {
		e.preventDefault();

		if (this._hasValueState) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex, this.selectedItemIndex = 0);
		return true;
	}

	onEnd(e: KeyboardEvent) {
		e.preventDefault();

		const lastItemIndex = this._getItems().length - 1;

		if (this._hasValueState && !lastItemIndex) {
			this._focusValueState();
			return true;
		}

		this._moveItemSelection(this.selectedItemIndex, this.selectedItemIndex = lastItemIndex);
		return true;
	}

	onTab() {
		if (this._isItemOnTarget()) {
			this.onItemSelected(null, true);
			return true;
		}
		return false;
	}

	toggle(bToggle: boolean, options: { preventFocusRestore: boolean }) {
		const toggle = bToggle !== undefined ? bToggle : !this.isOpened();

		if (toggle) {
			this.open();
		} else {
			this.close(options.preventFocusRestore);
		}
	}

	_isScrollable() {
		const sc = this._getScrollContainer();
		return sc.offsetHeight < sc.scrollHeight;
	}

	open() {
		this._getComponent().open = true;
	}

	close(preventFocusRestore = false) {
		const selectedItem = this._getItems() && this._getItems()[this.selectedItemIndex];

		this._getComponent().open = false;
		this._getPicker().close(false, false, preventFocusRestore);

		if (selectedItem && selectedItem.focused) {
			selectedItem.focused = false;
		}
	}

	updateSelectedItemPosition(pos: number) {
		this.selectedItemIndex = pos;
	}

	/* Interface methods */
	onItemMouseOver(e: MouseEvent) {
		this._getComponent().onItemMouseOver(e);
	}

	onItemMouseOut(e: MouseEvent) {
		this._getComponent().onItemMouseOut(e);
	}

	onItemSelected(selectedItem: SuggestionListItem | null, keyboardUsed: boolean) {
		const allItems = this._getItems();
		const item = selectedItem || allItems[this.selectedItemIndex];
		const nonGroupItems = this._getNonGroupItems();

		this.selectedItemIndex = allItems.indexOf(item);

		this.accInfo = {
			isGroup: item.groupItem,
			currentPos: nonGroupItems.indexOf(item) + 1,
			listSize: nonGroupItems.length,
			itemText: this._getRealItems()[this.selectedItemIndex].text,
			description: this._getRealItems()[this.selectedItemIndex].description,
			additionalText: this._getRealItems()[this.selectedItemIndex].additionalText,
		};

		// If the item is "Inactive", prevent selection with SPACE or ENTER
		// to have consistency with the way "Inactive" items behave in the ui5-list
		if (item.type === "Inactive" || item.groupItem) {
			return;
		}

		this._getComponent().onItemSelected(this._getRealItems()[this.selectedItemIndex], item, keyboardUsed);
		item.selected = false;
		item.focused = false;
		this._getComponent().open = false;
	}

	onItemSelect(item: SuggestionListItem) {
		this._getComponent().onItemSelect(item);
	}

	/* Private methods */
	// Note: Split into two separate handlers
	onItemPress(e: CustomEvent<ListItemClickEventDetail | ListSelectionChangeEventDetail>) {
		let pressedItem: ListItemBase; // SuggestionListItem
		const isPressEvent = e.type === "ui5-item-click";

		// Only use the press e if the item is already selected, in all other cases we are listening for 'ui5-selection-change' from the list
		// Also we have to check if the selection-change is fired by the list's 'item-click' event handling, to avoid double handling on our side
		if ((isPressEvent && !(e.detail as ListItemClickEventDetail).item.selected) || (this._handledPress && !isPressEvent)) {
			return;
		}

		if (isPressEvent && (e.detail as ListItemClickEventDetail).item.selected) {
			pressedItem = (e.detail as ListItemClickEventDetail).item;
			this._handledPress = true;
		} else {
			pressedItem = (e.detail as ListSelectionChangeEventDetail).selectedItems[0];
		}

		this.onItemSelected(pressedItem as SuggestionListItem, false /* keyboardUsed */);
	}

	_onOpen() {
		this._applyFocus();
	}

	_onClose() {
		this._handledPress = false;
	}

	_applyFocus() {
		if (this.selectedItemIndex) {
			this._getItems()[this.selectedItemIndex]?.focus();
		}
	}

	_isItemOnTarget() {
		return this.isOpened() && this.selectedItemIndex !== null && this.selectedItemIndex !== -1 && !this._isGroupOrInactiveItem;
	}

	get _isGroupOrInactiveItem() {
		const items = this._getItems();

		if (!items || !items[this.selectedItemIndex]) {
			return false;
		}

		return (items[this.selectedItemIndex].groupItem || items[this.selectedItemIndex].type === "Inactive");
	}

	isOpened() {
		return !!(this._getPicker()?.open);
	}

	_handleItemNavigation(forward: boolean) {
		if (!this._getItems().length) {
			return;
		}

		if (forward) {
			this._selectNextItem();
		} else {
			this._selectPreviousItem();
		}
	}

	_selectNextItem() {
		const itemsCount = this._getItems().length;
		const previousSelectedIdx = this.selectedItemIndex;

		if (this._hasValueState && previousSelectedIdx === -1 && !this.component._isValueStateFocused) {
			this._focusValueState();
			return;
		}

		if ((previousSelectedIdx === -1 && !this._hasValueState) || this.component._isValueStateFocused) {
			this._clearValueStateFocus();
			this.selectedItemIndex = -1;
		}

		if (previousSelectedIdx !== -1 && previousSelectedIdx + 1 > itemsCount - 1) {
			return;
		}

		this._moveItemSelection(previousSelectedIdx, ++this.selectedItemIndex);
	}

	_selectPreviousItem() {
		const items = this._getItems();
		const previousSelectedIdx = this.selectedItemIndex;

		if (this._hasValueState && previousSelectedIdx === 0 && !this.component._isValueStateFocused) {
			this.component.hasSuggestionItemSelected = false;
			this.component._isValueStateFocused = true;
			this.selectedItemIndex = 0;

			items[0].focused = false;
			items[0].selected = false;

			return;
		}

		if (this.component._isValueStateFocused) {
			this.component.focused = true;
			this.component._isValueStateFocused = false;
			this.selectedItemIndex = 0;

			return;
		}

		if (previousSelectedIdx === -1 || previousSelectedIdx === null) {
			return;
		}

		if (previousSelectedIdx - 1 < 0) {
			items[previousSelectedIdx].selected = false;
			items[previousSelectedIdx].focused = false;

			this.component.focused = true;
			this.component.hasSuggestionItemSelected = false;
			this.selectedItemIndex -= 1;
			return;
		}

		this._moveItemSelection(previousSelectedIdx, --this.selectedItemIndex);
	}

	_moveItemSelection(previousIdx: number, nextIdx: number) {
		const items = this._getItems();
		const currentItem = items[nextIdx];
		const previousItem = items[previousIdx];
		const nonGroupItems = this._getNonGroupItems();

		if (!currentItem) {
			return;
		}

		this.component.focused = false;
		this._clearValueStateFocus();

		this.accInfo = {
			isGroup: currentItem.groupItem,
			currentPos: nonGroupItems.indexOf(currentItem) + 1,
			listSize: nonGroupItems.length,
			itemText: this._getRealItems()[this.selectedItemIndex].text,
			description: this._getRealItems()[items.indexOf(currentItem)].description,
			additionalText: this._getRealItems()[items.indexOf(currentItem)].additionalText,
		};

		if (previousItem) {
			previousItem.selected = false;
			previousItem.focused = false;
		}

		if (currentItem) {
			currentItem.focused = true;

			if (currentItem.type === "Active") {
				currentItem.selected = true;
			}

			if (this.handleFocus) {
				currentItem.focus();
			}
		}

		this.component.hasSuggestionItemSelected = true;
		this.onItemSelect(currentItem);

		if (!this._isItemIntoView(currentItem)) {
			this._scrollItemIntoView(currentItem);
		}
	}

	_deselectItems() {
		const items = this._getItems();
		items.forEach(item => {
			item.selected = false;
			item.focused = false;
		});
	}

	_clearItemFocus() {
		const focusedItem = this._getItems().find(item => item.focused);

		if (focusedItem) {
			focusedItem.focused = false;
		}
	}

	_isItemIntoView(item: SuggestionListItem) {
		const rectItem = item.getDomRef()!.getBoundingClientRect();
		const rectInput = this._getComponent().getDomRef()!.getBoundingClientRect();
		const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

		return (rectItem.top + Suggestions.SCROLL_STEP <= windowHeight) && (rectItem.top >= rectInput.top);
	}

	_scrollItemIntoView(item: SuggestionListItem) {
		const pos = item.getDomRef()!.offsetTop;
		const scrollContainer = this._getScrollContainer();
		scrollContainer.scrollTop = pos;
	}

	_getScrollContainer() {
		if (!this._scrollContainer) {
			this._scrollContainer = this._getPicker()!.shadowRoot!.querySelector(".ui5-popup-content")!;
		}

		return this._scrollContainer;
	}

	_getItems(): Array<SuggestionListItem> {
		return [...this._getList()!.items] as Array<SuggestionListItem> || [];
	}

	_getNonGroupItems(): Array<SuggestionListItem> {
		return this._getItems().filter(item => !item.groupItem);
	}

	_getComponent(): SuggestionComponent {
		return this.component;
	}

	_getList() {
		return this._getPicker().querySelector<List>("[ui5-list]")!;
	}

	_getListWidth() {
		return this._getList()?.offsetWidth;
	}

	_getRealItems() {
		return this._getComponent().getSlottedNodes<SuggestionItem>(this.slotName);
	}

	_getPicker() {
		return this._getComponent().shadowRoot!.querySelector<ResponsivePopover>("[ui5-responsive-popover]")!;
	}

	get itemSelectionAnnounce() {
		if (!this.accInfo) {
			return "";
		}

		const itemPositionText = Suggestions.i18nBundle.getText(LIST_ITEM_POSITION, this.accInfo.currentPos, this.accInfo.listSize);
		const groupItemText = Suggestions.i18nBundle.getText(LIST_ITEM_GROUP_HEADER);

		return this.accInfo.isGroup ? `${groupItemText} ${this.accInfo.itemText}` : `${this.accInfo.description} ${this.accInfo.additionalText} ${itemPositionText}`;
	}

	getRowText(suggestion: IInputSuggestionItem) {
		return this.sanitizeText(suggestion.text || suggestion.textContent || "");
	}

	getRowDesc(suggestion: IInputSuggestionItem) {
		return this.sanitizeText(suggestion.description || "");
	}

	getHighlightedText(suggestion: IInputSuggestionItem, input: string) {
		const text = suggestion.text || suggestion.textContent || "";
		return this.hightlightInput(text, input);
	}

	getHighlightedDesc(suggestion: IInputSuggestionItem, input: string) {
		const text = suggestion.description || "";
		return this.hightlightInput(text, input);
	}

	hightlightInput(text: string, input: string) {
		return generateHighlightedMarkup(text, input);
	}

	sanitizeText(text: string) {
		return encodeXML(text) as string;
	}

	get _hasValueState() {
		return this.component.hasValueStateMessage;
	}

	_focusValueState() {
		this.component._isValueStateFocused = true;
		this.component.focused = false;
		this.component.hasSuggestionItemSelected = false;
		this.selectedItemIndex = 0;
		this.component.value = this.component.typedInValue;

		this._deselectItems();
	}

	_clearValueStateFocus() {
		this.component._isValueStateFocused = false;
	}

	_clearSelectedSuggestionAndAccInfo() {
		this.accInfo = undefined;
		this.selectedItemIndex = 0;
	}

	static get dependencies() {
		return [
			SuggestionItem,
			SuggestionGroupItem,
			List,
			SuggestionListItem,
			ListItemGroupHeader,
			Button,
			Icon,
		];
	}

	static async init() {
		Suggestions.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

// Add suggestions support to the global features registry so that Input.js can use it
registerFeature("InputSuggestions", Suggestions);

export default Suggestions;

export type {
	SuggestionComponent,
	InputSuggestion,
};
