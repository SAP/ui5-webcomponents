import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/stock-requirements.js";
import { pathData as pathDatav2 } from "./v2/stock-requirements.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/stock-requirements";
export { pathData, ltr, accData };