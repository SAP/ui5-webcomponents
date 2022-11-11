import { hasStyle, createStyle } from "./ManagedStyles.js";
// @ts-ignore
import systemCSSVars from "./generated/css/SystemCSSVars.css.js";
import { StyleData } from "./index.js";

const insertSystemCSSVars = () => {
	if (!hasStyle("data-ui5-system-css-vars")) {
		createStyle(systemCSSVars as StyleData, "data-ui5-system-css-vars");
	}
};

export default insertSystemCSSVars;
