"use strict";import{hasStyle as e,createStyle as o}from"./ManagedStyles.js";import{getFeature as r}from"./FeaturesRegistry.js";import a from"./generated/css/FontFace.css.js";import n from"./generated/css/OverrideFontFace.css.js";import{getDefaultFontLoading as f}from"./config/Fonts.js";const i=()=>{const t=r("OpenUI5Support");(!t||!t.isOpenUI5Detected())&&p(),c()},p=()=>{const t=document.querySelector("head>style[data-ui5-font-face]");!f()||t||e("data-ui5-font-face")||o(a,"data-ui5-font-face")},c=()=>{e("data-ui5-font-face-override")||o(n,"data-ui5-font-face-override")};export default i;
//# sourceMappingURL=FontFace.js.map
