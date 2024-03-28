import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/empty-warning.js";
import { pathData as pathDatav2 } from "./v2/empty-warning.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/empty-warning";
export { pathData, ltr, accData };