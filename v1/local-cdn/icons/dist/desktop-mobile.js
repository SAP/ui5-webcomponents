import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/desktop-mobile.js";
import { pathData as pathDatav5 } from "./v5/desktop-mobile.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "desktop-mobile";
export { pathData, ltr, accData };