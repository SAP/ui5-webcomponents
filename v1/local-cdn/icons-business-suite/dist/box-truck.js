import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/box-truck.js";
import { pathData as pathDatav2 } from "./v2/box-truck.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/box-truck";
export { pathData, ltr, accData };