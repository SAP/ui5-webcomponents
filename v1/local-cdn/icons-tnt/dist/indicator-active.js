import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/indicator-active.js";
import { pathData as pathDatav3 } from "./v3/indicator-active.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/indicator-active";
export { pathData, ltr, accData };