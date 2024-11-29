declare module "@zxing/library/umd/index.min.js" {
	import type { BrowserMultiFormatReader as BrowserMultiFormatReaderT, NotFoundException as NotFoundExceptionT } from "@zxing/library";

	export const BrowserMultiFormatReader: typeof BrowserMultiFormatReaderT;
	export const NotFoundException: typeof NotFoundExceptionT;
}
