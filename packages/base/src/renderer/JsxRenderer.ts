import { render } from "preact";
import type UI5Element from "../UI5Element.js";
import type { Renderer } from "../UI5Element.js";

const jsxRender: Renderer = (instance: UI5Element, container: HTMLElement | DocumentFragment) => {
	const templateResult = instance.render();
	render(templateResult, container);
};

export default jsxRender;
