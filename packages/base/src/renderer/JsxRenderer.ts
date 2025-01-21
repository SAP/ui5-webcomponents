import { render } from "@ui5/webcomponents-base/dist/jsx-env-render.js";
import { createContext } from "../thirdparty/preact/preact.module.js";
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
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return render(jsx(ctx.Provider, { value: instance, children: templateResult }), container);
};

export default jsxRenderer;
