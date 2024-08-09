import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/row-selected.js";
import { pathData as pathDatav2 } from "./v2/row-selected.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/row-selected";
export { pathData, ltr, accData };