import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/status-negative.js";
import { pathData as pathDatav5 } from "./v5/status-negative.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "status-negative";
export { pathData, ltr, accData };