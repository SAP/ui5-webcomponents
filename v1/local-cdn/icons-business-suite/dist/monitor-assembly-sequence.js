import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/monitor-assembly-sequence.js";
import { pathData as pathDatav2 } from "./v2/monitor-assembly-sequence.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/monitor-assembly-sequence";
export { pathData, ltr, accData };