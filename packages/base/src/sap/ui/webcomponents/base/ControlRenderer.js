import LitRenderer from "./renderer/LitRenderer";

const RendererImpl = LitRenderer;

// window.renderStats = new Map();

class ControlRenderer {

	static render(control) {
		// const oldCounter = window.renderStats.get(control.tagName) || 0;
		// window.renderStats.set(control.tagName, oldCounter + 1);

		const placeholder = control._getPlaceholder();
		const templateContext = control._getTemplateContext();
		const renderer = Object.getPrototypeOf(control).constructor.renderer.render;
		const renderResult = renderer(templateContext);

		RendererImpl.render(renderResult, placeholder);
	}

	static storeFocus() {
		// let activeElement = document.activeElement;

		// try {
		// 	while (activeElement && activeElement.shadowRoot) {
		// 		// drill down the DOM to find the actual focused DOM element
		// 		activeElement = activeElement.shadowRoot.activeElement;
		// 	}
		// 	if (!activeElement.matches(":focus")) {
		// 		ControlRenderer._focusedControl = undefined;
		// 		return;
		// 	}
		// }
		// catch (e) {
		// 	activeElement = undefined;
		// }

		// ControlRenderer._focusedControl = activeElement;
	}

	static restoreFocus() {
		// if (ControlRenderer._focusedControl) {
		// 	ControlRenderer._focusedControl.focus();
		// }
	}
}

export default ControlRenderer;
