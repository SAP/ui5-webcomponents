/**
 * Toast placement.
 *
 * @class
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.types.ToastPlacement
 */
enum ToastPlacement {

	/**
	 * Toast is placed at the "TopStart" position of its container.
	 * @public
	 * @type {TopStart}
	 */
	TopStart = "TopStart",

	/**
	 * Toast is placed at the "TopCenter" position of its container.
	 * @public
	 * @type {TopCenter}
	 */
	TopCenter = "TopCenter",

	/**
	 * Toast is placed at the "TopEnd" position of its container.
	 * @public
	 * @type {TopEnd}
	 */
	TopEnd = "TopEnd",

	/**
	 * Toast is placed at the "MiddleStart" position of its container.
	 * @public
	 * @type {MiddleStart}
	 */
	MiddleStart = "MiddleStart",

	/**
	 * Toast is placed at the "MiddleCenter" position of its container.
	 * @public
	 * @type {MiddleCenter}
	 */
	MiddleCenter = "MiddleCenter",

	/**
	 * Toast is placed at the "MiddleEnd" position of its container.
	 * @public
	 * @type {MiddleEnd}
	 */
	MiddleEnd = "MiddleEnd",

	/**
	 * Toast is placed at the "BottomStart" position of its container.
	 * @public
	 * @type {BottomStart}
	 */
	BottomStart = "BottomStart",

	/**
	 * Toast is placed at the "BottomCenter" position of its container.
	 * Default placement (no selection)
	 * @public
	 * @type {BottomCenter}
	 */
	BottomCenter = "BottomCenter",

	/**
	 * Toast is placed at the "BottomEnd" position of its container.
	 * @public
	 * @type {BottomEnd}
	 */
	BottomEnd = "BottomEnd",
}

export default ToastPlacement;
