import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/fma-validation.js";
import { pathData as pathDatav2 } from "./v2/fma-validation.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/fma-validation";
export { pathData, ltr, accData };