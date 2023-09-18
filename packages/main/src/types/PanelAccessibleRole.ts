/**
 * Panel accessible roles.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PanelAccessibleRole
 */
enum PanelAccessibleRole {

	/**
	 * Represents the ARIA role "complementary".
	 * A section of the page, designed to be complementary to the main content at a similar level in the DOM hierarchy.
	 * @public
	 * @type {Complementary}
	 */
	Complementary = "Complementary",

	/**
	 * Represents the ARIA role "Form".
	 * A landmark region that contains a collection of items and objects that, as a whole, create a form.
	 * @public
	 * @type {Form}
	 */
	Form = "Form",

	/**
	 * Represents the ARIA role "Region".
	 * A section of a page, that is important enough to be included in a page summary or table of contents.
	 * @public
	 * @type {Region}
	 */
	Region = "Region",
}

export default PanelAccessibleRole;
