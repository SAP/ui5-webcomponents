import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/software-item-variant.js";
import { pathData as pathDatav2 } from "./v2/software-item-variant.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/software-item-variant";
export { pathData, ltr, accData };