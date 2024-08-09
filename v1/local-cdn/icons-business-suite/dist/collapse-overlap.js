import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/collapse-overlap.js";
import { pathData as pathDatav2 } from "./v2/collapse-overlap.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/collapse-overlap";
export { pathData, ltr, accData };