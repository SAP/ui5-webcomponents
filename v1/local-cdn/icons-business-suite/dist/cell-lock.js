import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/cell-lock.js";
import { pathData as pathDatav2 } from "./v2/cell-lock.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/cell-lock";
export { pathData, ltr, accData };