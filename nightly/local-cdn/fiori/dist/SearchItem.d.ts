import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
/**
 * @class
 *
 * ### Overview
 *
 * A `ui5-search-item` is a list item, used for displaying search suggestions
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/fiori/dist/SearchItem.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.9.0
 * @experimental
 */
declare class SearchItem extends ListItemBase {
    eventDetails: ListItemBase["eventDetails"] & {
        "delete": void;
    };
    /**
     * Defines the heading text of the search item.
     * @public
     */
    headingText: string;
    /**
     * Defines the icon name of the search item.
     * @public
     */
    icon: string;
    /**
     * Defines whether the search item is selected.
     * @default false
     * @public
     */
    selected: boolean;
    /**
     * Defines the scope of the search item
     * @default false
     * @public
     */
    scopeName?: string;
    highlightText: string;
    _markupText: string;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(): void;
    _onDeleteButtonClick(): void;
    onBeforeRendering(): void;
}
export default SearchItem;
