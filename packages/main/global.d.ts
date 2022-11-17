// eslint-disable-next-line
/// <reference path="../base/global.d.ts" /> 

import { TemplateFunction } from "@ui5/webcomponents-base/src/renderer/executeTemplate.js";

export {};

declare global {
	module "*.lit.js" {
		const content: TemplateFunction;
		export default content;
	}
}
