import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/business-partner-anonymous.js";
import { pathData as pathDatav2 } from "./v2/business-partner-anonymous.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/business-partner-anonymous";
export { pathData, ltr, accData };