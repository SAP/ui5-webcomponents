/**
 * Different behavior for ItemNavigation.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.ItemNavigationBehavior
 */
enum ItemNavigationBehavior {
	/**
	 * Static behavior: navigations stops at the first or last item.
	 * @public
	 * @type {Static}
 	 */
	Static = "Static",

	/**
	 * Cycling behavior: navigating past the last item continues with the first and vice versa.
	 * @public
	 * @type {Cyclic}
 	 */
	Cyclic = "Cyclic",
}

export default ItemNavigationBehavior;
