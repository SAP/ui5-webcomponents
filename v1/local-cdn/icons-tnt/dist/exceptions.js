import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/exceptions.js";
import { pathData as pathDatav3 } from "./v3/exceptions.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/exceptions";
export { pathData, ltr, accData };