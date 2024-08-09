import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/locate-me-2.js";
import { pathData as pathDatav5 } from "./v5/locate-me-2.js";

const pathData = isLegacyThemeFamily() ? pathDatav4 : pathDatav5;

export default "locate-me-2";
export { pathData, ltr, accData };