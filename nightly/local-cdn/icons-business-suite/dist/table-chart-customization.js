import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/table-chart-customization.js";
import { pathData as pathDatav2 } from "./v2/table-chart-customization.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/table-chart-customization";
export { pathData, ltr, accData };