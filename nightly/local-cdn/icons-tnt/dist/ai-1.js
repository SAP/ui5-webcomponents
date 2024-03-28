import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/ai-1.js";
import { pathData as pathDatav3 } from "./v3/ai-1.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/ai-1";
export { pathData, ltr, accData };