// eslint-disable-next-line
import "@ui5/webcomponents-base/global";
import { TemplateFunction } from "@ui5/webcomponents-base/src/renderer/executeTemplate.js";

export {};

declare global {
	module "*.lit.js" {
		const content: TemplateFunction;
		export default content;
	}
}
