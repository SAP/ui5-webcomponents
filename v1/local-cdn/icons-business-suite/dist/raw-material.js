import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/raw-material.js";
import { pathData as pathDatav2 } from "./v2/raw-material.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/raw-material";
export { pathData, ltr, accData };