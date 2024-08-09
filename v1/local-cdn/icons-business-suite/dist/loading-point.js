import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/loading-point.js";
import { pathData as pathDatav2 } from "./v2/loading-point.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/loading-point";
export { pathData, ltr, accData };