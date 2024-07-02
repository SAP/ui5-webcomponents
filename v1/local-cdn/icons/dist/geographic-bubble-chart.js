import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/geographic-bubble-chart.js";
import { pathData as pathDatav5 } from "./v5/geographic-bubble-chart.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "geographic-bubble-chart";
export { pathData, ltr, accData };