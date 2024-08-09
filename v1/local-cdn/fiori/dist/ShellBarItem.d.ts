import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
type ShellBarItemClickEventDetail = {
    targetRef: HTMLElement;
};
/**
 * Interface for components that may be slotted inside `ui5-shellbar` as items
 * @public
 */
/**
 * @class
 * The `ui5-shellbar-item` represents a custom item, that
 * might be added to the `ui5-shellbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";`
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
declare class ShellBarItem extends UI5Element {
    /**
     * Defines the name of the item's icon.
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Defines the item text.
     *
     * **Note:** The text is only displayed inside the overflow popover list view.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the count displayed in the top-right corner.
     * @default ""
     * @since 1.0.0-rc.6
     * @public
     */
    count: string;
    get stableDomRef(): string;
    fireClickEvent(e: MouseEvent): boolean;
}
export default ShellBarItem;
export type { ShellBarItemClickEventDetail };
