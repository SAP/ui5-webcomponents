import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.PanelAccessibleRole.prototype
 * @public
 */
const PanelAccessibleRoles = {

	/**
	 * Represents the ARIA role <code>complementary</code>. A section of the page, designed to be complementary to the main content at a similar level in the DOM hierarchy.
	 * @public
	 * @type {Complementary}
	 */
	Complementary: "Complementary",

	/**
	 * Represents the ARIA role <code>Form</code>. A landmark region that contains a collection of items and objects that, as a whole, create a form.
	 * @public
	 * @type {Form}
	 */
	Form: "Form",

	/**
	 * Represents the ARIA role <code>Region</code>. A section of a page, that is important enough to be included in a page summary or table of contents.
	 * @public
	 * @type {Region}
	 */
	Region: "Region",
};

/**
 * @class
 * Available Panel Accessible Landmark Roles.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.PanelAccessibleRole
 * @public
 * @enum {string}
 */
class PanelAccessibleRole extends DataType {
	static isValid(value) {
		return !!PanelAccessibleRoles[value];
	}
}

PanelAccessibleRole.generateTypeAccessors(PanelAccessibleRoles);

export default PanelAccessibleRole;
