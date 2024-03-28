import { hasStyle, createStyle } from "./ManagedStyles.js";
import { getFeature } from "./FeaturesRegistry.js";
import fontFaceCSS from "./generated/css/FontFace.css.js";
import overrideFontFaceCSS from "./generated/css/OverrideFontFace.css.js";
const insertFontFace = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    // Only set the main font if there is no OpenUI5 support, or there is, but OpenUI5 is not loaded
    if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
        insertMainFontFace();
    }
    // Always set the override font - OpenUI5 in CSS Vars mode does not set it, unlike the main font
    insertOverrideFontFace();
};
const insertMainFontFace = () => {
    if (!hasStyle("data-ui5-font-face")) {
        createStyle(fontFaceCSS, "data-ui5-font-face");
    }
};
const insertOverrideFontFace = () => {
    if (!hasStyle("data-ui5-font-face-override")) {
        createStyle(overrideFontFaceCSS, "data-ui5-font-face-override");
    }
};
export default insertFontFace;
//# sourceMappingURL=FontFace.js.map