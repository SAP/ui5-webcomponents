import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/clear-all.js";
import { pathData as pathDatav5 } from "./v5/clear-all.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "clear-all";
export { pathData, ltr, accData };