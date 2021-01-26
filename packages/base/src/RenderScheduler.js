import {
	renderDeferred,
	renderImmediately,
	whenFinished,
} from "./Render.js";

/**
 * @deprecated Use the Render.js module instead
 */
class RenderScheduler {
	/**
	 * Schedules a render task (if not already scheduled) to render the component
	 *
	 * @param webComponent
	 * @returns {Promise}
	 * @deprecated Use renderDeferred from the Render.js module instead
	 */
	static async renderDeferred(webComponent) {
		await renderDeferred(webComponent);
	}

	/**
	 * Renders a component synchronously
	 *
	 * @param webComponent
	 * @deprecated Use renderImmediately from the Render.js module instead
	 */
	static renderImmediately(webComponent) {
		return renderImmediately(webComponent);
	}

	/**
	 * @deprecated Use whenFinished from the Render.js module instead
	 * @returns {Promise<void>}
	 */
	static async whenFinished() {
		await whenFinished();
	}
}

export default RenderScheduler;
