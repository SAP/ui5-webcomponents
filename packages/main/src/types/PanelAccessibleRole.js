import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * Available Panel Accessible Landmark Roles.
 * @public
 */
const PanelAccessibleRoles = {

	/**
	 * Represents the ARIA role <code>complementary</code>. A section of the page, designed to be complementary to the main content at a similar level in the DOM hierarchy.
	 * @public
	 */
	Complementary: "Complementary",

	/**
	 * Represents the ARIA role <code>Form</code>. A landmark region that contains a collection of items and objects that, as a whole, create a form.
	 * @public
	 */
	Form: "Form",

	/**
	 * Represents the ARIA role <code>Region</code>. A section of a page, that is important enough to be included in a page summary or table of contents.
	 * @public
	 */
	Region: "Region",
};

class PanelAccessibleRole extends DataType {
	static isValid(value) {
		return !!PanelAccessibleRoles[value];
	}
}

PanelAccessibleRole.generataTypeAcessors(PanelAccessibleRoles);

export default PanelAccessibleRole;
