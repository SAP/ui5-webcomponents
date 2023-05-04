// eslint-disable-next-line
import type { BrowserMultiFormatReader, NotFoundException } from "@zxing/library/esm5/index.js";

export {};

declare global {
	interface Window {
		ZXing: {
			BrowserMultiFormatReader: typeof BrowserMultiFormatReader;
			NotFoundException: typeof NotFoundException;
		};
	}
}
