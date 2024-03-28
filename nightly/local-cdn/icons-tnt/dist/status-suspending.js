import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/status-suspending.js";
import { pathData as pathDatav3 } from "./v3/status-suspending.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/status-suspending";
export { pathData, ltr, accData };