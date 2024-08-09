import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/aggregated-view.js";
import { pathData as pathDatav2 } from "./v2/aggregated-view.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/aggregated-view";
export { pathData, ltr, accData };