import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/requirement-model.js";
import { pathData as pathDatav2 } from "./v2/requirement-model.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/requirement-model";
export { pathData, ltr, accData };