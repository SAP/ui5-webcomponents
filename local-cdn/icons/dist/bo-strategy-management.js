import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/bo-strategy-management.js";
import { pathData as pathDatav5 } from "./v5/bo-strategy-management.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "bo-strategy-management";
export { pathData, ltr, accData };