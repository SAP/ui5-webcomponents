import type { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

export {};

declare global {
	interface Window {
		ZXing: {
			BrowserMultiFormatReader: typeof BrowserMultiFormatReader;
			NotFoundException: typeof NotFoundException;
		};
	}
}
