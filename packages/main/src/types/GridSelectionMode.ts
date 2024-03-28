/**
 * Selection modes of the &lt;ui5-grid&gt; component.
 *
 * @public
 */
enum GridSelectionMode {
	/**
	 * Default mode (no selection).
	 * @public
	 */
	None = "None",

	/**
	 * Single selection mode (only one grid row can be selected).
	 * @public
	 */
	Single = "Single",

	/**
	 * Multi selection mode (more than one grid row can be selected).
	 * @public
	 */
	Multi = "Multi",
}

export default GridSelectionMode;
