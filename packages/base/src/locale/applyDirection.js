import RenderScheduler from "../RenderScheduler.js";
import { fireDirectionChange } from "./directionChange.js";

/**
 * Re-renders all RTL-aware UI5 Elements.
 * Call this method whenever you change the "dir" property anywhere in your HTML page
 * Example: document.body.dir = "rtl"; applyDirection();
 *
 * @returns {Promise<void>}
 */
const applyDirection = async () => {
	const listenersResults = fireDirectionChange();
	await Promise.all(listenersResults);
	RenderScheduler.reRenderAllUI5Elements({ rtlAware: true });
	return RenderScheduler.whenFinished();
};

export default applyDirection;
