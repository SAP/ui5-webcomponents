import TableRowActionBase from "./TableRowActionBase.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
/**
 * @class
 * The `TableRowActionNavigation` class defines a navigation actio‚n for table rows.
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
declare class TableRowActionNavigation extends TableRowActionBase {
    /**
     * Defines the interactive state of the navigation action.
     *
     * @default false
     * @public
     */
    interactive: boolean;
    getRenderInfo(): {
        text: string;
        icon: string;
        interactive: boolean;
    };
    isFixedAction(): boolean;
    get _i18nNavigation(): string;
}
export default TableRowActionNavigation;
