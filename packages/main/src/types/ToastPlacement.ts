/**
 * Toast placement.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ToastPlacement
 */
enum ToastPlacement {

	/**
	 * Toast is placed at the <code>TopStart</code> position of its container.
	 * @public
	 * @type {TopStart}
	 */
	TopStart = "TopStart",

	/**
	 * Toast is placed at the <code>TopCenter</code> position of its container.
	 * @public
	 * @type {TopCenter}
	 */
	TopCenter = "TopCenter",

	/**
	 * Toast is placed at the <code>TopEnd</code> position of its container.
	 * @public
	 * @type {TopEnd}
	 */
	TopEnd = "TopEnd",

	/**
	 * Toast is placed at the <code>MiddleStart</code> position of its container.
	 * @public
	 * @type {MiddleStart}
	 */
	MiddleStart = "MiddleStart",

	/**
	 * Toast is placed at the <code>MiddleCenter</code> position of its container.
	 * @public
	 * @type {MiddleCenter}
	 */
	MiddleCenter = "MiddleCenter",

	/**
	 * Toast is placed at the <code>MiddleEnd</code> position of its container.
	 * @public
	 * @type {MiddleEnd}
	 */
	MiddleEnd = "MiddleEnd",

	/**
	 * Toast is placed at the <code>BottomStart</code> position of its container.
	 * @public
	 * @type {BottomStart}
	 */
	BottomStart = "BottomStart",

	/**
	 * Toast is placed at the <code>BottomCenter</code> position of its container.
	 * Default placement (no selection)
	 * @public
	 * @type {BottomCenter}
	 */
	BottomCenter = "BottomCenter",

	/**
	 * Toast is placed at the <code>BottomEnd</code> position of its container.
	 * @public
	 * @type {BottomEnd}
	 */
	BottomEnd = "BottomEnd",
}

export default ToastPlacement;
