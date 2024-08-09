import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/keep-segment.js";
import { pathData as pathDatav2 } from "./v2/keep-segment.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/keep-segment";
export { pathData, ltr, accData };