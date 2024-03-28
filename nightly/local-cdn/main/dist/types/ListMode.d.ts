/**
 * Different list modes.
 * @public
 */
declare enum ListMode {
    /**
     * Default mode (no selection).
     * @public
     */
    None = "None",
    /**
     * Right-positioned single selection mode (only one list item can be selected).
     * @public
     */
    SingleSelect = "SingleSelect",
    /**
     * Left-positioned single selection mode (only one list item can be selected).
     * @public
     */
    SingleSelectBegin = "SingleSelectBegin",
    /**
     * Selected item is highlighted but no selection element is visible
     * (only one list item can be selected).
     * @public
     */
    SingleSelectEnd = "SingleSelectEnd",
    /**
     * Selected item is highlighted and selection is changed upon arrow navigation
     * (only one list item can be selected - this is always the focused item).
     * @public
     */
    SingleSelectAuto = "SingleSelectAuto",
    /**
     * Multi selection mode (more than one list item can be selected).
     * @public
     */
    MultiSelect = "MultiSelect",
    /**
     * Delete mode (only one list item can be deleted via provided delete button)
     * @public
     */
    Delete = "Delete"
}
export default ListMode;
