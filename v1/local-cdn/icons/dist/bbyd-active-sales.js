import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/bbyd-active-sales.js";
import { pathData as pathDatav5 } from "./v5/bbyd-active-sales.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "bbyd-active-sales";
export { pathData, ltr, accData };