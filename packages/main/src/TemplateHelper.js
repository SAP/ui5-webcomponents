import { getRTL } from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import TextDirection from "./types/TextDirection";
import TextAlign from "./types/TextAlign";

class TemplateHelper {
	static getTextAlign(textAlign, textDirection) {
		let resultTextAlign = "";
		const bRTL = getRTL();

		switch (textAlign) {
		case TextAlign.End:
			switch (textDirection) {
			case TextDirection.LTR:
				resultTextAlign = "right";
				break;
			case TextDirection.RTL:
				resultTextAlign = "left";
				break;
			default:
				// this is really only influenced by the SAPUI5 configuration.
				// The browser does not change alignment with text-direction
				resultTextAlign = bRTL ? "left" : "right";
				break;
			}
			break;
		case TextAlign.Begin:
			switch (textDirection) {
			case TextDirection.LTR:
				resultTextAlign = "left";
				break;
			case TextDirection.RTL:
				resultTextAlign = "right";
				break;
			default:
				resultTextAlign = bRTL ? "right" : "left";
				break;
			}
			break;
		case TextAlign.Right:
			if (!bRTL || textDirection === TextDirection.LTR) {
				resultTextAlign = "right";
			}
			break;
		case TextAlign.Center:
			resultTextAlign = "center";
			break;
		case TextAlign.Left:
			if (bRTL || textDirection === TextDirection.RTL) {
				resultTextAlign = "left";
			}
			break;
			// no default
		}
		return resultTextAlign;
	}
}

export default TemplateHelper;
