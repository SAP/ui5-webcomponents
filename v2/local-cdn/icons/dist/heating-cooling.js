import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/heating-cooling.js";
import { pathData as pathDatav5 } from "./v5/heating-cooling.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "heating-cooling";
export { pathData, ltr, accData };