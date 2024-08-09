import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/outdoor.js";
import { pathData as pathDatav2 } from "./v2/outdoor.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/outdoor";
export { pathData, ltr, accData };