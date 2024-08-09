import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/early-widthdrawal-for-time-deposits.js";
import { pathData as pathDatav2 } from "./v2/early-widthdrawal-for-time-deposits.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/early-widthdrawal-for-time-deposits";
export { pathData, ltr, accData };