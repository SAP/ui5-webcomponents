import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/clear-all-mapping.js";
import { pathData as pathDatav3 } from "./v3/clear-all-mapping.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/clear-all-mapping";
export { pathData, ltr, accData };