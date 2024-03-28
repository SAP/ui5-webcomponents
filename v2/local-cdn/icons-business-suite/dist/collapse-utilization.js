import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/collapse-utilization.js";
import { pathData as pathDatav2 } from "./v2/collapse-utilization.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/collapse-utilization";
export { pathData, ltr, accData };