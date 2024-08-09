import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/exclude-segment.js";
import { pathData as pathDatav2 } from "./v2/exclude-segment.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/exclude-segment";
export { pathData, ltr, accData };