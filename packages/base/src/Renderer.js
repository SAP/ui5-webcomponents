import LitRenderer from "./renderer/LitRenderer.js";
import { getShadowRootStyle } from "./CSS.js";

const RendererImpl = LitRenderer;

class Renderer {
	static render(element) {
		const root = element.shadowRoot;
		const { render } = Object.getPrototypeOf(element).constructor.renderer;
		const renderResult = render(element);

		// For browsers that do not support constructable style sheets (and not using the polyfill)
		const styleToPrepend = getShadowRootStyle(element.constructor);

		RendererImpl.render(renderResult, root, element, styleToPrepend);
	}
}

export default Renderer;
