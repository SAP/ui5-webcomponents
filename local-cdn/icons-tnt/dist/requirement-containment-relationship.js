import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/requirement-containment-relationship.js";
import { pathData as pathDatav3 } from "./v3/requirement-containment-relationship.js";

const pathData = isLegacyThemeFamily() ? pathDatav2 : pathDatav3;

export default "tnt/requirement-containment-relationship";
export { pathData, ltr, accData };