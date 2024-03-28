import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/expand-all.js";
import { pathData as pathDatav5 } from "./v5/expand-all.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "expand-all";
export { pathData, ltr, accData };