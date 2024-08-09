import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/traffic-lights.js";
import { pathData as pathDatav2 } from "./v2/traffic-lights.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/traffic-lights";
export { pathData, ltr, accData };