
		/**
		 * @class
		 * @constructor
		 * @author SAP SE
		 * @public
		 * @enum {string}
		 */
		class ItemNavigationBehavior {
			/**
     * Static behavior= navigations stops at the first or last item.
     * @public
     * @type {Static}
     */
 get Static() { return "Static" }
/**
     * Cycling behavior: navigating past the last item continues with the first and vice versa.
     * @public
     * @type {Cyclic}
     */
 get Cyclic() { return "Cyclic" }
		}
		