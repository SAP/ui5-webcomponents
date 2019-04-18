import LitRenderer from "./renderer/LitRenderer.js";

const RendererImpl = LitRenderer;

// window.renderStats = new Map();

class ControlRenderer {
	static render(control) {
		// const oldCounter = window.renderStats.get(control.tagName) || 0;
		// window.renderStats.set(control.tagName, oldCounter + 1);

		const root = control._getRoot();
		const templateContext = control._getTemplateContext();
		const renderer = Object.getPrototypeOf(control).constructor.renderer.render;
		const renderResult = renderer(templateContext);

		RendererImpl.render(renderResult, root);
	}
}

export default ControlRenderer;
