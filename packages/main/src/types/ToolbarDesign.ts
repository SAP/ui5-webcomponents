/**
 * Defines the available toolbar designs.
 * @public
 */
enum ToolbarDesign {
	/**
	 * The toolbar can be inserted into other controls and if the design is `Auto` then it inherits the design from parent control.
	 * @public
	 */
	Auto = "Auto",

    /**
	 * The toolbar has a solid background. Its content will be rendered in a standard way.
	 * @public
	 */
	Solid = "Solid",

	/**
	 * The toolbar and its content will be displayed transparent.
	 * @public
	 */
	Transparent = "Transparent",
}

export default ToolbarDesign;
