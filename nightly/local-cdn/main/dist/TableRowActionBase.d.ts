import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
/**
 * @class
 * The `TableRowActionBase` class serves as a foundation for table row actions.
 * @constructor
 * @abstract
 * @extends UI5Element
 * @since 2.7.0
 * @public
 */
declare abstract class TableRowActionBase extends UI5Element {
    /**
     * Defines the visibility of the row action.
     *
     * **Note:** Invisible row actions still take up space, allowing to hide the action while maintaining its position.
     *
     * @default false
     * @public
     */
    invisible: boolean;
    private static _menu;
    private static _menuItems;
    static showMenu(actions: TableRowActionBase[], opener: HTMLElement): Promise<void>;
    abstract getRenderInfo(): {
        text: string;
        icon: string;
        interactive: boolean;
    };
    isFixedAction(): boolean;
    onEnterDOM(): void;
    _onActionClick(): void;
    get _text(): string;
    get _icon(): string;
    get _isInteractive(): boolean;
}
export default TableRowActionBase;
