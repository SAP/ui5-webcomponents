import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type DropIndicator from "./DropIndicator.js";
import type ListItemBase from "./ListItemBase.js";
import type ListItemGroupHeader from "./ListItemGroupHeader.js";
type ListItemGroupMoveEventDetail = {
    source: {
        element: HTMLElement;
    };
    destination: {
        element: HTMLElement;
        placement: `${MovePlacement}`;
    };
};
/**
 * @class
 * ### Overview
 * The `ui5-li-group` is a special list item, used only to create groups of list items.
 *
 * This is the item to use inside a `ui5-list`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";`
 * @csspart header - Used to style the header item of the group
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
declare class ListItemGroup extends UI5Element {
    eventDetails: {
        "move-over": ListItemGroupMoveEventDetail;
        "move": ListItemGroupMoveEventDetail;
    };
    /**
     * Defines the header text of the <code>ui5-li-group</code>.
     * @public
     * @default undefined
     */
    headerText?: string;
    /**
     * Defines the accessible name of the header.
     * @public
     * @default undefined
     */
    headerAccessibleName?: string;
    /**
     * Defines the items of the <code>ui5-li-group</code>.
     * @public
     */
    items: Array<ListItemBase>;
    /**
     * Indicates whether the header is focused
     * @private
     */
    focused: boolean;
    /**
    * Defines the header of the component.
    *
    * **Note:** Using this slot, the default header text of group and the value of `headerText` property will be overwritten.
    * @public
    */
    header: Array<ListItemBase>;
    onEnterDOM(): void;
    onExitDOM(): void;
    get groupHeaderItem(): ListItemGroupHeader;
    get hasHeader(): boolean;
    get hasFormattedHeader(): boolean;
    get isListItemGroup(): boolean;
    get dropIndicatorDOM(): DropIndicator | null;
    _ondragenter(e: DragEvent): void;
    _ondragleave(e: DragEvent): void;
    _ondragover(e: DragEvent): void;
    _ondrop(e: DragEvent): void;
}
declare const isInstanceOfListItemGroup: (object: any) => object is ListItemGroup;
export default ListItemGroup;
export { isInstanceOfListItemGroup };
export type { ListItemGroupMoveEventDetail };
