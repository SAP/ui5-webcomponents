import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";


/**
 * Defines where the <code>ui5-toast</code> will be placed.
 * @public
 */
const ToastPlacements = {

	/**
	 * <code>ui5-toast</code> is placed at the <code>TopStart</code> position of its container.
	 * @public
	 */
	TopStart: "TopStart",

	/**
	 * <code>ui5-toast</code> is placed at the <code>TopCenter</code> position of its container.
	 * @public
	 */
	TopCenter: "TopCenter",

	/**
	 * <code>ui5-toast</code> is placed at the <code>TopEnd</code> position of its container.
	 * @public
	 */
	TopEnd: "TopEnd",

	/**
	 * <code>ui5-toast</code> is placed at the <code>MiddleStart</code> position of its container.
	 * @public
	 */
	MiddleStart: "MiddleStart",

	/**
	 * <code>ui5-toast</code> is placed at the <code>MiddleCenter</code> position of its container.
	 * @public
	 */
	MiddleCenter: "MiddleCenter",

	/**
	 * <code>ui5-toast</code> is placed at the <code>MiddleEnd</code> position of its container.
	 * @public
	 */
	MiddleEnd: "MiddleEnd",

	/**
	 * <code>ui5-toast</code> is placed at the <code>BottomStart</code> position of its container.
	 * @public
	 */
	BottomStart: "BottomStart",

	/**
	 * <code>ui5-toast</code> is placed at the <code>BottomCenter</code> position of its container.
	 * Default placement (no selection)
	 * @public
	 */
	BottomCenter: "BottomCenter",

	/**
	 * <code>ui5-toast</code> is placed at the <code>BottomEnd</code> position of its container.
	 * @public
	 */
	BottomEnd: "BottomEnd",
};

class ToastPlacement extends DataType {
	static isValid(value) {
		return !!ToastPlacements[value];
	}
}

ToastPlacement.generataTypeAcessors(ToastPlacements);

export default ToastPlacement;
