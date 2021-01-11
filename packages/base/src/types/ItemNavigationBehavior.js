/**
 * @private
 * Different behavior for ItemNavigation.
 */
const ItemNavigationBehavior = {
	/**
	* Static behavior: navigations stops at the first or last item.
 	*/
	Static: "Static",

	/**
	* Cycling behavior: navigating past the last item continues with the first and vice versa.
 	*/
	Cyclic: "Cyclic",
};
export default ItemNavigationBehavior;
