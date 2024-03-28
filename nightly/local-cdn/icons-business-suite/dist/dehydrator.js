import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/dehydrator.js";
import { pathData as pathDatav2 } from "./v2/dehydrator.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/dehydrator";
export { pathData, ltr, accData };