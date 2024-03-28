import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/polygon-black.js";
import { pathData as pathDatav2 } from "./v2/polygon-black.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/polygon-black";
export { pathData, ltr, accData };