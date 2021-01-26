import { reRenderAllUI5Elements, whenFinished } from "../Render.js";
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
	reRenderAllUI5Elements({ rtlAware: true });
	return whenFinished();
};

export default applyDirection;
