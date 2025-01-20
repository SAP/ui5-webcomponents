import TableRowActionBase from "./TableRowActionBase.js";
/**
 * @class
 * The `TableRowAction` class defines a row action for table rows.
 * @constructor
 * @extends TableRowActionBase
 * @since 2.7.0
 * @public
 */
declare class TableRowAction extends TableRowActionBase {
    /**
     * Defines the icon of the row action.
     *
     * **Note:** For row actions to work properly, this property is mandatory.
     *
     * **Note:** SAP-icons font provides numerous built-in icons. To find all the available icons, see the
     * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     *
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Defines the text of the row action.
     *
     * **Note:** For row actions to work properly, this property is mandatory.
     *
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the disabled state of the row action.
     *
     * @default false
     * @public
     */
    disabled: boolean;
    getRenderInfo(): {
        text: string;
        icon: string;
        interactive: boolean;
    };
}
export default TableRowAction;
