import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/home-share.js";
import { pathData as pathDatav5 } from "./v5/home-share.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "home-share";
export { pathData, ltr, accData };