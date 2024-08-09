import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/status-terminated.js";
import { pathData as pathDatav3 } from "./v3/status-terminated.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/status-terminated";
export { pathData, ltr, accData };