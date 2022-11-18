/**
 * Different  Breadcrumbs designs.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.AvatarSize
 */
enum BreadcrumbsDesign {
	/**
	 * Shows the current page as the last item in the trail.
	 * The last item contains only plain text and is not a link.
	 *
	 * @public
	 * @type {Standard}
	 */
	Standard = "Standard",

	/**
	 * All items are displayed as links.
	 * @public
	 * @type {NoCurrentPage}
	 */
	NoCurrentPage = "NoCurrentPage",
}

export default BreadcrumbsDesign;
