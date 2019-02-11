import IconPool from "@ui5/webcomponents-core/dist/sap/ui/core/IconPool";

// monkey patch the real insert function, we insert the font face style here
IconPool.insertFontFaceStyle = () => {};

export { IconPool as default };
