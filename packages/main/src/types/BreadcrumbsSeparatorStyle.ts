/**
 * Different Breadcrumbs separator styles.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.BreadcrumbsSeparatorStyle
 */
enum BreadcrumbsSeparatorStyle {

	/**
	 * The separator appears as "/".
	 * @public
	 * @type {Slash}
	 */
	Slash = "Slash",

	/**
	 * The separator appears as "\".
	 * @public
	 * @type {BackSlash}
	 */
	BackSlash = "BackSlash",

	/**
	 * The separator appears as "\\".
	 * @public
	 * @type {DoubleBackSlash}
	 */
	DoubleBackSlash = "DoubleBackSlash",

	/**
	 * The separator appears as ">>".
	 * @public
	 * @type {DoubleGreaterThan}
	 */
	DoubleGreaterThan = "DoubleGreaterThan",

	/**
	 * The separator appears as "//" .
	 * @public
	 * @type {DoubleSlash}
	 */
	DoubleSlash = "DoubleSlash",

	/**
	 * The separator appears as ">".
	 * @public
	 * @type {GreaterThan}
	 */
	GreaterThan = "GreaterThan",
}

export default BreadcrumbsSeparatorStyle;
