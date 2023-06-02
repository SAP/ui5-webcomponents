declare module "@zxing/library/umd/index.min.js" {
	import type { BrowserMultiFormatReader as BrowserMultiFormatReaderT, NotFoundException as NotFoundExceptionT } from "@zxing/library/esm5/index.js";

	export const BrowserMultiFormatReader: typeof BrowserMultiFormatReaderT;
	export const NotFoundException: typeof NotFoundExceptionT;
}
