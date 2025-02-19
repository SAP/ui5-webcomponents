import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * Fired when a header cell action is clicked.
 *
 * @param {HTMLElement} targetRef The reference to the element that triggered the event
 * @public
 * @since 2.8.0
 */
type TableHeaderCellActionClickEventDetail = {
    targetRef: HTMLElement;
};
/**
 * Fired when a header cell action is clicked.
 *
 * @param {HTMLElement} targetRef The reference to the element that triggered the event
 * @public
 * @since 2.8.0
 */
declare abstract class TableHeaderCellActionBase extends UI5Element {
    eventDetails: {
        "click": TableHeaderCellActionClickEventDetail;
    };
    abstract getRenderInfo(): {
        icon: string;
        tooltip: string;
    };
    onBeforeRendering(): void;
    _onClick(e: MouseEvent): void;
    get _tooltip(): string;
    get _icon(): string;
}
export default TableHeaderCellActionBase;
export type { TableHeaderCellActionClickEventDetail, };
