import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/no-time-change.js";
import { pathData as pathDatav2 } from "./v2/no-time-change.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/no-time-change";
export { pathData, ltr, accData };