import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/vertical-bullet-chart.js";
import { pathData as pathDatav5 } from "./v5/vertical-bullet-chart.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "vertical-bullet-chart";
export { pathData, ltr, accData };