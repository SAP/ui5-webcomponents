import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/descending-bars.js";
import { pathData as pathDatav2 } from "./v2/descending-bars.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/descending-bars";
export { pathData, ltr, accData };