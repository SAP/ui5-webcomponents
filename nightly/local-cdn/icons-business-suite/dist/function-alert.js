import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/function-alert.js";
import { pathData as pathDatav2 } from "./v2/function-alert.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/function-alert";
export { pathData, ltr, accData };