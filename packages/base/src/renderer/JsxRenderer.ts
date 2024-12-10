import { render, createContext } from "../thirdparty/preact/preact.module.js";
import { jsx } from "../thirdparty/preact/jsxRuntime.module.js";
import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";

const jsxRenderer: Renderer = (instance: UI5Element, container: HTMLElement | DocumentFragment) => {
	if (!instance._ctx) {
		// create a context holding the element that is being rendered
		// this contect will be used when adding event listeners - they all will be bound to this element
		instance._ctx = createContext(instance);
	}
	const templateResult = instance.render();
	render(jsx(instance._ctx.Provider, { value: instance, children: templateResult }), container);
};

export default jsxRenderer;
