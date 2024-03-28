/**
 * Column mode of the &lt;ui5-grid&gt; component.
 *
 * @public
 */
enum GridColumnMode {
	/**
	 * Shows a scrollbar, when the table cannot fit all columns.
	 * @public
	 */
	Scroll = "Scroll",

	/**
	 * Pops in columns, that do not fit into the table anymore.
	 * @public
	 */
	Popin = "Popin"
}

export default GridColumnMode;
