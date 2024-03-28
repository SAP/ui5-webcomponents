import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/target-to-date.js";
import { pathData as pathDatav2 } from "./v2/target-to-date.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/target-to-date";
export { pathData, ltr, accData };