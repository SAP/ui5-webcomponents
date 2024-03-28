import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/line-bar-chart.js";
import { pathData as pathDatav2 } from "./v2/line-bar-chart.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/line-bar-chart";
export { pathData, ltr, accData };