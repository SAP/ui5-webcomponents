import { isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/legal-section.js";
import { pathData as pathDatav2 } from "./v2/legal-section.js";

const pathData = isLegacyThemeFamily() ? pathDatav1 : pathDatav2;

export default "business-suite/legal-section";
export { pathData, ltr, accData };