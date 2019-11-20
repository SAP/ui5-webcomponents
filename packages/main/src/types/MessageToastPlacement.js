import DataType from "@ui5/webcomponents-base/dist/types/DataType.js";

const MessageToastPlacements = {

	/**
	 * MessageToast is placed in TopStart position of its container.
	 * @public
	 */
	TopStart: "TopStart",

	/**
	 * MessageToast is placed in TopCenter position of its container.
	 * @public
	 */
	TopCenter: "TopCenter",

	/**
	 * MessageToast is placed in TopEnd position of its container.
	 * @public
	 */
	TopEnd: "TopEnd",

	/**
	 * MessageToast is placed in MiddleStart position of its container.
	 * @public
	 */
	MiddleStart: "MiddleStart",

	/**
	 * MessageToast is placed in MiddleCenter position of its container.
	 * @public
	 */
	MiddleCenter: "MiddleCenter",

	/**
	 * MessageToast is placed in MiddleEnd position of its container.
	 * @public
	 */
	MiddleEnd: "MiddleEnd",

	/**
	 * MessageToast is placed in BottomStart position of its container.
	 * @public
	 */
	BottomStart: "BottomStart",

	/**
	 * MessageToast is placed in BottomCenter position of its container.
	 * Default placement (no selection)
	 * @public
	 */
	BottomCenter: "BottomCenter",

	/**
	 * MessageToast is placed in BottomEnd position of its container.
	 * @public
	 */
	BottomEnd: "BottomEnd",
};

class MessageToastPlacement extends DataType {
	static isValid(value) {
		return !!MessageToastPlacements[value];
	}
}

MessageToastPlacement.generataTypeAcessors(MessageToastPlacements);

export default MessageToastPlacement;
