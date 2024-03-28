import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/alert-groups.js";
import { pathData as pathDatav2 } from "./v2/alert-groups.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/alert-groups";
export { pathData, ltr, accData };