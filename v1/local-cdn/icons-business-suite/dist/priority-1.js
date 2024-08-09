import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/priority-1.js";
import { pathData as pathDatav2 } from "./v2/priority-1.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/priority-1";
export { pathData, ltr, accData };