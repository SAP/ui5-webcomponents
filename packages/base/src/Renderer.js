import LitRenderer from "./renderer/LitRenderer.js";

const RendererImpl = LitRenderer;

class Renderer {
	static render(webComponent) {
		const root = webComponent._getRoot();
		const renderer = Object.getPrototypeOf(webComponent).constructor.renderer.render;
		const renderResult = renderer(webComponent);

		RendererImpl.render(renderResult, root);
	}
}

export default Renderer;
