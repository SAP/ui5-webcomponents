import ListItemBase from "@ui5/webcomponents/dist/ListItemBase.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
/**
 * @class
 * ### Overview
 *
 * A `ui5-search-item-show-more` is a special type of ui5-li that acts as a button to progressively reveal additional (overflow) items within a group.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";`
 *
 * @constructor
 * @extends ListItemBase
 * @public
 * @since 2.14.0
 * @experimental
 */
declare class SearchItemShowMore extends ListItemBase {
    /**
     * Specifies the number of additional items available to show.
     * This value replaces the placeholder (N) in the "Show more (N)" text.
     * If not set, the placeholder will remain as (N).
     * @public
     * @default undefined
     */
    itemsToShowCount?: number;
    /**
     * Defines whether the show more item is selected.
     * @default false
     * @public
     */
    selected: boolean;
    static i18nBundle: I18nBundle;
    get showMoreTextCount(): string;
    _onfocusin(e: FocusEvent): void;
    _onfocusout(): void;
}
export default SearchItemShowMore;
