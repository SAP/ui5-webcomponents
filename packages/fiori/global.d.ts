// eslint-disable-next-line
import "@ui5/webcomponents-base/global";
import { TemplateFunction } from "@ui5/webcomponents-base/src/renderer/executeTemplate.js";
import type { BrowserMultiFormatReader, NotFoundException } from "@zxing/library/esm5/index";

export {};

declare global {
	interface Window {
		ZXing: {
			BrowserMultiFormatReader: typeof BrowserMultiFormatReader;
			NotFoundException: typeof NotFoundException;
		};
	}
	module "*.lit.js" {
		const content: TemplateFunction;
		export default content;
	}
}
