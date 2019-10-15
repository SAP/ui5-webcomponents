/**
 * CSS font face used for the texts provided by SAP.
 */
import createStyleInHead from "./util/createStyleInHead.js";

/* CDN Locations */
const font72RegularWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents`;
const font72RegularWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents`;

const font72RegularFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff?ui5-webcomponents`;
const font72RegularFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular-full.woff2?ui5-webcomponents`;

const font72BoldWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff?ui5-webcomponents`;
const font72BoldWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold.woff2?ui5-webcomponents`;

const font72BoldFullWoff = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff?ui5-webcomponents`;
const font72BoldFullWoff2 = `https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Bold-full.woff2?ui5-webcomponents`;

const fontFaceCSS = `
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 400;
		src: url(${font72RegularWoff2}) format("woff2"),
			url(${font72RegularWoff}) format("woff"),
			local("72");
	}
	
	@font-face {
		font-family: '72full';
		font-style: normal;
		font-weight: 400;
		src: url(${font72RegularFullWoff2}) format("woff2"),
			url(${font72RegularFullWoff}) format("woff"),
			local('72-full');
	}
	
	@font-face {
		font-family: '72';
		font-style: normal;
		font-weight: 700;
		src: url(${font72BoldWoff2}) format("woff2"),
			url(${font72BoldWoff}) format("woff"),
			local('72-Bold');
	}
	
	@font-face {
		font-family: '72full';
		font-style: normal;
		font-weight: 700;
		src: url(${font72BoldFullWoff2}) format("woff2"),
			url(${font72BoldFullWoff}) format("woff"),
			local('72-Bold-full');
	}
`;

const insertFontFace = () => {
	createStyleInHead(fontFaceCSS, { "data-ui5-font-face": "" });
};

export default insertFontFace;
