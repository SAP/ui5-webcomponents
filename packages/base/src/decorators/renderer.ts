import { RenderOptions } from "lit-html";
import { TemplateFunctionResult } from "../renderer/executeTemplate.js";

// Discuss the type - this represents the litRender's method type, but should be more generic.
type Renderer = (templateResult: TemplateFunctionResult, container: HTMLElement | DocumentFragment, styleStrOrHrefsArr: string | Array<string> | undefined, forStaticArea: boolean, options: RenderOptions) => void;

/**
 * Class decorator to define component renderer.
 * @param { Renderer } componentRenderer
 * @returns { ClassDecorator }
 */
const renderer = (componentRenderer: Renderer): ClassDecorator => {
	return (target: any) => {
		Object.defineProperty(target, "render", {
			get: () => componentRenderer,
		});
		Object.defineProperty(target, "renderer", {
			get: () => componentRenderer,
		});
	};
};

export default renderer;
