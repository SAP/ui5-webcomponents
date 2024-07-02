import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/next-open-item.js";
import { pathData as pathDatav2 } from "./v2/next-open-item.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/next-open-item";
export { pathData, ltr, accData };