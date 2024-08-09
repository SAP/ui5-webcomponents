import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/medicine-pill.js";
import { pathData as pathDatav2 } from "./v2/medicine-pill.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/medicine-pill";
export { pathData, ltr, accData };