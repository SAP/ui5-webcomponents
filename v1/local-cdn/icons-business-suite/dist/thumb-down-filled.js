import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/thumb-down-filled.js";
import { pathData as pathDatav2 } from "./v2/thumb-down-filled.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/thumb-down-filled";
export { pathData, ltr, accData };