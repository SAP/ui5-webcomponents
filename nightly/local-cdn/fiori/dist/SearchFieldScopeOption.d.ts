import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ISearchFieldScopeOption } from "./SearchField.js";
/**
 * @class
 * The `ui5-search-scope-option` represents the options for the scope in `ui5-search`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements {ISearchFieldScopeOption}
 * @public
 */
declare class SearchFieldScopeOption extends UI5Element implements ISearchFieldScopeOption {
    /**
     * Defines the text of the component.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Indicates whether the item is selected
     * @protected
     */
    selected: boolean;
    get stableDomRef(): string;
}
export default SearchFieldScopeOption;
