import { reRenderAllUI5Elements } from "../Render.js";
import { fireDirectionChange } from "./directionChange.js";

/**
 * Re-renders all RTL-aware UI5 Elements.
 *
 * <b>Note:</b> Call this method whenever you change the "dir" property anywhere in your HTML page.
 * <b>Example:</b> <code>document.body.dir = "rtl"; applyDirection();</code>
 * @public
 * @returns {Promise<void>}
 */
const applyDirection = async (): Promise<void> => {
	const listenersResults = fireDirectionChange();
	await Promise.all(listenersResults);
	await reRenderAllUI5Elements({ rtlAware: true });
};

export default applyDirection;
