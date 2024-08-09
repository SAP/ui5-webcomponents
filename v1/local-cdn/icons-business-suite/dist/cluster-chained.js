import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/cluster-chained.js";
import { pathData as pathDatav2 } from "./v2/cluster-chained.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/cluster-chained";
export { pathData, ltr, accData };