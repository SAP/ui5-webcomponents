import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/set-as-default.js";
import { pathData as pathDatav2 } from "./v2/set-as-default.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/set-as-default";
export { pathData, ltr, accData };