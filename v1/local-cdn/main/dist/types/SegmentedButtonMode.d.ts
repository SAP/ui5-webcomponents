/**
 * Different SegmentedButton modes.
 * @public
 */
declare enum SegmentedButtonMode {
    /**
     * There is always one selected. Selecting one deselects the previous one.
     * @public
     */
    SingleSelect = "SingleSelect",
    /**
     * Multiple items can be selected at a time. All items can be deselected.
     * @public
     */
    MultiSelect = "MultiSelect"
}
export default SegmentedButtonMode;
