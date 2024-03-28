import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/vertical-stacked-chart.js";
import { pathData as pathDatav5 } from "./v5/vertical-stacked-chart.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "vertical-stacked-chart";
export { pathData, ltr, accData };