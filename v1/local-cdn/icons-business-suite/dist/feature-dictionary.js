import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/feature-dictionary.js";
import { pathData as pathDatav2 } from "./v2/feature-dictionary.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/feature-dictionary";
export { pathData, ltr, accData };