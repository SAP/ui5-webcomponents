import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/scatter-plot.js";
import { pathData as pathDatav2 } from "./v2/scatter-plot.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/scatter-plot";
export { pathData, ltr, accData };