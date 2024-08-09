import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/provided-interface.js";
import { pathData as pathDatav3 } from "./v3/provided-interface.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/provided-interface";
export { pathData, ltr, accData };