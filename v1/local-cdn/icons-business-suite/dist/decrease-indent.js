import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/decrease-indent.js";
import { pathData as pathDatav2 } from "./v2/decrease-indent.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/decrease-indent";
export { pathData, ltr, accData };