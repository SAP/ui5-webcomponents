/**
 * Different SegmentedButton modes.
 * @public
 */
var SegmentedButtonMode;
(function (SegmentedButtonMode) {
    /**
     * There is always one selected. Selecting one deselects the previous one.
     * @public
     */
    SegmentedButtonMode["SingleSelect"] = "SingleSelect";
    /**
     * Multiple items can be selected at a time. All items can be deselected.
     * @public
     */
    SegmentedButtonMode["MultiSelect"] = "MultiSelect";
})(SegmentedButtonMode || (SegmentedButtonMode = {}));
export default SegmentedButtonMode;
//# sourceMappingURL=SegmentedButtonMode.js.map