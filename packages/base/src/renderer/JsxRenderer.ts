import { render } from "../thirdparty/preact/preact.module.js";
import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";

const jsxRenderer: Renderer = (instance: UI5Element, container: HTMLElement | DocumentFragment) => {
	const templateResult = instance.render();
	render(templateResult, container);
};

export default jsxRenderer;
