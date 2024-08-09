import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/time-deposit.js";
import { pathData as pathDatav2 } from "./v2/time-deposit.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/time-deposit";
export { pathData, ltr, accData };