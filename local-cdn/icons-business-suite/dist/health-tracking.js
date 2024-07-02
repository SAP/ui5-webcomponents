import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/health-tracking.js";
import { pathData as pathDatav2 } from "./v2/health-tracking.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/health-tracking";
export { pathData, ltr, accData };