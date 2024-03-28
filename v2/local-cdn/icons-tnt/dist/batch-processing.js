import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/batch-processing.js";
import { pathData as pathDatav3 } from "./v3/batch-processing.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/batch-processing";
export { pathData, ltr, accData };