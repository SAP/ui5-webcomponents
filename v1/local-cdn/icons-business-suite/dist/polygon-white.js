import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/polygon-white.js";
import { pathData as pathDatav2 } from "./v2/polygon-white.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/polygon-white";
export { pathData, ltr, accData };