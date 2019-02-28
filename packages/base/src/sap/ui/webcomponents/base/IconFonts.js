/**
 * CSS font family used for the icons provided by SAP.
 */
const SAP_ICON_FONT_FAMILY = "SAP-icons";

/* CDN Location */
let iconFontWoff = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/base/fonts/SAP-icons.woff?ui5-webcomponents";
let iconFontWoff2 = "https://ui5.sap.com/sdk/resources/sap/ui/core/themes/base/fonts/SAP-icons.woff2?ui5-webcomponents";

const setIconFontsLocations = ({ woff = iconFontWoff, woff2 = iconFontWoff2 } = {}) => {
	iconFontWoff = woff;
	iconFontWoff2 = woff2;
};


const insertIconFontFace = (woff2Location = iconFontWoff2, woffLocation = iconFontWoff) => {
	const fontFace = SAP_ICON_FONT_FAMILY;

	/* eslint-disable */
	// load the font asynchronously via CSS
	const fontFaceCSS = "@font-face {" +
			"font-family: '" + fontFace + "';" +
			"src: url('" + woff2Location + "') format('woff2')," + /* Chrome 36+, Firefox 39+, Safari 10+, Edge 14+, Chrome 51+ for Android, PhantomJS 2.1.1+ */
			"url('" + woffLocation + "') format('woff')," + /* IE9+, Safari 5.1+, iOS 5.1+, Android Browser 4.4+, IE Mobile 11+ */
			"local('" + fontFace + "');" + /* fallback to local installed font in case it can't be loaded (e.g. font download is disabled due to browser security settings) */
			"font-weight: normal;" +
			"font-style: normal;" +
			"}";
	/* eslint-enable */

	const style = document.createElement("style");
	style.type = "text/css";
	style.textContent = fontFaceCSS;
	document.head.appendChild(style);
};

export { insertIconFontFace, setIconFontsLocations };
