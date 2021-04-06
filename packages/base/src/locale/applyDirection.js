import { reRenderAllUI5Elements } from "../Render.js";
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
	await reRenderAllUI5Elements({ rtlAware: true });
};

export default applyDirection;
