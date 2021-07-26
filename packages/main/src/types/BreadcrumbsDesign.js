import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

/**
 * @lends sap.ui.webcomponents.main.types.BreadcrumbsDesign.prototype
 * @public
 */
const BreadcrumbsTypes = {
	/**
	 * Shows the current page as the last item in the trail.
	 * The last item contains only plain text and is not a link.
	 *
	 * @public
	 * @type {Standard}
	 */
	Standard: "Standard",

	/**
	 * All items are displayed as links.
	 * @public
	 * @type {NoCurrentPage}
	 */
	NoCurrentPage: "NoCurrentPage",
};

/**
 * @class
 * Different types of <code>Breadcrumbs</code>.
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.BreadcrumbsDesign
 * @public
 * @enum {string}
 */
class BreadcrumbsDesign extends DataType {
	static isValid(value) {
		return !!BreadcrumbsTypes[value];
	}
}

BreadcrumbsDesign.generateTypeAccessors(BreadcrumbsTypes);

export default BreadcrumbsDesign;
