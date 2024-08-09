import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/content-modifier.js";
import { pathData as pathDatav3 } from "./v3/content-modifier.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/content-modifier";
export { pathData, ltr, accData };