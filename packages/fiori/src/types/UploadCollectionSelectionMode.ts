/**
 * Different UploadCollection selection modes.
 * @public
 */
enum UploadCollectionSelectionMode {
	/**
	 * Default mode (no selection).
	 * @public
	 */
	None = "None",

	/**
	 * Right-positioned single selection mode (only one list item can be selected).
	 * @public
	 */
	Single = "Single",

	/**
	 * Left-positioned single selection mode (only one list item can be selected).
	 * @public
	 */
	SingleStart = "SingleStart",

	/**
	 * Selected item is highlighted but no selection element is visible
	 * (only one list item can be selected).
	 * @public
	 */
	SingleEnd = "SingleEnd",

	/**
	 * Selected item is highlighted and selection is changed upon arrow navigation
	 * (only one list item can be selected - this is always the focused item).
	 * @public
	 */
	SingleAuto = "SingleAuto",

	/**
	 * Multi selection mode (more than one list item can be selected).
	 * @public
	 */
	Multiple = "Multiple",
}

export default UploadCollectionSelectionMode;
