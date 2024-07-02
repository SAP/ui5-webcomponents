import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/multiple-radar-chart.js";
import { pathData as pathDatav5 } from "./v5/multiple-radar-chart.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "multiple-radar-chart";
export { pathData, ltr, accData };