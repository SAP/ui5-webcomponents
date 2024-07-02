import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/expand-collapse-level-3.js";
import { pathData as pathDatav2 } from "./v2/expand-collapse-level-3.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/expand-collapse-level-3";
export { pathData, ltr, accData };