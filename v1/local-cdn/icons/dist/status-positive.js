import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/status-positive.js";
import { pathData as pathDatav5 } from "./v5/status-positive.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "status-positive";
export { pathData, ltr, accData };