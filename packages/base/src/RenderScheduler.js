import {
	renderDeferred,
	renderImmediately,
	renderFinished,
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
		console.log("RenderScheduler.renderDeferred is deprecated, please use renderDeferred, exported by Render.js instead"); // eslint-disable-line
		await renderDeferred(webComponent);
	}

	/**
	 * Renders a component synchronously
	 *
	 * @param webComponent
	 * @deprecated Use renderImmediately from the Render.js module instead
	 */
	static renderImmediately(webComponent) {
		console.log("RenderScheduler.renderImmediately is deprecated, please use renderImmediately, exported by Render.js instead"); // eslint-disable-line
		return renderImmediately(webComponent);
	}

	/**
	 * @deprecated Use renderFinished from the Render.js module instead
	 * @returns {Promise<void>}
	 */
	static async whenFinished() {
		console.log("RenderScheduler.whenFinished is deprecated, please use renderFinished, exported by Render.js instead"); // eslint-disable-line
		await renderFinished();
	}
}

export default RenderScheduler;
