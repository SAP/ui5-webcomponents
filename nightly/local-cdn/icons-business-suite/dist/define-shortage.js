import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/define-shortage.js";
import { pathData as pathDatav2 } from "./v2/define-shortage.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/define-shortage";
export { pathData, ltr, accData };