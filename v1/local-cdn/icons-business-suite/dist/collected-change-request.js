import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/collected-change-request.js";
import { pathData as pathDatav2 } from "./v2/collected-change-request.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/collected-change-request";
export { pathData, ltr, accData };