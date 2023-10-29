/**
 * Tabs overflow mode in TabContainer.
 *
 * @public
 */
enum TabsOverflowMode {
	/**
	 * End type is used if there should be only one overflow with hidden the tabs at the end of the tab container.
	 * @public
	 * @type {End}
	 */
	End = "End",

	/**
	 * StartAndEnd type is used if there should be two overflows on both ends of the tab container.
	 * @public
	 * @type {StartAndEnd}
	 */
	StartAndEnd = "StartAndEnd",
}

export default TabsOverflowMode;
