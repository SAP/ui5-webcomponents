import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/partially-fixed-cell.js";
import { pathData as pathDatav2 } from "./v2/partially-fixed-cell.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/partially-fixed-cell";
export { pathData, ltr, accData };