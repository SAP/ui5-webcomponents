/**
 * Different types of FCLLayout.
 * @public
 */
var FCLLayout;
(function (FCLLayout) {
    /**
     * The layout will display 1 column.
     * @public
     */
    FCLLayout["OneColumn"] = "OneColumn";
    /**
     *
     * Desktop: 67 - 33 - -- Start (expanded) and Mid columns are displayed
     * Tablet:  67 - 33 - -- Start (expanded) and Mid columns are displayed
     * Phone:   -- 100 --  only the Mid column is displayed
     *
     * Use to display both a list and a detail page when the user should focus on the list page.
     * @public
     */
    FCLLayout["TwoColumnsStartExpanded"] = "TwoColumnsStartExpanded";
    /**
     * Desktop: 33 - 67 - --  Start and Mid (expanded) columns are displayed
     * Tablet:  33 - 67 - --  Start and Mid (expanded) columns are displayed
     * Phone:   -- 100 --   only the Mid column is displayed
     *
     * Use to display both a list and a detail page when the user should focus on the detail page.
     * @public
     */
    FCLLayout["TwoColumnsMidExpanded"] = "TwoColumnsMidExpanded";
    /**
     * Desktop: 25 - 50 - 25 Start, Mid (expanded) and End columns are displayed
     * Tablet:  0 - 67 - 33  Mid (expanded) and End columns are displayed, Start is accessible by a layout arrow
     * Phone:   -- -- 100  only the End column is displayed
     *
     * Use to display all three pages (list, detail, detail-detail) when the user should focus on the detail.
     * @public
     */
    FCLLayout["ThreeColumnsMidExpanded"] = "ThreeColumnsMidExpanded";
    /**
     * Desktop: 25 - 25 - 50 Start, Mid and End (expanded) columns are displayed
     * Tablet:  0 - 33 - 67  Mid and End (expanded) columns are displayed, Start is accessible by layout arrows
     * Phone:   -- -- 100  (only the End column is displayed)
     *
     * Use to display all three pages (list, detail, detail-detail) when the user should focus on the detail-detail.
     * @public
     */
    FCLLayout["ThreeColumnsEndExpanded"] = "ThreeColumnsEndExpanded";
    /**
     * Desktop: 67 - 33 - 0  Start (expanded) and Mid columns are displayed, End is accessible by layout arrows
     * Tablet:  67 - 33 - 0  Start (expanded) and Mid columns are displayed, End is accessible by layout arrows
     * Phone:   -- -- 100  only the End column is displayed
     *
     * Use to display the list and detail pages when the user should focus on the list.
     * The detail-detail is still loaded and easily accessible with layout arrows.
     * @public
     */
    FCLLayout["ThreeColumnsStartExpandedEndHidden"] = "ThreeColumnsStartExpandedEndHidden";
    /**
     * Desktop: 33 - 67 - 0  Start and Mid (expanded) columns are displayed, End is accessible by a layout arrow
     * Tablet:  33 - 67 - 0  Start and Mid (expanded) columns are displayed, End is accessible by a layout arrow
     * Phone:   -- -- 100  only the End column is displayed
     *
     * Use to display the list and detail pages when the user should focus on the detail.
     * The detail-detail is still loaded and easily accessible with a layout arrow.
     * @public
     */
    FCLLayout["ThreeColumnsMidExpandedEndHidden"] = "ThreeColumnsMidExpandedEndHidden";
    /**
     * Desktop: -- 100 --  only the Mid column is displayed
     * Tablet:  -- 100 --  only the Mid column is displayed
     * Phone:   -- 100 --  only the Mid column is displayed
     *
     * Use to display a detail page only, when the user should focus entirely on it.
     * @public
     */
    FCLLayout["MidColumnFullScreen"] = "MidColumnFullScreen";
    /**
     * Desktop: -- -- 100  only the End column is displayed
     * Tablet:  -- -- 100  only the End column is displayed
     * Phone:   -- -- 100  only the End column is displayed
     *
     * Use to display a detail-detail page only, when the user should focus entirely on it.
     * @public
     */
    FCLLayout["EndColumnFullScreen"] = "EndColumnFullScreen";
})(FCLLayout || (FCLLayout = {}));
export default FCLLayout;
//# sourceMappingURL=FCLLayout.js.map