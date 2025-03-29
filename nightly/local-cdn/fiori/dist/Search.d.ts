import SearchPopupMode from "@ui5/webcomponents/dist/types/SearchPopupMode.js";
import type Popover from "@ui5/webcomponents/dist/Popover.js";
import type List from "@ui5/webcomponents/dist/List.js";
import SearchField from "./SearchField.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type SearchItem from "./SearchItem.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
interface ISearchSuggestionItem extends UI5Element {
    selected: boolean;
    headingText: string;
    items?: ISearchSuggestionItem[];
}
type SearchEventDetails = {
    item?: ISearchSuggestionItem;
};
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search` is an input with suggestions, used for user search.
 *
 * The `ui5-search` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 * - Expand/Collapse button - when there is no search term, the search button behaves as an expand/collapse button for the `ui5-search` component
 * - Suggestions - a list with available search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/Search.js";`
 *
 * @constructor
 * @extends SearchField
 * @public
 * @since 2.9.0
 * @experimental
 */
declare class Search extends SearchField {
    eventDetails: SearchField["eventDetails"] & {
        search: SearchEventDetails;
        "popup-action-press": void;
        "open": void;
        "close": void;
    };
    /**
     * Defines the visualisation mode of the search component.
     *
     * @default "List"
     * @public
     */
    popupMode: `${SearchPopupMode}`;
    /**
     * Defines whether the value will be autcompleted to match an item.
     * @default false
     * @public
     */
    noTypeahead: boolean;
    /**
     * Defines the header text to be placed in the search suggestions popup.
     * @public
     */
    headerText: string;
    /**
     * Defines the subheader text to be placed in the search suggestions popup.
     * @public
     */
    subheaderText: string;
    /**
     * Defines whether the popup footer action button is shown.
     * Note: The footer action button is displayed only when the `popupMode` is set to `List`.
     * @default false
     * @public
     */
    showPopupAction: boolean;
    /**
     * Defines the popup footer action button text.
     * @public
     */
    popupActionText: string;
    /**
     * Defines the Search suggestion items.
     *
     * @public
     */
    items: Array<SearchItem>;
    /**
     * Defines the illustrated message to be shown in the popup.
     *
     * @public
     */
    illustration: HTMLElement;
    /**
     * Indicates whether the items picker is open.
     * @public
     */
    open: boolean;
    /**
     * Defines the inner stored value of the component.
     *
     * **Note:** The property is updated upon typing.
     * @default ""
     * @private
     */
    _innerValue: string;
    /**
     * Based on the key pressed, determines if the autocomplete should be performed.
     * @private
     */
    _shouldAutocomplete?: boolean;
    /**
     * Determines whether a text selection should be performed.
     * @private
     */
    _performTextSelection?: boolean;
    /**
     * Determines whether the picker should open on user input. In some cases we need to close the picker,
     * (press on an item, or pressing Esc), but still focus the input. In this case we need to open the picker on input.
     * @private
     */
    _openPickerOnInput?: boolean;
    /**
     * Holds the typed value from the user.
     * @private
     */
    _typedInValue: string;
    /**
     * True if the first matching item is matched by starts with per term, rather than by starts with.
     * @private
     */
    _matchedPerTerm: boolean;
    /**
     * Holds the currently proposed item which will be selected if the user presses Enter.
     * @private
     */
    _proposedItem?: ISearchSuggestionItem;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    _handleTypeAhead(item: ISearchSuggestionItem): void;
    _startsWithMatchingItems(str: string): Array<ISearchSuggestionItem>;
    _startsWithPerTermMatchingItems(str: string): Array<ISearchSuggestionItem>;
    _isGroupItem(item: ISearchSuggestionItem): boolean;
    _deselectItems(): void;
    _handleDown(e: KeyboardEvent): Promise<void>;
    _handleArrowDown(): Promise<void>;
    _handleRight(e: KeyboardEvent): void;
    _handleEnter(): void;
    _handleSearchEvent(): void;
    _handleEscape(): void;
    _handleInput(e: InputEvent): void;
    _onFooterButtonKeyDown(e: KeyboardEvent): void;
    _onItemKeydown(e: KeyboardEvent): void;
    _onItemClick(e: CustomEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onfocusin(): void;
    _onfocusout(): void;
    _onFocusOutSearch(): void;
    _handleClose(): void;
    _handleOpen(): void;
    _onFooterButtonClick(): void;
    _getFirstMatchingItem(current: string): ISearchSuggestionItem | undefined;
    _getPicker(): Popover;
    _getItemsList(): List;
    _getFooterButton(): Button;
    get _flattenItems(): Array<ISearchSuggestionItem>;
    get nativeInput(): HTMLInputElement | null;
    get _showIllustration(): boolean;
    get _showLoading(): boolean;
    get _showHeader(): boolean;
    get _showFooter(): boolean;
}
export default Search;
