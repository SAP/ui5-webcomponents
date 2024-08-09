import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/smart-matcher.js";
import { pathData as pathDatav2 } from "./v2/smart-matcher.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/smart-matcher";
export { pathData, ltr, accData };