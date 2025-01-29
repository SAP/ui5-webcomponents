/**
 * SideNavigationItem designs.
 * @public
 * @since 2.7.0
 */
enum SideNavigationItemDesign {
	/**
	 * Design for items that perform navigation, contain navigation child items, or both.
	 *
	 * @public
	 */
	Default = "Default",

	/**
	 * Design for items that trigger an action, such as opening a dialog.
	 *
	 * **Note:** Items with this design must not have sub-items.
	 *
	 * @public
	 */
	Action = "Action",
}

export default SideNavigationItemDesign;
