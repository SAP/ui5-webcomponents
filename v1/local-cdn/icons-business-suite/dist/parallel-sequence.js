import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/parallel-sequence.js";
import { pathData as pathDatav2 } from "./v2/parallel-sequence.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/parallel-sequence";
export { pathData, ltr, accData };