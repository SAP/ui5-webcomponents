import {
	render,
} from "preact";

import type { TemplateResult } from "lit-html";

import type { Renderer, RendererOptions } from "../UI5Element.js";
import type { TemplateFunctionResult } from "./executeTemplate.js";

const jsxRender: Renderer = (templateResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, options: RendererOptions) => {
	render(templateResult as TemplateResult, container);
};

export default jsxRender;
