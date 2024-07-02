import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/value-flow.js";
import { pathData as pathDatav3 } from "./v3/value-flow.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/value-flow";
export { pathData, ltr, accData };