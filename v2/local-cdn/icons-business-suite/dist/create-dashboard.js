import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/create-dashboard.js";
import { pathData as pathDatav2 } from "./v2/create-dashboard.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/create-dashboard";
export { pathData, ltr, accData };