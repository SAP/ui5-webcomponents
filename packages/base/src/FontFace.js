/**
 * CSS font face used for the texts provided by SAP.
 */
import createStyleInHead from "./util/createStyleInHead.js";

/* CDN Locations */
const fontRegular72Woff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents`;
const fontRegular72Woff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents`;

const fontFaceCSS = `
	@font-face {
		font-family: "72";
		src: local("72"), url(${fontRegular72Woff2}) format("woff2"), url(${fontRegular72Woff}) format("woff");
	}
`;

const insertFontFace = () => {
	createStyleInHead(fontFaceCSS, { "data-ui5-font-face": "" });
};

export default insertFontFace;
