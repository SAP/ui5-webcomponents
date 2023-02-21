import { TemplateFunction } from "../renderer/executeTemplate.js";

/**
 * Class decorator to define component template.
 * @param { TemplateFunction } componentTemplate
 * @returns { ClassDecorator }
 */
const template = (componentTemplate: TemplateFunction): ClassDecorator => {
	return (target: any) => {
		Object.defineProperty(target, "template", {
			get: () => componentTemplate,
		});
	};
};

export default template;
