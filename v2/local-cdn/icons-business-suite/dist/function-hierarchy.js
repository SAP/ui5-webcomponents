import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/function-hierarchy.js";
import { pathData as pathDatav2 } from "./v2/function-hierarchy.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/function-hierarchy";
export { pathData, ltr, accData };