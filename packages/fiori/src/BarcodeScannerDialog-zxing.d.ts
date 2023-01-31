declare module "@zxing/library/umd/index.min.js" {
	import type { BrowserMultiFormatReader as BrowserMultiFormatReaderT, NotFoundException as NotFoundExceptionT} from "@zxing/library/esm5/index";

	const BrowserMultiFormatReader: typeof BrowserMultiFormatReaderT;
	const NotFoundException: typeof NotFoundExceptionT;
}
