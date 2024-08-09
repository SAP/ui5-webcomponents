import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * For the `ui5-filter-item-option`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents-fiori/dist/FilterItemOption.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @since 1.0.0-rc.16
 * @public
 */
declare class FilterItemOption extends UI5Element {
    /**
     * Defines the text of the component.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines if the component is selected.
     * @default false
     * @public
     */
    selected: boolean;
}
export default FilterItemOption;
