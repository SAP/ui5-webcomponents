import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/match-whole-word.js";
import { pathData as pathDatav2 } from "./v2/match-whole-word.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/match-whole-word";
export { pathData, ltr, accData };