import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/constrain-block.js";
import { pathData as pathDatav3 } from "./v3/constrain-block.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/constrain-block";
export { pathData, ltr, accData };