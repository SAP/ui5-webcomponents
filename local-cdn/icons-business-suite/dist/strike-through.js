import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/strike-through.js";
import { pathData as pathDatav2 } from "./v2/strike-through.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/strike-through";
export { pathData, ltr, accData };