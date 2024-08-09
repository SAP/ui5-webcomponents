import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/overview-chart.js";
import { pathData as pathDatav5 } from "./v5/overview-chart.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "overview-chart";
export { pathData, ltr, accData };