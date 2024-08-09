import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/review-supplies.js";
import { pathData as pathDatav2 } from "./v2/review-supplies.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/review-supplies";
export { pathData, ltr, accData };