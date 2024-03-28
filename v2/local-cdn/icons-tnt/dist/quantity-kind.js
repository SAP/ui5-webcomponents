import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/quantity-kind.js";
import { pathData as pathDatav3 } from "./v3/quantity-kind.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/quantity-kind";
export { pathData, ltr, accData };