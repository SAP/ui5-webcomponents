import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/toaster-top.js";
import { pathData as pathDatav5 } from "./v5/toaster-top.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "toaster-top";
export { pathData, ltr, accData };