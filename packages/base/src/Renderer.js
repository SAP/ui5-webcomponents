import LitRenderer from "./renderer/LitRenderer.js";

const RendererImpl = LitRenderer;

class Renderer {
	static render(element) {
		const root = element._getRoot();
		const renderer = Object.getPrototypeOf(element).constructor.renderer.render;
		const renderResult = renderer(element);

		RendererImpl.render(renderResult, root, { eventContext: element });
	}
}

export default Renderer;
