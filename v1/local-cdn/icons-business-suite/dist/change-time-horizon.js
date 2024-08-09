import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/change-time-horizon.js";
import { pathData as pathDatav2 } from "./v2/change-time-horizon.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/change-time-horizon";
export { pathData, ltr, accData };