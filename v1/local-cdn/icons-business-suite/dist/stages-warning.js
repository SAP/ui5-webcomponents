import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/stages-warning.js";
import { pathData as pathDatav2 } from "./v2/stages-warning.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/stages-warning";
export { pathData, ltr, accData };