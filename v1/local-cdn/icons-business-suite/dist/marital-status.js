import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/marital-status.js";
import { pathData as pathDatav2 } from "./v2/marital-status.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/marital-status";
export { pathData, ltr, accData };