import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type FilterItemOption from "./FilterItemOption.js";
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * For the `ui5-filter-item`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents-fiori/dist/FilterItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
declare class FilterItem extends UI5Element {
    /**
     * Defines the text of the component.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the additional text of the component.
     * @default ""
     * @public
     */
    additionalText: string;
    /**
     * Defines the `values` list.
     * @public
     */
    values: Array<FilterItemOption>;
}
export default FilterItem;
