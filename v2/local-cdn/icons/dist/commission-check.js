import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/commission-check.js";
import { pathData as pathDatav5 } from "./v5/commission-check.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "commission-check";
export { pathData, ltr, accData };