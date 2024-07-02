import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/column-selected.js";
import { pathData as pathDatav2 } from "./v2/column-selected.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/column-selected";
export { pathData, ltr, accData };