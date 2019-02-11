import iconFontTTF from "@ui5/webcomponents-core/dist/sap/ui/core/themes/base/fonts/SAP-icons.ttf";
import iconFontWoff from "@ui5/webcomponents-core/dist/sap/ui/core/themes/base/fonts/SAP-icons.woff";
import iconFontWoff2 from "@ui5/webcomponents-core/dist/sap/ui/core/themes/base/fonts/SAP-icons.woff2";
/**
 * this file extracts the logic of the insertFontFaceStyle from "@ui5/webcomponents-core/dist/sap/ui/core/IconPool"
 * but adapted to use the ES6 asset import mechanism to avoid too many magic modifications in the original IconPool
 */

/**
 * CSS font family used for the icons provided by SAP.
 */
const SAP_ICON_FONT_FAMILY = 'SAP-icons';

class IconFonts {
	static load () {
		const fontFace = SAP_ICON_FONT_FAMILY;
		const woff2Location = iconFontWoff2;
		const woffLocation = iconFontWoff;
		const ttfLocation = iconFontTTF;

		// load the font asynchronously via CSS
		const fontFaceCSS = "@font-face {" +
				"font-family: '" + fontFace + "';" +
				"src: url('" + woff2Location + "') format('woff2')," + /* Chrome 36+, Firefox 39+, Safari 10+, Edge 14+, Chrome 51+ for Android, PhantomJS 2.1.1+ */
				"url('" + woffLocation + "') format('woff')," + /* IE9+, Safari 5.1+, iOS 5.1+, Android Browser 4.4+, IE Mobile 11+ */
				"url('" + ttfLocation  + "') format('truetype')," + /* Fallback for any older browser (except IE8 and below which are not supported anyway) */
				"local('" + fontFace + "');" + /* fallback to local installed font in case it can't be loaded (e.g. font download is disabled due to browser security settings) */
				"font-weight: normal;" +
				"font-style: normal;" +
			"}";

		const style = document.createElement("style");
		style.type = "text/css";
		style.textContent = fontFaceCSS;
		document.head.appendChild(style);
	}
}

export default IconFonts;