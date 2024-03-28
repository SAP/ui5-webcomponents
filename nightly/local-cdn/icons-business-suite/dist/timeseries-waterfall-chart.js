import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/timeseries-waterfall-chart.js";
import { pathData as pathDatav2 } from "./v2/timeseries-waterfall-chart.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/timeseries-waterfall-chart";
export { pathData, ltr, accData };