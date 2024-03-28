import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/traffic-cone.js";
import { pathData as pathDatav2 } from "./v2/traffic-cone.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/traffic-cone";
export { pathData, ltr, accData };