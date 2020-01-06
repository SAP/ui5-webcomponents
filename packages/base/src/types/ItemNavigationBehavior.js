/**
 * @private
 * Different behavior for ItemNavigation.
 */
const ItemNavigationBehavior = {
	/**
	* Static behavior: when border of the items is reached, you can't go out of the cage.
 	*/
	Static: "Static",

	/**
	* Cycling behavior: when border of the items is reached, you can cycle through the items.
 	*/
	Cyclic: "Cyclic",

	/**
	* Paging behavior: when border of the items is reached, tou can go up/down based on the rowsize(e.g. DayPicker)
 	*/
	Paging: "Paging",
};
export default ItemNavigationBehavior;
