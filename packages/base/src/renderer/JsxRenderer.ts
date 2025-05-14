import { render } from "@ui5/webcomponents-base/dist/jsx-env-render.js";
import { hydrate, createContext } from "../thirdparty/preact/preact.module.js";
import { jsx } from "../thirdparty/preact/jsxRuntime.module.js";
import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";

const instanceToContextMap = new WeakMap<UI5Element, ReturnType<typeof createContext<UI5Element>>>();

const jsxRenderer: Renderer = (instance: UI5Element, container: HTMLElement | DocumentFragment): string | void => {
	let ctx = instanceToContextMap.get(instance);
	if (!ctx) {
		// create a context holding the element that is being rendered
		// this contect will be used when adding event listeners - they all will be bound to this element
		ctx = createContext(instance);
		instanceToContextMap.set(instance, ctx);
	}

	const templateResult = instance.render();
	const vnode = jsx(ctx.Provider, { value: instance, children: templateResult });

	if (instance.__shouldHydrate) {
		// Remove all server-generated style elements for component styles
		// to avoid conflicts or duplication with styles added through adopted style sheets.
		instance.shadowRoot?.querySelectorAll("style").forEach(style => style.remove());
		hydrate(vnode, container);
		instance.__shouldHydrate = false;
	} else {
		render(vnode, container);
	}
};

export default jsxRenderer;
