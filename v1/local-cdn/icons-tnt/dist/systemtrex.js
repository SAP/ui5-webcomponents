import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/systemtrex.js";
import { pathData as pathDatav3 } from "./v3/systemtrex.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/systemtrex";
export { pathData, ltr, accData };