import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/status-suspended.js";
import { pathData as pathDatav3 } from "./v3/status-suspended.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/status-suspended";
export { pathData, ltr, accData };