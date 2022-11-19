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
	 * <code>ui5-toast</code> is placed at the <code>TopStart</code> position of its container.
	 * @public
	 * @type {TopStart}
	 */
	TopStart = "TopStart",

	/**
	 * <code>ui5-toast</code> is placed at the <code>TopCenter</code> position of its container.
	 * @public
	 * @type {TopCenter}
	 */
	TopCenter = "TopCenter",

	/**
	 * <code>ui5-toast</code> is placed at the <code>TopEnd</code> position of its container.
	 * @public
	 * @type {TopEnd}
	 */
	TopEnd = "TopEnd",

	/**
	 * <code>ui5-toast</code> is placed at the <code>MiddleStart</code> position of its container.
	 * @public
	 * @type {MiddleStart}
	 */
	MiddleStart = "MiddleStart",

	/**
	 * <code>ui5-toast</code> is placed at the <code>MiddleCenter</code> position of its container.
	 * @public
	 * @type {MiddleCenter}
	 */
	MiddleCenter = "MiddleCenter",

	/**
	 * <code>ui5-toast</code> is placed at the <code>MiddleEnd</code> position of its container.
	 * @public
	 * @type {MiddleEnd}
	 */
	MiddleEnd = "MiddleEnd",

	/**
	 * <code>ui5-toast</code> is placed at the <code>BottomStart</code> position of its container.
	 * @public
	 * @type {BottomStart}
	 */
	BottomStart = "BottomStart",

	/**
	 * <code>ui5-toast</code> is placed at the <code>BottomCenter</code> position of its container.
	 * Default placement (no selection)
	 * @public
	 * @type {BottomCenter}
	 */
	BottomCenter = "BottomCenter",

	/**
	 * <code>ui5-toast</code> is placed at the <code>BottomEnd</code> position of its container.
	 * @public
	 * @type {BottomEnd}
	 */
	BottomEnd = "BottomEnd",
}

export default ToastPlacement;
