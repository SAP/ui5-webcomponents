import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/update-filter.js";
import { pathData as pathDatav2 } from "./v2/update-filter.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/update-filter";
export { pathData, ltr, accData };