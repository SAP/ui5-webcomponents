/**
 * Different list modes.
 * @public
 */
var ListMode;
(function (ListMode) {
    /**
     * Default mode (no selection).
     * @public
     */
    ListMode["None"] = "None";
    /**
     * Right-positioned single selection mode (only one list item can be selected).
     * @public
     */
    ListMode["SingleSelect"] = "SingleSelect";
    /**
     * Left-positioned single selection mode (only one list item can be selected).
     * @public
     */
    ListMode["SingleSelectBegin"] = "SingleSelectBegin";
    /**
     * Selected item is highlighted but no selection element is visible
     * (only one list item can be selected).
     * @public
     */
    ListMode["SingleSelectEnd"] = "SingleSelectEnd";
    /**
     * Selected item is highlighted and selection is changed upon arrow navigation
     * (only one list item can be selected - this is always the focused item).
     * @public
     */
    ListMode["SingleSelectAuto"] = "SingleSelectAuto";
    /**
     * Multi selection mode (more than one list item can be selected).
     * @public
     */
    ListMode["MultiSelect"] = "MultiSelect";
    /**
     * Delete mode (only one list item can be deleted via provided delete button)
     * @public
     */
    ListMode["Delete"] = "Delete";
})(ListMode || (ListMode = {}));
export default ListMode;
//# sourceMappingURL=ListMode.js.map