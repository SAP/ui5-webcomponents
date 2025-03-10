import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type SearchMode from "./types/SearchMode.js";
import type { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
/**
 * Interface for components that may be slotted inside a `ui5-search`
 * @public
 */
interface ISearchFieldScopeOption extends UI5Element {
    text?: string;
    selected: boolean;
    stableDomRef: string;
}
type SearchFieldScopeSelectionChangeDetails = {
    scope: ISearchFieldScopeOption | undefined;
};
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-field` is an input field, used for user search.
 *
 * The `ui5-search-field` consists of several elements parts:
 * - Scope - displays a select in the beggining of the component, used for filtering results by their scope.
 * - Input field - for user input value
 * - Clear button - gives the possibility for deleting the entered value
 * - Search button - a primary button for performing search, when the user has entered a search term
 * - Expand/Collapse button - when there is no search term, the search button behaves as an expand/collapse button for the `ui5-search-field` component
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/SearchField.js";`
 *
 * @constructor
 * @extends UI5Element
 * @private
 */
declare class SearchField extends UI5Element {
    eventDetails: {
        search: void;
        input: void;
        "scope-change": SearchFieldScopeSelectionChangeDetails;
    };
    /**
     * Defines the mode of the component.
     * @default "Default"
     * @public
     */
    mode: `${SearchMode}`;
    /**
     * Defines whether the clear icon of the search will be shown.
     * @default false
     * @public
     */
    showClearIcon: boolean;
    /**
     * Defines whether the component is expanded.
     *
     * @default false
     * @public
     */
    expanded: boolean;
    /**
     * Determines whether the component is in a fixed state that is not
     * expandable/collapsible by user interaction.
     * @default false
     * @public
     */
    fixed: boolean;
    /**
     * Defines the value of the component.
     *
     * **Note:** The property is updated upon typing.
     * @default ""
     * @public
     */
    value: string;
    /**
     * Defines a short hint intended to aid the user with data entry when the
     * component has no value.
     * @default undefined
     * @public
     */
    placeholder?: string;
    /**
     * Defines the accessible ARIA name of the component.
     * @public
     * @default undefined
     */
    accessibleName?: string;
    /**
     * Defines the component scope options.
     * @public
     */
    scopeOptions: Array<ISearchFieldScopeOption>;
    /**
     * @private
     */
    focusedInnerInput: boolean;
    /**
     * @private
     */
    _effectiveShowClearIcon: boolean;
    static i18nBundle: I18nBundle;
    onBeforeRendering(): void;
    _onkeydown(e: KeyboardEvent): void;
    _onfocusin(): void;
    _onfocusout(): void;
    _handleEnter(): void;
    _handleSearchIconPress(): void;
    _handleInput(e: InputEvent): void;
    _handleClear(): void;
    _handleScopeChange(e: CustomEvent<SelectChangeEventDetail>): void;
    get _isSearchIcon(): boolean | 0;
    get _searchButtonAccessibilityAttributes(): {
        expanded: boolean;
    };
    get _translations(): {
        scope: string;
        clearIcon: string;
        searchIcon: string;
        collapsedSearch: string;
    };
    captureRef(ref: HTMLElement & {
        scopeOption?: UI5Element;
    } | null): void;
}
export default SearchField;
export type { ISearchFieldScopeOption, SearchFieldScopeSelectionChangeDetails };
